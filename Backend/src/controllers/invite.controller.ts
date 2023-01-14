import {  NextFunction, Request, Response } from 'express';
import { createInvite, findInvitesByUser } from '../services/invite.service';
import { PostInviteInput } from '../schemas/Invite.schema';
import AppError from '../utils/appError';

export const postInviteHandler = async (
  req: Request<{}, {}, PostInviteInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const invite = await createInvite({
      jobId: req.body.jobId,
      freelancerId: req.body.freelancerId,
      letter: req.body.letter,
    });

    res.status(201).json({
      status: 'success',
      message:
        'apply invite successfully',
      data: {
        invite
      }
    });

  } catch (err: any) {
    return next(new AppError(400, 'invite send failed'));
  }
};

export const getMyInvitesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const invites = await findInvitesByUser(user.email);

    res.status(200).status(200).json({
      status: 'success',
      data: {
        invites,
      },
    });

  } catch (err: any) {
    next(err);
  }
};