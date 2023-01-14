import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

export const jobGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (user.role == 'freelancer') {
      return next(
        new AppError(400, `Invalid action for freelancers`)
      );
    }

    next();
  } catch (err: any) {
    next(err);
  }
};
