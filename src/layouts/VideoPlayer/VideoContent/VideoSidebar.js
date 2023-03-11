import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './VideoContent.module.scss';
import images from '~/assets/images';
import * as videoService from '~/services/videoService';

const cx = classNames.bind(styles);

function VideoSidebar({ data }) {
	const [spin, setSpin] = useState(false);
	const [onLiked, setOnLiked] = useState(false);
	const [isLiked, setIsLiked] = useState(data.is_liked);
	const [likeCount, setLikeCount] = useState(data.likes_count);

	function handleToggleLike() {
		//need authUser and authUser.meta.token to like

		if (isLiked) {
			videoService
				.unLikedVideo({ postId: data.id })
				.then((res) => {
					if (res.data) {
						setIsLiked(res.data.is_liked);
					}
				})
				.catch((error) => {
					console.log(error + ': fail to load is_liked');
				});
		} else {
			videoService
				.likedVideo({ postId: data.id })
				.then((res) => {
					if (res.data) {
						setIsLiked(res.data.is_liked);
					}
				})
				.catch((error) => {
					console.log(error + ':fail to liked');
				});
		}
	}

	function handleLiked() {
		if (onLiked) {
			setOnLiked(false);
			setSpin(false);
		} else {
			setOnLiked(true);
			setSpin(true);
		}
		setTimeout(() => {
			setSpin(false);
		}, 1500);
	}
	return (
		<section className={cx('sidebar-section')}>
			<span className={cx('interact-section')}>
				{/* <div className={cx('icon-content')} onClick={handleLiked}>
					{!onLiked ? (
						<FontAwesomeIcon icon={faHeart} className={cx('icon')} />
					) : (
						<FontAwesomeIcon icon={faHeart} className={cx('icon-liked')} />
					)}
					{spin && onLiked && (
						<img
							src={images.spinner}
							alt="spinner"
							className={cx('spinner')}
						></img>
					)}
				</div> */}
				<div className={cx('icon-content')} onClick={handleToggleLike}>
					{!isLiked ? (
						<FontAwesomeIcon icon={faHeart} className={cx('icon')} />
					) : (
						<FontAwesomeIcon icon={faHeart} className={cx('icon-liked')} />
					)}
					{spin && isLiked && (
						<img
							src={images.spinner}
							alt="spinner"
							className={cx('spinner')}
						></img>
					)}
				</div>
				{/* <p>{data.likes_count}</p> */}
				<p>{likeCount}</p>
			</span>
			<span className={cx('interact-section')}>
				<div className={cx('icon-content')}>
					<FontAwesomeIcon icon={faComment} className={cx('icon')} />
				</div>
				<p>{data.comments_count}</p>
			</span>
			<span className={cx('interact-section')}>
				<div className={cx('icon-content')}>
					<FontAwesomeIcon icon={faShare} className={cx('icon')} />
				</div>
				<p>{data.shares_count}</p>
			</span>
		</section>
	);
}

VideoSidebar.propTypes = {
	data: PropTypes.object.isRequired,
};

export default VideoSidebar;
