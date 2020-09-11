import { Router } from 'express';

import { commentController } from '../controllers';
import { validate, validateSchemas } from '../middlewares';
import { protect } from '../middlewares/protect';
import { db } from '../database';

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

router.get('/mit', async (req, res) => {
  const comments = await db
    .withRecursive('cte', (qb) => {
      qb.select(
        'comments.id',
        'comments.parent_id',
        'comments.author_id',
        'comments.body'
      )
        .from('comments')
        .where('parent_id', null)
        .union((qb) => {
          qb.select('c.id', 'c.parent_id', 'c.author_id', 'c.body')
            .from('comments as c')
            .join('cte', 'cte.id', 'c.parent_id');
        });
    })
    .select('*')
    .from('cte');

  res.json({ comments });
});

export const comment = router;
