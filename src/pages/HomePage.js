import React from "react";
import classes from "./HomePage.module.css";
import "../transitions.css";
import { useEffect, useState } from "react";
import firstImage from "../icons/sale-report.png";
import secondImage from "../icons/dashboard.png";
import thirdImage from "../icons/team.png";
import { Link } from "react-router-dom";
import HomeFooter from "../layouts/footers/HomeFooter";
import MainNavigation from "../layouts/navigation/MainNavigation";

function HomePage() {
  const [transitionState, setTransitionState] = useState(null);

  useEffect(() => {
    // for the sliding transitions.
    const slideElements = document.querySelectorAll(".slideRight, .slideLeft");
    const slideonscroll = new IntersectionObserver(
      (entries, slideonscroll) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setTransitionState("to-blue");
          entry.target.classList.add("slide-active");
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -150px 0px",
        root: null,
      }
    );

    slideElements.forEach((slideElement) => {
      slideonscroll.observe(slideElement);
    });

    // slideUp Element
    const slideUpElements = document.querySelectorAll(".slideUp");
    const slideuponscroll = new IntersectionObserver(
      (entries, slideuponscroll) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("slide-active");
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -150px 0px",
        root: null,
      }
    );

    slideUpElements.forEach((slideElement) => {
      slideuponscroll.observe(slideElement);
    });

    // for the fading transitions.
    const fadeElements = document.querySelectorAll(".fadeIn");
    const fadeonscroll = new IntersectionObserver(
      (entries, fadeonscroll) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("fadeIn-active");
          fadeonscroll.unobserve(entry.target);
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -150px 0px",
        root: null,
      }
    );

    fadeElements.forEach((fadeElement) => {
      fadeonscroll.observe(fadeElement);
    });

    // for color change
    const colorChangeElements = document.querySelectorAll(".firstWatch");
    const colorchangeonscroll = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (entry.boundingClientRect.top > 0) setTransitionState("none");
            return;
          }
          if (entry.target.id === "firstWatch") {
            setTransitionState("to-blue");
          }
        });
      },
      {
        threshold: 0,
        root: null,
        rootMargin: "0px 0px -600px 0px",
      }
    );

    colorChangeElements.forEach((colorChangeElement) => {
      colorchangeonscroll.observe(colorChangeElement);
    });
  }, []);

  return (
    <div className="overflow-x-hidden">
      <MainNavigation transitionState={transitionState} page={"home"} />
      <div
        className={
          classes.writeUp + " flex items-center flex-col justify-center"
        }
      >
        <h1
          className={
            "md:text-7xl text-5xl fadeIn firstWatch " + classes.writeUpHeader
          }
          id="firstWatch"
        >
          Keeping Tabs <div>has never been this easy.</div>
        </h1>

        <h3 className={classes.writeUpBody + " slideUp md:text-2xl text-lg"}>
          A fast and easy way for you to create, visualize and export your
          reports for use.
        </h3>
      </div>
      <div className="w-full">
        <div
          className={"w-full bg-blue-100 " + classes.myboxes}
          id="secondWatch"
        >
          <div>
            <img src={firstImage} alt="Number 1" height={150} width={150} />
          </div>
          <div className="mt-5 flex flex-col items-center">
            <div
              className={classes.boxWriteUp + " text-xl md:text-2xl slideRight"}
            >
              Create reports in very simple and
              <div>understandable steps. To get</div>
              started, click on the button below
            </div>
            <Link to="/reports" className={classes.createButton + " fadeIn"}>
              Create Report
            </Link>
          </div>
        </div>
        <div className={"w-full bg-orange-100 " + classes.myboxes}>
          <div>
            <img src={secondImage} alt="Number 2" height={150} width={150} />
          </div>
          <div className="mt-5 flex flex-col items-center">
            <div
              className={classes.boxWriteUp + " slideLeft text-xl md:text-2xl"}
            >
              Get visualized analyses{" "}
              <div>of your uploaded reports and export to</div>
              your preferred presentation software.
            </div>
            <Link to="/profile" className={classes.analysisButton + " fadeIn"}>
              Get Analysis
            </Link>
          </div>
        </div>
        <div className={"w-full bg-indigo-100 " + classes.myboxes}>
          <div>
            <img src={thirdImage} alt="Number 3" height={150} width={150} />
          </div>
          <div className="mt-5 flex flex-col items-center">
            <div
              className={classes.boxWriteUp + " slideRight text-xl md:text-2xl"}
            >
              Explore the power of teamwork.{" "}
              <div>Invite colleagues to work on reports.</div>
            </div>
            <Link to="/profile" className={classes.createButton + " fadeIn"}>
              Go To Reports
            </Link>
          </div>
        </div>
      </div>
      <div>
        <HomeFooter />
      </div>
    </div>
  );
}

export default HomePage;
