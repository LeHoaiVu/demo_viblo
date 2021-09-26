import {combineReducers} from "redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth';
import categoriesReducer from './categories';

const reducer = combineReducers ({
    auth: authReducer,
    categories: categoriesReducer,
});

export default configureStore({
    reducer
})