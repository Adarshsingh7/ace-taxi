/** @format */
import { Button, Switch, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import Dragger from '../components/Dragger';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { RRule } from 'rrule';
import { useBooking } from '../hooks/useBooking';

function Booking() {
	const { data, insertValue } = useBooking();
	const [returnBooking, setReturnBooking] = useState(false);
	const [pickupAddress, setPickupAddress] = useState('');
	const [pickupPostCode, setPickupPostCode] = useState('');
	const [destinationAddress, setDestinationAddress] = useState('');
	const [destinationPostCode, setDestinationPostCode] = useState('');
	const [bookingDetails, setBookingDetails] = useState('');
	const [price, setPrice] = useState('');
	const [hours, setHours] = useState('');
	const [minutes, setMinutes] = useState('');

	const [isPhoneModelActive, setIsPhoneModelActive] = useState(false);
	const [isRepeatBookingModelActive, setIsRepeatBookingModelActive] =
		useState(false);
	const [isAddVIAOpen, setIsAddVIAOpen] = useState(false);

	function toggleAddress() {
		setDestinationAddress(pickupAddress);
		setDestinationPostCode(pickupPostCode);
		setPickupAddress(destinationAddress);
		setPickupPostCode(destinationPostCode);
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log('submitted');
	}

	return (
		<div className='min-h-screen bg-background text-foreground p-4'>
			<form
				action=''
				onSubmit={handleSubmit}
			>
				<div className='max-w-3xl mx-auto bg-card p-6 rounded-lg shadow-lg'>
					<div className='mb-4'>
						<LongButton onClick={() => setIsPhoneModelActive(true)}>
							Phone Number Lookup
						</LongButton>
						{isPhoneModelActive && (
							<Modal
								open={isPhoneModelActive}
								setOpen={setIsPhoneModelActive}
							>
								<PhoneCheckModal setOpen={setIsPhoneModelActive} />
							</Modal>
						)}
					</div>

					<div className='flex items-center justify-between mb-4'>
						<div className='flex gap-5 flex-col md:flex-row'>
							<input
								required
								type='datetime-local'
								className='w-full bg-input text-foreground p-2 rounded-lg border border-border'
								value={new Date().toISOString().slice(0, 16)}
								onChange={() => {}}
							/>

							{returnBooking ? (
								<input
									disabled={returnBooking ? false : true}
									required
									type='datetime-local'
									className='w-full bg-input text-foreground p-2 rounded-lg border border-border'
								/>
							) : (
								<div></div>
							)}
						</div>
						<div className='flex gap-5 flex-col md:flex-row justify-between'>
							<div>
								<span className='mr-2'>Return</span>
								<Switch
									color='error'
									onClick={() => setReturnBooking(!returnBooking)}
								/>
							</div>
							<></>
						</div>
					</div>

					<div className='mb-4'>
						<LongButton onClick={() => setIsRepeatBookingModelActive(true)}>
							Repeat Booking
						</LongButton>
						<Modal
							open={isRepeatBookingModelActive}
							setOpen={setIsRepeatBookingModelActive}
						>
							<RepeatBooking onSet={setIsRepeatBookingModelActive} />
						</Modal>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
						<input
							type='text'
							placeholder='Pickup Address'
							className='w-full bg-input text-foreground p-2 rounded-lg border border-border'
							required
							value={pickupAddress}
							onChange={(e) => setPickupAddress(e.target.value)}
						/>
						<input
							type='text'
							placeholder='Post Code'
							required
							className='w-full bg-input text-foreground p-2 rounded-lg border border-border'
							value={pickupPostCode}
							onChange={(e) => setPickupPostCode(e.target.value)}
						/>
					</div>

					<div className='flex justify-center mb-4'>
						<button onClick={toggleAddress}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='currentColor'
								aria-hidden='true'
								className='h-7 w-7 text-red-600 mx-auto'
							>
								<path
									fillRule='evenodd'
									d='M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z'
									clipRule='evenodd'
								></path>
							</svg>
						</button>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
						<input
							type='text'
							placeholder='Destination Address'
							className='w-full bg-input text-foreground p-2 rounded-lg border border-border'
							value={destinationAddress}
							required
							onChange={(e) => setDestinationAddress(e.target.value)}
						/>
						<input
							type='text'
							placeholder='Post Code'
							className='w-full bg-input text-foreground p-2 rounded-lg border border-border'
							value={destinationPostCode}
							required
							onChange={(e) => setDestinationPostCode(e.target.value)}
						/>
					</div>

					<div className='mb-4'>
						<textarea
							placeholder='Booking Details'
							className='w-full bg-input text-foreground p-2 rounded-lg border border-border'
							value={bookingDetails}
							onChange={(e) => setBookingDetails(e.target.value)}
						></textarea>
					</div>

					<div className='mb-4'>
						<LongButton onClick={() => setIsAddVIAOpen(true)}>
							Add VIA
						</LongButton>
						<Modal
							open={isAddVIAOpen}
							setOpen={setIsAddVIAOpen}
						>
							<AddEditViaComponent onSet={setIsAddVIAOpen} />
						</Modal>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
						<div className='flex items-center'>
							<label className='mr-2'>Passengers</label>
							<select className='w-full bg-input text-foreground p-2 rounded-lg border border-border'>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
								<option>6</option>
								<option>7</option>
								<option>8</option>
								<option>9</option>
							</select>
						</div>
						<label className='flex items-center'>
							<span className='mr-2'>Charge From Base</span>
							<Switch color='error' />
						</label>
					</div>

					<div className='mb-4'>
						<LongButton>Get Quote</LongButton>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
						<div className='flex items-center gap-2'>
							<span>£</span>
							<input
								required
								type='number'
								placeholder='Driver Price (£)'
								className='w-full bg-input text-foreground p-2 rounded-lg border border-border'
								value={price}
								onChange={(e) =>
									setPrice((curr) => {
										const value = parseFloat(e.target.value);
										if (
											(!isNaN(value) && value >= 0) ||
											e.target.value === ''
										) {
											return value;
										} else return curr;
									})
								}
							/>
						</div>
						<div className='flex items-center'>
							<input
								type='number'
								placeholder='Hours'
								required
								className='w-full bg-input text-foreground p-2 rounded-lg border border-border'
								value={hours}
								onChange={(e) =>
									setHours((curr) => {
										const value = parseInt(e.target.value, 10);
										if (!isNaN(value) && value >= 0 && value <= 59) {
											return value;
										} else if (e.target.value === '') {
											return ''; // Allow clearing the input
										} else return curr; // Reset to the previous valid state
									})
								}
							/>
							<input
								type='number'
								required
								placeholder='Minutes'
								className='w-full bg-input text-foreground p-2 rounded-lg border border-border ml-2'
								value={minutes}
								onChange={(e) =>
									setMinutes((curr) => {
										const value = parseInt(e.target.value, 10);
										if (!isNaN(value) && value >= 0 && value <= 59) {
											return value;
										} else if (e.target.value === '') {
											return ''; // Allow clearing the input
										} else return curr; // Reset to the previous valid state
									})
								}
							/>
						</div>
						<label className='flex items-center'>
							<span className='mr-2'>All Day</span>
							<input
								type='checkbox'
								className='form-checkbox h-5 w-5 text-primary'
							/>
						</label>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
						<input
							required
							type='text'
							placeholder='Name'
							className='w-full bg-input text-foreground p-2 rounded-lg border border-border'
						/>
						<input
							required
							type='text'
							placeholder='Phone'
							className='w-full bg-input text-foreground p-2 rounded-lg border border-border'
						/>
					</div>

					<div className='mb-4'>
						<input
							required
							type='email'
							placeholder='Email'
							className='w-full bg-input text-foreground p-2 rounded-lg border border-border'
						/>
					</div>

					<div className='flex justify-between gap-5 mb-5'>
						<LongButton>Options</LongButton>
						<LongButton>Allocate Driver</LongButton>
					</div>

					<div className='flex justify-end space-x-4'>
						<button className='bg-muted text-muted-foreground px-4 py-2 rounded-lg bg-gray-100'>
							Cancel
						</button>
						<button
							className='bg-primary text-primary-foreground px-4 py-2 rounded-lg text-white bg-gray-900'
							type='submit'
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

function PhoneCheckModal({ setOpen }) {
	const [phone, setPhone] = useState('');
	function handleSetPhone(e) {
		const digit = e.target.value;

		// Allow empty string to handle deletions
		if (digit === '' || /^\d+$/.test(digit)) {
			if (digit.length <= 11) {
				setPhone(digit);
			}
		}
	}

	return (
		<div className='relative bg-card p-10 rounded-lg shadow-lg w-full max-w-md transform transition-transform bg-white'>
			<button
				className='absolute top-5 right-5'
				onClick={() => setOpen(false)}
			>
				❌
			</button>

			<div className='flex justify-center mb-10 rounded-full '>
				<span className='rounded-full bg-gray-300 p-3'>📞</span>
			</div>
			<div className='flex gap-5 mb-5'>
				<TextField
					// error
					// helperText='Incorrect entry.'
					id='standard-error-helper-text'
					label='Phone Number'
					variant='standard'
					value={phone}
					onChange={handleSetPhone}
					autoComplete='off'
				/>
				<div className='flex gap-2'>
					<Button
						variant='contained'
						color='info'
					>
						Search
					</Button>
					<Button
						color='error'
						onClick={() => setPhone('')}
					>
						Clear
					</Button>
				</div>
			</div>
			<div className='p-3 bg-gray-200 cursor-pointer rounded-lg hidden'>
				<h1>username</h1>
				<div className='flex text-sm text-gray-500 '>
					<span>Start Address</span>-<span>End Address</span>
				</div>
			</div>
		</div>
	);
}

function LongButton({ children, color = 'bg-red-700', ...props }) {
	return (
		<button
			className={`w-full bg-destructive text-destructive-foreground py-2 rounded-lg ${color} text-white hover:bg-opacity-80`}
			type='button'
			{...props}
		>
			{children}
		</button>
	);
}

function RepeatBooking({ onSet }) {
	const [frequency, setFrequency] = useState('none');
	const [repeatEnd, setRepeatEnd] = useState('never');
	const [repeatEndValue, setRepeatEndValue] = useState('');
	const [selectedDays, setSelectedDays] = useState({
		sun: false,
		mon: false,
		tue: false,
		wed: false,
		thu: false,
		fri: false,
		sat: false,
	});

	const handleClick = (day) => {
		setSelectedDays((prevDays) => ({
			...prevDays,
			[day]: !prevDays[day],
		}));
	};

	const dayLabels = [
		{ key: 'sun', label: 'S' },
		{ key: 'mon', label: 'M' },
		{ key: 'tue', label: 'T' },
		{ key: 'wed', label: 'W' },
		{ key: 'thu', label: 'T' },
		{ key: 'fri', label: 'F' },
		{ key: 'sat', label: 'S' },
	];

	function submitForm(e) {
		e.preventDefault();
		console.log('submit initiated');
		console.log(
			calculateRecurrenceRule(frequency, repeatEndValue, selectedDays)
		);
	}

	const calculateRecurrenceRule = (frequency, repeatEndValue, selectedDays) => {
		const daysOfWeek = {
			sun: RRule.SU,
			mon: RRule.MO,
			tue: RRule.TU,
			wed: RRule.WE,
			thu: RRule.TH,
			fri: RRule.FR,
			sat: RRule.SA,
		};

		const selectedWeekDays = Object.keys(selectedDays)
			.filter((day) => selectedDays[day])
			.map((day) => daysOfWeek[day]);

		const ruleOptions = {
			freq:
				frequency === 'daily'
					? RRule.DAILY
					: frequency === 'weekly'
					? RRule.WEEKLY
					: frequency === 'monthly'
					? RRule.MONTHLY
					: null,
			byweekday: selectedWeekDays,
		};

		if (repeatEndValue) {
			ruleOptions.until = new Date(repeatEndValue);
		}

		if (!ruleOptions.freq) {
			return '';
		}

		const rule = new RRule(ruleOptions);
		return rule.toString();
	};

	useEffect(() => {
		if (repeatEnd === 'never') setRepeatEndValue('');
		if (frequency === 'none') {
			setRepeatEnd('never');
			setSelectedDays({
				sun: false,
				mon: false,
				tue: false,
				wed: false,
				thu: false,
				fri: false,
				sat: false,
			});
		}
	}, [repeatEnd, frequency]);

	return (
		<form className='p-4 bg-card shadow rounded-lg max-w-lg mx-auto mt-6 bg-white'>
			<div className='flex justify-between items-center mb-4'>
				<p className='text-xl font-bold'>Repeat Booking</p>
				<div className='flex items-center'></div>
			</div>
			<div className='space-y-4'>
				<div>
					<label
						htmlFor='frequency'
						className='block text-sm font-medium text-foreground mb-1'
					>
						Frequency
					</label>
					<select
						id='frequency'
						className='border border-border rounded-md p-2 w-full bg-input text-foreground focus:ring-primary focus:border-primary'
						value={frequency}
						onChange={(e) => setFrequency(e.target.value)}
					>
						<option value='none'>None</option>
						<option value='daily'>Daily</option>
						<option value='weekly'>Weekly</option>
					</select>
				</div>
				{frequency === 'daily' ? null : (
					<>
						{frequency !== 'none' ? (
							<div>
								<label className='block text-sm font-medium text-foreground mb-1'>
									Days
								</label>
								<div className='flex space-x-2 justify-center'>
									{dayLabels.map(({ key, label }) => (
										<div
											key={key}
											className={`w-10 h-10 rounded-full text-white flex items-center justify-center cursor-pointer select-none ${
												selectedDays[key] ? 'bg-red-700' : 'bg-red-500'
											}`}
											onClick={() => handleClick(key)}
										>
											{label}
										</div>
									))}
								</div>
							</div>
						) : null}
					</>
				)}

				<div>
					<label
						htmlFor='repeat-end'
						className='block text-sm font-medium text-foreground mb-1'
					>
						Repeat End
					</label>
					{frequency !== 'none' ? (
						<select
							id='repeat-end'
							className='border border-border rounded-md p-2 w-full bg-input text-foreground focus:ring-primary focus:border-primary '
							value={repeatEnd}
							onChange={(e) => setRepeatEnd(e.target.value)}
						>
							<option value='never'>Never</option>
							<option value='until'>Until</option>
						</select>
					) : (
						<select
							disabled
							id='repeat-end'
							className='border border-border rounded-md p-2 w-full bg-input text-foreground focus:ring-primary focus:border-primary'
							value={repeatEnd}
							onChange={(e) => setRepeatEnd(e.target.value)}
						>
							<option value='never'>Never</option>
							<option value='until'>Until</option>
						</select>
					)}
				</div>
				<div>
					<label
						htmlFor='end-date'
						className='block text-sm font-medium text-foreground mb-1'
					>
						Repeat End Date
					</label>
					{repeatEnd === 'until' ? (
						<input
							required
							type='date'
							value={repeatEndValue}
							onChange={(e) => setRepeatEndValue(e.target.value)}
							id='end-date'
							className='border border-border rounded-md p-2 w-full bg-input text-foreground focus:ring-primary focus:border-primary'
						/>
					) : (
						<input
							disabled
							type='date'
							value={repeatEndValue}
							onChange={() => {}}
							id='end-date'
							className='border border-border rounded-md p-2 w-full bg-input text-foreground focus:ring-primary focus:border-primary'
						/>
					)}
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<LongButton onClick={submitForm}>Confirm</LongButton>
					<LongButton
						color='bg-gray-700'
						onClick={() => onSet(false)}
					>
						Cancel
					</LongButton>
				</div>
			</div>
		</form>
	);
}

const AddEditViaComponent = ({ onSet }) => {
	const [vias, setVias] = useState([]);
	const [newViaAddress, setNewViaAddress] = useState('');
	const [newViaPostcode, setNewViaPostcode] = useState('');

	const handleAddVia = () => {
		if (newViaAddress || newViaPostcode) {
			setVias([
				...vias,
				{ address: newViaAddress, postcode: newViaPostcode, id: Date.now() },
			]);
			setNewViaAddress('');
			setNewViaPostcode('');
		}
	};

	return (
		<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto'>
			<h2 className='text-2xl font-semibold mb-4 flex items-center'>
				<svg
					className='h-6 w-6 text-gray-600 mr-2'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M9 11h6m-3-3v6m-4 4h8a2 2 0 002-2V7a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
					></path>
				</svg>
				Manage Via Points
			</h2>

			<div className='space-y-2 mb-4 max-h-[30vh] overflow-auto'>
				<Dragger
					items={vias}
					setItems={setVias}
					Child={VIABar}
				/>
			</div>

			<div className='space-y-4'>
				<input
					type='text'
					placeholder='Add Via Address'
					className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					value={newViaAddress}
					onChange={(e) => setNewViaAddress(e.target.value)}
					autoComplete='off'
				/>
				<input
					type='text'
					placeholder='Add Via Postcode'
					className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
					value={newViaPostcode}
					onChange={(e) => setNewViaPostcode(e.target.value)}
					autoComplete='off'
				/>
				<LongButton onClick={handleAddVia}>Add New Via</LongButton>
			</div>

			<div className='mt-4'>
				<LongButton
					color='bg-gray-700'
					onClick={() => onSet(false)}
				>
					Cancel
				</LongButton>
			</div>
		</div>
	);
};

function VIABar({ data, onEdit, isEditing, setEditingItem }) {
	const [newAddress, setNewAddress] = useState(data.address);
	const [newPostcode, setNewPostcode] = useState(data.postcode);

	useEffect(() => {
		setNewAddress(data.address);
		setNewPostcode(data.postcode);
	}, [data]);

	const handleEdit = () => {
		if (!newAddress && !newPostcode) return;
		onEdit({ ...data, address: newAddress, postcode: newPostcode });
	};

	return (
		<div className='flex gap-5 p-2 rounded'>
			{isEditing ? (
				<div className='flex flex-col gap-2'>
					<input
						className='border'
						value={newAddress}
						onChange={(e) => setNewAddress(e.target.value)}
					/>
					<input
						className='border'
						value={newPostcode}
						onChange={(e) => setNewPostcode(e.target.value)}
					/>
				</div>
			) : (
				<span>
					{data.address} {data.postcode}
				</span>
			)}
			<div className='space-x-2 m-auto'>
				{isEditing ? (
					<button
						className='text-blue-500 hover:text-blue-700'
						onClick={handleEdit}
					>
						<CheckCircleIcon fontSize='5px' />
					</button>
				) : (
					<button
						className='text-blue-500 hover:text-blue-700'
						onClick={() => setEditingItem(data)}
					>
						<EditIcon fontSize='5px' />
					</button>
				)}
			</div>
		</div>
	);
}
export default Booking;
