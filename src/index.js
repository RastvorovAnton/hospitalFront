import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MyContext from "./MyContext";

const Main = () => {
  const date = new Date();
  const [array, setArray] = useState([]);
  const [complaints, setComplaints] = useState({
    userName: "",
    doctorName: "",
    date: date,
    complaint: "",
  });
  const [sortParams, setSortParams] = useState({
    field: "_id",
    direction: "asc",
  });
  const sortBy = [
    {
      inputName: "Имя",
      value: "userName",
    },
    {
      inputName: "Доктор",
      value: "doctorName",
    },
    {
      inputName: "Дата",
      value: "date",
    },
    {
      inputName: "Жалобы",
      value: "complaint",
    },
  ];
  const sortDirectionsVariant = [
    {
      value: "asc",
      label: "По возрастанию",
    },
    {
      value: "desc",
      label: "По убыванию",
    },
  ];
  const [open, setOpen] = useState(false);
  const [editComplaints, setEditComplaints] = useState("");
  const [openFilter, setOpenFilter] = useState(0);

  return (
    <React.StrictMode>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <MyContext.Provider
        value={{
          complaints,
          setComplaints,
          array,
          setArray,
          sortParams,
          setSortParams,
          sortBy,
          sortDirectionsVariant,
          open,
          setOpen,
          editComplaints,
          setEditComplaints,
          openFilter,
          setOpenFilter,
        }}
      >
        <App />
      </MyContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));