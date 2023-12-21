// TodoList.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, editTodo } from '../redux/slice/TodoSlice';

const TodoList = () => {
  const allTodos = useSelector((state) => state.todoSlice.todos);
  const dispatch = useDispatch();
  const [inputTodo, setInputTodo] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const todos = showCompleted ? allTodos.filter(todo => todo.completed) : allTodos.filter(todo => !todo.completed);

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
    setShowCompleted(false);
  };

  const handleShowCompleted = () => {
    setShowCompleted(true);
  };

  const handleEditTodo = (id) => {
    setEditTodoId(id);
    const todoToEdit = allTodos.find(todo => todo.id === id);
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
    <div className="flex max-w-screen-md h-screen justify-center items-center bg-white px-4">
      <div className="overflow-hidden rounded-xl bg-teal-900 shadow-md duration-200 hover:scale-105 hover:shadow-xl w-full transition">
        <input
          className='text-white mx-4 my-4 px-2 py-2 border rounded'
          type="text"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button className='bg-white text-black px-2 py-2 rounded' onClick={handleAddTodo}>Add Todo</button>

        <div className="mt-4">
          <button className="mr-2" onClick={handleShowAll}>All</button>
          <button onClick={handleShowCompleted}>Active</button>
        </div>

        <ul className="mt-4">
          {todos.map((todo) => (
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
