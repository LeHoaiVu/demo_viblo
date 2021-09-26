import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    docs: [],
}

const categories = createSlice({
    name: "categories",
    initialState,
    reducers: {
        _setCategories(state, action) {
            state.docs = [...action.payload.docs];
        }
    }
});
const {_setCategories} = categories.actions;

export const setCategories = (payload) => async (dispatch) => {
    dispatch(_setCategories(payload))
}


export default categories.reducer