import { catchError } from '../utils';
import { postService } from '../services';

export const createPost = catchError(async (req, res) => {
  const post = await postService.createPost(req.body, req.session.userId);

  res.json({ post });
});
