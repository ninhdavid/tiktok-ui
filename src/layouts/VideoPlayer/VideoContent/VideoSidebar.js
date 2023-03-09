import React from 'react';
import PropTypes from 'prop-types';
import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './VideoContent.module.scss';

const cx = classNames.bind(styles);

function VideoSidebar({ data }) {
	function numberRandom(number) {
		const num = number > 0;
		const result = num
			? (number * (Math.random() * 10)).toFixed(1) + 'K'
			: number;
		return result;
	}

	return (
		<section className={cx('sidebar-section')}>
			<span className={cx('interact-section')}>
				<div className={cx('icon-content')}>
					<FontAwesomeIcon icon={faHeart} className={cx('icon')} />
				</div>
				<p>{numberRandom(data.likes_count)}</p>
			</span>
			<span className={cx('interact-section')}>
				<div className={cx('icon-content')}>
					<FontAwesomeIcon icon={faComment} className={cx('icon')} />
				</div>
				<p>{numberRandom(data.comments_count)}</p>
			</span>
			<span className={cx('interact-section')}>
				<div className={cx('icon-content')}>
					<FontAwesomeIcon icon={faShare} className={cx('icon')} />
				</div>
				<p>{numberRandom(data.shares_count)}</p>
			</span>
		</section>
	);
}

VideoSidebar.propTypes = {
	data: PropTypes.object.isRequired,
};

export default VideoSidebar;
