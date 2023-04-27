import { configureStore } from '@reduxjs/toolkit'
import propertiesReducer from '../features/properties/propertiesSlice'
import currentUserReducer from '../features/currentUser/currentUserSlice'

export const store = configureStore({
    reducer: {
        properties: propertiesReducer,
        currentUser: currentUserReducer
    }
})