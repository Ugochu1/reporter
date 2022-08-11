import React from "react"
import classes from "./MessageBox.module.css";

function MessageBox({ type, message }) {
  return (
    <div className={classes.mainBox}>
      <div className={classes.messageType + " text-xs"}>{type}</div>
      <div className={classes.message + " text-sm"}>{message}</div>
    </div>
  );
}

export default MessageBox;
