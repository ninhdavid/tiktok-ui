import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthUserContext } from '~/App';
import { Virtuoso } from 'react-virtuoso';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import * as videoService from '~/services/videoService';
import VideoPlayer from '~/layouts/VideoPlayer';
import styles from './Home.module.scss';

const INIT_PAGE = 1;

const cx = classNames.bind(styles);
function Home() {
	const [videos, setVideos] = useState([]);
	const [page, setPage] = useState(INIT_PAGE);
	const [noMoreVideo, setNoMoreVideo] = useState(false);
	const authUser = useContext(AuthUserContext);
	const accessToken =
		authUser && authUser.meta.token ? authUser.meta.token : '';

	const loadMore = useCallback(() => {
		return setTimeout(() => {
			videoService
				.getVideos({ type: 'for-you', page: page, accessToken: accessToken })
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
	}, [page, accessToken, setVideos]);

	useEffect(() => {
		const timeout = loadMore();
		return () => clearTimeout(timeout);
	}, [loadMore]);

	return (
		<>
			{/* <VideoPlayer />*/}

			<Virtuoso
				data={videos}
				useWindowScroll
				endReached={() => {
					if (!noMoreVideo) {
						loadMore();
					}
				}}
				itemContent={(index, video) => (
					<VideoPlayer key={index} video={video} />
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

export default Home;
