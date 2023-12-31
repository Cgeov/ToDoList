import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Task from './pages/task/task';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Task></Task>}></Route>
          <Route path='/task' element={<Task></Task>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
