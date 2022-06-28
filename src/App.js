import './App.css';
import './App2.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import LogIn from './components/LogIn/LogIn';
import Home from './components/Home';

function App() {
  const [ user, setLoginUser] = useState({})

  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem('MyUser')))
  }, [])

  const updateUser = (user) => {
    localStorage.setItem('MyUser', JSON.stringify(user))
    setLoginUser(user)
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
          {
            user && user._id ? <Home updateUser={updateUser} /> : <LogIn updateUser={updateUser}/>
          }
        </Route>
        <Route path="/login">
          <LogIn updateUser={updateUser}/>
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
