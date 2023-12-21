// TodoReducerProvider.jsx
import { useReducer } from "react";
import { TodoReducerContext } from "./TodoReducerContext";

const initialState = [
  { id: 1, task: "belajar react", isDone: true },
  { id: 2, task: "belajar redux", isDone: true },
  { id: 3, task: "belajar context", isDone: false },
  { id: 4, task: "belajar JEST", isDone: false },
];

function reducer(state, action) {
  switch (action.type) {
    case "add_todo": {
      let newTodo = {
        id: new Date().getTime(),
        task: action.inputTodo,
        isDone: false,
      };
      return [newTodo, ...state];
    }
    case "delete_todo": {
      const filterTodos = state.filter((item) => {
        return item.id !== action.id;
      });
      return filterTodos;
    }
    case "toggle_todo_status": {
      const updatedTodos = state.map((item) => {
        if (item.id === action.id) {
          return { ...item, isDone: !item.isDone };
        }
        return item;
      });
      return updatedTodos;
    }
    default:
      return state;
  }
}

function TodoReducerProvider({ children }) {
  const [todos, dispatch] = useReducer(reducer, initialState);

  function addTodo(inputTodo) {
    dispatch({
      type: "add_todo",
      inputTodo,
    });
  }

  function deleteTodo(id) {
    dispatch({
      type: "delete_todo",
      id,
    });
  }

  function toggleTodoStatus(id) {
    dispatch({
      type: "toggle_todo_status",
      id,
    });
  }

  return (
    <TodoReducerContext.Provider value={{ todos, addTodo, deleteTodo, toggleTodoStatus }}>
      {children}
    </TodoReducerContext.Provider>
  );
}

export default TodoReducerProvider;
