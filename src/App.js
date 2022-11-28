import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import Quiz from "./pages/quiz";
import Settings from "./pages/settings";
import About from "./pages/about";
import None from "./pages/none"

function App() {
  const [settings, setSettings] = useState({})
  
  function setCookie() {

  }

  function getCookie(name) {

  }

  function isCookie() {
    
  }


  return (
    <Router>
      <nav className="navBar">
        <NavLink to="/">Quiz</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Quiz/>}/>        
        <Route path="/settings" element={<Settings/>}>Settings</Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="*" element={<None/> }></Route>
      </Routes>
    </Router>
  );
}

export default App;
