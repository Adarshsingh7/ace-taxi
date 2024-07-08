/** @format */

import { createContext, useReducer } from 'react';

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
	const [data, dispacher] = useReducer(reducer, initState);

	function insertValue(value) {
		dispacher({ type: 'insertData', payload: value });
	}

	return (
		<BookingContext.Provider value={{ data, insertValue }}>
			{children}
		</BookingContext.Provider>
	);
}

export { BookingProvider, BookingContext };
