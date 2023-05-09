import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: '/'
    }),
    endpoints: builder => ({
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            })
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
            }
        }),
        getAgents: builder.query({
            query: () => ({
                url: `/users/agents`
            })
        })

    })
})

export const { 
    useDeleteUserMutation,
    useEditUserMutation,
    useGetAgentsQuery
} = usersAPI