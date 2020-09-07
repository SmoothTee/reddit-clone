import { Router } from 'express';

import { auth } from './auth';
import { community } from './community';

const router = Router();

router.use('/auth', auth);
router.use('/community', community);

export const routes = router;
