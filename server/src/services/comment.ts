import { db } from '../database';
import { AppError } from '../utils/appError';

interface Comment {
  id: number;
  parent_id?: number;
  post_id: number;
  author_id: number;
  body: string;
  created_at: string;
  updated_at: string;
}

export const createComment = async (
  data: Pick<Comment, 'body' | 'post_id' | 'parent_id'>,
  userId: number
): Promise<Comment> => {
  try {
    const comment = (
      await db<Comment>('comments').insert(
        {
          ...data,
          author_id: userId,
        },
        '*'
      )
    )[0];

    return comment;
  } catch (err) {
    if (err.code === '23503') {
      if (err.detail.includes('post_id')) {
        const commentId = await db('comments')
          .first()
          .where({ id: data.parent_id });
        if (!commentId) {
          throw new AppError(404, 'Invalid post and parent id', {
            parent_id: `Comment with id ${data.parent_id} not found`,
            post_id: `Post with id ${data.post_id} not found`,
          });
        }
        throw new AppError(404, 'Invalid post id', {
          post_id: `Post with id ${data.post_id} not found`,
        });
      } else {
        throw new AppError(404, 'Invalid parent id', {
          parent_id: `Comment with id ${data.parent_id} not found`,
        });
      }
    } else {
      throw err;
    }
  }
};
