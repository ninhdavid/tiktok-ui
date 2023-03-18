import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './UserSVideos.module.scss';
import { VideoSection } from '~/layouts/VideoPlayer/VideoContent';

const cx = classNames.bind(styles);

function UserSVideos({ data }) {
	return (
		<div className={cx('video-container')}>
			<div className={cx('video-content')}>
				{data?.map((data, index) => {
					return (
						<div key={index} className={cx('video-player')}>
							<VideoSection
								className={cx('video-item')}
								src={data.file_url}
								poster={data.thumb_url}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

UserSVideos.propTypes = {};

export default UserSVideos;
