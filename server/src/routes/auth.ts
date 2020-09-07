import { Router } from 'express';

import { authController } from '../controllers';
import { validate, validateSchemas } from '../middlewares';
import { protect } from '../middlewares/protect';

const router = Router();

router.post(
  '/register',
  validate(validateSchemas.register, 'body'),
  authController.register
);
router.post(
  '/login',
  validate(validateSchemas.login, 'body'),
  authController.login
);
router.get('/logout', authController.logout);
router.get('/me', protect, authController.me);

export const auth = router;
