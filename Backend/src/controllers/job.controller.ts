import {  NextFunction, Request, Response } from 'express';
import { createJob,
  findJobsByUser,
} from '../services/job.service';
import { PostJobInput } from '../schemas/job.schema';
import AppError from '../utils/appError';
import { toggleJob, deleteJob } from '../services/job.service';
import { ToggleUserInput, DeleteUserInput } from '../schemas/user.schema';

export const getMyJobsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const jobs = await findJobsByUser(user.email);

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

export const postJobHandler = async (
  req: Request<{}, {}, PostJobInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const job = await createJob({
      postEmail: req.body.postEmail.toLowerCase(),
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
    });

    res.status(201).json({
      status: 'success',
      message:
        'post job successfully',
      data: {
        job
      }
    });

  } catch (err: any) {
    return next(new AppError(400, 'Post job failed'));
  }
};


export const toggleJobHandler =async (
  req: Request<{}, {}, ToggleUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.body;

    const job = await toggleJob(id);

    res.status(201).json({
      status: 'success',
      message: 'toggled successfully',
    });

  } catch (err: any) {
    next(err);
  }
}

export const deleteJobHandler =async (
  req: Request<{}, {}, DeleteUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.body;
    console.log(id);
    await deleteJob(id);

    res.status(201).json({
      status: 'success',
      message: 'deleted successfully',
    });

  } catch (err: any) {
    console.log(err);

    next(err);
  }
}