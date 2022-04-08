import React, { useEffect, useState, useContext } from "react";
import MyContext from "../../../MyContext";
import SortAppointmentsComponent from "../SortAppointmentsComponent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import editIcon from "../../../icons/edit.png";
import deleteIcon from "../../../icons/delete.png";
import "./TableComponent.scss";
import axios from "axios";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box, Modal } from "@mui/material";
import { Button, TextField } from "@material-ui/core";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import FilterComponent from "../FilterComponent";
import { AddCircleOutline } from "@mui/icons-material";
import { Dialog, DialogActions } from "@mui/material";
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#C4C4C4",
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableComponent = () => {
  const {
    array,
    setArray,
    complaints,
    setComplaints,
    open,
    setEditComplaints,
    setOpenFilter,
    setOpen,
    editComplaints,
  } = useContext(MyContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteFunc = async (item) => {
    const { _id } = item;
    await axios
      .delete(`http://localhost:8000/deleteAppointment/?_id=${_id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        setArray(res.data.data);
      });
  };

  const editFunction = (item) => {
    setOpen(true);
    setEditComplaints(item);
  };

  const openFilterFunc = () => {
    setOpenFilter(1);
  };

  const handleChange = (nameField, value) => {
    setEditComplaints({
      ...editComplaints,
      [nameField]: value,
    });
  };

  const handleEdit = async () => {
    if (
      editComplaints.userName.trim("") &&
      editComplaints.doctorName &&
      editComplaints.complaint.trim("")
    ) {
      await axios
        .patch("http://localhost:8000/EditAppointment", editComplaints, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setArray(res.data.data);
          setEditComplaints({
            userName: "",
            doctorName: "",
            date: date,
            complaint: "",
          });
          handleClose();
        });
    }
  };

  const { complaint, userName, date } = editComplaints;

  return (
    <div className="table-page">
      <SortAppointmentsComponent array={array} setArray={setArray} />
      <div>
        {!openFilterFunc ? (
          <div className="filter-state">
            Добавить фильтр по дате:
            <AddCircleOutline
              className="size-icon"
              onClick={() => openFilterFunc()}
            />
          </div>
        ) : (
          <div className="main-div-for-filter-component">
            <FilterComponent
              complaints={complaints}
              setComplaints={setComplaints}
              setOpenFilter={setOpenFilter}
            />
          </div>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Имя:</StyledTableCell>
              <StyledTableCell>Доктор:</StyledTableCell>
              <StyledTableCell>Дата:</StyledTableCell>
              <StyledTableCell>Жалобы:</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array.map((item, index) => (
              <StyledTableRow key={`comp-${index}`}>
                <StyledTableCell component="th" scope="row">
                  {item.userName}
                </StyledTableCell>
                <StyledTableCell>{item.doctorName}</StyledTableCell>
                <StyledTableCell>{item.date}</StyledTableCell>
                <StyledTableCell>{item.complaint}</StyledTableCell>
                <StyledTableCell>
                  <img
                    src={deleteIcon}
                    alt="delete"
                    onClick={() => deleteFunc(item)}
                  />
                  <img
                    src={editIcon}
                    alt="edit"
                    onClick={() => editFunction(item)}
                  />
                  <div>
                    <div className='modal-window'>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className="box-style">
                        <div className="header-modal">Изменить прием</div>
                        <div className="edit-main">
                          <div className="input-block">
                            <div className="block-name">Имя:</div>
                            <TextField
                              value={userName}
                              type="text"
                              inputProps={{ "aria-label": "Without label" }}
                              className="userName edit"
                              onChange={(e) => {
                                handleChange("userName", e.target.value);
                              }}
                            />
                          </div>
                          {/* <div className="input-block">
              <div className="block-name">Врач:</div>
              <DocList item={EditComplaints} className="edit" />
            </div> */}
                          <div className="input-block">
                            <div className="block-name">Дата:</div>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                inputFormat={"dd/MM/yyyy"}
                                value={complaints.date}
                                onChange={(e) => {
                                  handleChange("date", e);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </div>
                          <div className="input-block">
                            <div className="block-name">Жалоба:</div>
                            <TextField
                              value={complaint}
                              type="text"
                              className="edit"
                              onChange={(e) => {
                                handleChange("complaint", e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="edit-block-buttons">
                          <Button
                            className="modal-edit-button back-button"
                            onClick={handleClose}
                          >
                            Отмена
                          </Button>
                          <Button
                            className="modal-edit-button add-button"
                            onClick={handleEdit}
                          >
                            Добавить
                          </Button>
                        </div>
                      </Box>
                    </Modal>
                    </div>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;