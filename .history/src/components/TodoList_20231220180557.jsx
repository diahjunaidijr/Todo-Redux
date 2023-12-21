import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from '../redux/slice/TodoSlice';

const TodoList = () => {
  // TodoList.js
  const todos = useSelector((state) => state.todoSlice.todos);

  const dispatch = useDispatch();
  const [inputTodo, setInputTodo] = useState('');

  const handleAddTodo = () => {
    if (inputTodo.trim() !== '') {
      dispatch(addTodo(inputTodo));
      setInputTodo('');
    }
  };

  const handleToggleTodoStatus = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div className="flex max-h-80 items-center justify-center bg-white px-4">
      <div className="max-w-sm overflow-hidden rounded-xl bg-teal-900 shadow-md duration-200 hover:scale-105 hover:shadow-xl px-4 py-4">
        <input
          className='mx-4 my-4 px-2 py-2 border rounded'
          type="text"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button className='bg-white text-black px-2 py-2 rounded' onClick={handleAddTodo}>Add Todo</button>

        <ul className="mt-4">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between">
              <span className={`text-lg ${todo.isDone ? 'line-through' : ''}`}>
                {todo.task}
              </span>
              <div className="flex">
                <button className='bg-white text-black px-2 py-1 mx-2 my-2 rounded' onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button className='bg-white text-black px-2 py-1 mx-2 my-2 rounded' onClick={() => handleToggleTodoStatus(todo.id)}>
                  {todo.isDone ? "✅" : "☐"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
