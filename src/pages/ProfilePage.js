import React from "react"
import classes from "./ProfilePage.module.css";
import MainNavigation from "../layouts/navigation/MainNavigation";
import imageOne from "../icons/no-profile-pic-icon-11.jpg";
import HomeFooter from "../layouts/footers/HomeFooter"

let username = "Yugee_O";
let email = "olinyaugochukwu1@gmail.com";

function ProfilePage() {
  return (
    <div>
      <MainNavigation />
      <div className="mt-10 mb-10 flex flex-col items-center justify-center">
        <div className={classes.header}>
          <img src={imageOne} alt="profile" className={classes.profilePhoto} />
          <button className={classes.choosePicture}>
            Set New Profile Photo
          </button>
        </div>
        <div className="w-full md:w-1/3 p-3">
          <form className={classes.formBody}>
            <label className={classes.controlInput}>
              <div>Username</div>
              <input type="text" className={classes.formInput} defaultValue={username} />
            </label>
            <label className={classes.controlInput}>
              <div>Email</div>
              <input type="email" className={classes.formInput} defaultValue={email} />
            </label>
            <button className={classes.done}>Done</button>
          </form>
        </div>
      </div>
      <div>
        <HomeFooter />
      </div>
    </div>
  );
}

export default ProfilePage;
