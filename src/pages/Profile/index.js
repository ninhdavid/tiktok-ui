import React, { useContext, useEffect, useState, Suspense, lazy } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import Avatar from '~/components/Avatar';
import UserSVideos from '~/components/UserSVideos';
import * as userService from '~/services/userService';
import styles from './UserProfile.module.scss';
import { AuthUserContext } from '~/App';
import { useFollowAnUser } from '~/hooks/useFollowAnUser';
import ButtonComponent from './ButtonComponent';
// import ButtonComponent from '~/components/ButtonFollow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

// const UserSVideos = lazy(() => import('~/components/UserSVideos'));
function Profile({ isShowModal, setIsShowModal }) {
	const { authUser } = useContext(AuthUserContext);
	const accessToken =
		authUser && authUser.meta.token ? authUser.meta.token : '';
	const { isFollowed, followedUser, unFollowedUser } = useFollowAnUser();
	const { nickname } = useParams();
	const [userProfileData, setUserProfileData] = useState([]);
	const [isRendered, setIsRendered] = useState(false);

	const videosList = userProfileData.videos;
	const [activeTab, setActiveTab] = useState('videos');
	const handleTabClick = (tabName) => {
		setActiveTab(tabName);
	};
	useEffect(() => {
		userService
			.getUserProfile(nickname, accessToken)
			.then((res) => {
				setUserProfileData(res);
				setIsRendered(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [isFollowed, nickname]);

	const handleToggleFollow = () => {
		if (accessToken === '') {
			setIsShowModal(true);
		}
		if (userProfileData.is_followed && accessToken !== '') {
			unFollowedUser(userProfileData.id, authUser.meta.token);
		} else if (authUser?.meta?.token) {
			followedUser(userProfileData.id, authUser.meta.token);
		}
	};

	return (
		<Suspense
			fallback={
				<div>
					<FontAwesomeIcon className={cx('icon')} icon={faSpinner} />
				</div>
			}
		>
			{!isRendered && (
				<FontAwesomeIcon className={cx('icon')} icon={faSpinner} />
			)}
			{isRendered && (
				<div className={cx('wrapper')}>
					<div className={cx('wrapper-content')}>
						<div className={cx('user-section')}>
							<div className={cx('user-info')}>
								<div className={cx('avatar-section')}>
									<Avatar
										className={cx('avatar')}
										src={userProfileData.avatar}
										alt={userProfileData.nickname}
									/>
								</div>

								<div className={cx('info-section')}>
									<h1 className={cx('nickname')}>
										{userProfileData?.nickname}
									</h1>
									<h2 className={cx('fullName')}>
										{`${userProfileData?.first_name} ${userProfileData?.last_name}`}
									</h2>

									<ButtonComponent
										onClick={handleToggleFollow}
										data={userProfileData}
										className="profile-follow-btn"
										accessToken={accessToken}
									/>
								</div>
							</div>

							<h3 className={cx('engagement')}>
								<div className={cx('follow-count')}>
									<strong>{userProfileData.followings_count}</strong>
									<span>Following</span>
								</div>
								<div className={cx('follow-count')}>
									<strong>{userProfileData.followers_count}</strong>
									<span>Followers</span>
								</div>
								<div className={cx('follow-count')}>
									<strong>{userProfileData.likes_count}</strong>
									<span>Likes</span>
								</div>
							</h3>
							<h2 className={cx('bio')}>{userProfileData.bio}</h2>
						</div>
						<div className={cx('video-section')}>
							<div className={cx('navigate-section')}>
								<p
									className={cx(
										'videos-tab',
										activeTab === 'videos' && 'active'
									)}
									onClick={() => {
										handleTabClick('videos');
									}}
								>
									<span>Videos</span>
								</p>
								<p
									className={cx('liked-tab', activeTab === 'liked' && 'active')}
									onClick={() => {
										handleTabClick('liked');
									}}
								>
									<span>
										<FontAwesomeIcon
											icon={faLock}
											className={cx('lock-navigate')}
										/>
										Liked
									</span>
								</p>
								<div
									className={cx('block')}
									style={{
										'--block-transform': activeTab === 'videos' ? '0' : '230px',
									}}
								></div>
							</div>

							{activeTab === 'videos' && <UserSVideos data={videosList} />}

							{activeTab === 'liked' && (
								<div className={cx('liked-section')}>
									<FontAwesomeIcon
										icon={faLock}
										className={cx('lock-likedTab')}
									/>
									<h1>This user's liked videos are private</h1>
									<h2>
										Videos liked by {userProfileData.nickname} are currently
										hidden
									</h2>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</Suspense>
	);
}

export default Profile;
