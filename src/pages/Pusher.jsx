/** @format */

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useBooking } from '../hooks/useBooking';
import Booking from './Booking';
import PageNotFound from './PageNotFound';

export default function Pusher() {
	const { callerTab, insertValue } = useBooking();
	console.log(callerTab);
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
			className='flex justify-between'
			sx={{ width: '100%' }}
		>
			<Box
				sx={{
					margin: '1vh auto',
					width: '50%', // Adjusting the width to 50% for the first child Box
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
							label={index === 0 ? 'New' : item.PhoneNumber}
							key={index}
						/>
					))}
				</Tabs>

				<Box>
					{callerTab.length === 0 ? (
						<PageNotFound message='No New Callers Found' />
					) : (
						<Booking
							bookingData={callerTab[value]}
							key={value}
							insertValue={insertValue}
							id={value}
						/>
					)}
				</Box>
			</Box>
			<Box
				className='w-[50vw]'
				sx={{ width: '50%', padding: 1 }}
			>
				<div className='flex gap-1 flex-col'>
					<div className='w-full h-[40vh] bg-gray-400 m-auto'>map</div>
					<div className='flex justify-between w-full h-full gap-1'>
						<div className='w-full h-full bg-pink-400'>part 1</div>
						<div className='w-full h-full bg-green-400'>part 2</div>
					</div>
				</div>
			</Box>
		</Box>
	);
}
