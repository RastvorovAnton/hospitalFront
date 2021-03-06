import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import RegistrationForm from "../RegistationForm/RegistrationForm";
// import MainPage from "../../../MainPage/MainPage";
import "./AuthorizationForm.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AuthorizationForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [loginError, setLoginError] = useState("Login can't be an empty");
  const [passwordError, setPasswordError] = useState(
    "Password can't be an empty"
  );
  const [formValid, setFormValid] = useState(false);
  const [click, setClick] = useState(0);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (loginError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [loginError, passwordError]);

  const loginHandler = (e) => {
    setLogin(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!re.test(String(e.target.value).toLowerCase())) {
      setLoginError("Incorrect Email or Login");
    } else {
      setLoginError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError("Add more symbols for password");
      if (!e.target.value) {
        setPasswordError("Incorrect password");
      }
    } else {
      setPasswordError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "login":
        setLoginDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  const enterUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formLogin = formData.get("email").trim("");
    const formPassword = formData.get("password");

    await axios
      .post("http://localhost:8000/enterUser", {
        email: formLogin,
        password: formPassword,
      })
      .then((res) => {
        localStorage.setItem("token", res.data);
        navigate("/mainPage");
      })
      .catch((res) => {
        setOpen(true);
      });
  };

  return (
    <form onSubmit={enterUser}>
      {click === 0 ? (
        <div className="reg-form">
          <div className="auth-form">
            <h4>?????????? ?? ??????????????</h4>
            <div className="form-style">
              <label>Email/??????????:</label>
              <input
                onChange={(e) => loginHandler(e)}
                onBlur={(e) => blurHandler(e)}
                name="email"
                type="email"
                placeholder="??????????" />
              {loginDirty && loginError && (
                <Snackbar
                  open={open}
                  autoHideDuration={4000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    ???????????????????????? Email. ?????????????????????? ???????????? @ ?? ??????????
                  </Alert>
                </Snackbar>
              )}
              <label>????????????:</label>
              <input
                onChange={(e) => passwordHandler(e)}
                onBlur={(e) => blurHandler(e)}
                name="password"
                type="password"
                placeholder="????????????" />
              {passwordDirty && passwordError && (
                <Snackbar
                  open={open}
                  autoHideDuration={4000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    ???????????????????????? ????????????. ?????????????????????? ?????????????? 6 ???????????????? ???????????? ??
                    ?????????????????? ????????????
                  </Alert>
                </Snackbar>
              )}
            </div>
          </div>
          <div className="reg-link">
            <button disabled={!formValid} className="Registr">
              ??????????
            </button>
            <Link to="/registration">
              <span className="ButtonStyle" onClick={() => setClick(1)}>
                ????????????????????????????????????
              </span>
            </Link>
          </div>
        </div>
      ) : (
        click
      )}

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          ???????????? ???????????????????????? ???? ????????????????????
        </Alert>
      </Snackbar>
    </form>
  );
};

export default AuthorizationForm;