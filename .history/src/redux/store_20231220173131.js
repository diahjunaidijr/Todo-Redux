import { configureStore } from "@reduxjs/toolkit";

import allbooks from './slice/allbooks-slice';
import bookdetails from './slice/bookdetails-slice'

const store = configureStore ({
    reducer: {
        allbooks,
        bookdetails,
    },
});

export default store;