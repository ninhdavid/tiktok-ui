import React, { useContext, useState, useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './VideoPlayer.module.scss';
import Avatar from '~/components/Avatar';
import UserInfo from '~/components/UserInfo';
import { AccountItemLink } from '~/components/AccountItem';
import AccountPreview from '~/components/AccountPreview';
import VideoContent from './VideoContent';
import HashTag from '~/components/HashTag';
import Description from '~/components/Description';
import { AuthUserContext } from '~/App';
import ButtonFollow from '~/components/ButtonFollow';
import { useFollowAnUser } from '~/hooks';

const cx = classNames.bind(styles);

function VideoPlayer({ type, video, setIsShowModal, isShowModal }) {
	const { authUser } = useContext(AuthUserContext);
	const accessToken =
		authUser && authUser.meta.token ? authUser.meta.token : '';
	const { isFollowed, setIsFollowed, followedUser, unFollowedUser } =
		useFollowAnUser();
	const [showBtnFollow, setShowBtnFollow] = useState(video.user.is_followed);

	const handleToggleFollow = () => {
		if (accessToken === '') {
			setIsShowModal(true);
		}
		if (isFollowed && accessToken !== '') {
			unFollowedUser(video.user.id, accessToken);
			setShowBtnFollow(false);
		} else if (!isFollowed && accessToken !== '') {
			followedUser(video.user.id, accessToken);
			setShowBtnFollow(true);
		}
	};
	const renderPreview = (props) => {
		return (
			<div tabIndex="-1" {...props}>
				<PopperWrapper>
					<AccountPreview
						data={video.user}
						// isFollowedUser={isFollowed}
						onClick={handleToggleFollow}
						// setShowBtnFollow={setShowBtnFollow}
					/>
				</PopperWrapper>
			</div>
		);
	};

	return (
		<div className={cx('container')}>
			<div className={cx('wrapper')}>
				<div className={cx('avatar-section')}>
					<Tippy
						interactive
						disabled={isShowModal}
						delay={[800, 500]}
						offset={[-10, 2]}
						render={renderPreview}
						placement="bottom-start"
					>
						<span tabIndex="-1">
							{video.user.avatar && (
								<AccountItemLink
									to={`/@${video.user.nickname}`}
									className={cx('info-section')}
								>
									<Avatar
										className={cx('avatar')}
										src={video.user.avatar}
										alt={video.user.nickname}
									/>
								</AccountItemLink>
							)}
						</span>
					</Tippy>
				</div>
				<div className={cx('content-section')}>
					<header className={cx('header-section')}>
						<Tippy
							interactive
							disabled={isShowModal}
							delay={[800, 500]}
							offset={[-80, 32]}
							render={renderPreview}
							placement="bottom-start"
						>
							<span tabIndex="-1">
								<AccountItemLink
									to={`/@${video.user.nickname}`}
									className={cx('user-section')}
								>
									<UserInfo
										fullName={`${video.user.first_name}  ${video.user.last_name}`}
										tick={video.user.tick}
										nickname={video.user.nickname}
									/>
								</AccountItemLink>
							</span>
						</Tippy>

						{type !== 'following' && !showBtnFollow && (
							<ButtonFollow
								onClick={handleToggleFollow}
								data={video.user}
								className="video-follow-btn"
								large={true}
							/>
						)}

						<div>
							<Description data={video} />
						</div>

						{video.music && (
							<span className={cx('song-name')}>
								<p>
									{video.music && (
										<HashTag textLink tag="music" className={cx('icon')}>
											{video.music}
										</HashTag>
									)}
								</p>
							</span>
						)}
					</header>
					<Suspense fallback={<div>Loading...</div>}>
						<VideoContent data={video} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}

VideoPlayer.propTypes = {
	video: PropTypes.object.isRequired,
};

export default VideoPlayer;
