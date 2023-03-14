import { useState } from 'react';
import * as authService from '~/services/AuthService';

function useSignupAuth() {
	const [error, setError] = useState(null);

	function signupUser(username, password) {
		authService
			.signup(username, password)
			.then((data) => {
				if (data.meta && data.meta.token) {
					alert(username + ' has been successfully registered');
					console.log(data);
				} else {
					setError(username + ' is already registered');
				}
			})
			.catch((error) => {
				setError(error.message);
			});
	}
	return [signupUser, error];
}

export default useSignupAuth;
