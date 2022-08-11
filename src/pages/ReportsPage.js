import React from "react"
import MainNavigation from "../layouts/navigation/MainNavigation";
import classes from "./ReportsPage.module.css";
import noImage from "../icons/no-profile-pic-icon-11.jpg";
import { Link } from "react-router-dom";
import ReportLister from "../components/listers/ReportLister";
import MessageBox from "../components/messages/MessageBox";
import { useState, useRef, useEffect } from "react";
import HomeFooter from "../layouts/footers/HomeFooter";
import NumberDisplay from "../components/display/NumberDisplay";
import ErrorDisplay from "../components/display/ErrorDisplay";

let username = "Yugee_O";
let email = "olinyaugochukwu1@gmail.com";
let profilePhoto = "";

const DUMMY_REPORTS = [
  {
    id: 1,
    name: "June Worker's Retreat",
    lastModified: new Date(2022, 6, 20, 10, 33, 30, 0),
    status: "In Progress",
    categories: ["SU Report", "Leadership Seminars"],
  },
  {
    id: 2,
    name: "May School's Report",
    lastModified: new Date(2022, 5, 10, 30, 33, 30, 0),
    status: "Exported",
    categories: ["SU Report", "School Report"],
  },
  {
    id: 3,
    name: "Youth Camp Food Statistics",
    lastModified: new Date(2022, 7, 3, 18, 17, 30, 0),
    status: "In Progress",
    categories: ["SU Report", "Youth Camp"],
  },
];

const BLUEPRINTS = [
  {
    id: 1,
    name: "School's reports",
    lastModified: new Date(2020, 6, 20, 10, 33, 30, 0),
    categories: ["SU Report", "Leadership Seminars"],
  },
  {
    id: 2,
    name: "Worker's retreat",
    lastModified: new Date(2021, 7, 11, 30, 33, 30, 0),
    categories: ["SU Report", "School Report"],
  },
  // {
  //   id: 3,
  //   name: "Youth Camp",
  //   lastModified: new Date(2022, 7, 27, 18, 17, 30, 0),
  //   categories: ["SU Report", "Youth Camp"],
  // },
  // {
  //   id: 4,
  //   name: "Regional Conference",
  //   lastModified: new Date(2022, 7, 27, 18, 17, 30, 0),
  //   categories: ["SU Report", "Regional"],
  // },
];

function ReportsPage() {
  const numberDisplayComponent = useRef(null);
  const firstFormInput = useRef(null);
  const createNewForm = useRef(null);
  const [activeTab, setActiveTab] = useState("report");
  const [categories, setCategories] = useState("");
  const [numberVisible, setNumberVisible] = useState(false);
  const [reports, setReports] = useState(BLUEPRINTS);

  function getReports() {
    return DUMMY_REPORTS;
  }

  function getBluePrints() {
    return BLUEPRINTS;
  }

  function callback(entries) {
    const [entry] = entries;
    setNumberVisible(entry.isIntersecting);
  }

  useEffect(() => {
    const options = {
      threshold: 0,
      root: null,
      rootMargin: "0px 0px -20px 0px",
    };
    let obj = numberDisplayComponent.current;
    const observer = new IntersectionObserver(callback, options);
    if (obj) observer.observe(obj);

    return () => {
      if (obj) observer.unobserve(obj);
    };
  }, []);

  useEffect(() => {
    function fetchData() {
      if (activeTab === "report") setReports(getReports());
      else setReports(getBluePrints());
    }
    fetchData();
  }, [activeTab]);

  function focusForm(tab) {
    if (tab === "report") setActiveTab("report");
    else setActiveTab("blueprint");
    let y_position = createNewForm.current.offsetTop;
    firstFormInput.current.focus();
    window.scrollTo({
      top: y_position,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <MainNavigation />
      <div className="md:px-5 px-2">
        <div className={classes.userDetails + " flex items-end"}>
          <div className="flex flex-wrap p-2">
            <div>
              <img
                src={profilePhoto || noImage}
                className={classes.profilePicture}
                alt="Profile"
              />
            </div>
            <div className={classes.profileDetails}>
              <div className={classes.userName}>{username}</div>
              <div className={classes.email + " mb-2"}>{email}</div>
              <div className={classes.actions}>
                <Link className={classes.editButton} to="/profile">
                  Edit Profile
                </Link>
                <button
                  className={classes.createButton}
                  onClick={() => focusForm("report")}
                >
                  Create Report
                </button>
                <button
                  className={classes.createButton}
                  onClick={() => focusForm("blueprint")}
                >
                  Create Blueprint
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-full h-0.2 mt-5 bg-black"></div> */}
        <div className="w-full flex mt-8 justify-center items-center">
          <div
            className={
              activeTab === "report"
                ? classes.tab + " bg-blue-900 text-blue-50"
                : classes.tab + " text-blue-800"
            }
            onClick={() => setActiveTab("report")}
          >
            Reports
          </div>
          <div
            className={
              activeTab === "blueprint"
                ? classes.tab + " bg-blue-900 text-blue-50"
                : classes.tab + " text-blue-800"
            }
            onClick={() => setActiveTab("blueprint")}
          >
            Blueprints
          </div>
        </div>
        <div
          className={
            classes.pageBody + " w-full md:flex md:justify-evenly mt-5"
          }
        >
          <div className={classes.reportBody + " w-full md:w-1/2 p-2"}>
            <div className={classes.searchBox}>
              <div className={classes.searchHeader}>
                Search through {activeTab}
              </div>
              <input
                type="text"
                className={classes.searchBar + " focus:outline-none"}
                placeholder="Search by name or category"
              />
              <button className={classes.searchButton}>Search</button>
            </div>
            <div className={classes.reportLog}>
              <div>
                <div className="capitalize">{activeTab} Log</div>
                {reports.length > 0 ? (
                  <div>
                    {reports.map((report, index) => {
                      return (
                        <div key={index}>
                          <ReportLister report={report} activeTab={activeTab} />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <ErrorDisplay message="You have not created any reports with us." />
                )}
              </div>
            </div>
          </div>
          <div className={classes.createReport + " w-full md:w-1/3 p-2"}>
            {/* <div>Statistics</div> */}
            <div className="flex">
              <div
                className={
                  classes.reportStats +
                  (reports[0].status !== undefined ? " w-1/2" : " w-full")
                }
              >
                <div className={classes.reportStatHeader}>Created</div>
                <div className={classes.reportValue}>
                  <NumberDisplay
                    numberDisplayComponent={numberDisplayComponent}
                    numberVisible={numberVisible}
                    number={reports.length}
                  />
                </div>
              </div>
              {reports[0].status !== undefined && (
                <div className={classes.reportStats + " w-1/2"}>
                  <div className={classes.reportStatHeader}>Exported (%)</div>
                  <div className={classes.reportValue}>
                    <NumberDisplay
                      numberDisplayComponent={numberDisplayComponent}
                      numberVisible={numberVisible}
                      number={Math.round(
                        (reports.filter(
                          (report) => report.status === "Exported"
                        ).length / reports.length || 0) * 100
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="w-full mt-7 p-2">
              <form>
                <div
                  className={classes.userName + " capitalize"}
                  ref={createNewForm}
                >
                  Create New {activeTab}
                </div>
                <MessageBox
                  type="Guide"
                  message={`Fill in the following form to create a new ${activeTab}. Fill in distinct values for clarity and differentiation`}
                />
                <label className={classes.formBody}>
                  <div className={classes.formLabel + " capitalize"}>
                    {activeTab} Name
                  </div>
                  <input
                    className={classes.formInput}
                    type="text"
                    required
                    ref={firstFormInput}
                  />
                </label>
                <label className={classes.formBody}>
                  <div className={classes.formLabel + " capitalize"}>
                    {activeTab} Category(ies)
                  </div>
                  <MessageBox
                    type="Guide/Warning"
                    message="Should you have more than one category, seperate with a comma and space(', '). Eg. Health, Studies. Use categories you can remember"
                  />
                  <input
                    type="text"
                    className={classes.formInput}
                    onChange={(e) => setCategories(e.target.value)}
                    required
                  />
                  {categories.length > 0 ? (
                    <div className="flex flex-wrap">
                      {categories.split(", ").map((category, index) => {
                        return (
                          <div key={index} className={classes.category}>
                            {category}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </label>
                <div className="flex justify-end">
                  <button className={classes.searchButton}>Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <HomeFooter />
      </div>
    </div>
  );
}

export default ReportsPage;
