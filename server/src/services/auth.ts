import bcrypt from 'bcrypt';

import { db } from '../database';
import { AppError } from '../utils/appError';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export const register = async (
  data: Omit<User, 'id' | 'created_at' | 'updated_at'> & {
    confirmPassword: string;
  }
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(data.password, 12);

  const { confirmPassword: _, ...rest } = data;

  try {
    const user = (
      await db<User>('users').insert({ ...rest, password: hashedPassword }, '*')
    )[0];
    return user;
  } catch (err) {
    // Violates unique constraints.
    if (err.code === '23505') {
      if (err.detail.includes('username')) {
        const userWithEmail = await db<User>('users')
          .first()
          .where({ email: data.email });
        if (userWithEmail) {
          throw new AppError(409, 'Duplication error', {
            username: 'Username is already taken',
            email: 'Email is already taken',
          });
        } else {
          throw new AppError(409, 'Duplication error', {
            username: 'Username is already taken',
          });
        }
      } else {
        throw new AppError(409, 'Duplication error', {
          email: 'Email is already taken',
        });
      }
    } else {
      throw err;
    }
  }
};
