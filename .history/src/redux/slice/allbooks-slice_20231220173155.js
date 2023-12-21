import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const allBooksSlice = createSlice({
    name: "allbooks",
    initialState: {
        books: [],
        favoriteBooks: [],
        isLoading: false,
    },
    reducers: {
        setBooks(state, action) {
            state.books = action.payload;
        },
        setFavoriteBooks(state, action) {
            state.favoriteBooks = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        addToFavorites(state, action) {
            const bookToAdd = action.payload;
            state.favoriteBooks = [...state.favoriteBooks, bookToAdd];
        },
        removeFromFavorites(state, action) {
            const bookToRemove = action.payload;
            state.favoriteBooks = state.favoriteBooks.filter((book) => book.id !== bookToRemove.id);
        },
    },
})

export const { setBooks, setFavoriteBooks, setIsLoading, addToFavorites, removeFromFavorites } = allBooksSlice.actions;

export const selectFavoriteBooks = (state) => state.allbooks.favoriteBooks;
export const selectBooks = (state) => state.allbooks.books;

export const getAllBooks = () => {

    return async (dispatch) => {
        try {
            dispatch(setIsLoading(true));
            const { data } = await axios ("https://www.googleapis.com/books/v1/volumes?q=language:id");
            dispatch(setBooks(data.items));
            console.log(data)
            
        }catch (error) {
            console.error("Error fetching books:", error);
        }finally{
            dispatch(setIsLoading(false));
        }
    }
}
export default allBooksSlice.reducer;