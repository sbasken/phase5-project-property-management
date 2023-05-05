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
        signupUser: builder.mutation({
            query: (userData) => ({
                url: '/signup',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: userData
            }),
            invalidatesTags: ['User']
        }),
        checkSession: builder.mutation({
            query: () => {
                '/check_session'
            },
            providesTags: ['User'],
        })
    })
})

export const {
     useLoginUserMutation, 
     useLogoutUserMutation, 
     useSignupUserMutation,
     useCheckSessionMutation
} = authAPI