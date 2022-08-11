import React from "react"
import classes from "./ReportLister.module.css";
import { Link } from "react-router-dom";
import TimeDisplay from "../display/TimeDisplay";

function ReportLister({ key, report, activeTab }) {
  return (
    <div className={classes.overAll + " w-full p-3"}>
      <div className="flex justify-between flex-wrap items-center">
        <div className={classes.reportName}>{report.name}</div>
        {report.status && (
          <div
            className={
              report.status === "In Progress"
                ? "px-2 py-1 bg-orange-200 text-orange-500 rounded text-sm"
                : "px-2 py-1 bg-green-200 text-green-500 rounded text-sm"
            }
          >
            {report.status}
          </div>
        )}
      </div>
      <div className="flex flex-wrap">
        {report.categories.map((category, index) => {
          return (
            <div key={index} className={classes.category + " text-sm"}>
              {category}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center mt-1">
        <div className={classes.lastModified + " text-sm text-blue-800"}>
        <span role="img" aria-label="my_image">&#128337;</span> <TimeDisplay date={report.lastModified} />
        </div>
        <Link
          to={"/development/report/" + report.id}
          className="px-2 py-0.5 bg-blue-800 hover:bg-blue-900 text-blue-50 rounded uppercase"
        >
          Update
        </Link>
      </div>
    </div>
  );
}

export default ReportLister;
