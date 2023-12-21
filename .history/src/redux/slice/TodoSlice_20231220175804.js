// todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [], // Pastikan properti todos diinisialisasi dengan array kosong atau nilai awal yang sesuai.
  };
const TodoSlice = createSlice({
  name: 'todoSlice',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: state.length + 1,
        text: action.payload,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo } = TodoSlice.actions;
export default TodoSlice.reducer;
