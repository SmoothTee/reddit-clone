import { Router } from 'express';

import { communityController } from '../controllers';
import { validate, validateSchemas } from '../middlewares';
import { protect } from '../middlewares/protect';

const router = Router();

router
  .route('/')
  .post(
    protect,
    validate(validateSchemas.createCommunity, 'body'),
    communityController.createCommunity
  )
  .get(communityController.readCommunities);
router.post(
  '/become-member',
  protect,
  validate(validateSchemas.becomeMember, 'body'),
  communityController.becomeMember
);

export const community = router;
