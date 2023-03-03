import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faComment,
	faHeart,
	faMusic,
	faShare,
} from '@fortawesome/free-solid-svg-icons';
import FavoriteIcon from '@mui/icons-material/Favorite';

import styles from './VideoPlayer.module.scss';
import Avatar from '~/components/Avatar';
import UserInfo from '~/components/UserInfo';
import { AccountItemLink } from '~/components/AccountItem';
import Button from '~/components/Button';
import videos from '~/assets/Videos';

const cx = classNames.bind(styles);

function VideoPlayer({ data }) {
	return (
		<div className={cx('container')}>
			<div className={cx('wrapper')}>
				<AccountItemLink className={cx('info-section')}>
					<Avatar className={cx('avatar')} />
				</AccountItemLink>
				<div className={cx('content-section')}>
					<header className={cx('header-section')}>
						<AccountItemLink>
							<UserInfo />
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
					<div className={cx('video-content')}>
						<section className={cx('video-section')}>
							<video width={280} controls className={cx('video-card')}>
								<source src={videos.videoTest} type="video/mp4"></source>
							</video>
						</section>
						<section className={cx('sidebar-section')}>
							<span className={cx('interact-section')}>
								<div className={cx('icon-content')}>
									<FontAwesomeIcon icon={faHeart} className={cx('icon')} />
								</div>
								<p>30.0k</p>
							</span>
							<span className={cx('interact-section')}>
								<div className={cx('icon-content')}>
									<FontAwesomeIcon icon={faComment} className={cx('icon')} />
								</div>
								<p>30.0k</p>
							</span>
							<span className={cx('interact-section')}>
								<div className={cx('icon-content')}>
									<FontAwesomeIcon icon={faShare} className={cx('icon')} />
								</div>
								<p>30.0k</p>
							</span>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}

VideoPlayer.propTypes = {
	data: PropTypes.object,
};

export default VideoPlayer;
