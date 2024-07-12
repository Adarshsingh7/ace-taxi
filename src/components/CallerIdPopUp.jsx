/** @format */

import Modal from './Modal';
import { useBooking } from '../hooks/useBooking';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tabButtonClass =
	'w-1/2 py-2 text-center text-zinc-600 hover:text-zinc-800 focus:outline-none';
const activeTabButtonClass = 'border-b-2 border-black';
const hiddenContentClass = 'hidden';

function CallerIdPopUp() {
	const { callerId, insertData } = useBooking();
	const [activeTab, setActiveTab] = useState('tab1');
	const [open, setOpen] = useState(callerId.length ? true : false);
	const navigate = useNavigate();

	function filterFiled(data) {
		return {
			returnBooking: false,
			PickupAddress: data.PickupAddress,
			PickupPostCode: data.PickupPostCode,
			DestinationAddress: data.DestinationAddress,
			DestinationPostCode: data.DestinationPostCode,
			PickupDateTime: data.PickupDateTime,
			returnTime: '',
			isReturn: false,
			vias: [{}],
			Passengers: data.Passengers,
			hours: data.hours || 0,
			minutes: data.minutes,
			durationText: '5',
			isAllDay: true,
			PassengerName: data.PassengerName,
			PhoneNumber: data.PhoneNumber,
			Email: data.Email,
			repeatBooking: false,
			recurrenceRule: '',
			frequency: 'none',
			repeatEnd: 'never',
			repeatEndValue: '',
			selectedDays: {
				sun: false,
				mon: false,
				tue: false,
				wed: false,
				thu: false,
				fri: true,
				sat: false,
			},
			bookingDetails: '',
			Price: data.Price,
			changeFromBase: 'false',
			paymentStatus: 'none',
			driver: {},
		};
	}

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
		insertData(filterFiled(data));

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

function TabContainer({ children, activeTab, switchTab, onOpen }) {
	const { callerId } = useBooking();

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
				onClick={() => onOpen(false)}
				className='w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/80 focus:outline-none bg-black'
			>
				suspend
			</button>
		</div>
	);
}

export default CallerIdPopUp;
