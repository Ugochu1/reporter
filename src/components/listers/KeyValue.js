import React from "react"
import classes from "./KeyValue.module.css";

function KeyValue({ item, watchItems, index, modifyKeyValue, removeKeyValue }) {
  return (
    <div
      className={
        classes.fullBody + " mt-3 p-3 flex items-center justify-between relative"
      }
      key={index}
      ref={(el) => (watchItems.current[index] = el)}
    >
      <button className={classes.close + " absolute"} onClick={() => removeKeyValue(index)}>&#x58;</button>
      <div className="md:p-2">
        <div className={classes.key}>
          {/* <div className="text-xs">Key</div> */}
          <span className="">{item[0]}</span>
        </div>
        <div className={classes.value}>
          {/* <div className="text-xs">Value</div> */}
          <span className="uppercase">{item[1]}</span>
        </div>
      </div>
      <div className="md:px-2">
        <button
          className={classes.modifyButton}
          onClick={() => modifyKeyValue(index)}
        >
          Modify
        </button>
      </div>
    </div>
  );
}

export default KeyValue;
