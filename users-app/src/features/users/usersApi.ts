import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, UserFormValues } from '../../types/user';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    addUser: builder.mutation<User, UserFormValues>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    updateUser: builder.mutation<User, { id: string; data: UserFormValues }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),

    deleteUser: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
