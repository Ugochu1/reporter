import React from "react"
import classes from "./Controls.module.css";

function Controls({itemCount, addKeyValue, addTable}) {

  function getitemCount() {
    if (itemCount === 0 || itemCount > 1) {
      return itemCount.toString() + " items";
    } else {
      return itemCount.toString() + " item";
    }
  }

  return (
    <div className={classes.fullBody + " flex"}>
      <div className="w-3/5 flex flex-col items-center justify-center">
        {/* <div className={classes.addFont + " text-sm"}>Main controls</div> */}
        <div
          className={
            classes.mainControls + " w-full md:flex justify-center items-center p-2"
          }
        >
          <button
            className={
              classes.addButton +
              " px-7 py-2 md:px-12 md:py-4 w-full md:w-1/3 md:mr-2"
            }
            onClick={addKeyValue}
          >
            Add Key/Value
          </button>
          <button
            className={
              classes.addButton + " px-7 py-2 md:px-16 md:py-4 w-full md:w-1/3"
            }
            onClick={addTable}
          >
            Add Table
          </button>
        </div>
      </div>
      <div className="w-2/5 flex flex-col items-center justify-center">
        {/* <div className={classes.addFont + " text-sm"}>Navigator</div> */}
        <div
          className={
            classes.navigator +
            " flex flex-col md:flex-row justify-center items-center"
          }
        >
          <div className={classes.addFont + " text-lg text-blue-700 md:mr-2"}>
            {getitemCount()}
          </div>
          <button className={classes.addButton + " px-3 py-1 md:ml-4"}>
            Go To Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default Controls;
