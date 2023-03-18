import React, { useContext, useEffect, useState } from 'react';
import { useMatches, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import AccountItem from '~/components/AccountItem';
import Avatar from '~/components/Avatar';
import UserInfo from '~/components/UserInfo';
import * as userService from '~/services/userService';
import styles from './UserProfile.module.scss';
import Button from '~/components/Button';
import { VideoSection } from '~/layouts/VideoPlayer/VideoContent';
import UserSVideo from '~/components/UserSVideos';
import UserSVideos from '~/components/UserSVideos';
import { AuthUserContext } from '~/App';
import { useFollowAnUser } from '~/hooks/useFollowAnUser';
import ButtonComponent from './ButtonComponent';
const cx = classNames.bind(styles);

function Profile() {
	const { authUser } = useContext(AuthUserContext);
	const accessToken =
		authUser && authUser.meta.token ? authUser.meta.token : '';
	const { isFollowed, followedUser, unFollowedUser } = useFollowAnUser();
	const { nickname } = useParams();
	const [userProfileData, setUserProfileData] = useState([]);
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
			})
			.catch((err) => {
				console.log(err);
			});
	}, [isFollowed]);
	// const [isFollowed, followedUser, unFollowedUser] = useFollowAnUser(
	// 	video.user.is_followed
	// );

	const handleToggleFollow = () => {
		if (userProfileData.is_followed) {
			unFollowedUser(userProfileData.id, authUser.meta.token);
			console.log('profile-pages: unfollow');
		} else {
			console.log('profile-pages:follow');
			followedUser(userProfileData.id, authUser.meta.token);
		}
	};

	return (
		<div className={cx('wrapper')}>
			<div className={cx('wrapper-content')}>
				<div className={cx('user-section')}>
					<div className={cx('user-info')}>
						<Avatar
							className={cx('avatar')}
							src={userProfileData.avatar}
							alt={userProfileData.nickname}
						/>
						<div className={cx('info-section')}>
							<h1 className={cx('nickname')}>{userProfileData.nickname}</h1>
							<h2 className={cx('fullName')}>
								{`${userProfileData.first_name} ${userProfileData.last_name}`}
							</h2>
							{/* <div className={cx('btn-follow')}>
								{isFollowed && userProfileData.is_followed ? (
									<Button
										large
										textOutline
										className={cx('btn-follow')}
										onClick={handleToggleFollow}
									>
										Following
									</Button>
								) : (
									<Button
										large
										primary
										className={cx('btn-follow')}
										onClick={handleToggleFollow}
									>
										Follow
									</Button>
								)}

							</div> */}
							<ButtonComponent
								onClick={handleToggleFollow}
								data={userProfileData}
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
							className={cx('videos-tab', activeTab === 'videos' && 'active')}
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
							<span>Liked</span>
						</p>
						<div
							className={cx('block')}
							style={{
								'--block-transform': activeTab === 'videos' ? '0' : '230px',
							}}
						></div>
					</div>

					{activeTab === 'videos' && <UserSVideos data={videosList} />}
					{activeTab === 'liked' && <div>liked tab</div>}
				</div>
			</div>
		</div>
	);
}

export default Profile;
