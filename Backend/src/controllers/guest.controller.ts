import {  NextFunction, Request, Response } from 'express';
import { getAllJobs
} from '../services/job.service';
import AppError from '../utils/appError';


export const getAllJobsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobs = await getAllJobs();

    res.status(200).status(200).json({
      status: 'success',
      data: {
        jobs,
      },
    });

  } catch (err: any) {
    next(err);
  }
};