import * as httpRequest from '~/utils/httpRequest';

export const getSuggestedUsers = async ({ page, perPage, accessToken }) => {
	try {
		const res = await httpRequest.get('users/suggested', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			params: {
				page,
				per_page: perPage,
			},
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
export const getFollowingUsers = async ({ page, accessToken }) => {
	try {
		const res = await httpRequest.get('me/followings', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			params: {
				page: page,
			},
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
export const followAnUser = async (userId, accessToken) => {
	try {
		return await httpRequest.post(`users/${userId}/follow`, [], {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	} catch (error) {
		console.log(error);
	}
};
export const unFollowAnUser = async (userId, accessToken) => {
	try {
		return await httpRequest.post(`users/${userId}/unfollow`, [], {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	} catch (error) {
		console.log(error);
	}
};
export const checkFollowedUser = async (userId, accessToken) => {
	try {
		const response = await httpRequest.get(`users/${userId}/followed`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		const data = response.data;
		console.log(data);
		return data.is_followed;
	} catch (error) {
		console.log(error);
	}
};
