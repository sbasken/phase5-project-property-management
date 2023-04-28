import { configureStore } from '@reduxjs/toolkit'
import { propertiesAPI } from '../features/properties/propertiesSlice'

export const store = configureStore({
    reducer: {
        [propertiesAPI.reducerPath]: propertiesAPI.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(propertiesAPI.middleware)
})