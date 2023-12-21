import { createSlice } from "@reduxjs/toolkit"; 
import axios from 'axios';
import { selectFavoriteBooks } from "./allbooks-slice";

const bookDetailsSlice = createSlice({
    name: "bookdetails",
    initialState: {
        book: {}, // Menggunakan singular 'book' karena kita hanya menyimpan satu buku di sini
        isLoading: false,
    },
    reducers :{
        setBook(state, action) {
            state.book = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
})

export const { setBook, setIsLoading } = bookDetailsSlice.actions

export const getBookDetailsById = (id) => {
    return async (dispatch, getState) => {
    try {
        dispatch(setIsLoading(true));

        const favoriteBooks = selectFavoriteBooks(getState());
        const { data } = await axios(`https://www.googleapis.com/books/v1/volumes/${id}`);
        dispatch(setBook({ ...data, favoriteBooks }));
        dispatch(setIsLoading(false));

    } catch (error) {
        console.error("Error fetching book details:", error);
        dispatch(setIsLoading(false));
        dispatch(setBook(null));
    }
    };
};

export default bookDetailsSlice.reducer;
