import React from "react"
import MainNavigation from "../layouts/navigation/MainNavigation";
import classes from "./ReportDevelopment.module.css";
import Controls from "../layouts/footers/Controls";
import MessageBox from "../components/messages/MessageBox";
import { useState, useRef, useEffect } from "react";
import TimeDisplay from "../components/display/TimeDisplay";
import KeyValue from "../components/listers/KeyValue";
import Table from "../components/listers/Table";
import ReportAdder from "../components/display/ReportAdder";
import AddRow from "../components/display/AddRow";

let ITEMS = {
  id: 1,
  name: "June Worker's Retreat",
  lastModified: new Date(2022, 7, 4, 10, 33, 30, 0),
  status: "In Progress",
  categories: ["SU Report", "Leadership Seminars"],
  report: [],
};

function ReportDevelopment() {
  const watchItems = useRef([]);
  const [items] = useState(ITEMS);
  const [reportList, setReportList] = useState(items["report"]);
  const [reportListLength, setReportListLength] = useState(reportList.length);
  const [itemType, setItemType] = useState("");
  const [reason, setReason] = useState("");
  const [showAdder, setShowAdder] = useState(false);
  const [modifyIndex, setModifyIndex] = useState();
  const [showAddRow, setShowAddRow] = useState(false);

  useEffect(() => {
    watchItems.current = watchItems.current.splice(0, reportList.length);

    if (watchItems.current[watchItems.current.length - 1]) {
      let scrollPosition =
        watchItems.current[watchItems.current.length - 1].offsetTop;
      window.scrollTo({
        top: scrollPosition,
        left: 0,
        behavior: "smooth",
      });
    }
    setReportListLength(reportList.length);
  }, [reportList]);

  function addKeyValue() {
    setItemType("key-value");
    setReason("add");
    setShowAdder(true);
  }

  function removeKeyValue(i) {
    let array_copy = [...reportList];
    array_copy.splice(i, 1);
    setReportList([...array_copy]);
  }

  function addTable() {
    setItemType("table");
    setReason("add");
    setShowAdder(true);
  }

  function addRow(e, arr) {
    e.preventDefault();
    let array_copy = [...reportList];
    // check for empty values
    let checked_arr = arr.map((val) => (val.length < 1 ? "----" : val));
    array_copy[modifyIndex].data.push(checked_arr);
    setShowAddRow(false);
  }

  function modifyKeyValue(index) {
    setItemType("key-value");
    setReason("modify");
    setModifyIndex(index);
    setShowAdder(true);
  }

  function modifyTableValue(index) {
    setItemType("table");
    setReason("modify");
    setModifyIndex(index);
    setShowAdder(true);
  }

  function formSubmit(passedData) {
    if (passedData.type === "key-value") {
      if (reason === "add") {
        setReportList([...reportList, passedData]);
        // after submitting, close the modal
        setShowAdder(false);
      } else {
        // modify code here
        let listCopy = [...reportList];
        listCopy[modifyIndex] = passedData;
        setReportList([...listCopy]);
        setShowAdder(false);
      }
    } else {
      if (passedData.length <= 4) {
        if (reason === "add") {
          setReportList([...reportList, passedData]);
          // after submitting, close the modal
          setShowAdder(false);
        } else {
          let listCopy = [...reportList];
          listCopy[modifyIndex] = passedData;
          setReportList([...listCopy]);
          setShowAdder(false);
        }
      } else {
        alert("You cannot have more than 4 report headers in one table");
      }
    }
  }

  return (
    <div className="w-full">
      <MainNavigation />
      {showAdder === true && (
        <ReportAdder
          formSubmit={formSubmit}
          setShowAdder={setShowAdder}
          itemType={itemType}
        />
      )}
      {showAddRow && (
        <AddRow
          setShowAddRow={setShowAddRow}
          data={reportList[modifyIndex].data[0]}
          addRow={addRow}
        />
      )}
      <Controls
        itemCount={reportListLength}
        addKeyValue={addKeyValue}
        addTable={addTable}
      />

      <div className={classes.greeting + " text-3xl md:text-4xl"}>
        Hey Reporter, let's build that report. <span role="img" aria-label="page_emoji">&#128521;</span>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex flex-col md:w-2/3 p-2">
          <div className={classes.info + " w-full mt-5"}>
            <div className="p-4 border border-blue-200 bg-blue-200 text-blue-800 rounded-lg mb-2 text-sm">
              Report Name:{" "}
              <div className=" text-xl md:text-2xl capitalize">
                {items.name}
              </div>
            </div>

            <div className="text-blue-700 text-sm">
              Last Modified: <TimeDisplay date={items.lastModified} />
            </div>
          </div>
          <div className=" mt-2 md:mt-4">
            <MessageBox
              type="Guide"
              message={
                'Click on any of the control buttons to add to your report. And to go to a specific item, click on the "Go To Item" button. Remember; keep your reports short and nice :)'
              }
            />
          </div>

          <div className={"mt-5 text-xl " + classes.greeting}>REPORT LOG</div>

          {reportList.map((item, index) => {
            if (item.type === "key-value")
              return (
                <KeyValue
                  item={item.data}
                  watchItems={watchItems}
                  index={index}
                  key={index}
                  modifyKeyValue={modifyKeyValue}
                  removeKeyValue={removeKeyValue}
                />
              );
            else
              return (
                <Table
                  watchItems={watchItems}
                  index={index}
                  item={item}
                  key={index}
                  removeKeyValue={removeKeyValue}
                  setModifyIndex={setModifyIndex}
                  setShowAddRow={setShowAddRow}
                  modifyTableValue={modifyTableValue}
                />
              );
          })}
        </div>
      </div>
      <div className="h-36"></div>
    </div>
  );
}

export default ReportDevelopment;
