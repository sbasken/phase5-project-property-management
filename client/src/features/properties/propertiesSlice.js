// import { createSlice } from '@reduxjs/toolkit'

// const propertiesSlice = createSlice({
//     name: 'properties',
//     initialState: {
//         property1 : 'Francisco'
//     },
//     reducers: {
//         addProperty(state, action) {

//         }

//     }
// })

// export const { addProperty } = propertiesSlice.actions
// export default propertiesSlice.reducer

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const propertiesAPI = createApi({
    reducerPath: 'propertiesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:5555'
    }),
    endpoints: builder => ({
        fetchProperties: builder.query({
            query: () => '/properties'
        })
    })
})

export const { useFetchPropertiesQuery } = propertiesAPI