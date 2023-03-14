import { useState } from 'react';
import * as authService from '~/services/AuthService';

function useLoginAuth() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [error, setError] = useState(null);

	function loginUser(username, password, state) {
		authService
			.login(username, password)
			.then((data) => {
				if (data.meta && data.meta.token) {
					localStorage.setItem('user', JSON.stringify(data));
					state(data);
					setIsLoggedIn(true);
				} else {
					setError('Username or password is invalid! Please try again');
				}
			})
			.catch((error) => {
				setError(error.message);
			});
	}

	return [loginUser, isLoggedIn, setIsLoggedIn, error];
}

export default useLoginAuth;
