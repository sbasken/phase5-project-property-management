import { createSlice } from '@reduxjs/toolkit'

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: { username: 'Saki'},
    reducers: {
    }
})

export default currentUserSlice.reducer