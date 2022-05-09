import React, { useEffect, useState } from "react";
import logo from "./assets/logo/interactive-brokers.jpg";
import user from "./assets/user.jpg";

import MenuItem from "./MenuItem";

export const menuItems = [
  {
    name: "Dashboard",
    exact: true,
    to: "/",
    iconClassName: "bi bi-speedometer2"
  },
  {
    name: "Trade Info",
    exact: true,
    to: `/tradeinfo`,
    iconClassName: "bi bi-clipboard-data",
    subMenus: [
      { name: "Position Handling", to: "/tradeinfo/positions" },
      { name: "Portfolio Analytics", to: "/tradeinfo/analytics" },
    ],
  },
  {
    name: "Logout",
    exact: true,
    to: "/logout",
    iconClassName: "bi bi-box-arrow-left"
  },
  // { name: "Design", to: `/design`, iconClassName: "bi bi-vector-pen" },
  // {
  //   name: "Content 2",
  //   exact: true,
  //   to: `/content-2`,
  //   iconClassName: "bi bi-speedometer2",
  //   subMenus: [
  //     { name: "Courses", to: "/content-2/courses" },
  //     { name: "Videos", to: "/content-2/videos" },
  //   ],
  // }
];

const SideMenu = (props) => {
  var mediaWidth = window.matchMedia("(max-width: 650px)")
  let sidebarStatus = false
  if (mediaWidth.matches){
    sidebarStatus = true
  }

  const [inactive, setInactive] = useState(sidebarStatus);
  props.onCollapse(inactive);
  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }
   
  }, [inactive]);

  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="webscript" />
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i class="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i class="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>
      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>

      <div className="side-menu-footer">
        <div className="avatar">
          <img src={user} alt="user" />
        </div>
        <div className="user-info">
          <h5>Developed By:</h5>
          <a style={{color: 'white'}} target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/lakshit2808" >Lakshit</a>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
