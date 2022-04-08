import React, { useState, useContext } from "react";
import { MenuItem, Select } from "@mui/material";
import MyContext from "../../MyContext";
import "./SortComponent.scss";

const SortAppointmentsComponent = ({ array, setArray }) => {
  
  const 
  { sortParams, 
    setSortParams, 
    sortBy, 
    sortDirectionsVariant 
  } = useContext(MyContext);

  const { field, direction } = sortParams;

  const reverseDate = () => {
    array.map((el) => {
      const temp = el.date.split(".");
      [temp[0], temp[1]] = [temp[1], temp[0]];
      const elem = temp.reverse().join(".");
      el.date = elem;
    });
  };

  const reverseDateBack = () => {
    array.map((el) => {
      const temp = el.date.split(".");
      [temp[1], temp[2]] = [temp[2], temp[1]];
      const elem = temp.reverse().join(".");
      el.date = elem;
    });
  };

  const sortCollection = (sortBySetData, sortDirection) => {
    if (sortBySetData === "date") reverseDate();

    array.sort((a, b) =>
      a[sortBySetData] > b[sortBySetData]
        ? 1
        : a[sortBySetData] < b[sortBySetData]
        ? -1
        : 0
    );

    if (sortBySetData === "date") reverseDateBack();

    if (sortDirection === "desc") array.reverse();

    setArray([...array]);
  };

  const handleChange = (value) => {
    setSortParams({ ...sortParams, field: value });
    sortCollection(value, direction);
  };

  const handleChangeDirection = (value) => {
    setSortParams({ ...sortParams, direction: value });
    sortCollection(field, value);
  };

  return (
    <div className="sort-style">
      <div className="sort-component">
        <p>Cортировать по:</p>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={field}
          name="sortReceptions"
          onChange={(e) => handleChange(e.target.value)}
          className="input-space"
        >
          {sortBy.map((element, index) => (
            <MenuItem key={`id${index}`} value={element.value}>
              {element.inputName}
            </MenuItem>
          ))}
        </Select>
      </div>
      {field && field !== "_id" && (
        <div className="sort-component-type">
          <p>Направление:</p>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={direction}
            onChange={(e) => handleChangeDirection(e.target.value)}
            className="input-space"
          >
            {sortDirectionsVariant.map((element, index) => (
              <MenuItem key={`id${index}`} value={element.value}>
                {element.label}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
};

export default SortAppointmentsComponent;