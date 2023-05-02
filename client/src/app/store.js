import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { propertiesAPI } from './services/propertiesAPI'
import { expensesAPI } from './services/expensesAPI'


export const store = configureStore({
    reducer: {
        [ propertiesAPI.reducerPath ]: propertiesAPI.reducer,
        [ expensesAPI.reducerPath ]: expensesAPI.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(propertiesAPI.middleware, expensesAPI.middleware)
})
setupListeners(store.dispatch)