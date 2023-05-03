import { createSlice }from '@reduxjs/toolkit'

const currentYear = new Date().getFullYear()
const initialState = { value: currentYear }

const selectedYearSlice = createSlice({
    name: 'selectedYear',
    initialState,
    reducers: {
        updateYear(state, action) {
            state.value = action.payload
        }
    }
})

export const { updateYear } = selectedYearSlice.actions
export default selectedYearSlice.reducer