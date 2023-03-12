import * as httpRequest from '~/utils/httpRequest';

export const getVideos = async ({ type, page, accessToken = token }) => {
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

const token =
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3ODM1NjQwOSwiZXhwIjoxNjgwOTQ4NDA5LCJuYmYiOjE2NzgzNTY0MDksImp0aSI6IjJVNmZZOTRkcTRoOUhZR0siLCJzdWIiOjUyMjksInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.b6qHG8yTHVIAUMtKHgWlPJ5yX4p6ptmcnBuIbaKjlPY';

export const likedVideo = async ({
	videoId,
	videoUuid,
	accessToken = token,
}) => {
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
	accessToken = token,
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
