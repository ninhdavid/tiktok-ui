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

export const likedVideo = async ({ videoId, videoUuid, accessToken = '' }) => {
	try {
		return await httpRequest.post(`videos/${videoId}/like`, videoUuid, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	} catch (error) {
		console.log(error);
	}
};
export const unLikedVideo = async ({
	videoId,
	videoUuid,
	accessToken = '',
}) => {
	try {
		return await httpRequest.post(`videos/${videoId}/unlike`, videoUuid, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	} catch (error) {
		console.log(error);
	}
};
