import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import image from '../../../icons/Vector.png'
import '../Header/Header.scss'

const Header = () => {

	let headerText = '';
	let buttonExit = 

		<Link to='/authorization'>
			<button className='btn-exit'>Выход</button>
		</Link>

	const location = useLocation()

	switch (location.pathname) {
		case '/authorization':
			headerText = 'Войти в систему'
			buttonExit = null
			break;

		case '/registration':
			headerText = 'Зарегистрироваться в системе'
			buttonExit = null
			break;

		case '/mainPage':
			headerText = 'Приёмы'
			buttonExit = buttonExit
			break;

		case '/table':
			headerText = 'Приёмы'
			buttonExit = buttonExit
			break;

		default:
			headerText = 'Войти в систему'
			buttonExit = ''
			break;
	}

	return (
		<div className="Header">
			<header>
				<div className="block">
					<img src={image} alt="logo" />
					<div className="header-and-button">
						<div className="textHeader">
							<div>
								{headerText}
							</div>
						</div>
					</div>
				</div>
				<div className='btn'>
					<div className='button-exit'>
						{buttonExit}
					</div>
				</div>
			</header>
		</div>
	)

}

export default Header;