import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './UserProfile.module.scss';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

function ButtonComponent({ onClick, data, className, accessToken }) {
	return (
		<>
			{data.is_followed && accessToken !== '' ? (
				<Button large textOutline className={cx(className)} onClick={onClick}>
					Following
				</Button>
			) : (
				<Button large primary className={cx(className)} onClick={onClick}>
					Follow
				</Button>
			)}
		</>
	);
}

ButtonComponent.propTypes = {
	onClick: PropTypes.func.isRequired,
	data: PropTypes.any.isRequired,
	className: PropTypes.string,
	accessToken: PropTypes.string,
};

export default ButtonComponent;
