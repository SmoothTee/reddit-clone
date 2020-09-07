import { catchError } from '../utils';
import { authService } from '../services';

export const register = catchError(async (req, res) => {
  const user = await authService.register(req.body);

  req.session.userId = user.id;

  res.json({ user });
});

export const login = catchError(async (req, res) => {
  const user = await authService.login(req.body);

  req.session.userId = user.id;

  res.json({ user });
});
