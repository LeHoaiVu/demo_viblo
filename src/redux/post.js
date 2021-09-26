import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    docs: [],
    totalDocs : 0,
    limit : 10,
    totalPages : 0,
    page : 1,
    pagingCounter : 1,
    hasPrevPage : false,
    hasNextPage : true,
    prevPage : null,
    nextPage : null,
}

const post = createSlice({
    name: "post",
    initialState,
    reducers: {
        _setPost(state, action) {
            state.docs = action.payload.docs;
            state.totalDocs = action.payload.totalDocs;
            state.limit = action.payload.limit;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
            state.pagingCounter = action.payload.pagingCounter;
            state.hasPrevPage = action.payload.hasPrevPage;
            state.hasNextPage = action.payload.hasNextPage;
            state.prevPage = action.payload.prevPage;
            state.nextPage = action.payload.nextPage;
        }
    }
});
const {_setPost} = post.actions;

export const setPost = (payload) => async (dispatch) => {
    dispatch(_setPost(payload))
}


export default post.reducer