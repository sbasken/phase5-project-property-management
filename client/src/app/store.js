import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { propertiesAPI } from './services/propertiesAPI'
import { expensesAPI } from './services/expensesAPI'
import { leasesAPI } from './services/leasesAPI'
import { unitsAPI } from './services/unitsAPI'
import { tenantsAPI } from './services/tenantsAPI'
import selectedYearReducer from '../features/selectedYear/selectedYearSlice'
import { usersAPI } from './services/usersAPI'


export const store = configureStore({
    reducer: {
        [ propertiesAPI.reducerPath ]: propertiesAPI.reducer,
        [ expensesAPI.reducerPath ]: expensesAPI.reducer,
        [ leasesAPI.reducerPath ]: leasesAPI.reducer,
        [ unitsAPI.reducerPath ]: unitsAPI.reducer,
        [ tenantsAPI.reducerPath ]: tenantsAPI.reducer,
        [ usersAPI.reducerPath ]: usersAPI.reducer,
        selectedYear: selectedYearReducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
            propertiesAPI.middleware, 
            expensesAPI.middleware, 
            leasesAPI.middleware, 
            unitsAPI.middleware, 
            tenantsAPI.middleware,
            usersAPI.middleware,
        )
})
setupListeners(store.dispatch)