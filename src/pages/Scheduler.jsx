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

const AceScheduler = () => {
	const [data, setData] = useState(
		JSON.parse(localStorage.getItem('bookings'))
	);
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
		// if (data) return;
		getBookingData().then((data) => {
			console.log(data);
			setData(data.bookings);
		});
	}, []);

	return (
		<ProtectedRoute>
			<ScheduleComponent
				currentView='Day'
				// selectedDate={new Date()}
				eventSettings={eventSettings}
				eventRendered={onEventRendered}
				// selectedDate={changeDate}
			>
				<Inject services={[Day, Agenda]} />
			</ScheduleComponent>
		</ProtectedRoute>
	);
};

export default AceScheduler;
