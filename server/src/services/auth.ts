import bcrypt from 'bcrypt';

import { db } from '../database';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  created_at: string;
  updated_at: string;
}

export const register = async (
  data: Omit<User, 'id' | 'created_at' | 'updated_at'>
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = (
    await db<User>('users').insert({ ...data, password: hashedPassword }, '*')
  )[0];

  return user;
};
