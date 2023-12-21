// App.js
import TodoList from './components/TodoList';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import CardTailwind from "./components/CardTailwind"
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TodoList />
        <CardTailwind />
      </div>
    </Provider>
  );
};

export default App;
