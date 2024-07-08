/** @format */

import { createContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pusher from 'pusher-js';

// connect to pusher for the caller id event
const pusher = new Pusher('8d1879146140a01d73cf', {
	cluster: 'eu',
});

// subscribing to a channel for caller id
const channel = pusher.subscribe('my-channel');

const BookingContext = createContext();

const initState = {
	returnBooking: false,
	pickupAddress: '',
	pickupPostCode: '',
	destinationAddress: '',
	destinationPostCode: '',
	pickupDateTime: new Date().toISOString().slice(0, 16),
	returnTime: '',
	isReturn: false,
	vias: [{ address: '', postalCode: '', id: 0 }],
	passengers: 1,
	durationMinutes: 0,
	durationText: '',
	isAllDay: false,
	passengerName: '',
	phoneNumber: '',
	email: '',
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
		fri: false,
		sat: false,
	},
	bookingDetails: '',
	price: '',
	changeFromBase: 'false',
	paymentStatus: 'none',
	driver: {},
};

function reducer(state, action) {
	switch (action.type) {
		case 'insertData':
			return { ...state, ...action.payload };
		default:
			throw new Error('invalid type');
	}
}

function BookingProvider({ children }) {
	const navigate = useNavigate();
	const [callerId, setCallerId] = useState([]);
	const [data, dispacher] = useReducer(reducer, initState);

	function insertValue(value) {
		dispacher({ type: 'insertData', payload: value });
	}

	// this is the caller id use effect when we will get event the it will basically navigate to the pusher page
	useEffect(() => {
		function handleBind(data) {
			// navigate('/pusher');
			try {
				const parsedData = JSON.parse(data.message);
				console.log(parsedData);
				setCallerId((prev) => [...prev, parsedData]);
			} catch (error) {
				console.error('Failed to parse message data:', error);
			}
		}
		channel.bind('my-event', handleBind);
		return () => {
			channel.unbind('my-event', handleBind);
		};
	}, [navigate]);

	// this function will fetch the bookings data from the server and store it in the local storage
	const fetchReq = async function () {
		const response = await fetch(
			'https://api.acetaxisdorset.co.uk/api/Bookings/DateRange',
			{
				method: 'POST',
				headers: {
					'accept': '*/*',
					'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					from: '2024-07-07T00:00',
					to: '2024-07-09T23:59',
				}),
			}
		);
		if (response.ok) {
			const data = await response.json();
			localStorage.setItem('bookings', JSON.stringify(data.bookings));
			// console.log(data.bookings);
		} else {
			console.log(response);
		}
	};

	// this use effect will refresh the booking every single minute
	useEffect(() => {
		const refreshData = setInterval(fetchReq, 1000 * 60);
		return () => {
			clearInterval(refreshData);
		};
	});

	return (
		<BookingContext.Provider value={{ data, insertValue, callerId }}>
			{children}
		</BookingContext.Provider>
	);
}

export { BookingProvider, BookingContext };
