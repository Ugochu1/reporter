import React from "react"
import classes from "./HomeFooter.module.css";

function HomeFooter() {
  return (
    <div className={"w-full flex items-center justify-center " + classes.homefooter}>
      <div>&copy; Reporter, 2022. All rights reserved.</div>
    </div>
  );
}

export default HomeFooter;
