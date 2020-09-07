import { Router } from 'express';

import { authController } from '../controllers';
import { validate, validateSchemas } from '../middlewares';

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

export const auth = router;
