import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function AccountItemLink({ to, children, className, ref }) {
	return (
		<Link to={to} className={className} ref={ref}>
			{children}
		</Link>
	);
}

AccountItemLink.propTypes = {
	to: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	ref: PropTypes.string,
};

export default AccountItemLink;
