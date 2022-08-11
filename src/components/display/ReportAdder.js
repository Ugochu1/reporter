import React from "react"
import classes from "./ReportAdder.module.css";
import MessageBox from "../messages/MessageBox";
import { useState } from "react";

function ReportAdder({ formSubmit, setShowAdder, itemType }) {
  const [keyvalues, setkeyValues] = useState(new Array(2));
  const [tablename, setTableName] = useState("");
  const [columnLength, setColumnLength] = useState("");
  const [columnHeaders, setColumnHeaders] = useState("");

  function handleKey(e) {
    // make a copy of the keyvalues array
    let array_for_key = [...keyvalues];
    array_for_key[0] = e.target.value;
    setkeyValues(array_for_key);
  }

  function handleValue(e) {
    let array_for_key = [...keyvalues];
    array_for_key[1] = e.target.value;
    setkeyValues(array_for_key);
  }

  function keyvalueSubmit(e) {
    e.preventDefault();
    formSubmit({ type: "key-value", data: keyvalues });
  }

  function tableSubmit(e) {
    e.preventDefault();
    let length = parseInt(columnLength);
    let splitColumns = columnHeaders.split(", ").length;
    if (length === splitColumns) {
      // gather the user's data that will be used to create table.
      formSubmit({
        type: "table",
        name: tablename,
        length,
        data: [columnHeaders.split(", ")],
      });
    } else {
      let value = Math.abs(length - splitColumns);
      if (length < splitColumns)
        alert(
          "Remove " +
            value.toString() +
            " column" +
            (value === 1 ? " header" : " headers") +
            " or set number of columns to " +
            splitColumns +
            ", to add"
        );
      else
        alert(
          "Add " +
            value.toString() +
            " more column" +
            (value === 1 ? " header" : " headers") +
            " or set number of columns to " +
            splitColumns +
            ", to add"
        );
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-40 z-30 flex justify-center">
      <div
        className={
          itemType === "key-value"
            ? "bg-white p-6 h-80 w-full md:w-1/3 mt-8 md:rounded relative"
            : "bg-white p-6 h-5/6 md:h-4/5 w-full md:w-1/3 md:mt-8 mt-4 md:rounded relative"
        }
      >
        <button
          className="absolute top-2 right-2"
          onClick={() => setShowAdder(false)}
        >
          &#x58;
        </button>
        <div className="mt-4">
          <MessageBox
            type={"Guide"}
            message={`Fill form below to add ${itemType} to your report.`}
          />
        </div>
        {itemType === "key-value" ? (
          <div className={classes.keyValue}>
            <form onSubmit={keyvalueSubmit} className={classes.formBody}>
              <label className={classes.controlInput}>
                <div>Key Name:</div>
                <input
                  type="text"
                  className={classes.formInput}
                  onChange={handleKey}
                  required
                />
              </label>
              <label className={classes.controlInput}>
                <div>Value:</div>
                <input
                  type="text"
                  className={classes.formInput}
                  onChange={handleValue}
                  required
                />
              </label>
              <button className={classes.done}>Add</button>
            </form>
          </div>
        ) : (
          <div className={classes.table}>
            <form className={classes.formBody} onSubmit={tableSubmit}>
              <label className={classes.controlInput}>
                <div>Table Name</div>
                <input
                  type="text"
                  className={classes.formInput}
                  onChange={(e) => setTableName(e.target.value)}
                  value={tablename}
                  required
                />
              </label>
              <label className={classes.controlInput}>
                <div>Number of Columns</div>
                <input
                  type="text"
                  className={classes.formInput}
                  value={columnLength}
                  onChange={(e) => setColumnLength(e.target.value)}
                  placeholder="Example: 2. Maximum is 4"
                  required
                />
              </label>
              <label className={classes.controlInput}>
                <div>Column Headers</div>
                <MessageBox
                  type="Guide/Warning"
                  message="If more than one, seperate headers with a COMMA and a SPACE as you would do in a list. Example: Students, Teachers, etc..."
                />
                <input
                  type="text"
                  className={classes.formInput}
                  onChange={(e) => setColumnHeaders(e.target.value)}
                  value={columnHeaders}
                  required
                />
              </label>
              <button className={classes.done}>Add</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportAdder;
