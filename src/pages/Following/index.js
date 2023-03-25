import { useEffect, useState, useContext } from 'react';
import { AuthUserContext } from '~/App';
import PropTypes from 'prop-types';
import GetVideoForPages from '~/layouts/components/GetVideoForPages';

function Following() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { authUser } = useContext(AuthUserContext);
	const accessToken =
		authUser && authUser.meta.token ? authUser.meta.token : '';

	useEffect(() => {
		setIsLoggedIn(accessToken !== '');
	}, [accessToken]);
	if (!isLoggedIn && accessToken === '') {
		return <div>Please log in to see videos</div>;
	}
	return <div>{accessToken && <GetVideoForPages type="following" />}</div>;
}

Following.propTypes = {};

export default Following;
