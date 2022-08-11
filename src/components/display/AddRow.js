import React from "react"
import classes from "./AddRow.module.css";
import MessageBox from "../messages/MessageBox";
import { useState } from "react";

function AddRow({ setShowAddRow, data, addRow }) {
  const [holdingArray, setHoldingArray] = useState(Array(data.length));

  function handleTyping(e, col_index) {
    e.preventDefault();
    let copyArray = [...holdingArray];
    copyArray[col_index] = e.target.value;
    setHoldingArray([...copyArray]);
  }

  return (
    <div
      className={
        " fixed inset-0 bg-gray-700 bg-opacity-40 z-30 flex justify-center"
      }
    >
      <div
        className={
          data.length > 3
            ? "bg-white p-6 h-5/6 md:h-4/5 w-full md:w-1/3 md:mt-8 mt-4 md:rounded relative"
            : "bg-white p-6 h-4/5 md:h-2/3 w-full md:w-1/3 md:mt-8 mt-4 md:rounded relative"
        }
      >
        <button
          className="absolute top-2 right-2"
          onClick={() => setShowAddRow(false)}
        >
          &#x58;
        </button>
        <div className="mt-4">
          <MessageBox
            type={"Guide"}
            message={`Fill form below to add row to table. Empty fields on addition will be represented as "----".`}
          />
        </div>
        <form className={classes.formBody}>
          {data.map((col_header, col_index) => {
            return (
              <label key={col_index}>
                <div>{col_header}</div>
                <input
                  type={"text"}
                  className={classes.formInput}
                  onChange={(e) => handleTyping(e, col_index)}
                />
              </label>
            );
          })}
          <button className={classes.done} onClick={(e) => addRow(e, holdingArray)} >ADD</button>
        </form>
      </div>
    </div>
  );
}

export default AddRow;
