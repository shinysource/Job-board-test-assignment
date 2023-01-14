import {  NextFunction, Request, Response } from 'express';
import { createBid } from '../services/bid.service';
import { PostBidInput } from '../schemas/bid.schema';
import AppError from '../utils/appError';

export const postBidHandler = async (
  req: Request<{}, {}, PostBidInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const job = await createBid({
      jobId: req.body.jobId,
      userId: req.body.userId,
      letter: req.body.letter,
    });

    res.status(201).json({
      status: 'success',
      message:
        'apply bid successfully',
      data: {
        job
      }
    });

  } catch (err: any) {
    return next(new AppError(400, 'bid apply failed'));
  }
};