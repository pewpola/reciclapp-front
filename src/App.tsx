// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Inventary from './pages/inventary';
import Detail from './pages/detail';
import Sell from './pages/sell';
import Login from './pages/login';
import Register from './pages/register';

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/inventary' element={<Inventary/>} />
        <Route path='/detail' element={<Detail/>} />
        <Route path='/sell' element={<Sell/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </Router>
  );
};