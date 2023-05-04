import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),
    tagTypes: ['User'],
    endpoints: builder => ({
        getUsers: builder.query({
            query() {
                return `/users`
            },
            providesTags: ['User']
        }),
        getUser: builder.query({
            query: (id) => `/users/${id}`
        }),
        addUser: builder.mutation({
            query: (newUser) => ({
                url:'/users',
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['User']
        }),
        editUser: builder.mutation({
            query: values => {
                return {
                  url: `/user/${values.id}`,
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(values)
                }
              },
              invalidatesTags: ['User']
        })

    })
})

export const { 
    useGetUsersQuery,
    useGetUserQuery, 
    useAddUserMutation, 
    useDeleteUserMutation,
    useEditUserMutation
} = usersAPI