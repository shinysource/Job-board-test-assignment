import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../features/userSlice';
import { IUser } from './types';
import { IGenericResponse } from './types';
import { ProfileInput } from '../../pages/profile.page';
const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/users/`,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: 'me',
          credentials: 'include',
        };
      },
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),

    deleteUser: builder.mutation<IGenericResponse, {id:string}>({
      query(data) {
        return {
          url: 'delete',
          method: 'DELETE',
          body: data,
          credentials: 'include',
        };
      },
    }),

    toggleUser: builder.mutation<IGenericResponse, {id:string}>({
      query(data) {
        return {
          url: 'toggle',
          method: 'PUT',
          body: data,
          credentials: 'include',
        };
      },
    }),

    updateUser: builder.mutation<IUser, ProfileInput>({
      query(data) {
        return {
          url: 'update',
          method: 'PUT',
          body: data,
          credentials: 'include',
        };
      },
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useToggleUserMutation,
} = userApi;