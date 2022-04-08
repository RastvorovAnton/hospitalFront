import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyContext from '../../MyContext';

const EditTaskComponent = ({ task, setTasks }) => {
  const { _id, isCheck, text } = task;
  const navigate = useNavigate();
  const { inputText, setInputText } = useContext(MyContext);

  const saveResultTask = () => {
    axios
      .patch(`http://localhost:8000/updateTask?id=${_id}`, {
        text: inputText,
        isCheck,
      })
      .then((res) => {
        setTasks(res.data.data);
      });
    returnFunc();
  };

  const returnFunc = () => {
    navigate('/home');
  };

  return (
    <div className="EditTask">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <img src='../Images/done.png' alt="done" onClick={() => saveResultTask()} />
      <img src='../Images/return.png' alt="return" onClick={() => returnFunc()} />
    </div>
  );
};

export default EditTaskComponent;