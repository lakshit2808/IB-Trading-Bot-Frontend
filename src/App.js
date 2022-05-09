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


function App() {
  const [inactive, setInactive] = useState(false);
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
