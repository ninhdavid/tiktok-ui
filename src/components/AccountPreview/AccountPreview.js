import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './AccountPreview.module.scss';
import { CheckActiveIcon } from '~/components/Icons';
import Button from '~/components/Button';
import Avatar from '~/components/Avatar';
import { AuthUserContext } from '~/App';
import { useFollowAnUser } from '~/hooks/useFollowAnUser';
import ButtonComponent from '~/components/ButtonFollow';
import { AccountItemLink } from '../AccountItem';
import ButtonFollow from '~/components/ButtonFollow';

const cx = classNames.bind(styles);

function AccountPreview({
	data,
	isFollowedUser,
	onClick,
	primary,
	setIsShowModal,
	setShowBtnFollow,
}) {
	const { authUser } = useContext(AuthUserContext);
	const [showFollow, setShowFollow] = useState(false);

	const { isFollowed, setIsFollowed, followedUser, unFollowedUser } =
		useFollowAnUser();
	const accessToken =
		authUser && authUser.meta.token ? authUser.meta.token : '';
	const handleToggleFollow = () => {
		if (accessToken === '') {
			setIsShowModal(true);
		}
		if (isFollowed && accessToken !== '') {
			unFollowedUser(data.id, accessToken, setShowFollow);
			setIsFollowed(false);
			typeof setShowBtnFollow === 'function' && setShowBtnFollow(false);
		} else if (!isFollowed && accessToken !== '') {
			followedUser(data.id, accessToken, setShowFollow);
			setIsFollowed(true);
			typeof setShowBtnFollow === 'function' && setShowBtnFollow(true);
		}
	};

	// const handleToggleFollow = () => {
	// 	if (showFollow) {
	// 		unFollowedUser(data.id, authUser.meta.token);
	// 		// setIsFollowed(false);
	// 		setShowFollow(false);
	// 		console.log(isFollowed);
	// 	} else {
	// 		followedUser(data.id, authUser.meta.token);
	// 		// setIsFollowed(true);
	// 		setShowFollow(true);
	// 		console.log(isFollowed);
	// 	}
	// };
	// useEffect(() => {
	// 	if (data.is_followed) {
	// 		setIsFollowed(true);
	// 	} else {
	// 		setIsFollowed(false);
	// 	}
	// }, [data.is_followed, authUser]);
	return (
		<div className={cx('wrapper')}>
			<header className={cx('header')}>
				<AccountItemLink to={`/@${data.nickname}`}>
					<Avatar
						className={cx('avatar')}
						src={data.avatar}
						alt={data.nickname}
					/>
				</AccountItemLink>
				<ButtonFollow
					data={data}
					onClick={onClick ? onClick : handleToggleFollow}
					// onClick={handleToggleFollow}
					className="preview-follow-btn"
					primary={primary}
				/>
			</header>
			<div className={cx('content')}>
				<AccountItemLink to={`/@${data.nickname}`}>
					<p className={cx('nickname')}>
						<strong>{data.nickname}</strong>
						{/* <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} /> */}
						{data.tick && (
							<span className={cx('check-icon')}>{<CheckActiveIcon />}</span>
						)}
					</p>
					<p className={cx('name')}>
						{`${data.first_name} ${data.last_name}`}{' '}
					</p>
				</AccountItemLink>
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
				{data.bio && (
					<p className={cx('bio')}>
						<span>{data.bio}</span>
					</p>
				)}
			</div>
		</div>
	);
}

AccountPreview.propTypes = {
	data: PropTypes.object.isRequired,
};

export default AccountPreview;
