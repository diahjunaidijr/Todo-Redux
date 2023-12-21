// todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [], // Ensure that the todos property is initialized with an empty array or an appropriate initial value.
};

const TodoSlice = createSlice({
    name: 'todoSlice',
    initialState: initialState,
    reducers: {
      addTodo: (state, action) => {
        const newTodo = {
          id: state.todos.length + 1,
          text: action.payload,
          completed: false,
        };
        state.todos.push(newTodo);
        console.log('New Todo Added:', newTodo); // Tambahkan console.log di sini
      },
      toggleTodo: (state, action) => {
        const todo = state.todos.find((todo) => todo.id === action.payload);
        if (todo) {
          todo.completed = !todo.completed;
          console.log('Todo Toggled:', todo); // Tambahkan console.log di sini
        }
      },
      deleteTodo: (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        console.log('Todo Deleted. New List:', state.todos); // Tambahkan console.log di sini
      },
      editTodo: (state, action) => {
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.text = action.payload.text;
          console.log('Todo Edited:', todo); // Tambahkan console.log di sini
        }
      },
    },
  });
export const { addTodo, toggleTodo, deleteTodo, editTodo } = TodoSlice.actions;
export default TodoSlice.reducer;
