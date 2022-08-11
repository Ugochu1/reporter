import React, { useEffect, useState } from "react";
import classes from "./NumberDisplay.module.css";

function NumberDisplay({ number, numberDisplayComponent, numberVisible }) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let interval = 40;

    if (numberVisible === true) {
      var myInterval = setInterval(() => {
        if (currentValue < number) {
          setCurrentValue((val) => Math.ceil((val + number) / 2));
        } else {
          if (currentValue === number);
          else setCurrentValue(number);
          clearInterval(myInterval);
        }
      }, interval);
    }

    return () => clearInterval(myInterval);
  }, [number, currentValue, numberVisible]);

  return (
    <div ref={numberDisplayComponent} className={classes.value}>
      {currentValue}
    </div>
  );
}

export default NumberDisplay;
