import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { JobInput } from '../../pages/client/post_job.page';
import { IGenericResponse, IJob, IInvite } from './types';
import { setJobsToShow } from '../features/jobSlice';
import { string } from 'zod';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export interface BidInput {
  jobId: string
  userId: string
  letter: string
}

export const freelancerApi = createApi({
  reducerPath: 'freelancerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/freelancer/`,
  }),
  endpoints: (builder) => ({
    postBid: builder.mutation<IGenericResponse, BidInput>({
      query(data){
        console.log(data);
        return {
          url: 'bid/post',
          method: 'POST',
          body: data,
          credentials: 'include',
        };        
      }
    }),

    getMyInvites: builder.query<IInvite[], null>({
      query() {
        return {
          url: 'invites',
          credentials: 'include',
        };
      },
      transformResponse: (result: { data: { invites: IInvite[] } }) =>
        result.data.invites,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {}
      },
    }),

  })
});

export const {
  usePostBidMutation,
  useGetMyInvitesQuery,
} = freelancerApi;