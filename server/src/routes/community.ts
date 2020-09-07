import { Router } from 'express';

import { communityController } from '../controllers';
import { validate, validateSchemas } from '../middlewares';
import { protect } from '../middlewares/protect';

const router = Router();

router.post(
  '/',
  protect,
  validate(validateSchemas.createCommunity, 'body'),
  communityController.createCommunity
);
router.post(
  '/become-member',
  protect,
  validate(validateSchemas.becomeMember, 'body'),
  communityController.becomeMember
);

export const community = router;
