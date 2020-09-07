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
    // Invalid post id or parent comment id.
    if (err.code === '23503') {
      // Invalid post id.
      if (err.detail.includes('post_id')) {
        // Parent comment id from request.
        if (data.parent_id) {
          const commentId = await db('comments')
            .first()
            .where({ id: data.parent_id });
          // Invalid parent comment id.
          if (!commentId) {
            throw new AppError(404, 'Invalid post and parent id', {
              parent_id: `Comment with id ${data.parent_id} not found`,
              post_id: `Post with id ${data.post_id} not found`,
            });
          } else {
            // Valid parent comment id, but invalid post id.
            throw new AppError(404, 'Invalid post id', {
              post_id: `Post with id ${data.post_id} not found`,
            });
          }
        } else {
          // No parent comment id given and invalid post id.
          throw new AppError(404, 'Invalid post id', {
            post_id: `Post with id ${data.post_id} not found`,
          });
        }
      } else {
        // Invalid parent comment id.
        throw new AppError(404, 'Invalid parent id', {
          parent_id: `Comment with id ${data.parent_id} not found`,
        });
      }
    } else {
      throw err;
    }
  }
};

interface CommentVote {
  user_id: number;
  comment_id: number;
  vote: number;
  created_at: string;
  updated_at: string;
}

export const voteComment = async (
  data: Pick<CommentVote, 'comment_id' | 'vote'>,
  userId: number
): Promise<{ commentVote: CommentVote; action: string }> => {
  try {
    let commentVote = await db<CommentVote>('comment_votes')
      .first()
      .where({ comment_id: data.comment_id, user_id: userId });
    let action;
    if (commentVote) {
      if (commentVote.vote === data.vote) {
        commentVote = (
          await db<CommentVote>('comment_votes')
            .del()
            .where({ comment_id: data.comment_id, user_id: userId })
            .returning('*')
        )[0];
        action = 'd';
      } else {
        commentVote = (
          await db<CommentVote>('comment_votes')
            .update({ vote: data.vote, updated_at: db.fn.now() }, '*')
            .where({
              comment_id: data.comment_id,
              user_id: userId,
            })
        )[0];
        action = 'u';
      }
    } else {
      commentVote = (
        await db<CommentVote>('comment_votes').insert(
          { ...data, user_id: userId },
          '*'
        )
      )[0];
      action = 'c';
    }

    return { commentVote, action };
  } catch (err) {
    if (err.code === '23503' && err.detail.includes('comment_id')) {
      throw new AppError(404, 'Comment not found', {
        comment_id: `Comment with id ${data.comment_id} not found.`,
      });
    } else {
      throw err;
    }
  }
};
