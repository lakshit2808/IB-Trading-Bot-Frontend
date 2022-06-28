import React, {useState} from 'react'
import IbFrontend from './IbFrontend';
import PositionHandling from './TradeInfo/PositionHandling';
import PortfolioAnalytics from './TradeInfo/PortfolioAnalytics';
import SideMenu, { menuItems } from "./SideMenu";
import {Route} from "react-router-dom";



const Home = ({updateUser}) => {

    const [inactive, setInactive] = useState(false);

  return (
    <div>
    <SideMenu
    updateUser={updateUser}
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

          {menu.name === "Position Handling" ? (
            <div className="content">
            <PositionHandling/>
            </div>
          ) : (
            <div className="content"></div>
          )}

          {menu.name === "Portfolio Analytics" ? (
            <div className="content">
            <PortfolioAnalytics/>
            </div>
          ) : (
            <div className="content"></div>
          )}

        </Route>
        {menu.subMenus && menu.subMenus.length > 0
          ? menu.subMenus.map((subMenu, i) => (
              <Route key={subMenu.name} path={subMenu.to}>

              {/*subMenu.name === "Position Handling" ? (
                <div className="content">
                <PositionHandling/>
                </div>
              ) : (
                <div className="content"></div>
              )*/}
              </Route>
            ))
          : null}
      </>
    ))}
  
  </div>    

    </div>
  )
}

export default Home
