import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './VideoContent.module.scss';
import VideoSidebar from './VideoSidebar';
import VideoSection from './VideoSection';

const cx = classNames.bind(styles);

function VideoContent({ data }) {
	return (
		<div className={cx('video-container')}>
			<VideoSection poster={data.thumb_url} src={data.file_url} />
			<VideoSidebar data={data} />
		</div>
	);
}

VideoContent.propTypes = {
	data: PropTypes.object.isRequired,
};

export default VideoContent;
