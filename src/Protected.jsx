/** @format */

import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';
import Loader from './components/Loader';

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const { isAuth, isLoading } = useAuth();

	useEffect(() => {
		if (isLoading) return;
		if (!isAuth) {
			navigate('/login');
		}
	}, [isAuth, navigate, isLoading]);

	if (isLoading)
		<Loader
			loading
			background='#2ecc71'
			loaderColor='#3498db'
		/>;

	return <>{children}</>;
};

export default ProtectedRoute;
