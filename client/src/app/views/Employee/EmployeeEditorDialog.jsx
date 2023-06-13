import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	Dialog,
	DialogContent,
	InputLabel,
	MenuItem,
	ListSubheader,
	FormControl,
	Select,
	TextField,
	Button,
	Paper,
	DialogActions,
} from '@material-ui/core';
import {
	GetCommunes,
	AddEmployee,
	SearchDistricts,
	SearchProvince,
	updateEmployee,
} from './EmployeeService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Draggable from 'react-draggable';
import CloseIcon from '@material-ui/icons/Close';

toast.configure({
	autoClose: 1000,
	draggable: false,
	limit: 3,
});

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 120,
	},
	groupInput: {
		display: 'flex',
	},
	dialogContentText: {
		margin: theme.spacing(2),
	},
	textField: {
		margin: theme.spacing(1),
	},
	block: {
		display: 'inline-block',
		fontSize: '25px',
		marginLeft: 30,
		marginTop: 20,
	},
	groupButton: {
		marginLeft: 10,
		marginTop: 20,
		display: 'flex',
		justifyContent: 'end',
	},
	Error: {
		'& p': {
			color: 'red',
		},
	},
	p: {
		color: 'red',
		fontSize: 12,
		font: 'Roboto',
	},
	close: {
		display: 'flex',
		width: '40px',
		height: '40px',
		margin: '20px',
		float: 'right',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		border: 'none',
		'&:hover': {
			backgroundColor: 'red',
		},
	},
}));

export function PaperComponent(props) {
	return (
		<Draggable handle="#draggable-dialog-title">
			<Paper {...props} />
		</Draggable>
	);
}

export default function EmployeeEditorDialog(props) {
	const classes = useStyles();

	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [email, setEmail] = useState('');
	const [code, setCode] = useState('');
	const [phone, setPhone] = useState('');
	const [commune, setCommune] = useState(null);
	const [district, setDistrict] = useState(null);
	const [province, setProvince] = useState(null);

	const [communesData, setCommunesData] = useState([]);
	const [provincesData, setProvincesData] = useState([]);
	const [districtsData, setDistrictsData] = useState([]);

	var dataSubmit = {
		name,
		age,
		code,
		email,
		phone,
		province,
		commune,
		district,
		id: props.employeeData.id,
	};

	useEffect(() => {
		SearchProvince({}).then((res) => {
			setProvincesData(res.data.data);
		});
		SearchDistricts({}).then((res) => {
			setDistrictsData(res.data.data);
		});
		GetCommunes().then((res) => {
			setCommunesData(res.data.data);
		});
	}, []);

	useEffect(() => {
		if (props.employeeData) {
			setName(props.employeeData.name);
			setAge(props.employeeData.age);
			setEmail(props.employeeData.email);
			setCode(props.employeeData.code);
			setPhone(props.employeeData.phone);
		}
	}, [props.employeeData]);

	const [validatorMsg, setValidatorMsg] = useState('');

	const Validator = () => {
		const msg = {};

		if (!email) msg.email = 'Email is required *';
		else if (!email) msg.email = 'Email is required *';
		if (!name) msg.name = 'Name is required *';
		if (!age) msg.age = 'age is required *';
		if (!code) msg.code = 'code is required *';
		else if (code.length < 6) msg.code = 'code requires at least 6 characters!';
		if (!phone) msg.phone = 'phone is required *';
		else if (phone.length > 10)
			msg.phone = 'phone requires at most 10 characters!';
		if (!province) msg.province = 'Province is required *';
		if (!district) msg.district = 'District is required *';
		if (!commune) msg.commune = 'Commune is required *';

		if (
			msg.email ||
			msg.name ||
			msg.age ||
			msg.code ||
			msg.phone ||
			msg.province ||
			msg.district ||
			msg.commune
		) {
			setValidatorMsg(msg);
			return false;
		} else setValidatorMsg('');

		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isvalid = Validator();
		if (isvalid) {
			if (props.employeeData.id) {
				updateEmployee(dataSubmit).then((res) => {
					if (res.data.data === null) {
						toast.error(res.data.message);
					} else {
						props.reRender();
						toast.success('Thành công');
						props.handleClose();
					}
				});
			} else {
				AddEmployee(dataSubmit).then((res) => {
					if (res.data.data === null) {
						toast.error(res.data.message);
					} else {
						props.reRender();
						toast.success('Thành công');
						props.handleClose();
					}
				});
			}
		}
	};

	return (
		<Dialog
			open={props.open}
			onSubmit={() => props.setHandleSubmit}
			PaperComponent={PaperComponent}>
			<Grid
				style={{ cursor: 'move' }}
				id="draggable-dialog-title">
				<Grid
					className={classes.block}
					style={{
						color: '#409b3e',
					}}>
					{props.employeeData.id ? 'Sửa nhân viên' : 'Thêm nhân viên'}
				</Grid>
				<button
					className={classes.close}
					onClick={() => {
						props.handleClose();
						setValidatorMsg('');
					}}>
					<CloseIcon color="secondary" />
				</button>
			</Grid>
			<DialogContent>
				<Grid className={classes.textField}>
					<Grid>
						<TextField
							className={classes.Error}
							helperText={!name && validatorMsg.name}
							label="* Full Name"
							type="text"
							fullWidth
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							style={{
								marginBottom: 10,
							}}
						/>
					</Grid>
					<Grid>
						<TextField
							className={classes.Error}
							label="* Email Address"
							type="email"
							helperText={!email && validatorMsg.email}
							email
							fullWidth
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</Grid>
				</Grid>
				<Grid className={classes.groupInput}>
					<Grid
						item
						xs={4}
						className={classes.textField}>
						<TextField
							className={classes.Error}
							label="* Code"
							type="text"
							helperText={(!code || code.length < 6) && validatorMsg.code}
							fullWidth
							value={code}
							onChange={(e) => {
								setCode(e.target.value);
							}}
						/>
					</Grid>
					<Grid
						item
						xs={4}
						className={classes.textField}>
						<TextField
							className={classes.Error}
							label="* Age"
							type="number"
							helperText={age ? '' : validatorMsg.age}
							fullWidth
							value={age}
							onChange={(e) => {
								setAge(e.target.value);
							}}
						/>
					</Grid>
					<Grid
						item
						xs={4}
						className={classes.textField}>
						<TextField
							className={classes.Error}
							label="* Phone"
							type="number"
							helperText={(!phone || phone.length > 10) && validatorMsg.phone}
							fullWidth
							value={phone}
							onChange={(e) => {
								setPhone(e.target.value);
							}}
						/>
					</Grid>
				</Grid>
				<Grid className={classes.groupInput}>
					<Grid
						xs={5}
						className={classes.textField}>
						<FormControl fullWidth>
							<InputLabel>Provinces</InputLabel>
							<Select
								defaultValue=""
								onChange={(e) => {
									setProvince(e.target.value);
								}}>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>

								{provincesData.map((province) => (
									<MenuItem
										color="primary"
										value={province}
										key={province.id}>
										{province.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<p className={classes.p}>{province ? '' : validatorMsg.province}</p>
					</Grid>
					<Grid
						xs={5}
						className={classes.textField}>
						<FormControl fullWidth>
							<InputLabel>District</InputLabel>
							<Select
								defaultValue=""
								onChange={(e) => {
									setDistrict(e.target.value);
								}}>
								<ListSubheader color="primary">Nam Định</ListSubheader>
								{districtsData
									.filter((district) => {
										var districts = district.name.toLowerCase();
										if (
											districts === 'hai hau' ||
											districts === 'tp nam dinh' ||
											districts === 'nghia hung'
										) {
											return district;
										}
									})
									.map((district) => (
										<MenuItem
											value={district}
											key={district.id}>
											{district.name}
										</MenuItem>
									))}
								<ListSubheader color="primary">Thanh Hóa</ListSubheader>
								{districtsData
									.filter((district) => {
										var districts = district.name.toLowerCase();
										if (
											districts === 'hoang hoa' ||
											districts === 'bim son' ||
											districts === 'nghi son'
										) {
											return district;
										}
									})
									.map((district) => (
										<MenuItem
											value={district}
											key={district.id}>
											{district.name}
										</MenuItem>
									))}
								<ListSubheader color="primary">Hà Nội</ListSubheader>
								{districtsData
									.filter((district) => {
										var districts = district.name.toLowerCase();
										if (
											districts === 'dong da' ||
											districts === 'cau giay' ||
											districts === 'thanh xuan'
										) {
											return district;
										}
									})
									.map((district) => (
										<MenuItem
											value={district}
											key={district.id}>
											{district.name}
										</MenuItem>
									))}
							</Select>
						</FormControl>
						<p className={classes.p}>{district ? '' : validatorMsg.district}</p>
					</Grid>
					<Grid
						xs={5}
						className={classes.textField}>
						<FormControl fullWidth>
							<InputLabel>Commune</InputLabel>
							<Select
								defaultValue=""
								onChange={(e) => {
									setCommune(e.target.value);
								}}>
								{district && (
									<ListSubheader color="primary">{district.name}</ListSubheader>
								)}
								{district &&
									communesData
										.filter((commune) => {
											if (commune.district.id === district.id) return commune;
										})
										.map((commune) => (
											<MenuItem
												key={commune.id}
												value={commune}>
												{commune.name}
											</MenuItem>
										))}
							</Select>
						</FormControl>
						<p className={classes.p}>{commune ? '' : validatorMsg.commune}</p>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions className={classes.groupButton}>
				<Grid>
					<Button
						style={{
							marginRight: '10px',
						}}
						variant="contained"
						color="secondary"
						onClick={() => {
							props.handleClose();
							setValidatorMsg('');
						}}>
						Hủy
					</Button>
					<Button
						variant="contained"
						type="submit"
						color="primary"
						onClick={(e) => {
							handleSubmit(e);
						}}>
						{props.employeeData.id ? 'Lưu' : 'Thêm'}
					</Button>
				</Grid>
			</DialogActions>
		</Dialog>
	);
}
