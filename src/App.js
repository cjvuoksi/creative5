import './App.css';
import icon from './flag.svg'; 
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import Quiz from "./pages/quiz";
import Settings from "./pages/settings";
import About from "./pages/about";
import None from "./pages/none";
import Home from "./pages/home";

function App() {
  const [settings, setSettings] = useState({}); 

  const parse = (string) => {
    if (string === 'true') return true;
    else return false; 
  }

  const signIn = () => {
    if (getCookie('id')) {
      setSettings([
        {'1s': parse(getCookie('1s'))},
        {'2s': parse(getCookie('2s'))},
        {'3s': parse(getCookie('3s'))},
        {'1p': parse(getCookie('1p'))},
        {'2p': parse(getCookie('2p'))},
        {'3p': parse(getCookie('3p'))},
        {'present': parse(getCookie('present'))},
        {'past': parse(getCookie('past'))},
        {'conditional': parse(getCookie('cond'))},
        {'passives': parse(getCookie('pass'))},
        {'participles': parse(getCookie('part'))}
      ])
    }
    else {
      setCookie(
        ['1s','2s','3s','1p','2p','3p','present','past','cond','pass','part'],[true,true,true,true,true,true,true,true,true,true,true]
      )
      signIn(); 
    }

  }

  useEffect(signIn, []); 

  function setCookie(name, val) {
    let days = 365; 
    const d = new Date();    //   hr min s ms
    d.setTime(d.getTime() + (days*24*60*60*1000));  
    console.log("date: " + d.toUTCString()); 
    document.cookie = "id=true; " + "expires=" + d.toUTCString() + "; path=/"
    console.log(document.cookie)
    for(let i = 0; i < name.length; i++) {
      document.cookie = name[i] + "=" + val[i] + "; " + "expires=" + d.toUTCString() + "; path=/"
    }
  }

  function getCookie(attribute) {
    let name = attribute + "=";
    let cookieText = decodeURIComponent(document.cookie).split(';');
    for(let item of cookieText) {
      let index = item.indexOf(attribute); 
      if (index >= 0) {
        return item.substring(index + name.length); 
      }
    }
    return "";
  }

  return (
    <Router>
      <nav className="navBar">
        <NavLink to="/" className="icon-container"><img className="icon" src={icon}></img></NavLink>
        <NavLink to="/quiz">Quiz</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/quiz" element={<Quiz settings={settings} signIn={signIn}/>}/>        
        <Route path="/settings" element={<Settings settings={settings} setSettings={setSettings} signIn={signIn} setCookie={setCookie}/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="*" element={<None/> }></Route>
      </Routes>
      <div className="footer">
        <a href="https://github.com/cjvuoksi/creative5">github repo</a>
      </div>
    </Router>
  );
}

export default App;
