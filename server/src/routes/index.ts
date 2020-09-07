import { Router } from 'express';

import { auth } from './auth';
import { community } from './community';
import { post } from './post';

const router = Router();

router.use('/auth', auth);
router.use('/community', community);
router.use('/post', post);

export const routes = router;
