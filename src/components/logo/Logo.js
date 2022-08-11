import React from "react"
import classes from "./Logo.module.css";
import { useEffect } from "react";

function Logo({ page }) {

  useEffect(() => {
    if (page === "not-home") {
      const reportCover = document.getElementById("reportCover");
      const reportLines = document.querySelectorAll(".reportLine");
      const soundwaves = document.querySelectorAll(".soundwave");

      reportCover.style.border = "1px solid rgb(24, 74, 140)";
      reportLines.forEach(reportLine => {
        reportLine.style.backgroundColor = "rgb(24, 74, 140)";
      })
      soundwaves.forEach(soundwave => {
        soundwave.style.backgroundColor = "rgb(24, 74, 140)";
      })
    }
  }, [page])

  return (
    <div className="flex items-start">
      <div className={classes.reportCover} id="reportCover">
        <div className={classes.reportLine + " reportLine"}></div>
        <div className={classes.reportLine + " reportLine"}></div>
      </div>
      <div>
        <div className={classes.soundwaveOne + " soundwave"} ></div>
        <div className={classes.soundwaveTwo + " soundwave"}></div>
        <div className={classes.soundwaveThree + " soundwave"}></div>
      </div>
    </div>
  );
}

export default Logo;
