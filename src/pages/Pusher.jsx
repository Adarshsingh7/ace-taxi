/** @format */

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useBooking } from '../hooks/useBooking';
import Booking from './Booking';

export default function ScrollableTabsButtonForce() {
	const { callerTab } = useBooking();
	const [value, setValue] = useState(
		callerTab.length - 1 >= 0 ? callerTab.length - 1 : 0
	);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		setValue(callerTab.length - 1 >= 0 ? callerTab.length - 1 : 0);
	}, [callerTab.length]);

	return (
		<Box
			sx={{
				margin: '1vh auto',
				width: {
					xs: '100%',
					sm: '95%',
					md: '80%',
					lg: '70%',
					xl: '50%',
				},
				borderColor: '#e5e7eb',
				borderWidth: '1px',
			}}
		>
			<Tabs
				value={value}
				sx={{ backgroundColor: '#e5e7eb' }}
				onChange={handleChange}
				variant='scrollable'
				scrollButtons
				allowScrollButtonsMobile
				aria-label='scrollable force tabs example'
			>
				{callerTab.map((item, index) => (
					<Tab
						label={`Caller ${index + 1}`}
						key={index}
					/>
				))}
			</Tabs>
			<Box>
				<Booking />
			</Box>
		</Box>
	);
}
