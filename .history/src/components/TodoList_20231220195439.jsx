import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodosAsync, addTodo, toggleTodo, deleteTodo, editTodo} from '../redux/slice/TodoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.todoSlice.todos);
  const status = useSelector((state) => state.todoSlice.status);
  const [inputTodo, setInputTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodosAsync());
    }
  }, [status, dispatch]);
  console.log("Status:", status);
  console.log("All Todos:", allTodos);
  const filteredTodos = allTodos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'completed') {
      return todo.completed;
    } else {
      return true; // Menampilkan semua jika filter 'all'
    }
  });

  const handleAddTodo = () => {
    if (inputTodo.trim() !== '') {
      dispatch(addTodo(inputTodo));
      setInputTodo('');
    }
  };

  const handleToggleTodoStatus = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleShowAll = () => {
    setFilter('all');
  };

  const handleShowActive = () => {
    setFilter('active');
  };

  const handleShowCompleted = () => {
    setFilter('completed');
  };

  const handleEditTodo = (id) => {
    setEditTodoId(id);
    const todoToEdit = allTodos.find((todo) => todo.id === id);
    setEditedText(todoToEdit.text);
  };

  const handleSaveEdit = () => {
    dispatch(editTodo({ id: editTodoId, text: editedText }));
    setEditTodoId(null);
    setEditedText('');
  };

  const handleCancelEdit = () => {
    setEditTodoId(null);
    setEditedText('');
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-white px-4">
      <div className="max-w-screen-md overflow-hidden rounded-xl bg-teal-900 shadow-md duration-200 hover:scale-105 hover:shadow-xl w-full transition px-4 py-4">
        <input
          className='text-white mx-4 my-4 px-2 py-2 border rounded'
          type="text"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button className='bg-white text-black px-2 py-2 rounded' onClick={handleAddTodo}>Add Todo</button>

        <div className="mt-4">
          <button className="mr-2" onClick={handleShowAll}>All</button>
          <button className="mr-2" onClick={handleShowActive}>Active</button>
          <button onClick={handleShowCompleted}>Completed</button>
        </div>

        <ul className="mt-4">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between">
              {editTodoId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <div className="flex">
                    <button className='bg-white text-black px-2 py-1 mx-2 my-2 rounded' onClick={handleSaveEdit}>Save</button>
                    <button className='bg-white text-black px-2 py-1 mx-2 my-2 rounded' onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <span className={`text-lg ${todo.completed ? 'line-through' : ''}`}>
                    {todo.text}
                  </span>
                  <div className="flex">
                    <button className='bg-white text-black px-2 py-1 mx-2 my-2 rounded' onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
                    <button className='bg-white text-black px-2 py-1 mx-2 my-2 rounded' onClick={() => handleToggleTodoStatus(todo.id)}>
                      {todo.completed ? "✅" : "☐"}
                    </button>
                    <button className='bg-white text-black px-2 py-1 mx-2 my-2 rounded' onClick={() => handleEditTodo(todo.id)}>Edit</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
