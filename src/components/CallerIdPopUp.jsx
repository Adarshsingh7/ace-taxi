/** @format */

import Modal from './Modal';
import { useBooking } from '../hooks/useBooking';
import { useEffect, useState } from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link, useNavigate } from 'react-router-dom';

const tabButtonClass =
	'w-1/2 py-2 text-center text-zinc-600 hover:text-zinc-800 focus:outline-none';
const activeTabButtonClass = 'border-b-2 border-black';
const hiddenContentClass = 'hidden';

function CallerIdPopUp() {
	const { callerId, callerTab } = useBooking();
	const [activeTab, setActiveTab] = useState('tab1');
	const [open, setOpen] = useState(callerId.length ? true : false);

	console.log({ callerId, callerTab });

	// the simple use effect to open the popup or modal
	useEffect(() => {
		if (callerId.Telephone) {
			setOpen(true);
		}
	}, [callerId]);

	const switchTab = (tab) => {
		setActiveTab(tab);
	};

	// if (!callerId.Telephone) return null;

	return (
		<Modal
			open={open}
			setOpen={setOpen}
		>
			<TabContainer
				activeTab={activeTab}
				switchTab={switchTab}
				onOpen={setOpen}
			>
				<>
					{/* current tab */}
					<div
						id='account-content'
						className={`p-4 ${activeTab === 'tab1' ? '' : hiddenContentClass}`}
					>
						<h2 className='text-xl font-bold mb-2'>this is tab 1</h2>
						<p>the current content will be displayed here</p>
					</div>
					{/* previous tab */}
					<div
						className={`p-4 ${activeTab === 'tab2' ? '' : hiddenContentClass}`}
					>
						<h2 className='text-xl font-bold mb-2'>this is tab 2</h2>
						<p>the current content will be displayed here</p>
					</div>
				</>
			</TabContainer>
		</Modal>
	);
}

function TabContainer({ children, activeTab, switchTab, onOpen }) {
	const { callerId, onCallerTab } = useBooking();
	const navigate = useNavigate();

	function handleSubmit() {
		if (activeTab === 'tab1') {
			onCallerTab({
				type: 'Current',
				data: callerId.Current || 'current content from caller id',
			});
		} else if (activeTab === 'tab2') {
			onCallerTab({
				type: 'Previous',
				data: callerId.Current || 'previous content from caller id',
			});
		}
		navigate('/pusher');
		onOpen(false);
	}

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
				onClick={handleSubmit}
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
