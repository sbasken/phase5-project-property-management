import { createSlice } from '@reduxjs/toolkit'

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: { name: 'Saki'},
    reducers: {
        setCurrentUser(state, action) {
            state.value = action.payload
        }
    }
})

export const { setCurrentUser } = currentUserSlice.actions
export default currentUserSlice.reducer