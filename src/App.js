import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Task from './pages/task/task';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home></Home>}></Route>
          <Route path='/task' element={<Task></Task>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
