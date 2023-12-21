import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchTodosAsync = createAsyncThunk('todo/fetchTodos', async () => {
  try {
    const response = await fetch('https://6582da8502f747c8367a60e5.mockapi.io/schedule/todo');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});


const initialState = {
    todos: [],
    status: 'idle',
    error: null,
};

const TodoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
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
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    },
});
export { fetchTodosAsync };
export const { addTodo, toggleTodo, deleteTodo, editTodo } = TodoSlice.actions;
export default TodoSlice.reducer;
