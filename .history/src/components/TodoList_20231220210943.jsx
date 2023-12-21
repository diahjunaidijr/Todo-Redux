// TodoList.jsx
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodosAsync, addTodo, toggleTodo, deleteTodo, editTodo } from '../redux/slice/TodoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);
  const [inputTodo, setInputTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodosAsync());
    }
  }, [status, dispatch]);

  const filteredTodos = allTodos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'completed') {
      return todo.completed;
    } else {
      return true;
    }
  });

  const handleAddTodo = () => {
    if (inputTodo.trim() !== '') {
      dispatch(addTodoAsync(inputTodo));
      setInputTodo('');
    }
  };

  // ... (sisa kode untuk menangani toggle, showAll, showActive, showCompleted, edit, dll.)

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-white px-4">
      <div className="max-w-screen-md overflow-hidden rounded-xl bg-teal-900 shadow-md duration-200 hover:scale-105 hover:shadow-xl w-full transition px-4 py-4">
        {/* ... (kode input dan tombol Add Todo) */}
        <div className="mt-4">
          <button className="mr-2" onClick={handleShowAll}>All</button>
          <button className="mr-2" onClick={handleShowActive}>Active</button>
          <button onClick={handleShowCompleted}>Completed</button>
        </div>
        <ul className="mt-4">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between">
              {/* ... (kode untuk menampilkan todo dan aksi lainnya) */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
