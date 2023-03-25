// import { useState } from 'react';
// import * as userService from '~/services/userService';
// import { AuthUserContext } from '~/context/AuthUserContext';

// function useFollowAnUser() {
// 	const [isFollow, setIsFollow] = useState();

// 	function followedUser(userId, accessToken) {
// 		userService
// 			.followAnUser(userId, accessToken)
// 			.then((data) => {
// 				if (data) {
// 					setIsFollow(data.is_followed);
// 				} else {
// 					console.log('Fail to follow user');
// 				}
// 			})
// 			.catch((error) => {
// 				console.log(error.message);
// 			});
// 	}
// 	function unFollowedUser(userId, accessToken) {
// 		userService
// 			.unFollowAnUser(userId, accessToken)
// 			.then((data) => {
// 				if (data) {
// 					setIsFollow(data.is_followed);
// 				} else {
// 					console.log('Fail to unfollow user');
// 				}
// 			})
// 			.catch((error) => {
// 				console.log(error.message);
// 			});
// 	}
// 	return [followedUser, unFollowedUser, isFollow, setIsFollow];
// }

// export default useFollowAnUser;

// import { useState, useEffect, useContext } from 'react';
// import * as userService from '~/services/userService';
// import { AuthUserContext } from '~/App';

// function useFollowAnUser(initialState) {
// 	const { authUser } = useContext(AuthUserContext);
// 	const [isFollowed, setIsFollowed] = useState(initialState);

// 	const followedUser = (userId, accessToken = authUser.meta.token) => {
// 		userService
// 			.followAnUser(userId, accessToken)
// 			.then((data) => {
// 				if (data) {
// 					setIsFollowed(data.is_followed);
// 				} else {
// 					console.log('Fail to follow user');
// 				}
// 			})
// 			.catch((error) => {
// 				console.log(error.message);
// 			});
// 	};

// 	const unFollowedUser = (userId, accessToken = authUser.meta.token) => {
// 		userService
// 			.unFollowAnUser(userId, accessToken)
// 			.then((data) => {
// 				if (data) {
// 					setIsFollowed(data.is_followed);
// 				} else {
// 					console.log('Fail to unfollow user');
// 				}
// 			})
// 			.catch((error) => {
// 				console.log(error.message);
// 			});
// 	};

// 	useEffect(() => {
// 		setIsFollowed(initialState);
// 	}, [initialState]);
// 	// useEffect(() => {
// 	// 	if (initialState === undefined) {
// 	// 		setIsFollowed(false);
// 	// 	} else {
// 	// 		setIsFollowed(initialState);
// 	// 	}
// 	// }, [initialState]);

// 	return [isFollowed, followedUser, unFollowedUser];
// }

// export default useFollowAnUser;

//3

// import { useReducer, useEffect, useContext } from 'react';
// import * as userService from '~/services/userService';
// import { AuthUserContext } from '~/App';

// const ACTIONS = {
// 	FOLLOW: 'follow',
// 	UNFOLLOW: 'unfollow',
// 	SET_IS_FOLLOWED: 'setIsFollowed',
// };

// function reducer(state, action) {
// 	switch (action.type) {
// 		case ACTIONS.FOLLOW:
// 			return { ...state, isFollowed: true };
// 		case ACTIONS.UNFOLLOW:
// 			return { ...state, isFollowed: false };
// 		case ACTIONS.SET_IS_FOLLOWED:
// 			return { ...state, isFollowed: action.payload };
// 		default:
// 			return state;
// 	}
// }

// function useFollowAnUser(initialState) {
// 	const { authUser } = useContext(AuthUserContext);
// 	const [state, dispatch] = useReducer(reducer, { isFollowed: initialState });

// 	useEffect(() => {
// 		if (initialState === undefined) {
// 			dispatch({ type: ACTIONS.SET_IS_FOLLOWED, payload: false });
// 		} else {
// 			dispatch({ type: ACTIONS.SET_IS_FOLLOWED, payload: initialState });
// 		}
// 	}, [initialState]);

// 	const followedUser = (userId, accessToken = authUser.meta.token) => {
// 		userService
// 			.followAnUser(userId, accessToken)
// 			.then((data) => {
// 				if (data) {
// 					dispatch({ type: ACTIONS.FOLLOW });
// 				} else {
// 					console.log('Fail to follow user');
// 				}
// 			})
// 			.catch((error) => {
// 				console.log(error.message);
// 			});
// 	};

// 	const unFollowedUser = (userId, accessToken = authUser.meta.token) => {
// 		userService
// 			.unFollowAnUser(userId, accessToken)
// 			.then((data) => {
// 				if (data) {
// 					dispatch({ type: ACTIONS.UNFOLLOW });
// 				} else {
// 					console.log('Fail to unfollow user');
// 				}
// 			})
// 			.catch((error) => {
// 				console.log(error.message);
// 			});
// 	};

// 	return [state.isFollowed, followedUser, unFollowedUser];
// }

// export default useFollowAnUser;

//4

// import {
// 	followAnUser,
// 	unFollowAnUser,
// 	checkFollowedUser,
// } from '~/services/userService';

// const initialState = {
// 	loading: true,
// 	error: null,
// 	isFollowed: false,
// };

// function reducer(state, action) {
// 	switch (action.type) {
// 		case 'follow_request':
// 		case 'unfollow_request':
// 			return { ...state, loading: true };
// 		case 'follow_success':
// 			return { ...state, loading: false, isFollowed: true };
// 		case 'unfollow_success':
// 			return { ...state, loading: false, isFollowed: false };
// 		case 'follow_failure':
// 		case 'unfollow_failure':
// 			return { ...state, loading: false, error: action.payload };
// 		case 'update_is_followed':
// 			return { ...state, isFollowed: action.payload };
// 		default:
// 			return state;
// 	}
// }
// function useFollowAnUser(initialState, dataId, authToken) {
// 	const [state, dispatch] = useReducer(reducer, initialState);

// 	useEffect(() => {
// 		dispatch({ type: 'follow_request' });
// 		checkFollowedUser(dataId, authToken)
// 			.then((response) => {
// 				dispatch({ type: 'update_is_followed', payload: response.isFollowed });
// 				dispatch({ type: 'follow_success' });
// 			})
// 			.catch((error) => {
// 				dispatch({ type: 'follow_failure', payload: error });
// 			});
// 	}, [dataId, authToken]);

// 	const handleFollow = () => {
// 		if (state.isFollowed) {
// 			dispatch({ type: 'unfollow_request' });
// 			unFollowAnUser(dataId, authToken)
// 				.then(() => {
// 					dispatch({ type: 'unfollow_success' });
// 					console.log('unfollow');
// 				})
// 				.catch((error) => {
// 					dispatch({ type: 'unfollow_failure', payload: error });
// 				});
// 		} else {
// 			dispatch({ type: 'follow_request' });
// 			followAnUser(dataId, authToken)
// 				.then(() => {
// 					console.log('follow');
// 					dispatch({ type: 'follow_success' });
// 				})
// 				.catch((error) => {
// 					dispatch({ type: 'follow_failure', payload: error });
// 				});
// 		}
// 	};

// 	return [state, handleFollow];
// }
// export default useFollowAnUser;

//5

// const initialState = {
// 	loading: false,
// 	error: null,
// 	isFollowed: false,
// };

// const followReducer = (state, action) => {
// 	switch (action.type) {
// 		case 'follow_request':
// 			return { ...state, loading: true };
// 		case 'follow_success':
// 			return { ...state, loading: false, isFollowed: true };
// 		case 'follow_failure':
// 			return { ...state, loading: false, error: action.payload };
// 		case 'unfollow_request':
// 			return { ...state, loading: true };
// 		case 'unfollow_success':
// 			return { ...state, loading: false, isFollowed: false };
// 		case 'unfollow_failure':
// 			return { ...state, loading: false, error: action.payload };
// 		case 'update_is_followed':
// 			return { ...state, isFollowed: action.payload };

// 		default:
// 			return state;
// 	}
// };

// export const useFollowAnUser = (user, initialAuthToken) => {
// 	const [isSubscribed, setIsSubscribed] = useState(user.is_followed);
// 	const [state, dispatch] = useReducer(followReducer, {
// 		...initialState,
// 		isFollowed: isSubscribed,
// 	});
// 	useEffect(() => {
// 		setIsSubscribed(user.is_followed);
// 		dispatch({
// 			type: 'update_is_followed',
// 			payload: user.is_followed,
// 		});
// 	}, [user.is_followed]);

// 	const handleFollow = () => {
// 		dispatch({
// 			type: state.isFollowed ? 'unfollow_request' : 'follow_request',
// 		});
// 		const requestFn = state.isFollowed ? unFollowAnUser : followAnUser;
// 		requestFn(user.id, initialAuthToken)
// 			.then((response) => {
// 				dispatch({
// 					type: state.isFollowed ? 'unfollow_success' : 'follow_success',
// 				});
// 				return setIsSubscribed(response.is_followed);
// 			})
// 			.catch((error) => {
// 				dispatch({
// 					type: state.isFollowed ? 'unfollow_failure' : 'follow_failure',
// 					payload: error,
// 				});
// 			});
// 	};
// 	useEffect(() => {
// 		const timeout = handleFollow;
// 		return () => clearTimeout(timeout);
// 	}, [isSubscribed]);
// 	return { state, handleFollow };
// };

// export const FollowContext = createContext();

// const initialState = {
// 	isFollowed: false,
// 	isLoading: false,
// 	error: null,
// };

// function followReducer(state, action) {
// 	switch (action.type) {
// 		case 'follow_request':
// 		case 'unfollow_request':
// 			return { ...state, isLoading: true };
// 		case 'follow_success':
// 			return { ...state, isFollowed: true, isLoading: false };
// 		case 'unfollow_success':
// 			return { ...state, isFollowed: false, isLoading: false };
// 		case 'follow_failure':
// 		case 'unfollow_failure':
// 			return { ...state, error: action.payload, isLoading: false };
// 		default:
// 			return state;
// 	}
// }

// export function FollowProvider({ children }) {
// 	const [state, dispatch] = useReducer(followReducer, initialState);

// 	return (
// 		<FollowContext.Provider value={{ state, dispatch }}>
// 			{children}
// 		</FollowContext.Provider>
// 	);
// }

// export function useFollow() {
// 	const context = useContext(FollowContext);
// 	if (context === undefined) {
// 		throw new Error('useFollow must be used within a FollowProvider');
// 	}
// 	return context;
// }

//7
// export const FollowContext = createContext();

// export const FollowProvider = ({ children }) => {
// 	const [isFollowed, setIsFollowed] = useState(false);

// 	function followedUser(userId, accessToken) {
// 		userService
// 			.followAnUser(userId, accessToken)
// 			.then((data) => {
// 				if (data) {
// 					setIsFollowed(true);
// 				} else {
// 					console.log('Fail to follow user');
// 				}
// 			})
// 			.catch((error) => {
// 				console.log(error.message);
// 			});
// 	}
// 	function unFollowedUser(userId, accessToken) {
// 		userService
// 			.unFollowAnUser(userId, accessToken)
// 			.then((data) => {
// 				if (data) {
// 					setIsFollowed(false);
// 				} else {
// 					console.log('Fail to unfollow user');
// 				}
// 			})
// 			.catch((error) => {
// 				console.log(error.message);
// 			});
// 	}

// 	const values = {
// 		isFollowed,
// 		followedUser,
// 		unFollowedUser,
// 	};

// 	return (
// 		<FollowContext.Provider value={values}>{children}</FollowContext.Provider>
// 	);
// };

//8
import {
	useState,
	useEffect,
	useReducer,
	createContext,
	useContext,
} from 'react';

import { AuthUserContext } from '~/App';
import * as userService from '~/services/userService';

const FollowAnUserContext = createContext();

export function useFollowAnUser() {
	return useContext(FollowAnUserContext);
}

export function FollowAnUserProvider({ children }) {
	const { authUser } = useContext(AuthUserContext);
	const [followStatus, setFollowStatus] = useState();

	const [isFollowed, setIsFollowed] = useState(false);

	const followedUser = (userId, accessToken, state) => {
		userService
			.followAnUser(userId, accessToken)
			.then((res) => {
				if (res) {
					setFollowStatus(res.data.is_followed);
					setTimeout(() => state(true), 300);
				} else {
					console.log('hook: Fail to follow user');
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const unFollowedUser = (userId, accessToken, state) => {
		userService
			.unFollowAnUser(userId, accessToken)
			.then((res) => {
				if (res) {
					setFollowStatus(res.data.is_followed);
					setTimeout(() => state(false), 300);
				} else {
					console.log('hook: Fail to unfollow user');
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	useEffect(() => {
		setIsFollowed(followStatus);
	}, [followStatus]);

	const value = {
		isFollowed,
		setIsFollowed,
		followedUser,
		unFollowedUser,
	};
	return (
		<FollowAnUserContext.Provider value={value}>
			{children}
		</FollowAnUserContext.Provider>
	);
}
