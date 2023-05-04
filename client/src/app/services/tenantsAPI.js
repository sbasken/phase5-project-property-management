import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tenantsAPI = createApi({
    reducerPath: 'tenantsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),
    tagTypes: ['Tenant'],
    endpoints: builder => ({
        getTenants: builder.query({
            query() {
                return '/tenants'
            },
            providesTags: ['Tenant']
        }),
        getTenant: builder.query({
            query: (id) => `/tenants/${id}`
        }),
        addTenant: builder.mutation({
            query: (newTenant) => ({
                url:'/tenants',
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: newTenant
            }),
            invalidatesTags: ['Tenant']
        }),
        deleteTenant: builder.mutation({
            query: (id) => ({
                url: `/tenants/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Tenant']
        }),
        editTenant: builder.mutation({
            query: updatedTenant => {
                // console.log('in editTenant', updatedTenant);
                return {
                  url: `/tenants/${updatedTenant.id}`,
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(updatedTenant)
                }
              },
              invalidatesTags: ['Tenant']
        })

    })
})

export const {
     useGetTenantsQuery, 
     useGetTenantQuery, 
     useAddTenantMutation, 
     useDeleteTenantMutation,
     useEditTenantMutation
} = tenantsAPI