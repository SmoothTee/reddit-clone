import { db } from '../database';
import { AppError } from '../utils/appError';

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
