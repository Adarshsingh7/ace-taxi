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
const initData = [
	{
		regNo: 'HV09 WLA',
		backgroundColorRGB: '#fefb67ff',
		fullname: 'Lee Christopher',
		bookingId: 39033,
		userId: 9,
		cancelledOnArrival: false,
		cellText: ' Jack Reader ',
		hasDetails: '',
		status: null,
		endTime: '2024-07-05T12:40:00',
		dateCreated: '2024-06-10T07:53:37.7011387',
		bookedByName: 'ACE TAXIS',
		cancelled: false,
		details: '',
		email: '',
		durationMinutes: 30,
		isAllDay: false,
		passengerName: 'Jack Reader ',
		passengers: 1,
		paymentStatus: 0,
		confirmationStatus: null,
		scope: 1,
		phoneNumber: '',
		pickupAddress: 'Gillingham School',
		pickupDateTime: '2024-07-05T12:10:00',
		pickupPostCode: 'SP8  4QP',
		destinationAddress: '34 Fountain Mead. Shaftesbury. Dorset',
		destinationPostCode: 'SP7 8DE',
		vias: [],
		recurrenceException: null,
		recurrenceID: 1307720009,
		recurrenceRule:
			'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;UNTIL=20240720;',
		updatedByName: 'Lee Christopher',
		cancelledByName: '',
		price: 23,
		priceAccount: 44,
		mileage: null,
		mileageText: null,
		durationText: null,
		chargeFromBase: false,
		actionByUserId: 9,
		accountNumber: 9015,
		parkingCharge: 0,
		waitingTimeMinutes: 0,
	},

	{
		regNo: 'BG67 XOF',
		backgroundColorRGB: '#59c4f7ff',
		fullname: 'Rob Holton',
		bookingId: 42763,
		userId: 6,
		cancelledOnArrival: false,
		cellText: ' (MPV): Gillingham station -- Guys Marsh',
		hasDetails: '',
		status: 1,
		endTime: '2024-07-05T12:25:00',
		dateCreated: '0001-01-01T00:00:00',
		bookedByName: 'Lee Christopher',
		cancelled: false,
		details: '',
		email: '',
		durationMinutes: 12,
		isAllDay: false,
		passengerName: 'Shavkot',
		passengers: 5,
		paymentStatus: 0,
		confirmationStatus: null,
		scope: 0,
		phoneNumber: '',
		pickupAddress: 'Gillingham station',
		pickupDateTime: '2024-07-05T12:05:00',
		pickupPostCode: 'SP8  4PZ',
		destinationAddress: 'Guys Marsh',
		destinationPostCode: 'SP7  0AH',
		vias: [],
		recurrenceException: null,
		recurrenceID: null,
		recurrenceRule: null,
		updatedByName: 'Lee Christopher',
		cancelledByName: '',
		price: 25,
		priceAccount: 0,
		mileage: 5.4,
		mileageText: '5.4 Miles',
		durationText: '0 Hour(s) 12 Minutes',
		chargeFromBase: false,
		actionByUserId: 9,
		accountNumber: null,
		parkingCharge: 0,
		waitingTimeMinutes: 0,
	},
];

const AceScheduler = () => {
	const data = JSON.parse(localStorage.getItem('bookings'));
	const fieldsData = {
		id: 'bookingId',
		subject: { name: 'bookedByName' },
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

	const changeDate = (newDate) => {
		// Logic to update the selectedDate state variable
	};

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
