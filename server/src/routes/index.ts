import { Router } from 'express';

import { auth } from './auth';
import { community } from './community';
import { post } from './post';
import { comment } from './comment';

const router = Router();

router.use('/auth', auth);
router.use('/community', community);
router.use('/post', post);
router.use('/comment', comment);

export const routes = router;
