import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import "./RegistrationForm.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert 
  elevation={6} 
  ref={ref} 
  variant="filled" {...props} />;
});

const RegistrationForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [loginError, setLoginError] = useState("Логин не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );
  const [formValid, setFormValid] = useState(false);
  const [click, setClick] = useState(0);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("2");
  const regExLogin =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const navigate = useNavigate();

  useEffect(() => {
    if (loginError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [loginError, passwordError]);

  const loginHandler = (e) => {
    setLogin(e.target.value);

    if (!regExLogin.test(String(e.target.value).toLowerCase())) {
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
      case "email":
        setLoginDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const userCreate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formLogin = formData.get("email");
    const formPassword = formData.get("password");
    const formPasswordRepeat = formData.get("repeatPassword");
    await axios
      .post("http://localhost:8000/userCreate", {
        email: formLogin,
        password: formPassword,
      })
      .then((res) => {
        localStorage.setItem("token", res.data);
        navigate("/mainPage");
      })
      .catch((res) => {
        setStatus("error");
      });
  };
  return (
    <form onSubmit={userCreate}>
      {click === 0 ? (
        <div className="reg-form">
          <div className="auth-form">
            <h4>Регистрация</h4>
            <div className="form-style">
              <label>Email/Логин:</label>
              <input
                onClick={handleClick}
                onChange={(e) => loginHandler(e)}
                onBlur={(e) => blurHandler(e)}
                name="email"
                type="email"
                placeholder="Логин"
              />
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
                    Некорректный Email. Используйте символ @ и домен
                  </Alert>
                </Snackbar>
              )}
              <label>Пароль:</label>
              <input
                onClick={handleClick}
                onChange={(e) => passwordHandler(e)}
                onBlur={(e) => blurHandler(e)}
                name="password"
                type="password"
                placeholder="Пароль"
              />
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
                    Некорректный пароль. Используйте минимум 6 символов вместе с
                    латинской буквой
                  </Alert>
                </Snackbar>
              )}
              <label>Повторите пароль:</label>
              <input
                onClick={handleClick}
                onChange={(e) => setRepeatPassword(e.target.value)}
                onBlur={(e) => blurHandler(e)}
                name="repeatPassword"
                type="password"
                placeholder="Пароль"
              />
              {password !== repeatPassword && (
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
                    Пароли не совпадают. Используйте минимум 6 символов вместе с
                    латинской буквой
                  </Alert>
                </Snackbar>
              )}
            </div>
          </div>
          <div className="reg-link">
            <button disabled={!formValid} className="Registr">
              Зарегистрироваться
            </button>
            <Link to="/authorization">
              <span className="ButtonStyle" onClick={() => setClick(1)}>
                Авторизоваться
              </span>
            </Link>
          </div>
        </div>
      ) : (
        click
      )}
    </form>
  );
};

export default RegistrationForm;
