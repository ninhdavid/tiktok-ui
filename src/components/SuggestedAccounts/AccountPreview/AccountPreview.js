import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './AccountPreview.module.scss';
import { CheckActiveIcon } from '~/components/Icons';
import Button from '~/components/Button';
import Avatar from '~/components/Avatar';
import { useFollowAnUser } from '~/hooks';
import { AuthUserContext } from '~/App';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
	const [isFollowed, setIsFollowed] = useState(false);
	const { authUser } = useContext(AuthUserContext);
	const [followedUser, unFollowedUser] = useFollowAnUser();
	const handleToggleFollow = () => {
		if (isFollowed) {
			unFollowedUser(data.id, authUser.meta.token);
			setIsFollowed(false);
		} else {
			followedUser(data.id, authUser.meta.token);
			setIsFollowed(true);
		}
	};
	useEffect(() => {
		if (data.is_followed) {
			setIsFollowed(true);
		} else {
			setIsFollowed(false);
		}
	}, [data.is_followed]);
	return (
		<div className={cx('wrapper')}>
			<header className={cx('header')}>
				<Avatar
					className={cx('avatar')}
					src={data.avatar}
					alt={data.nickname}
				/>

				{isFollowed ? (
					<Button
						className={cx('follow-btn')}
						textOutline
						onClick={handleToggleFollow}
					>
						Following
					</Button>
				) : (
					<Button
						className={cx('follow-btn')}
						outline
						onClick={handleToggleFollow}
					>
						Follow
					</Button>
				)}
			</header>
			<div className={cx('content')}>
				<p className={cx('nickname')}>
					<strong>{data.nickname}</strong>
					{data.tick && (
						<span className={cx('check-icon')}>{<CheckActiveIcon />}</span>
					)}
				</p>
				<p className={cx('name')}>{`${data.first_name} ${data.last_name}`} </p>
				<p className={cx('analytics')}>
					<span>
						<strong className={cx('value')}>{data.followers_count} </strong>
						<span className={cx('label')}>Followers</span>
					</span>
					<span>
						<strong className={cx('value')}>{data.likes_count} </strong>
						<span className={cx('label')}>Likes</span>
					</span>
				</p>
			</div>
		</div>
	);
}

AccountPreview.propTypes = {
	data: PropTypes.object,
};

export default AccountPreview;
