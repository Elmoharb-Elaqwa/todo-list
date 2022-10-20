import 'bootstrap/dist/css/bootstrap.min.css';
import NewUser from './Components/NewUser';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import { token } from './Components/Todos';
import Todos from './Components/Todos';

import First from './Components/First';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="allTodos" element={<Todos />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<NewUser />} />
      </Routes>
    </div>
  );
}

export default App;
