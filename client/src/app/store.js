import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { propertiesAPI } from './services/propertiesAPI'
import { expensesAPI } from './services/expensesAPI'
import { leasesAPI } from './services/leasesAPI'
import selectedYearReducer from '../features/selectedYear/selectedYearSlice'


export const store = configureStore({
    reducer: {
        [ propertiesAPI.reducerPath ]: propertiesAPI.reducer,
        [ expensesAPI.reducerPath ]: expensesAPI.reducer,
        [ leasesAPI.reducerPath ]: leasesAPI.reducer,
        selectedYear: selectedYearReducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(propertiesAPI.middleware, expensesAPI.middleware, leasesAPI.middleware)
})
setupListeners(store.dispatch)