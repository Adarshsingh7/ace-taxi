/** @format */

import {
	ScheduleComponent,
	Day,
	Agenda,
	Inject,
} from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(
	'Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXhedHVUQ2hYVkN2V0c='
);

import './scheduler.css';
import ProtectedRoute from '../utils/Protected';
import { getBookingData } from '../utils/apiReq';
import { useEffect, useState } from 'react';
import Snackbar from '../components/SnackBar';

const AceScheduler = () => {
	const [open, setOpen] = useState(false);
	const [snackbarMessage, setSnackBarMessage] = useState('');
	const [data, setData] = useState();
	// localStorage.getItem('bookings')
	// 	? JSON.parse(localStorage.getItem('bookings'))
	// 	: []

	const fieldsData = {
		id: 'bookingId',
		subject: { name: 'passengerName' },
		isAllDay: { name: 'isAllDay' },
		startTime: { name: 'pickupDateTime' },
		endTime: { name: 'endTime' },
		OwnerColor: { name: 'backgroundColorRGB' },
		recurrenceRule: { name: 'recurrenceRule' },
		Readonly: { name: 'Readonly' },
	};

	const eventSettings = {
		dataSource: data,
		fields: fieldsData,
	};

	function onEventRendered(args) {
		args.element;
		args.element.style.backgroundColor = args.data.backgroundColorRGB;
	}

	useEffect(() => {
		getBookingData().then((data) => {
			console.log(data);
			if (data.status === 'success') {
				setData(data.bookings);
				setSnackBarMessage('Booking Refreshed');
			} else {
				setSnackBarMessage(data.message);
			}
			setOpen(true);
		});
	}, []);

	return (
		<ProtectedRoute>
			<Snackbar
				message={snackbarMessage}
				open={open}
				isReset
				setOpen={setOpen}
			/>
			<ScheduleComponent
				currentView='Day'
				eventSettings={eventSettings}
				eventRendered={onEventRendered}
			>
				<Inject services={[Day, Agenda]} />
			</ScheduleComponent>
		</ProtectedRoute>
	);
};

export default AceScheduler;
