
import { useState } from 'react';
import './App.css';
import { Home } from './screens/Home/Home';
import { Login } from './screens/Login/Login';
import { Main } from './screens/Main/Main';

function App() {
  const [currentPage, setCurrentPage] = useState('main');

  return (
    <div>
    {currentPage === 'home' && <Home />}
    {currentPage === 'login' && <Login />}
    {currentPage === 'main' && <Main />}
  </div>
  );
}

export default App;