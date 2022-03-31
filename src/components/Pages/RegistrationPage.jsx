import React from "react";
import RegistrationForm from "../RegistrationPage/MainContainer/RegistationForm/RegistrationForm";
import MainLogo from "../RegistrationPage/MainContainer/MainLogo/MainLogo";
import "../Pages/RegistrationPage.scss";

const RegistrationPage = () => {
  return (
    <div>
      <div className="main-and-form">
        <MainLogo />
        <div className="all-cont">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;