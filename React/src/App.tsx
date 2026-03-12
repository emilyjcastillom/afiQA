import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Fanatic from './pages/Fanatic'
import Login from './pages/Login'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/fanatic" element={<Fanatic />} />
    </Routes>
  );
}

export default App
