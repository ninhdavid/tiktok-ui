import * as httpRequest from '~/utils/httpRequest';

export const login = async (email, password) => {
	try {
		return await httpRequest.post('auth/login', {
			email: email,
			password: password,
		});
	} catch (error) {
		return error.response.data;
	}
};

export const signup = async (email, password) => {
	try {
		return await httpRequest.post('auth/register', {
			type: 'email',
			email: email,
			password: password,
		});
	} catch (error) {
		return error.response.data;
	}
};
