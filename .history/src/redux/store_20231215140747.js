import { configureStore } from "@reduxjs/toolkit";

import todo from "./slice/todo-slice"

const store = configureStore ({
    reducer: {
        todo
    }
});

export default store;