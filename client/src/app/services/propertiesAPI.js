import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const propertiesAPI = createApi({
    reducerPath: 'propertiesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),
    tagTypes: ['Property'],
    endpoints: builder => ({
        getProperties: builder.query({
            query() {
                return '/properties'
            },
            providesTags: ['Property']
        }),
        getProperty: builder.query({
            query: (id) => `/properties/${id}`
        }),
        addProperty: builder.mutation({
            query: (newProperty) => ({
                url:'/properties',
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: newProperty
            }),
            invalidatesTags: ['Property']
        }),
        deleteProperty: builder.mutation({
            query: (id) => ({
                url: `/properties/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Property']
        }),
        editProperty: builder.mutation({
            query: updatedProperty => {
                // console.log('in editProperty', updatedProperty);
                return {
                  url: `/properties/${updatedProperty.id}`,
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(updatedProperty)
                }
              },
            invalidatesTags: ['Property']
        })

    })
})

export const {
     useGetPropertiesQuery, 
     useGetPropertyQuery, 
     useAddPropertyMutation, 
     useDeletePropertyMutation,
     useEditPropertyMutation
} = propertiesAPI