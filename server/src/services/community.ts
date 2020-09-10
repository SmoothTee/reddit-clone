import { Request } from 'express';

import { db } from '../database';
import { AppError, DuplicationError } from '../utils/appError';

export interface Community {
  id: number;
  creator_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityMember {
  user_id: number;
  community_id: number;
  created_at: string;
  updated_at: string;
}

export const createCommunity = async (
  data: Pick<Community, 'name'>,
  userId: number
): Promise<Community> => {
  try {
    const community = (
      await db<Community>('communities').insert(
        { ...data, creator_id: userId },
        '*'
      )
    )[0];

    return community;
  } catch (err) {
    if (err.code === '23505') {
      throw new DuplicationError({
        name: 'Name is already taken',
      });
    } else {
      throw err;
    }
  }
};

export const becomeMember = async (
  communityId: number,
  userId: number
): Promise<CommunityMember> => {
  try {
    const communityMember = (
      await db<CommunityMember>('community_members').insert(
        {
          community_id: communityId,
          user_id: userId,
        },
        '*'
      )
    )[0];

    return communityMember;
  } catch (err) {
    if (err.code === '23505' && err.detail.includes('already exists')) {
      throw new AppError(409, 'You are already member of the community.');
    } else {
      throw err;
    }
  }
};

export const readCommunities = async (req: Request): Promise<Community[]> => {
  const { query, session } = req;

  let dbQuery = db<Community>('communities')
    .select(
      'communities.*',
      db.raw('count(community_members.user_id)::integer as "numOfMembers"')
    )
    .leftJoin<CommunityMember>(
      'community_members',
      'community_members.community_id',
      'communities.id'
    )
    .groupBy('communities.id');

  if (query.not_member && session.userId) {
    dbQuery = dbQuery.whereNotIn(
      'id',
      db('community_members')
        .select('community_id')
        .where({ user_id: session.userId })
    );
  }

  const communities = await dbQuery;

  return communities;
};
