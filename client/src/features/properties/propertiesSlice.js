import { createSlice } from '@reduxjs/toolkit'

const propertiesSlice = createSlice({
    name: 'properties',
    initialState: {
        property1 : 'Francisco'
    },
    reducers: {
        addProperty(state, action) {

        }

    }
})

export const { addProperty } = propertiesSlice.actions
export default propertiesSlice.reducer