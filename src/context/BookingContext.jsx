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

const initState = [
	{
		returnBooking: false,
		PickupAddress: '12/6',
		PickupPostCode: '',
		DestinationAddress: '',
		DestinationPostCode: '',
		pickupDateTime: new Date().toISOString().slice(0, 16),
		returnTime: '',
		isReturn: false,
		vias: [{ address: '', postalCode: '', id: 0 }],
		passengers: 1,
		minutes: 0,
		durationText: '',
		isAllDay: false,
		PassengerName: '',
		PhoneNumber: '',
		Email: 'adarsh@admin.in',
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
		Price: '',
		changeFromBase: 'false',
		paymentStatus: 'none',
		driver: {},
	},
];

function reducer(state, action) {
	switch (action.type) {
		case 'updateValue':
			return state.map((item) =>
				item.id === action.payload.id
					? { ...item, [action.payload.property]: action.payload.value }
					: item
			);
		case 'addData':
			return [...state, action.payload];
		default:
			throw new Error('invalid type');
	}
}

function BookingProvider({ children }) {
	const [data, dispacher] = useReducer(reducer, initState);
	const [callerId, setCallerId] = useState({});

	function insertValue(id, property, value) {
		dispacher({ type: 'insertData', payload: { id, value, property } });
	}

	function insertData(data) {
		dispacher({ type: 'insertData', payload: data });
	}

	// this is the caller id use effect it will trigger dialog box when the caller id is received
	useEffect(() => {
		function handleBind(data) {
			try {
				const parsedData = JSON.parse(data.message);
				console.log(parsedData);
				setCallerId(parsedData);
			} catch (error) {
				console.error('Failed to parse message data:', error);
			}
		}
		channel.bind('my-event', handleBind);
		return () => {
			channel.unbind('my-event', handleBind);
		};
	}, []);

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
					from: '2024-07-08T00:00',
					to: '2024-07-10T23:59',
				}),
			}
		);
		if (response.ok) {
			const data = await response.json();
			localStorage.setItem('bookings', JSON.stringify(data.bookings));
		} else {
			console.log(response);
		}
	};

	// caller tab confirm setter function
	function onCallerTab(newCaller) {
		insertData((prev) => [...prev, newCaller]);
	}

	// this use effect will refresh the booking every single minute
	useEffect(() => {
		const refreshData = setInterval(fetchReq, 1000 * 60);
		return () => {
			clearInterval(refreshData);
		};
	});

	return (
		<BookingContext.Provider
			value={{
				data,
				insertValue,
				callerId,
				onCallerTab: insertData,
				callerTab: data,
			}}
		>
			{children}
		</BookingContext.Provider>
	);
}

export { BookingProvider, BookingContext };
