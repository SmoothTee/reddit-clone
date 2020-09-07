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
