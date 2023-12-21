import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodosAsync, addTodoAsync, toggleTodoAsync, deleteTodoAsync, editTodoAsync,  } from '../redux/slice/TodoSlice';
// import { format } from 'date-fns';
// import moment from 'moment';

const TodoList = () => {
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.todoSlice.todos);
  const status = useSelector((state) => state.todoSlice.status);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodosAsync());
    }
  }, [status, dispatch]);

  // const convertToLocalTime = (utcTime) => {
  //   const localTime = new Intl.DateTimeFormat('en-GB', {
  //     dateStyle: 'full',
  //     timeStyle: 'long',
  //     timeZone: 'Asia/Jakarta',
  //   }).format(new Date(utcTime));
  
  //   return localTime;
  // };
  const convertEpochToISO8601 = (epochMillis) => {
    const date = new Date(epochMillis);
    return date.toISOString();
  };

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
    if (inputValue.trim() !== '') {
      const currentEpochMillis = new Date().getTime(); // Mendapatkan waktu epoch saat ini dalam milidetik
      const createdAtISO8601 = convertEpochToISO8601(currentEpochMillis);
      dispatch(addTodoAsync({ task: inputValue, createdAt: createdAtISO8601 }))
        .then(() => {
          setInputValue('');
        })
        .catch((error) => {
          console.error('Error adding todo:', error);
        });
    }
  };
  

  const handleToggleTodoStatus = (id) => {
    dispatch(toggleTodoAsync(id));
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
    setEditedText(todoToEdit.task);
  };

  const handleSaveEdit = () => {
    dispatch(editTodoAsync({ id: editTodoId, task: editedText }))
      .then(() => {
        setEditTodoId(null);
        setEditedText('');
      })
      .catch((error) => {
        console.error('Error editing todo:', error);
      });
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
                    {todo.task}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    Created at: 
                    {convertToLocalTime(todo.createdAt)}
                  </span>     
                  <div className="flex">
                  <button className='bg-white text-black px-2 py-1 mx-2 my-2 rounded' onClick={() => dispatch(deleteTodoAsync(todo.id))}>Delete</button>
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
