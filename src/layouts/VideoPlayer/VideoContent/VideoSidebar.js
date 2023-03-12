import React, { useState, useRef, useEffect, useContext } from 'react';
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
	const [isLiked, setIsLiked] = useState(data.is_liked);
	const [likeCount, setLikeCount] = useState(data.likes_count);

	// useEffect(() => {
	// 	// Make API call to get latest is_liked value and update state
	// 	videoService
	// 		.getVideos(data.id)
	// 		.then((res) => {
	// 			if (res.data) {
	// 				setIsLiked(res.data.is_liked);
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.log(error + ': fail to load is_liked');
	// 		});
	// }, [data.id]);

	function handleToggleLike() {
		//need authUser and authUser.meta.token to like
		// if (authUser || authUser.meta || authUser.meta.token) {

		if (isLiked) {
			videoService
				.unLikedVideo({
					videoId: data.id,
					videoUuid: data.uuid,
				})
				.then((res) => {
					if (res.data) {
						setIsLiked(res.data.is_liked);
						setLikeCount(res.data.likes_count);
						setSpin(false);
					}
				})
				.catch((error) => {
					console.log(error + ': fail to load is_liked');
				});
		} else {
			videoService
				.likedVideo({
					videoId: data.id,
					videoUuid: data.uuid,
				})
				.then((res) => {
					if (res.data) {
						setIsLiked(res.data.is_liked);
						setLikeCount(res.data.likes_count);
						setSpin(true);
					}
				})
				.catch((error) => {
					console.log(error + ':fail to liked');
				});
		}
		setTimeout(() => {
			setSpin(false);
		}, 1500);
	}

	return (
		<section className={cx('sidebar-section')}>
			<span className={cx('interact-section')}>
				<div className={cx('icon-content')} onClick={handleToggleLike}>
					{isLiked ? (
						<FontAwesomeIcon icon={faHeart} className={cx('icon-liked')} />
					) : (
						<FontAwesomeIcon icon={faHeart} className={cx('icon')} />
					)}
					{/* <FontAwesomeIcon
						icon={faHeart}
						className={cx(isLiked ? 'icon-liked' : 'icon')}
					/> */}

					{spin && isLiked && (
						<img
							src={images.spinner}
							alt="spinner"
							className={cx('spinner')}
						></img>
					)}
				</div>
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
