import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './VideoContent.module.scss';
import VideoSidebar from './VideoSidebar';
import VideoSection from './VideoSection';

const cx = classNames.bind(styles);

function VideoContent(props) {
	return (
		<div className={cx('video-content')}>
			<VideoSection />
			<VideoSidebar />
		</div>
	);
}

VideoContent.propTypes = {};

export default VideoContent;
