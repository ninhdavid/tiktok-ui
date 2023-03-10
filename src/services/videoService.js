import * as httpRequest from '~/utils/httpRequest';

export const getVideos = async ({ type, page, accessToken = '' }) => {
	try {
		return await httpRequest.get('videos', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			params: {
				type: type,
				page: page,
			},
		});
	} catch (error) {
		console.log(error);
		return new Promise((resolve) =>
			setTimeout(() => resolve(getVideos({ type, page, accessToken })), 1000)
		);
	}
};
