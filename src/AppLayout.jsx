/** @format */

import { Outlet } from 'react-router-dom';
import Header from './ui/Header';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

function AppLayout() {
	return (
		<AuthProvider>
			<BookingProvider>
				<Header />
				<Outlet />
			</BookingProvider>
		</AuthProvider>
	);
}

export default AppLayout;
