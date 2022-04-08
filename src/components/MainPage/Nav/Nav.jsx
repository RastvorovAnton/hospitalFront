import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import moment from "moment";
import TableComponent from "../TableComponent/TableComponent";
import {
  Button,
  Input,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DateAdapter from "@mui/lab/AdapterDateFns";
import MyContext from "../../../MyContext";
import "./Nav.scss";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const Nav = () => {
  const 
  { 
    setArray, 
    complaints, 
    setComplaints, 
    date, 
    editComplaints, 
    setEditComplaints 
  } = useContext(MyContext);

  const navigate = useNavigate()

  const handleChange = (nameField, value) => {
    setComplaints({ ...complaints, [nameField]: value });
  };

  const validateForToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate.push("/authorization");
    }
  };

  validateForToken();

  useEffect(() => {
    const trueToken = localStorage.getItem("token");

    if (trueToken) {
      axios
        .get("http://localhost:8000/allAppointments", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          setArray(res.data.data);
        });
    }
  }, [setArray]);

  const addNewAppointment = async () => {
    if (
      complaints.userName.trim("") &&
      complaints.doctorName &&
      complaints.complaint.trim("")
    ) {
      complaints.date = moment(complaints.date).format("DD.MM.YYYY");
      await axios
        .post("http://localhost:8000/createAppointment", complaints, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setArray(res.data.data);
          setComplaints({
            userName: "",
            doctorName: "",
            date: date,
            complaint: "",
          });
        });
    }
  };

  return (
    <div>
      <div>
        <div className="main-page">
          <div className="style-input">
            <label>Имя:</label>
            <div className="style-input">
              <TextField
                type="text"
                name="userName"
                className="select"
                value={complaints.userName}
                onChange={(e) => {
                  handleChange("userName", e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <label>Доктор:</label>
            <div>
              <Select
                className="select"
                type="text"
                name="doctorName"
                value={complaints.doctorName}
                onChange={(e) => {
                  handleChange("doctorName", e.target.value);
                }}
              >
                <MenuItem value="Андрей Быков">Андрей Быков</MenuItem>
                <MenuItem value="Семён Лобанов">Семён Лобанов</MenuItem>
                <MenuItem value="Глеб Романенко">Глеб Романенко</MenuItem>
                <MenuItem value="Фил Ричардс">Фил Ричардс</MenuItem>
                <MenuItem value="Варвара Черноус">Варвара Черноус</MenuItem>
              </Select>
            </div>
          </div>
          <div>
            <label>Дата:</label>
            <div className="select">
              {/* <Input
              className="date-picker"
              value={complaints.date}
              name="date"
              onChange={(e) => {
                handleChange("date", e.target.value);
              }}
            /> */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    className="date-picker"
                    inputFormat="dd.MM.yyyy"
                    value={complaints.date}
                    onChange={(newValue) => {
                      handleChange("date", newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
          </div>
          <div>
            <label>Жалобы:</label>
            <div>
              <div className="style-input">
                <TextField
                  className="select"
                  type="text"
                  name="complaint"
                  value={complaints.complaint}
                  onChange={(e) => {
                    handleChange("complaint", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="btn-cont">
              <button
                variant="contained"
                className="btn-add"
                onClick={addNewAppointment}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
      <TableComponent />
    </div>
  );
};

export default Nav;