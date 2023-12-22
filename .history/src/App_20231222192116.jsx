// import TodoList from './components/TodoList';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
// import ResponsiveTailwind from './components/ResponsiveTailwind';
import ExampleComponent from './components/ContohFlex';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <ExampleComponent />
      </div>
    </Provider>
  );
};

export default App;
