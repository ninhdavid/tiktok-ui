import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './VideoPlayer.module.scss';
import Avatar from '~/components/Avatar';
import UserInfo from '~/components/UserInfo';
import { AccountItemLink } from '~/components/AccountItem';
import Button from '~/components/Button';
// import AccountPreview from '~/components/AccountPreview';
import AccountPreview from '~/components/AccountPreview';
import VideoContent from './VideoContent';

const cx = classNames.bind(styles);

function VideoPlayer({ video }) {
	const renderPreview = (props) => {
		return (
			<div tabIndex="-1" {...props}>
				<PopperWrapper>
					<AccountPreview data={video.user} />
				</PopperWrapper>
			</div>
		);
	};

	return (
		<div className={cx('container')}>
			<div className={cx('wrapper')}>
				<div>
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
						<AccountItemLink to={`/@${video.user.nickname}`}>
							<UserInfo
								fullName={`${video.user.first_name}  ${video.user.last_name}`}
								tick={video.user.tick}
								nickname={video.user.nickname}
							/>
						</AccountItemLink>

						<Button outline className={cx('follow-btn')}>
							Follow
						</Button>
						<p>Descriptions</p>
						<span className={cx('song-name')}>
							<FontAwesomeIcon icon={faMusic} className={cx('icon-tone')} />
							<p>SOng</p>
						</span>
					</header>

					<VideoContent data={video} />
				</div>
			</div>
		</div>
	);
}

VideoPlayer.propTypes = {
	video: PropTypes.object,
};

export default VideoPlayer;
