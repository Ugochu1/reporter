import React from "react"
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useState, useEffect } from "react";
import "../../transitions.css";
import Logo from "../../components/logo/Logo";

function MainNavigation({ transitionState, page = "not-home" }) {
  const [tabOpen, setTabOpen] = useState(false);

  useEffect(() => {
    const myHeader = document.querySelector(".myHeader");
    let lastValue = myHeader.classList.length - 1;
    if (page === "home") {
      if (
        transitionState === "to-blue" &&
        myHeader.classList[lastValue] !== "to-blue"
      ) {
        myHeader.classList.add(transitionState);
      } else if (transitionState === "none") {
        myHeader.classList.remove("to-blue");
      }
    } else {
      myHeader.style.color = "rgb(24, 74, 140)";
      myHeader.style.backgroundColor = "white";
      // myHeader.style.boxShadow = "0 1px 4px gray";
      myHeader.style.position = "static";
    }
  }, [page, transitionState]);

  useEffect(() => {
    if (page === "not-home") {
      const navspans = document.querySelectorAll(".nav");
      navspans.forEach((span) => {
        span.style.backgroundColor = "rgb(24, 74, 140)";
      });
    }
  }, [page, tabOpen]);

  function toggleTab() {
    let el = document.getElementById("dropdown");
    el.style.top = tabOpen ? "-250px" : "65px";
    setTabOpen(!tabOpen);
  }

  return (
    <div
      className={
        classes.header +
        " flex items-center py-2 px-3 md:px-5 justify-between md:justify-start myHeader"
      }
    >
      <div>
        <h2 className={classes.logo + " text-lg md:text-xl"}>
          <Logo page={page} />
          reporter
        </h2>
      </div>
      <div className={classes.navbar}>
        <div className="hidden md:block">
          <ul className="flex">
            <li className={classes.link}>
              <Link to="/">Home</Link>
            </li>
            <li className={classes.link}>
              <Link to="/reports">Reports</Link>
            </li>
            <li className={classes.link}>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <div className="block md:hidden">
          <div onClick={toggleTab}>
            {tabOpen === false ? (
              <div>
                <span className={classes.navspan + " nav"}></span>
                <span className={classes.navspan + " nav"}></span>
                <span className={classes.navspan + " nav"}></span>
              </div>
            ) : (
              <div>Close</div>
            )}
          </div>
        </div>
      </div>
      <div className={"block md:hidden " + classes.dropdown} id="dropdown">
        <ul className="" onClick={toggleTab}>
          <Link to="/">
            <li className={classes.link}>Home</li>
          </Link>
          <Link to="/reports">
            <li className={classes.link}>Reports</li>
          </Link>
          <Link to="/profile">
            <li className={classes.link}>Profile</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default MainNavigation;
