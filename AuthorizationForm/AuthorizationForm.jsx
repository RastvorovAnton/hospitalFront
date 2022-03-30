import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import RegistrationForm from "../RegistationForm/RegistrationForm";
import MainPage from "../../../MainPage/MainPage";
import './AuthorizationForm.scss'

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AuthorizationForm = () => {

	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [loginDirty, setLoginDirty] = useState(false)
	const [passwordDirty, setPasswordDirty] = useState(false)
	const [loginError, setLoginError] = useState("Login can't be an empty")
	const [passwordError, setPasswordError] = useState("Password can't be an empty")
	const [formValid, setFormValid] = useState(false)
	const [click, setClick] = useState(0)
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	useEffect(() => {
		if (loginError || passwordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [loginError, passwordError])

	const loginHandler = (e) => {
		setLogin(e.target.value)
		const re =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (!re.test(String(e.target.value).toLowerCase())) {
			setLoginError('Incorrect Email or Login')
		} else {
			setLoginError('')
		}
	}

	const passwordHandler = (e) => {
		setPassword(e.target.value)
		if (e.target.value.length < 6) {
			setPasswordError('Add more symbols for password')
			if (!e.target.value) {
				setPasswordError('Incorrect password')
			}
		} else {
			setPasswordError('')
		}
	}

	const blurHandler = (e) => {
		switch (e.target.name) {
			case 'login':
				setLoginDirty(true)
				break
			case 'password':
				setPasswordDirty(true)
				break
		}
	}

	return (
		<form>
			{click === 0
				? <div className="auth-form">
					<h4>Войти в систему</h4>
					{(loginDirty && loginError) &&
						<Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
							<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
								Некорректный Email. Используйте символ @ и домен
							</Alert>
						</Snackbar>
					}
					<div className='form-style'>
						<label>Email/Логин:</label>
						<input
							onChange={e => loginHandler(e)}
							value={login}
							onClick={handleClick}
							onBlur={e => blurHandler(e)}
							name='login'
							type="email"
							placeholder='Логин' />
						{(passwordDirty && passwordError) &&
							<Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
								<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
									Некорректный пароль. Используйте минимум 6 символов вместе с латинской буквой
								</Alert>
							</Snackbar>
						}
						<label>Пароль:</label>
						<input
							onClick={handleClick}
							onChange={e => passwordHandler(e)}
							value={password}
							onBlur={e => blurHandler(e)}
							name='password'
							type="password"
							placeholder='Пароль' />
						<div className='reg-link'>
							<Link to='/mainPage'>
								<button className="Registr" onClick={() => setClick(2)} disabled={!formValid} type="submit">Войти</button>
							</Link>
							<Link to='/registration' onClick={() => setClick(1)}>
								<span className='ButtonStyle'>
									Зарегистрироваться
								</span>
							</Link>
						</div>
					</div>
				</div>
				: click === 1 ?
					<div>
						<RegistrationForm />
					</div>
					: <div>
						{<MainPage />}
					</div>
			}
		</form>
	);
}

export default AuthorizationForm