import './App.css';
import './App2.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import SideMenu, { menuItems } from "./components/SideMenu";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import IbFrontend from './components/IbFrontend';
import TradeHistory from './components/TradeInfo/TradeHistory';
import PositionHandling from './components/TradeInfo/PositionHandling';
import PortfolioAnalytics from './components/TradeInfo/PortfolioAnalytics';
import LogIn from './components/LogIn/LogIn';
import UserStore from './components/LogIn/UserStore';
import SubmitButton from './components/LogIn/SubmitButton';
import {observer} from 'mobx-react';


function App() {
  const [inactive, setInactive] = useState(false);

  async function componentDidMount() {

    try{
      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      let result = await res.json();
      if (result && result.success){
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
        UserStore.loading = false;
      }
      else{
        UserStore.isLoggedIn = false;
        UserStore.loading = false;
      }
    }
    catch{
      UserStore.isLoggedIn = false;
      UserStore.loading = false;
    }
  }

  componentDidMount();

  async function doLogout() {

    try{
      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      let result = await res.json();
      if (result && result.success){
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }
    }
    catch(e){
      console.log(e);
    }
  }
  doLogout();

  return (
    <div className="App">

    {UserStore.loading ? (
      <div className="content">
        <h1>Loading, Please Wait...</h1>
      </div>
    ) : (
      UserStore.isLoggedIn ? (  
      <Router>
        <SideMenu
          onCollapse={(inactive) => {
            console.log(inactive);
            setInactive(inactive);
          }}
        />

        <div className={`container ${inactive ? "inactive" : ""}`}>
          {menuItems.map((menu, index) => (
            <>
              <Route key={menu.name} exact={menu.exact} path={menu.to}>
                {menu.name === "Dashboard" ? (
                  <div className="content">
                  <SubmitButton text={"Log Out "} disabled = {false} onClick = {() => this.doLogout()}/>
                  <IbFrontend/>
                  </div>
                ) : (
                  <div className="content"></div>
                )}

                {menu.name === "Trade Info" ? (
                  <div className="content">
                  <TradeHistory/>
                  </div>
                ) : (
                  <div className="content"></div>
                )}

                {menu.name === "Logout" ? (
                  <div className="content">
                  <LogIn/>
                  </div>
                ) : (
                  <div className="content"></div>
                )}

              </Route>
              {menu.subMenus && menu.subMenus.length > 0
                ? menu.subMenus.map((subMenu, i) => (
                    <Route key={subMenu.name} path={subMenu.to}>

                    {subMenu.name === "Position Handling" ? (
                      <div className="content">
                      <PositionHandling/>
                      </div>
                    ) : (
                      <div className="content"></div>
                    )}

                    {subMenu.name === "Portfolio Analytics" ? (
                      <div className="content">
                      <PortfolioAnalytics/>
                      </div>
                    ) : (
                      <div className="content"></div>
                    )}

                    </Route>
                  ))
                : null}
            </>
          ))}
        
        </div>
      </Router>
      ):(
        <div>
          <LogIn/>
        </div>
      ))}
    </div>
  );
}

export default observer(App);
