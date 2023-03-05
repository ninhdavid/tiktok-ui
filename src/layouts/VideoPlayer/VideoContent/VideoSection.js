import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import videos from '~/assets/Videos';
import styles from './VideoContent.module.scss';

const cx = classNames.bind(styles);

function VideoSection(props) {
	return (
		<section className={cx('video-section')}>
			<video width={280} controls className={cx('video-card')}>
				<source src={videos.videoTest} type="video/mp4"></source>
			</video>
		</section>
	);
}

VideoSection.propTypes = {};

export default VideoSection;
