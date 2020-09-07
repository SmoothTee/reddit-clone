import { catchError } from '../utils';
import { communityService } from '../services';

export const createCommunity = catchError(async (req, res) => {
  const community = await communityService.createCommunity(
    req.body,
    req.session.userId
  );

  res.json({ community });
});

export const becomeMember = catchError(async (req, res) => {
  const communityMember = await communityService.becomeMember(
    req.body.communityId,
    req.session.userId
  );

  res.json({ communityMember });
});
