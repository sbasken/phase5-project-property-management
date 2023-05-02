import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const expensesAPI = createApi({
    reducerPath: 'expensesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),
    tagTypes: ['Expense'],
    endpoints: builder => ({
        getExpenses: builder.query({
            query: (property_id) => {
                return `/expenses${property_id ? `?property_id=${property_id}` : ''}`;
            },
            providesTags: ['Expense']
        }),
        getExpense: builder.query({
            query: (id) => ({
                url: `/expenses/${id}`
            })
        }),
        addExpense: builder.mutation({
            query: (newExpense) => ({
                url:'/expenses',
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: newExpense
            }),
            invalidatesTags: ['Expense']
        }),
        deleteExpense: builder.mutation({
            query: (id) => ({
                url: `/expenses/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Expense']
        }),
        editExpense: builder.mutation({
            query: updatedExpense => {
                // console.log('in editExpense', updatedExpense);
                return {
                  url: `/expenses/${updatedExpense.id}`,
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(updatedExpense)
                }
              },
              invalidatesTags: ['Expense']
        })

    })
})

export const {
     useGetExpensesQuery, 
     useGetExpenseQuery, 
     useAddExpenseMutation, 
     useDeleteExpenseMutation,
     useEditExpenseMutation
} = expensesAPI