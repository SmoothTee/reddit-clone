import { Request } from 'express';

import { db } from '../database';
import { AppError } from '../utils/appError';
import { User, UserWithoutPassword } from './auth';
import { Community } from './community';
import { userSerializer } from '../utils/serializer';
import { CommunityMember } from './community';
import { Comment } from './comment';
import { CommentVote } from './comment';

interface Post {
  id: number;
  community_id: number;
  author_id: number;
  title: string;
  body?: string;
  created_at: string;
  updated_at: string;
}

export const createPost = async (
  data: Omit<Post, 'id' | 'author_id' | 'created_at' | 'updated_at'>,
  userId: number
): Promise<Post> => {
  try {
    const post = (
      await db<Post>('posts').insert({ ...data, author_id: userId }, '*')
    )[0];

    return post;
  } catch (err) {
    if (err.code === '23503' && err.detail.includes('community_id')) {
      throw new AppError(404, 'Invalid community id', {
        community_id: 'Community with id not found',
      });
    } else {
      throw err;
    }
  }
};

interface PostVote {
  user_id: number;
  post_id: number;
  vote: number;
  created_at: string;
  updated_at: string;
}

export const votePost = async (
  data: Pick<PostVote, 'post_id' | 'vote'>,
  userId: number
): Promise<{ postVote: PostVote; action: string }> => {
  try {
    let postVote = await db<PostVote>('post_votes')
      .first()
      .where({ post_id: data.post_id, user_id: userId });
    let action;
    if (postVote) {
      if (postVote.vote === data.vote) {
        postVote = (
          await db<PostVote>('post_votes')
            .del()
            .where({ post_id: data.post_id, user_id: userId })
            .returning('*')
        )[0];
        action = 'd';
      } else {
        postVote = (
          await db<PostVote>('post_votes')
            .update({ vote: data.vote, updated_at: db.fn.now() }, '*')
            .where({
              post_id: data.post_id,
              user_id: userId,
            })
        )[0];
        action = 'u';
      }
    } else {
      postVote = (
        await db<PostVote>('post_votes').insert(
          { ...data, user_id: userId },
          '*'
        )
      )[0];
      action = 'c';
    }

    return { postVote, action };
  } catch (err) {
    if (err.code === '23503' && err.detail.includes('post_id')) {
      throw new AppError(404, 'Post not found', {
        post_id: `Post with id ${data.post_id} not found.`,
      });
    } else {
      throw err;
    }
  }
};

export const readPosts = async (
  query: Request['query']
): Promise<{
  posts: Post[];
  users: Omit<User, 'password'>[];
  communities: Community[];
}> => {
  let { community } = query;

  if (typeof community === 'string') {
    community = [community];
  }

  const res = await db.transaction(async (trx) => {
    let dbQuery = trx<Post>('posts')
      .select(
        'posts.*',
        'communities.name as community',
        trx.raw('count(comments.id)::integer as "numOfComments"')
      )
      .leftJoin<Community>(
        'communities',
        'communities.id',
        'posts.community_id'
      )
      .leftJoin<Comment>('comments', 'comments.post_id', 'posts.id')
      .groupBy('posts.id', 'communities.name');

    if (community) {
      dbQuery = dbQuery.whereIn(
        'communities.name',
        community as readonly string[]
      );
    }

    const posts = await dbQuery.orderBy('posts.created_at', 'desc');

    const postIds = posts.map((p) => p.id);
    const uniqueUserIds = [...new Set(posts.map((p) => p.author_id))];
    const uniqueCommunityIds = [...new Set(posts.map((p) => p.community_id))];

    const users = (
      await trx<User>('users').select().whereIn('id', uniqueUserIds)
    ).map(userSerializer);

    const communities = await trx<Community>('communities')
      .select(
        'communities.*',
        trx.raw('count(community_members.user_id)::integer as "numOfMembers"')
      )
      .whereIn('id', uniqueCommunityIds)
      .leftJoin<CommunityMember>(
        'community_members',
        'community_members.community_id',
        'communities.id'
      )
      .groupBy('communities.id');

    const postVotes = await trx<PostVote>('post_votes')
      .select()
      .whereIn('post_id', postIds);

    return { posts, users, communities, postVotes };
  });

  return res;
};

export const readPost = async (
  postId: number,
  communityName: string,
  postTitle: string
): Promise<{
  post: Post;
  users: UserWithoutPassword[];
  community: Community;
}> => {
  const data = await db.transaction(async (trx) => {
    const post = await trx('posts')
      .first('posts.*', 'communities.name as community')
      .where({ 'posts.id': postId, 'communities.name': communityName })
      .andWhere('title', 'like', `${postTitle}%`)
      .leftJoin('communities', 'communities.id', 'posts.community_id');

    const community = await trx('communities')
      .first()
      .where('id', post.community_id);

    const comments = await trx
      .withRecursive('cte', (qb) => {
        qb.select(
          'comments.id',
          'comments.parent_id',
          'comments.author_id',
          'comments.body',
          'comments.created_at',
          trx.raw('array[id] as path'),
          trx.raw('1 as depth')
        )
          .from('comments')
          .where('parent_id', null)
          .andWhere('post_id', post.id)
          .union((qb) => {
            qb.select(
              'c.id',
              'c.parent_id',
              'c.author_id',
              'c.body',
              'c.created_at',
              trx.raw('cte.path || c.id'),
              trx.raw('cte.depth + 1 as depth')
            )
              .from('comments as c')
              .join('cte', 'cte.id', 'c.parent_id');
          });
      })
      .select('*')
      .from('cte')
      .orderBy('path');

    const uniqueUserIds = [
      ...new Set((comments as Comment[]).map((c) => c.author_id)),
    ];
    const commentIds = (comments as Comment[]).map((c) => c.id);

    const users = await trx('users')
      .select()
      .whereIn('id', [post.author_id, ...uniqueUserIds]);

    const postVotes = await trx<PostVote>('post_votes')
      .select()
      .where('post_id', post.id);

    const commentVotes = await trx<CommentVote>('comment_votes')
      .select()
      .whereIn('comment_id', commentIds);

    return {
      users: users.map(userSerializer),
      community,
      post,
      postVotes,
      comments,
      commentVotes,
    };
  });
  return data;
};
