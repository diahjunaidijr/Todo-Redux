// TodoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodosAsync = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://6582da8502f747c8367a60e5.mockapi.io/schedule/todo');
  const data = await response.json();
  return data;
});

export const addTodoAsync = createAsyncThunk('todos/addTodo', async (text) => {
  const response = await fetch('https://6582da8502f747c8367a60e5.mockapi.io/schedule/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text,
      completed: false,
    }),
  });

  const data = await response.json();
  return data;
});

// Define initial state
const initialState = {
  todos: [],
  status: 'idle',
  error: null,
};

// Create a slice of the Redux store
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Regular synchronous reducers
    addTodo: (state, action) => {
      const newTodo = {
        id: state.todos.length + 1,
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
  },
  extraReducers: (builder) => {
    // Async reducers
    builder.addCase(fetchTodosAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTodosAsync.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.todos = action.payload;
    });
    builder.addCase(fetchTodosAsync.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(addTodoAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.todos.push(action.payload);
    });
    builder.addCase(addTodoAsync.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
