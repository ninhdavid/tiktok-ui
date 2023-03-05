import React from 'react';
import PropTypes from 'prop-types';
import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './VideoContent.module.scss';

const cx = classNames.bind(styles);

function VideoSidebar(props) {
	return (
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
	);
}

VideoSidebar.propTypes = {};

export default VideoSidebar;
