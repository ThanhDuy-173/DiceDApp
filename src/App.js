import {useEffect} from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import User from "./pages/User";
import DiceLocal from "./pages/DiceLocal";
import DiceOnline from "./pages/DiceOnline";
import './App.css';

function App() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/play/local" element={<DiceLocal />} />
            <Route path="/play/online" element={<DiceOnline />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="user" element={<User />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
