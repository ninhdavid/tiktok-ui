import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './UserProfile.module.scss';
import Button from '~/components/Button';
import { useFollowAnUser } from '~/hooks';
const cx = classNames.bind(styles);

function ButtonComponent({ onClick, data }) {
	const { isFollowed, followedUser, unFollowedUser } = useFollowAnUser();

	return (
		<div className={cx('btn-follow')}>
			{data.is_followed && isFollowed ? (
				<Button
					large
					textOutline
					className={cx('btn-follow')}
					onClick={onClick}
				>
					Following
				</Button>
			) : (
				<Button large primary className={cx('btn-follow')} onClick={onClick}>
					Follow
				</Button>
			)}
		</div>
	);
}

ButtonComponent.propTypes = {};

export default ButtonComponent;
