import { catchError } from '../utils';
import { postService } from '../services';

export const createPost = catchError(async (req, res) => {
  const post = await postService.createPost(req.body, req.session.userId);

  res.json({ post });
});

export const votePost = catchError(async (req, res) => {
  const { postVote, action } = await postService.votePost(
    req.body,
    req.session.userId
  );

  res.json({ postVote, action });
});

export const readPosts = catchError(async (req, res) => {
  const data = await postService.readPosts(req.query);

  res.json({ data });
});

export const readPost = catchError(async (req, res) => {
  const { post_id } = req.params;
  const { community, post_title } = req.query;

  const data = await postService.readPost(
    Number(post_id),
    community as string,
    post_title as string
  );

  res.json({ data });
});
