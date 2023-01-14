import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { JobInput } from '../../pages/client/post_job.page';
import { IGenericResponse, IJob } from './types';
import { setJobsToShow } from '../features/jobSlice';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const guestApi = createApi({
  reducerPath: 'guestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/guests/`,
  }),
  tagTypes: ['Guest'],
  endpoints: (builder) => ({
    getAllJobs: builder.query<IJob[], null>({
      query() {
        return {
          url: 'jobs',
        };
      },
      providesTags: (result) =>
      result
        ? [
            ...result.map(({ id }) => ({ type: 'Guest' as const, id })),
            { type: 'Guest', id: 'LIST' },
          ]
        : [{ type: 'Guest', id: 'LIST' }],
      transformResponse: (result: { data: { jobs: IJob[] } }) =>
        result.data.jobs,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // dispatch(setJobsToShow(data));
        } catch (error) {}
      },
    }),

  })
});

export const {
  useGetAllJobsQuery,
} = guestApi;