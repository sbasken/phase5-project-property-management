import { createSlice }from '@reduxjs/toolkit'

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: null,
    reducers: {
        updateCurrentUser(state, action) {
            state.value = action.payload
        }
    }
})

export const { updateCurrentUser } = currentUserSlice.actions
export default currentUserSlice.reducer