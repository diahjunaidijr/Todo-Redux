import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTodosAsync,
  addTodoAsync,
  toggleTodoAsync,
  deleteTodoAsync,
  editTodoAsync,
} from '../redux/slice/TodoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.todoSlice.todos);
  const status = useSelector((state) => state.todoSlice.status);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [updateTime, setUpdateTime] = useState({});
  const [createTime, setCreateTime] = useState(null);
  
  // Retrieve data from local storage on component mount
  useEffect(() => {
    const storedUpdateTime = localStorage.getItem('updateTime');
    setUpdateTime(storedUpdateTime ? JSON.parse(storedUpdateTime) : {});
  
    const storedCreateTime = localStorage.getItem('createTime');
    setCreateTime(storedCreateTime ? new Date(storedCreateTime) : null);
  }, []);
  
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodosAsync());
    }
  
    const storedUpdateTime = localStorage.getItem('updateTime');
    setUpdateTime(storedUpdateTime ? JSON.parse(storedUpdateTime) : {});
  
    const storedCreateTime = localStorage.getItem('createTime');
    setCreateTime(storedCreateTime ? new Date(storedCreateTime) : null);
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
    if (inputValue.trim() !== '') {
      const isEditing = editTodoId !== null;
  
      dispatch(addTodoAsync(inputValue))
        .then(() => {
          setInputValue('');
          if (isEditing) {
            setUpdateTime((prevUpdateTime) => {
              const updatedTime = {
                ...prevUpdateTime,
                [editTodoId]: new Date().toISOString(), // Store as ISO string
              };
              localStorage.setItem('updateTime', JSON.stringify(updatedTime));
              return updatedTime;
            });
          } else {
            const newCreateTime = new Date(); // Store as Date object
            setCreateTime(newCreateTime);
            localStorage.setItem('createTime', newCreateTime.toISOString()); // Store as ISO string
          }
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
    const editedTodo = allTodos.find((todo) => todo.id === editTodoId);
    if (editedTodo) {
      dispatch(editTodoAsync({ id: editTodoId, task: editedText }))
        .then(() => {
          setEditTodoId(null);
          setEditedText('');
          setUpdateTime((prevUpdateTime) => {
            const updatedTime = {
              ...prevUpdateTime,
              [editTodoId]: new Date().toISOString(), // Store as ISO string
            };
            localStorage.setItem('updateTime', JSON.stringify(updatedTime));
            return updatedTime;
          });
        })
        .catch((error) => {
          console.error('Error editing todo:', error);
        });
    }
  };
  
  
  
  const handleCancelEdit = () => {
    setEditTodoId(null);
    setEditedText('');
  };

  return (
<div className=" min-h-screen overflow-x-hidden">
  <div className="max-w-full lg:max-w-lg w-full bg-white rounded-xl shadow-md overflow-hidden mx-auto my-4 md:my-8 lg:my-12">
    <div className="overflow-hidden rounded-xl bg-white shadow-md">

        <input
          className="text-white mx-4 my-4 px-2 py-2 border rounded"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-white text-black px-2 py-2 rounded"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>

        <div className="mt-4 mx-4">
          <button className="mr-2" onClick={handleShowAll}>
            All
          </button>
          <button className="mr-2" onClick={handleShowActive}>
            Active
          </button>
          <button onClick={handleShowCompleted}>Completed</button>
        </div>

      <ul className="mt-4 ">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-left justify-items-stretch text-black mx-4 my-4 px-4 py-4 border-double border-4 border-white-500 lg:flex-row md:flex-col"
          >
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <div className="flex">
                  <button
                    className="bg-white text-black px-2 py-1 mx-2 my-2 rounded"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="bg-white text-black px-2 py-1 mx-2 my-2 rounded"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span
                  className={`text-lg py-4 px-4 ${
                    todo.completed ? 'line-through' : ''
                  }`}
                >
                  {todo.task}
                </span>
                <span className="text-sm text-gray-400">
                  {updateTime && updateTime[todo.id]
                    ? 'UpdatedAt: '
                    : createTime
                    ? 'CreatedAt: '
                    : ''}
                  {createTime
                    ? new Date(createTime).toLocaleString('en-GB', {
                        dateStyle: 'full',
                        timeStyle: 'long',
                        timeZone: 'Asia/Jakarta',
                      })
                    : ''}
                </span>

                <div className="flex">
                  <button
                    className="bg-white text-black px-2 py-1 mx-2 my-2 rounded"
                    onClick={() => dispatch(deleteTodoAsync(todo.id))}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-white text-black px-2 py-1 mx-2 my-2 rounded"
                    onClick={() => handleToggleTodoStatus(todo.id)}
                  >
                    {todo.completed ? '✅' : '☐'}
                  </button>
                  <button
                    className="bg-white text-black px-2 py-1 mx-2 my-2 rounded"
                    onClick={() => handleEditTodo(todo.id)}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

  );
};

export default TodoList;
