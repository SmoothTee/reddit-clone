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

export const post = router;
