import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodosAsync = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://6582da8502f747c8367a60e5.mockapi.io/schedule/todo');
  const data = await response.json();
  return data;
});

export const addTodoAsync = createAsyncThunk('todos/addTodo', async (task) => {
  const response = await fetch('https://6582da8502f747c8367a60e5.mockapi.io/schedule/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      task: task, 
      completed: false,
    }),
  });

  const data = await response.json();
  return data;
});
export const deleteTodoAsync = createAsyncThunk('todos/deleteTodo', async (id) => {
  // Menggunakan fetch untuk DELETE request ke API
  await fetch(`https://6582da8502f747c8367a60e5.mockapi.io/schedule/todo/${id}`, {
    method: 'DELETE',
  });
  return id; // Mengembalikan ID todo yang dihapus
});
export const toggleTodoAsync = createAsyncThunk('todos/toggleTodo', async (id) => {
  // Menggunakan fetch untuk mendapatkan todo yang akan di-toggle
  const response = await fetch(`https://6582da8502f747c8367a60e5.mockapi.io/schedule/todo/${id}`);
  const data = await response.json();

  // Mengubah status completed dan mengirimkan PUT request ke API
  const updatedTodo = { ...data, completed: !data.completed };
  await fetch(`https://6582da8502f747c8367a60e5.mockapi.io/schedule/todo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTodo),
  });

  return updatedTodo; // Mengembalikan todo yang telah di-toggle
});
export const editTodoAsync = createAsyncThunk('todos/editTodo', async ({ id, task }) => {
  // Menggunakan fetch untuk mendapatkan todo yang akan di-edit
  const response = await fetch(`https://6582da8502f747c8367a60e5.mockapi.io/schedule/todo/${id}`);
  const data = await response.json();

  // Mengubah task dan mengirimkan PUT request ke API
  const updatedTodo = { ...data, task };
  await fetch(`https://6582da8502f747c8367a60e5.mockapi.io/schedule/todo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTodo),
  });

  return updatedTodo; // Mengembalikan todo yang telah di-edit
});

const initialState = {
  todos: [],
  status: 'idle',
  error: null,
};

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      const deletedTodoId = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== deletedTodoId);
    },
    editTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.task = action.payload.task; // Assuming you want to update the task
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
      })
      .addCase(addTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export const { toggleTodo, deleteTodo, editTodo, addTodo } = todoSlice.actions;
export default todoSlice.reducer;
