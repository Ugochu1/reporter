// import classes from "./TimeDisplay.module.css";
import React, { useEffect, useState } from "react";

function TimeDisplay({ date }) {
  const [dateValue, setDateValue] = useState(date.toLocaleString());
  useEffect(() => {
    let oneMinute = 60 * 1000;
    let oneHour = oneMinute * 60;
    let oneDay = 86400000;
    let oneMonth = oneDay * 30;
    let oneYear = oneMonth * 12;
    let dateCalc = new Date().getTime() - date.getTime();

    function dateResult() {
      if (dateCalc < oneYear) {
        let number_of_months = Math.floor(dateCalc / oneMonth);
        if (number_of_months < 1) {
          // report the date in days
          let number_of_days = Math.floor(dateCalc / oneDay);
          if (number_of_days < 1) {
            let number_of_hours = Math.floor(dateCalc / oneHour);
            if (number_of_hours < 1) {
              let number_of_minutes = Math.floor(dateCalc / oneMinute);
              if (number_of_minutes < 1) setDateValue("Just now");
              else {
                if (number_of_minutes === 1) setDateValue("1 minute ago");
                else setDateValue(number_of_minutes + " minutes ago");
              }
            } else {
              if (number_of_hours === 1) setDateValue("1 hour ago");
              else setDateValue(number_of_hours + " hours ago");
            }
          } else {
            if (number_of_days === 1) setDateValue("1 day ago");
            else setDateValue(number_of_days + " days ago");
          }
        } else {
          if (number_of_months === 1) setDateValue("1 month ago");
          else setDateValue(number_of_months + " months ago");
        }
      } else {
        let number_of_years = Math.floor(
          (new Date().getTime() - date.getTime()) / oneYear
        );
        if (number_of_years === 1) setDateValue(number_of_years + " year ago");
        else setDateValue(number_of_years + " years ago");
      }
    }
    dateResult();
  }, [date]);

  return <span>{dateValue}</span>;
}

export default TimeDisplay;
