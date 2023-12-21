import './App.css'
import { useContext, useState } from 'react';
import { TodoReducerContext } from './TodoReducerContext';

function App() {

  const [inputTodo, setInputTodo] = useState("");
  const { todos, addTodo, deleteTodo, toggleTodoStatus } = useContext(TodoReducerContext);

  const handleAddTodo = () => {
    addTodo(inputTodo);
    setInputTodo("");
  };

  const handleToggleTodoStatus = (id) => {
    toggleTodoStatus(id);
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-white px-4">
      <div className="max-w-sm overflow-hidden rounded-xl bg-black shadow-md duration-200 hover:scale-105 hover:shadow-xl px-4 py-4">
      <input
      className='mx-4 my-4 px-2 py-2'
        type="text"
        value={inputTodo}
        onChange={(e) => setInputTodo(e.target.value)
        }
      />
      <button className= 'bg-white text-black px-2 py-2' onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
              {todo.task}
            </span>
            <button className= 'bg-white text-black px-2 py-2 mx-2 my-2' onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button className= 'bg-white text-black px-2 py-2 mx-2 my-2' onClick={() => handleToggleTodoStatus(todo.id)}>
              {todo.isDone ? "✅" : "☐"}
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
    </>
  )
}

export default App