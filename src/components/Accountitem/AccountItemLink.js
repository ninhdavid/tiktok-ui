import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function AccountItemLink({ to, children, className }) {
	return (
		<Link to={to} className={className}>
			{children}
		</Link>
	);
}

AccountItemLink.propTypes = {
	to: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default AccountItemLink;
