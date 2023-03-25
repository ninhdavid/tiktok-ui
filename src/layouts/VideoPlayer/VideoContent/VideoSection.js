import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './VideoContent.module.scss';

const cx = classNames.bind(styles);

function VideoSection({ className, src, poster }) {
	function handleOnMouseOver(e) {
		if (className) {
			e.target.play();
		}
	}

	function handleOnMouseLeave(e) {
		if (className) {
			e.target.pause();
		}
	}
	return (
		<section className={className ? className : cx('video-section')}>
			<video
				width={className ? 208 : ''}
				controls
				className={className ? cx('video-card--fullWidth') : cx('video-card')}
				loop
				playsInline
				muted
				poster={poster}
				onMouseOver={(e) => handleOnMouseOver(e)}
				onMouseLeave={(e) => handleOnMouseLeave(e)}
			>
				{/* <source src={videos.videoTest} type="video/mp4"></source> */}
				<source src={src} type="video/mp4"></source>
			</video>
		</section>
	);
}

VideoSection.propTypes = {
	src: PropTypes.string,
	poster: PropTypes.string,
};

export default VideoSection;
