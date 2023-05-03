import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const unitsAPI = createApi({
    reducerPath: 'unitsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),
    tagTypes: ['Unit'],
    endpoints: builder => ({
        getUnits: builder.query({
            query() {
                return '/units'
            },
            providesTags: ['Unit']
        }),
        getUnit: builder.query({
            query: (id) => `/units/${id}`
        }),
        addUnit: builder.mutation({
            query: (newUnit) => ({
                url:'/units',
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: newUnit
            }),
            invalidatesTags: ['Unit']
        }),
        deleteUnit: builder.mutation({
            query: (id) => ({
                url: `/units/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Unit']
        }),
        editUnit: builder.mutation({
            query: updatedUnit => {
                // console.log('in editUnit', updatedUnit);
                return {
                  url: `/units/${updatedUnit.id}`,
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(updatedUnit)
                }
              },
              invalidatesTags: ['Unit']
        })

    })
})

export const {
     useGetuUitsQuery, 
     useGetUnitQuery, 
     useAddUnitMutation, 
     useDeleteUnitMutation,
     useEditUnitMutation
} = unitsAPI