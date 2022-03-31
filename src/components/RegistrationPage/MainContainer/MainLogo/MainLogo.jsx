import React from "react";
import { useLocation } from "react-router-dom";
import Image from "../../../../icons/MainLogo.png";
import "../MainLogo/MainLogo.scss";

const MainLogo = () => {
  return (
    <div className="MainLogo">
      <div className="LogoCont">
        <img className="ImgHosp" src={Image} alt="logo" />
      </div>
    </div>
  );
};

export default MainLogo;
