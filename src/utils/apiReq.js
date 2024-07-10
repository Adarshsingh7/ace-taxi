/** @format */

// this function will fetch the bookings data from the server and store it in the local storage
const getBookingData = async function () {
	const accessToken = localStorage.getItem('authToken');
	if (!accessToken) return;
	const response = await fetch(
		'https://api.acetaxisdorset.co.uk/api/Bookings/DateRange',
		{
			method: 'POST',
			headers: {
				'accept': '*/*',
				'Authorization': `Bearer ${accessToken}`,
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
		return data;
	} else {
		console.log(response);
	}
};

export { getBookingData };
