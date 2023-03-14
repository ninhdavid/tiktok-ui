import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './VideoContent.module.scss';

const cx = classNames.bind(styles);

function VideoSection({ src, poster }) {
	return (
		<section className={cx('video-section')}>
			<video
				width={280}
				controls
				className={cx('video-card')}
				loop
				poster={poster}
			>
				{/* <source src={videos.videoTest} type="video/mp4"></source> */}
				<source src={src} type="video/mp4"></source>
			</video>
		</section>
	);
}

VideoSection.propTypes = {
	src: PropTypes.string.isRequired,
	poster: PropTypes.string,
};

export default VideoSection;
