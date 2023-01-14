export interface IUser {
  name: string;
  email: string;
  role: string;
  description: string;
  verified: boolean;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IGenericResponse {
  status: string;
  message: string;
}

export interface IJob {
  id: string;
  title: string;
  postEmail: string;
  description: string;
  salary: number;
  
  jobType: string;
  proved: boolean;
  status: string;

  user?: IUser;
  bids?: IBid[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IBid {
  id: string;
  letter: string;
  
  job: IJob;
  user: IUser;

  createdAt: Date;
  updatedAt: Date;
}

export interface IInvite {
  id: string;
  letter: string;
  
  job: IJob;
  freelancer: IUser;

  createdAt: Date;
  updatedAt: Date;
}