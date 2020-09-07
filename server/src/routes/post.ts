import { Router } from 'express';

import { postController } from '../controllers';
import { validate, validateSchemas } from '../middlewares';
import { protect } from '../middlewares/protect';

const router = Router();

router
  .route('/')
  .post(
    protect,
    validate(validateSchemas.createPost, 'body'),
    postController.createPost
  );
router.post(
  '/vote',
  protect,
  validate(validateSchemas.votePost, 'body'),
  postController.votePost
);

export const post = router;
