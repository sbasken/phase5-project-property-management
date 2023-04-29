import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const propertiesAPI = createApi({
    reducerPath: 'propertiesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),
    endpoints: builder => ({
        getProperties: builder.query({
            query: () => '/properties'
        })
    })
})

export const { useGetPropertiesQuery } = propertiesAPI