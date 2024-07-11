/** @format */
import { createContext, useEffect, useReducer, useState } from 'react';
import { getBookingData, handlePostReq } from './../utils/apiReq';
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
		PickupDateTime: new Date().toISOString().slice(0, 16),
		returnTime: '',
		isReturn: false,
		vias: [{ address: 'test address', postalCode: 'test postal', id: 0 }],
		Passengers: 5,
		hours: 0,
		minutes: 0,
		durationText: '',
		isAllDay: true,
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
			fri: true,
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
			return state.map((item, id) =>
				id === action.payload.itemIndex
					? { ...item, [action.payload.property]: action.payload.value }
					: item
			);
		case 'addData':
			return [...state, action.payload];
		case 'updateVia':
			return state.map((item, index) => {
				if (index === action.payload.itemIndex) {
					const updatedVias = item.vias.map((via, viaIndex) =>
						viaIndex === action.payload.viaIndex
							? { ...via, [action.payload.property]: action.payload.value }
							: via
					);
					return { ...item, vias: updatedVias };
				}
				return item;
			});
		case 'addVia':
			return state.map((item, index) => {
				if (index === action.payload.itemIndex) {
					const newVia = {
						address: action.payload.property,
						postalCode: action.payload.property,
						id: item.vias.length,
					};
					return { ...item, vias: [...item.vias, newVia] };
				}
				return item;
			});
		case 'submitBooking':
			return (action.payload.itemIndex === 0) ?
				state.map((item, idx) => idx === 0 ? initState[0] : item) :
				state.filter((item, index) => index !== action.payload.itemIndex)
		default:
			throw new Error('invalid type');
	}
}

function BookingProvider({ children }) {
	const [data, dispacher] = useReducer(reducer, initState);
	const [callerId, setCallerId] = useState({});

	function updateValue(itemIndex, property, value) {
		dispacher({ type: 'updateValue', payload: { itemIndex, value, property } });
	}

	function insertData(data) {
		dispacher({ type: 'addData', payload: data });
	}

	function addVia(itemIndex, property, value) {
		dispacher({ type: 'addVia', payload: { itemIndex, property, value } });
	}

	async function onBooking(itemIndex) {
		const targetBooking  = data[itemIndex];
		const res = await handlePostReq(JSON.stringify(targetBooking));
		console.log(res);
		dispacher({type: 'submitBooking', payload: {itemIndex}})
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

	// this use effect will refresh the booking every single minute
	useEffect(() => {
		const refreshData = setInterval(getBookingData, 1000 * 60);
		return () => {
			clearInterval(refreshData);
		};
	}, []);

	return (
		<BookingContext.Provider
			value={{
				data,
				callerId,
				updateValue,
				onBooking,
				insertData,
				callerTab: data,
				addVia,
			}}
		>
			{children}
		</BookingContext.Provider>
	);
}

export { BookingProvider, BookingContext };
