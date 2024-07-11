/** @format */

import axios from 'axios';

// this function will fetch the bookings data from the server and store it in the local storage
function createObjectForToday(today = new Date()) {
	// Set time to 18:30:00
	today.setHours(18, 30, 0, 0); // Hours, Minutes, Seconds, Milliseconds

	// Calculate "to" date by adding 24 hours
	const toDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);

	// Format dates in ISO 8601
	const formattedFrom = today.toISOString();
	const formattedTo = toDate.toISOString();

	return {
		from: formattedFrom,
		to: formattedTo,
	};
}

function setHeaders() {
	const accessToken = localStorage.getItem('authToken');
	if (!accessToken) return {};
	return {
		'accept': '*/*',
		'Authorization': `Bearer ${accessToken}`,
		'Content-Type': 'application/json',
	};
}

const getBookingData = async function () {
	try {
		const accessToken = localStorage.getItem('authToken');
		if (!accessToken) return;
		const URL = import.meta.env.VITE_API_ACE_TEST;
		const response = await fetch(`${URL}/api/Bookings/DateRange`, {
			method: 'POST',
			headers: setHeaders(),
			body: JSON.stringify(createObjectForToday()),
		});
		if (response.ok) {
			const data = await response.json();
			localStorage.setItem('bookings', JSON.stringify(data.bookings));
			return data;
		} else {
			console.log(response);
		}
	} catch (err) {
		console.log(err);
	}
};

function filterData(data) {
	return JSON.stringify({
		details: data.bookingDetails,
		email: data.Email,
		durationMinutes: data.durationText,
		isAllDay: data.isAllDay,
		passengerName: data.PassengerName,
		passengers: data.Passengers,
		paymentStatus: 0,
		scope: 0,
		phoneNumber: data.PhoneNumber,
		pickupAddress: data.PickupAddress,
		pickupDateTime:
			data.PickupDateTime || new Date().toISOString().slice(0, 16),
		pickupPostCode: data.PickupPostCode,
		destinationAddress: data.DestinationAddress,
		destinationPostCode: data.DestinationPostCode,
		recurrenceRule: data.recurrenceRule || null,
		recurrenceID: null,
		price: data.Price,
		priceAccount: 0,
		chargeFromBase: data.chargeFromBase || false,
		userId: data.userId || null,
		returnDateTime: data.ReturnDateTime || null,
		vias: data.vias,
		bookedByName: data.bookedByName || '',
	});
}

async function handlePostReq(data) {
	try {
		console.log(filterData(data));
		const URL = import.meta.env.VITE_API_ACE_TEST;
		const response = await fetch(`${URL}/api/Bookings/Create`, {
			method: 'POST',
			headers: setHeaders(),
			body: filterData(data),
		});
		if (response.ok) {
			const data = await response.json();
			console.log('data send successfully');
			return data;
		} else {
			console.log(response);
		}
	} catch (err) {
		console.log(err);
	}
}

async function getPoi(code) {
	try {
		const URL = `${import.meta.env.VITE_API_ACE_TEST}/api/LocalPOI/GetPOI`;
		const config = {
			headers: setHeaders(),
		};
		const body = { searchTerm: `${code}` };
		const { data } = await axios.post(URL, body, config);
		return data;
	} catch (err) {
		console.log(err);
	}
}

export { getBookingData, handlePostReq, getPoi };
