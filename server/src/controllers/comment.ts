import { catchError } from '../utils';
import { commentService } from '../services';

export const createComment = catchError(async (req, res) => {
  const comment = await commentService.createComment(
    req.body,
    req.session.userId
  );

  res.json({ comment });
});
