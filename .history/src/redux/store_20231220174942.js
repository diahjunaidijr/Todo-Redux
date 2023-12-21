import { configureStore } from "@reduxjs/toolkit";

import TodoSlice from './slice/TodoSlice';

const store = configureStore ({
    reducer: {
        TodoSlice,
    },
});

export default store;