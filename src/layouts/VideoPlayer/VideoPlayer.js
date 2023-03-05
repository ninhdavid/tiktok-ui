import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

import styles from './VideoPlayer.module.scss';
import Avatar from '~/components/Avatar';
import UserInfo from '~/components/UserInfo';
import { AccountItemLink } from '~/components/AccountItem';
import Button from '~/components/Button';
import VideoContent from './VideoContent';

const cx = classNames.bind(styles);

function VideoPlayer({ data }) {
	return (
		<div className={cx('container')}>
			<div className={cx('wrapper')}>
				<AccountItemLink className={cx('info-section')}>
					<Avatar className={cx('avatar')} src="" />
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
					<VideoContent />
				</div>
			</div>
		</div>
	);
}

VideoPlayer.propTypes = {
	data: PropTypes.object,
};

export default VideoPlayer;
