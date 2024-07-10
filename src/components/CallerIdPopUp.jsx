/** @format */

import Modal from './Modal';
import { useBooking } from '../hooks/useBooking';
import { useEffect, useState } from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link, useNavigate } from 'react-router-dom';

const tabButtonClass =
	'w-1/2 py-2 text-center text-zinc-600 hover:text-zinc-800 focus:outline-none';
const activeTabButtonClass = 'border-b-2 border-black';
const hiddenContentClass = 'hidden';

function CallerIdPopUp() {
	const { callerId, onCallerTab } = useBooking();
	const [activeTab, setActiveTab] = useState('tab1');
	const [open, setOpen] = useState(callerId.length ? true : false);
	const navigate = useNavigate();

	// the simple use effect to open the popup or modal
	useEffect(() => {
		if (callerId.Telephone) {
			setOpen(true);
		}
	}, [callerId]);

	const switchTab = (tab) => {
		setActiveTab(tab);
	};

	function handleSubmit(data) {
		if (activeTab === 'tab1') {
			onCallerTab({
				type: 'Current',
				data: data,
			});
		} else if (activeTab === 'tab2') {
			onCallerTab({
				type: 'Previous',
				data: data,
			});
		}

		navigate('/pusher');
		setOpen(false);
	}

	// if (!callerId.Telephone) return null;

	return (
		<Modal
			open={open}
			setOpen={setOpen}
		>
			<TabContainer
				activeTab={activeTab}
				switchTab={switchTab}
				onOpen={setOpen}
			>
				<>
					{/* current tab */}
					<div
						id='account-content'
						className={`p-4 ${activeTab === 'tab1' ? '' : hiddenContentClass}`}
					>
						<h2 className='text-xl font-bold mb-2'>this is tab 1</h2>
						<ul>
							{callerId?.Current?.length ? (
								<>
									{callerId.Current.map((el, i) => (
										<p
											onClick={() => handleSubmit(el)}
											key={i}
											className='line-clamp-2 mb-3 hover:underline cursor-pointer'
										>
											{el.PassengerName} (el.DestinationAddress)
										</p>
									))}
								</>
							) : (
								<p>No Data</p>
							)}
						</ul>
					</div>
					{/* previous tab */}
					<div
						className={`p-4 ${activeTab === 'tab2' ? '' : hiddenContentClass}`}
					>
						<h2 className='text-xl font-bold mb-2'>this is tab 2</h2>
						<ul>
							{callerId?.Previous?.length ? (
								<>
									{callerId.Previous.map((el, i) => (
										<p
											onClick={() => handleSubmit(el)}
											key={i}
											className='line-clamp-2 mb-3 hover:underline cursor-pointer'
										>
											{el.PassengerName} ({el.DestinationAddress})
										</p>
									))}
								</>
							) : (
								<p>No Data</p>
							)}
						</ul>
					</div>
				</>
			</TabContainer>
		</Modal>
	);
}

const initialBookingData = {
	returnBooking: false, // or true, depending on what you want to test
	pickupAddress: '123 Test St',
	pickupPostCode: '12345',
	destinationAddress: '456 Destination Ave',
	destinationPostCode: '67890',
	bookingDetails: 'Some details about the booking',
	price: '100', // Assuming price is a string. Adjust if it's meant to be a number.
	hours: '2', // Assuming hours is a string. Adjust if it's meant to be a number.
	minutes: '30', // Assuming minutes is a string. Adjust if it's meant to be a number.
	passengerName: 'John Doe',
	email: 'test@user.in',
	phone: '1234567890',
};

function TabContainer({ children, activeTab, switchTab, onOpen }) {
	const { callerId, onCallerTab } = useBooking();
	const navigate = useNavigate();

	function handleSubmit() {
		if (activeTab === 'tab1') {
			onCallerTab({
				type: 'Current',
				data: initialBookingData || 'current content from caller id',
			});
		} else if (activeTab === 'tab2') {
			onCallerTab({
				type: 'Previous',
				data: callerId.Previous || 'previous content from caller id',
			});
		}
		navigate('/pusher');
		onOpen(false);
	}

	return (
		<div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
			<h1 className='font-bold text-2xl w-full m-auto'>{callerId.Telephone}</h1>
			<div className='flex border-b border-zinc-200'>
				<button
					className={`${tabButtonClass} ${
						activeTab === 'tab1' ? activeTabButtonClass : ''
					}`}
					onClick={() => switchTab('tab1')}
				>
					Current
				</button>
				<button
					className={`${tabButtonClass} ${
						activeTab === 'tab2' ? activeTabButtonClass : ''
					}`}
					onClick={() => switchTab('tab2')}
				>
					Previous
				</button>
			</div>
			{children}
			<button
				type='submit'
				onClick={handleSubmit}
				className='w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/80 focus:outline-none bg-black'
			>
				view booking{' '}
				<ArrowOutwardIcon
					color='white'
					fontSize='24px'
				/>
			</button>
		</div>
	);
}

export default CallerIdPopUp;
