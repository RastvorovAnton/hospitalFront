import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './Nav.scss';
import { Link } from 'react-router-dom';

const Nav = () => {

	const [name, setName] = useState('');
	const [doctor, setDoctor] = useState('');
	const [value, setValue] = useState(new Date());
	const [complaints, setComplaints] = useState('');

	const handleChangeName = (event) => {
		setName(event.target.value);
	};

	const handleChangeDoctor = (event) => {
		setDoctor(event.target.value);
	};

	const handleChangeData = (newValue) => {
		setValue(newValue);
	};

	const handleChangeComplaints = (event) => {
		setComplaints(event.target.value);
	};


	return (
		<div className='form'>
			<Box className='form-box'>
				<form className='formControl'>
					<div className='label-loc'>
						<label className='label'>Имя:</label>
						<div className='name'>
							<input
								className='TextField'
								id="outlined-name"
								value={name}
								onChange={handleChangeName}
							/>
						</div>
					</div>
					<div className='label-loc'>
						<label className='label' id="demo-simple-select-label">Врач:</label>
						<div className='name'>
							<Select
								className='select'
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={doctor}
								onChange={handleChangeDoctor}
							>
								<MenuItem value={10}>Андрей Быков</MenuItem>
								<MenuItem value={20}>Семён Лобанов</MenuItem>
								<MenuItem value={30}>Глеб Романенко</MenuItem>
								<MenuItem value={40}>Фил Ричардс</MenuItem>
								<MenuItem value={50}>Варвара Черноус</MenuItem>
							</Select>
						</div>
					</div>
					<div>
						<div className='label-loc'>
							<label className='label'>Дата:</label>
							<div className='name-data'>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<Stack className='data-style' spacing={3}>
										<DesktopDatePicker
											className='date-picker'
											inputFormat="MM/dd/yyyy"
											value={value}
											onChange={handleChangeData}
											renderInput={(params) => <TextField {...params} />}
										/>
									</Stack>
								</LocalizationProvider>
							</div>
						</div>
					</div>
					<div className='label-loc'>
						<label className='label'>Жалобы:</label>
						<div className='name'>
							<input
								className='TextField'
								id="outlined-name"
								value={complaints}
								onChange={handleChangeComplaints}
							/>
						</div>
					</div>
				</form>
				<div className='label-loc'>
					<label className='label'></label>
					<div className='name'>
						<Link to='/table'>
							<button className='btn-add'>Добавить</button>
						</Link>
					</div>
				</div>
			</Box>
		</div>
	)

}

export default Nav;