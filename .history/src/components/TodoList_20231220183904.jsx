import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from '../redux/slice/TodoSlice';

const TodoList = () => {
    const allTodos = useSelector((state) => state.todoSlice.todos);
    const dispatch = useDispatch();
    const [inputTodo, setInputTodo] = useState('');
    const [showCompleted, setShowCompleted] = useState(false);

    const todos = showCompleted ? allTodos.filter(todo => todo.completed) : allTodos;
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
      
      return (
        <div className="flex w-screen h-screen justify-center items-center bg-white px-4">
          <div className="max-w-screen-md overflow-hidden rounded-xl bg-teal-900 shadow-md duration-200 hover:scale-105 hover:shadow-xl w-full transition">
            <input
              className='text-white mx-4 my-4 px-2 py-2 border rounded'
              type="text"
              value={inputTodo}
              onChange={(e) => setInputTodo(e.target.value)}
            />
            <button className='bg-white text-black px-2 py-2 rounded' onClick={handleAddTodo}>Add Todo</button>
    
            <div className="mt-4">
              <button className="mr-2" onClick={handleShowAll}>All</button>
              <button onClick={handleShowCompleted}>Completed</button>
            </div>
    
            <ul className="mt-4">
              {todos.map((todo) => (
                <li key={todo.id} className="flex items-center justify-between">
                  <span className={`text-lg ${todo.completed ? 'line-through' : ''}`}>
                    {todo.text}
                  </span>
                  <div className="flex">
                    <button className='bg-white text-black px-2 py-1 mx-2 my-2 rounded' onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
                    <button className='bg-white text-black px-2 py-1 mx-2 my-2 rounded' onClick={() => handleToggleTodoStatus(todo.id)}>
                      {todo.completed ? "✅" : "☐"}
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