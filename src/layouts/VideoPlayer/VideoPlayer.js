import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './VideoPlayer.module.scss';
import Avatar from '~/components/Avatar';
import UserInfo from '~/components/UserInfo';
import { AccountItemLink } from '~/components/AccountItem';
import Button from '~/components/Button';
import AccountPreview from '~/components/AccountPreview';
import VideoContent from './VideoContent';
import HashTag from '~/components/HashTag';
import Description from '~/components/Description';
import { AuthUserContext } from '~/App';
import { useFollowAnUser } from '~/hooks/useFollowAnUser';

const cx = classNames.bind(styles);

function VideoPlayer({ video }) {
	// const [isFollowed, setIsFollowed] = useState(false);
	const { authUser } = useContext(AuthUserContext);
	// const [isFollowed, followedUser, unFollowedUser] = useFollowAnUser(
	// 	video.user.is_followed
	// );

	const { isFollowed, followedUser, unFollowedUser } = useFollowAnUser();

	const handleToggleFollow = () => {
		if (video.user.is_followed) {
			unFollowedUser(video.user.id, authUser);
			console.log('unfollow');
		} else {
			console.log('follow');
			followedUser(video.user.id, authUser);
		}
	};

	// const handleToggleFollow = () => {
	// 	if (isFollowed) {
	// 		unFollowedUser(video.user.id, authUser.meta.token);
	// 		// setIsFollowed(false);
	// 	} else {
	// 		followedUser(video.user.id, authUser.meta.token);
	// 		// setIsFollowed(true);
	// 	}
	// };
	// useEffect(() => {
	// 	if (video.user.is_followed) {
	// 		setIsFollowed(true);
	// 	} else {
	// 		setIsFollowed(false);
	// 	}
	// }, [video.user.is_followed, authUser]);
	const renderPreview = (props) => {
		return (
			<div tabIndex="-1" {...props}>
				<PopperWrapper>
					<AccountPreview
						data={video.user}
						// isFollowedUser={isFollowed}
						// onClick={handleFollow}
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
						delay={[800, 500]}
						offset={[-10, 2]}
						render={renderPreview}
						placement="bottom-start"
					>
						<span tabIndex="0">
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
						</span>
					</Tippy>
				</div>
				<div className={cx('content-section')}>
					<header className={cx('header-section')}>
						<Tippy
							interactive
							delay={[800, 500]}
							offset={[-80, 32]}
							render={renderPreview}
							placement="bottom-start"
						>
							<span tabIndex="0">
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

						{/* {state.isFollowed ? (
							<Button
								className={cx('follow-btn')}
								textOutline
								onClick={handleFollow}
							>
								Following
							</Button>
						) : (
							<Button
								className={cx('follow-btn')}
								outline
								onClick={handleFollow}
							>
								Follow
							</Button>
						)} */}

						{isFollowed ? (
							<Button
								className={cx('follow-btn')}
								textOutline
								small
								onClick={handleToggleFollow}
							>
								Following
							</Button>
						) : (
							<Button
								className={cx('follow-btn')}
								outline
								small
								onClick={handleToggleFollow}
							>
								Follow
							</Button>
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

					<VideoContent data={video} />
				</div>
			</div>
		</div>
	);
}

VideoPlayer.propTypes = {
	video: PropTypes.object.isRequired,
};

export default VideoPlayer;
