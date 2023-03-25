import { useState } from 'react';
import * as authService from '~/services/AuthService';

function useSignupAuth() {
	const [error, setError] = useState(null);
	const [isSignUp, setIsSignup] = useState(false);

	function signupUser(username, password, stateToast) {
		authService
			.signup(username, password)
			.then((data) => {
				if (data.meta && data.meta.token) {
					alert(username + ' has been successfully registered');
					setTimeout(() => {
						setIsSignup(true);
					}, 1000);
				} else {
					setError(username + ' is already registered');
					stateToast(true);
				}
			})
			.catch((error) => {
				setError(error.message);
			});
	}
	return [signupUser, isSignUp, error];
}

export default useSignupAuth;
