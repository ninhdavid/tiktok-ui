import { useState } from 'react';
import * as userService from '~/services/userService';

function useFollowAnUser() {
	const [isFollow, setIsFollow] = useState();
	function followedUser(userId, accessToken) {
		userService
			.followAnUser(userId, accessToken)
			.then((data) => {
				if (data) {
					setIsFollow(data.is_followed);
				} else {
					console.log('Fail to follow user');
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	function unFollowedUser(userId, accessToken) {
		userService
			.unFollowAnUser(userId, accessToken)
			.then((data) => {
				if (data) {
					setIsFollow(data.is_followed);
				} else {
					console.log('Fail to unfollow user');
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	return [followedUser, unFollowedUser, isFollow, setIsFollow];
}

export default useFollowAnUser;
