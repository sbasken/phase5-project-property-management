import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),
    tagTypes: ['User'],
    endpoints: builder => ({
        loginUser: builder.mutation({
            query: (userData) => ({
                url: '/login',
                method: 'POST',
                body: userData,
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'DELETE',
            }),
        }),
        checkSession: builder.mutation({
            query: () => '/check_session'
        }),
        getUser: builder.query({
            query: () => {
                '/users'
            },
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['User']
        }),
        editUser: builder.mutation({
            query: updatedUser => {
                return {
                  url: `/users/${updatedUser.id}`,
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(updatedUser)
                }
            },
            invalidatesTags: ['User']
        })

    })
})

export const {
     useLoginUserMutation, 
     useLogoutUserMutation, 
     useCheckSessionMutation,
     useGetUserQuery, 
     useDeleteUserMutation,
     useEditUserMutation
} = authAPI