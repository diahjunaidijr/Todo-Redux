// App.js
import TodoList from './components/TodoList';
import { Provider } from 'react-redux';
import store from '../src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
