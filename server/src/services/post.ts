import { Request } from 'express';

import { db } from '../database';
import { AppError } from '../utils/appError';
import { User } from './auth';
import { Community } from './community';
import { userSerializer } from '../utils/serializer';

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
      .select('posts.*', 'communities.name as community')
      .count('comments.id as numOfComments')
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
      .select()
      .whereIn('id', uniqueCommunityIds);

    const postVotes = await trx<PostVote>('post_votes')
      .select()
      .whereIn('post_id', postIds);

    return { posts, users, communities, postVotes };
  });

  return res;
};
