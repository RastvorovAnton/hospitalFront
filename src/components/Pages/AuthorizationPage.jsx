import React from 'react';
import MainLogo from '../RegistrationPage/MainContainer/MainLogo/MainLogo';
import AuthorizationForm from '../RegistrationPage/MainContainer/AuthorizationForm/AuthorizationForm';

const AuthorizationPage = () => {

	return (

		<div>
			<div className='main-and-form'>
				<MainLogo />
				<div className='all-cont'>
					<AuthorizationForm />
				</div>
			</div>
		</div>

	)

}

export default AuthorizationPage;

