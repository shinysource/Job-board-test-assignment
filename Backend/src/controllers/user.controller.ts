import { NextFunction, Request, Response } from 'express';
import { UpdateUserInput, ChangePasswordInput, ToggleUserInput, DeleteUserInput } from '../schemas/user.schema';
import { 
  findUniqueUser,
  updateUser,
  findFreelancers,
  toggleUser,
  deleteUser,
  getUsers,
} from '../services/user.service';
import bcrypt from 'bcryptjs';
import AppError from '../utils/appError';

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    res.status(200).status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};


export const getFreelancersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    const users = await findFreelancers();
    
    res.status(200).status(200).json({
      status: 'success',
      data: {
        freelancers: users
      },
    });
  } catch (err: any) {
    next(err);
  }
};


export const getUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    const users = await getUsers();
    
    res.status(200).status(200).json({
      status: 'success',
      data: {
        users: users
      },
    });
  } catch (err: any) {
    next(err);
  }
};


export const changePasswordHandler = async (
  req: Request<{}, {}, ChangePasswordInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, currentPassword, password } = req.body;

    const user = await findUniqueUser(
      { email: email?.toLowerCase() },
      { id: true, email: true, verified: true, password: true }
    );

    if (!user || !(await bcrypt.compare(currentPassword!, user.password))) {
      return next(new AppError(400, 'password not correct'));
    }

    const hashedPassword = await bcrypt.hash(password!, 12);

    await updateUser({ id: user.id }, { password:hashedPassword });

    res.status(201).json({
      status: 'success',
      message:
        'Password changed successfully',
    });

  } catch (err: any) {
    next(err);
  }
};

export const updateUserHandler =async (
    req: Request<{}, {}, UpdateUserInput>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, name, description } = req.body;
  
      const user = await findUniqueUser(
        { email: email.toLowerCase() },
        { id: true, email: true, verified: true,name:true, description:true, role:true, password: true }
      );
  
      const newUser = await updateUser({ id: user.id }, { name, description });
  
      res.status(201).json({
        status: 'success',
        message:
          'Profile updated successfully',
        data: {
          user:newUser,
        },
      });
  
    } catch (err: any) {
      next(err);
    }
}

export const toggleUserHandler =async (
  req: Request<{}, {}, ToggleUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.body;

    const user = await toggleUser(id);

    res.status(201).json({
      status: 'success',
      message: 'toggled successfully',
    });

  } catch (err: any) {
    next(err);
  }
}

export const deleteUserHandler =async (
  req: Request<{}, {}, DeleteUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.body;

    await deleteUser(id);

    res.status(201).json({
      status: 'success',
      message: 'deleted successfully',
    });

  } catch (err: any) {
    next(err);
  }
}