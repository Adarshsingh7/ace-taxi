/** @format */

import Modal from './Modal';
import { useBooking } from '../hooks/useBooking';
import { useEffect, useState } from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom';

const tabButtonClass =
	'w-1/2 py-2 text-center text-zinc-600 hover:text-zinc-800 focus:outline-none';
const activeTabButtonClass = 'border-b-2 border-black';
const hiddenContentClass = 'hidden';

function CallerIdPopUp() {
	const [activeTab, setActiveTab] = useState('tab1');

	const { callerId } = useBooking();
	console.log(callerId.length);
	const [open, setOpen] = useState(callerId.length ? true : false);

	useEffect(() => {
		if (callerId.length) setOpen(false);
		setOpen(true);
	}, [callerId.length]);

	const switchTab = (tab) => {
		setActiveTab(tab);
	};

	if (!callerId.Telephone) return null;

	return (
		<Modal
			open={open}
			setOpen={setOpen}
		>
			<TabContainer
				activeTab={activeTab}
				switchTab={switchTab}
			>
				<>
					{/* current tab */}
					<div
						id='account-content'
						className={`p-4 ${activeTab === 'tab1' ? '' : hiddenContentClass}`}
					>
						<h2 className='text-xl font-bold mb-2'>this is tab 1</h2>
						<ul>
							<li onClick={() => setOpen(false)}>
								<Link to='/pusher'>curr 1</Link>
							</li>
							<li onClick={() => setOpen(false)}>
								<Link to='/pusher'>curr 2</Link>
							</li>
							<li onClick={() => setOpen(false)}>
								<Link to='/pusher'>curr 3</Link>
							</li>
							<li onClick={() => setOpen(false)}>
								<Link to='/pusher'>curr 4</Link>
							</li>
						</ul>
					</div>
					{/* previous tab */}
					<div
						className={`p-4 ${activeTab === 'tab2' ? '' : hiddenContentClass}`}
					>
						<h2 className='text-xl font-bold mb-2'>this is tab 2</h2>
						<ul>
							<li onClick={() => setOpen(false)}>
								<Link to='/pusher'>prev 1</Link>
							</li>
							<li onClick={() => setOpen(false)}>
								<Link to='/pusher'>prev 2</Link>
							</li>
							<li onClick={() => setOpen(false)}>
								<Link to='/pusher'>prev 3</Link>
							</li>
							<li onClick={() => setOpen(false)}>
								<Link to='/pusher'>prev 4</Link>
							</li>
						</ul>
					</div>
				</>
			</TabContainer>
		</Modal>
	);
}

function TabContainer({ children, activeTab, switchTab }) {
	return (
		<div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
			<div className='flex border-b border-zinc-200'>
				<button
					className={`${tabButtonClass} ${
						activeTab === 'tab1' ? activeTabButtonClass : ''
					}`}
					onClick={() => switchTab('tab1')}
				>
					Current
				</button>
				<button
					className={`${tabButtonClass} ${
						activeTab === 'tab2' ? activeTabButtonClass : ''
					}`}
					onClick={() => switchTab('tab2')}
				>
					Previous
				</button>
			</div>
			{children}
			<button
				type='submit'
				className='w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/80 focus:outline-none bg-black'
			>
				view booking{' '}
				<ArrowOutwardIcon
					color='white'
					fontSize='24px'
				/>
			</button>
		</div>
	);
}

export default CallerIdPopUp;
