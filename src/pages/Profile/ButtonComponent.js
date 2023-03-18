import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './UserProfile.module.scss';
import Button from '~/components/Button';
import { useFollowAnUser } from '~/hooks';
import { checkboxClasses } from '@mui/material';
const cx = classNames.bind(styles);

function ButtonComponent({ onClick, data, className }) {
	const { isFollowed, followedUser, unFollowedUser } = useFollowAnUser();

	return (
		<>
			{data.is_followed ? (
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
};

export default ButtonComponent;
