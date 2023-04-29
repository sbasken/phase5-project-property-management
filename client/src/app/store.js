import { configureStore } from '@reduxjs/toolkit'
import { propertiesAPI } from './services/propertiesAPI'


export const store = configureStore({
    reducer: {
        [propertiesAPI.reducerPath]: propertiesAPI.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(propertiesAPI.middleware)
})