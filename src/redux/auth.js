import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null,
    user: null,
    logged: false,
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        _setAuth(state, action) {
            state.token = action.payload.token
            state.user = action.payload.user
            state.logged = action.payload.logged
        },
    },
})
const { _setAuth } = auth.actions

export const setAuth = (payload) => async (dispatch) => {
    dispatch(_setAuth(payload))
}

export default auth.reducer
