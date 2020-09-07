import { Router } from 'express';

import { commentController } from '../controllers';
import { validate, validateSchemas } from '../middlewares';
import { protect } from '../middlewares/protect';

const router = Router();

router
  .route('/')
  .post(
    protect,
    validate(validateSchemas.createComment, 'body'),
    commentController.createComment
  );
router.post(
  '/vote',
  protect,
  validate(validateSchemas.voteComment, 'body'),
  commentController.voteComment
);

export const comment = router;
