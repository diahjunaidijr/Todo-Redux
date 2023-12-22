import './App.css'
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import TodoList from './components/TodoList';
// import CardTailwind from './components/CardTailwind';
// import ResponsiveTailwind from './components/ResponsiveTailwind';
// import ExampleComponent from './components/ContohFlex';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TodoList/>
      </div>
    </Provider>
  );
};

export default App;
