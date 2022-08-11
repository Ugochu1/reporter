import React from "react"
import errorImage from "../../icons/warning.png";
import classes from "./ErrorDisplay.module.css";

function ErrorDisplay({ message }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={errorImage} alt="error" className={classes.errorImage} />
      <div className={classes.errorMessage}>{message}</div>
    </div>
  );
}

export default ErrorDisplay;
