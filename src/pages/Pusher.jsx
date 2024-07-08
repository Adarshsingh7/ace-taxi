/** @format */
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';

// Pusher.logToConsole = true;

const pusher = new Pusher('8d1879146140a01d73cf', {
	cluster: 'eu',
});

const channel = pusher.subscribe('my-channel');

function Push() {
	const [messages, setMessages] = useState(null);

	useEffect(() => {
		function handleBind(data) {
			try {
				const parsedData = JSON.parse(data.message);
				setMessages(parsedData);
			} catch (error) {
				console.error('Failed to parse message data:', error);
			}
		}
		channel.bind('my-event', handleBind);

		return () => {
			channel.unbind('my-event', handleBind);
		};
	}, []);
	return (
		<div className=''>
			{!messages ? <h1>Waiting for messages...</h1> : null}
			{messages && <div>{JSON.stringify(messages)}</div>}
		</div>
	);
}

export default Push;
