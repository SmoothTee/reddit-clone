import { catchError } from '../utils';
import { commentService } from '../services';

export const createComment = catchError(async (req, res) => {
  const data = await commentService.createComment(req.body, req.session.userId);

  res.json(data);
});

export const voteComment = catchError(async (req, res) => {
  const { commentVote, action } = await commentService.voteComment(
    req.body,
    req.session.userId
  );

  res.json({ commentVote, action });
});
