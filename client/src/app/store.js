import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { propertiesAPI } from './services/propertiesAPI'
import { expensesAPI } from './services/expensesAPI'
import { leasesAPI } from './services/leasesAPI'
import { unitsAPI } from './services/unitsAPI'
import { tenantsAPI } from './services/tenantsAPI'
import selectedYearReducer from '../features/selectedYear/selectedYearSlice'
import currentUserReducer from '../features/currentUser/currentUserSlice'
import { authAPI } from './services/authAPI'

export const store = configureStore({
    reducer: {
        [ propertiesAPI.reducerPath ]: propertiesAPI.reducer,
        [ expensesAPI.reducerPath ]: expensesAPI.reducer,
        [ leasesAPI.reducerPath ]: leasesAPI.reducer,
        [ unitsAPI.reducerPath ]: unitsAPI.reducer,
        [ tenantsAPI.reducerPath ]: tenantsAPI.reducer,
        [ authAPI.reducerPath ]: authAPI.reducer,
        selectedYear: selectedYearReducer,
        currentUser: currentUserReducer
        
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
            propertiesAPI.middleware, 
            expensesAPI.middleware, 
            leasesAPI.middleware, 
            unitsAPI.middleware, 
            tenantsAPI.middleware,
            authAPI.middleware
        )
})
setupListeners(store.dispatch)