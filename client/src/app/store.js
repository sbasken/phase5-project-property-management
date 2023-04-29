import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { propertiesAPI } from './services/propertiesAPI'


export const store = configureStore({
    reducer: {
        [propertiesAPI.reducerPath]: propertiesAPI.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(propertiesAPI.middleware)
})
setupListeners(store.dispatch)