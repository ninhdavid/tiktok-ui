import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthUserContext } from '~/App';
import { Virtuoso } from 'react-virtuoso';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import * as videoService from '~/services/videoService';
import VideoPlayer from '~/layouts/VideoPlayer';
import styles from './GetVideoForPages.module.scss';

const INIT_PAGE = 1;

const cx = classNames.bind(styles);

function GetVideoForPages({ type, setIsShowModal, isShowModal }) {
	const [videos, setVideos] = useState([]);
	const [page, setPage] = useState(INIT_PAGE);
	const [noMoreVideo, setNoMoreVideo] = useState(false);
	const { authUser } = useContext(AuthUserContext);
	const accessToken =
		authUser && authUser.meta.token ? authUser.meta.token : '';

	const loadMore = useCallback(() => {
		return setTimeout(() => {
			videoService
				.getVideos({ type: type, page: page, accessToken: accessToken })
				.then((res) => {
					if (Array.isArray(res.data)) {
						setVideos((prev) => [...prev, ...res.data]);
						setPage((prev) => prev + 1);
					}

					if (res.data.length === 0 || page === res.meta.pagination.total) {
						setNoMoreVideo(true);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}, 300);
	}, [type, page, accessToken, setVideos]);

	useEffect(() => {
		const timeout = loadMore();
		return () => clearTimeout(timeout);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Virtuoso
				data={videos}
				useWindowScroll
				endReached={() => {
					if (!noMoreVideo) {
						loadMore();
					}
				}}
				itemContent={(index, video) => (
					<VideoPlayer
						key={video.user.id}
						video={video}
						setIsShowModal={setIsShowModal}
						isShowModal={isShowModal}
						type={type}
					/>
				)}
				components={{
					Footer: () => {
						return (
							<div className={cx('content')}>
								{noMoreVideo ? (
									<p>No more video</p>
								) : (
									<FontAwesomeIcon className={cx('icon')} icon={faSpinner} />
								)}
							</div>
						);
					},
				}}
			/>
		</>
	);
}
GetVideoForPages.propTypes = {
	type: PropTypes.string.isRequired,
};

export default GetVideoForPages;
