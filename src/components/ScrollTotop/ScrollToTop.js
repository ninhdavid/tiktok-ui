import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function ScrollToTop(props) {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return <>{props.children}</>;
}

ScrollToTop.propTypes = { props: PropTypes.object };

export default ScrollToTop;
