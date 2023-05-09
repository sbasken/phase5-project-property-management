import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const leasesAPI = createApi({
    reducerPath: 'leasesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: '/'
    }),
    tagTypes: ['Lease'],
    endpoints: builder => ({
        getLeases: builder.query({
            query() {
                return '/leases'
            },
            providesTags: ['Lease']
        }),
        getLease: builder.query({
            query: (id) => `/leases/${id}`
        }),
        addLease: builder.mutation({
            query: (newLease) => ({
                url:'/leases',
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: newLease
            }),
            invalidatesTags: ['Lease']
        }),
        deleteLease: builder.mutation({
            query: (id) => ({
                url: `/leases/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Lease']
        }),
        editLease: builder.mutation({
            query: updatedLease => {
                // console.log('in editLease', updatedLease);
                return {
                  url: `/leases/${updatedLease.id}`,
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(updatedLease)
                }
              },
              invalidatesTags: ['Lease']
        })

    })
})

export const {
     useGetLeasesQuery, 
     useGetLeaseQuery, 
     useAddLeaseMutation, 
     useDeleteLeaseMutation,
     useEditLeaseMutation
} = leasesAPI