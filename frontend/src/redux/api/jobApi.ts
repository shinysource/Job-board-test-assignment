import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { JobInput } from '../../pages/client/post_job.page';
import { IGenericResponse, IJob, IUser } from './types';
import { setJobsToShow } from '../features/jobSlice';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export interface InviteInput {
  jobId: string;
  freelancerId: string;
  letter: string;
}

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/jobs/`,
  }),
  tagTypes: ['Job'],
  endpoints: (builder) => ({
    postJob: builder.mutation<IGenericResponse, JobInput>({
      query(data){
        return {
          url: 'post',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
    }),

    getMyJobs: builder.query<IJob[], null>({
      query() {
        return {
          url: 'myjobs',
          credentials: 'include',
        };
      },
      transformResponse: (result: { data: { jobs: IJob[] } }) =>
        result.data.jobs,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // dispatch(setJobsToShow(data));
        } catch (error) {}
      },
    }),

    getFreelancers: builder.query<IUser[], null>({
      query() {
        return {
          url: 'freelancers',
          credentials: 'include',
        };
      },
      transformResponse: (result: { data: { freelancers: IUser[] } }) =>
        result.data.freelancers,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
          } catch (error) {}
        },
    }),

    getUsers: builder.query<IUser[], null>({
      query() {
        return {
          url: 'getUsers',
          credentials: 'include',
        };
      },
      transformResponse: (result: { data: { users: IUser[] } }) =>
        result.data.users,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
          } catch (error) {}
        },
    }),

    postInvite: builder.mutation<IGenericResponse, InviteInput>({
      query(data){
        return {
          url: 'invite/post',
          method: 'POST',
          body: data,
          credentials: 'include',
        };        
      }
    }),


    deleteJob: builder.mutation<IGenericResponse, {id:string}>({
      query(data) {
        return {
          url: 'delete',
          method: 'DELETE',
          body: data,
          credentials: 'include',
        };
      },
    }),

    toggleJob: builder.mutation<IGenericResponse, {id:string}>({
      query(data) {
        return {
          url: 'toggle',
          method: 'PUT',
          body: data,
          credentials: 'include',
        };
      },
    }),

  })
});

export const {
  usePostJobMutation,
  useGetMyJobsQuery,
  useGetFreelancersQuery,
  usePostInviteMutation,
  useToggleJobMutation,
  useDeleteJobMutation,
  useGetUsersQuery,
} = jobApi;