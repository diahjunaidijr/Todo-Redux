// import TodoList from './components/TodoList';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import ResponsiveTailwind from './components/ResponsiveTailwind';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <ResponsiveTailwind />
      </div>
    </Provider>
  );
};

export default App;
