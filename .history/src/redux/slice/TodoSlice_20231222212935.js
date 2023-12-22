import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodosAsync = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://6582da8502f747c8367a60e5.mockapi.io/schedule/todo');
  const data = await response.json();
  return data;
});

export const addTodoAsync = createAsyncThunk('todos/addTodo', async (task) => {
  const createdAt = new Date().toISOString();
  const response = await fetch('https://6582da8502f747c8367a60e5.mockapi.io/schedule/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      task: task, 
      completed: false,
      createdAt: createdAt,
    }),
  });

  const data = await response.json();
  return { ...data, createdAt }; // Mengembalikan todo dengan createdAt yang dihasilkan lokal
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
  const createdAt = new Date().toISOString();
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
    createdAt: createdAt,
  });

  return updatedTodo; // Mengembalikan todo yang telah di-edit
});

const initialState = {
  todos: [],
  status: 'idle',
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  /*  pembaruan keadaan secara langsung (lokal) dan tanpa menunggu respons dari api */
  reducers: {
    addTodo: (state, action) => {
      const { id, task, completed, createdAt } = action.payload;
      state.todos.push({ id, task, completed, createdAt });
    },
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
      const { id, task, createdAt } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.task = task;
        todo.createdAt = createdAt; // Update createdAt saat mengedit
      }
    },
  },
  /** Penggunaan CreateAsyncThunk disarankan untuk mengurangi boilerplate*/
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
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        // Menghapus todo dari state berdasarkan ID yang dikembalikan dari API
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        // Mengganti status completed todo di state berdasarkan hasil dari API
        const updatedTodo = action.payload;
        const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      })
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        // Mengganti task todo di state berdasarkan hasil dari API
        const updatedTodo = action.payload;
        const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      });
  },
});


export const { toggleTodo, deleteTodo, editTodo, addTodo } = todoSlice.actions;
export default todoSlice.reducer;
