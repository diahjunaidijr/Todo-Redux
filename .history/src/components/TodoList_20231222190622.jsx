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
    <>
    <div className="inline-flex items-baseline bg-white">
      <h1 className='text-black'>Halo</h1>
    </div>
    </>
  );
};

export default TodoList;
