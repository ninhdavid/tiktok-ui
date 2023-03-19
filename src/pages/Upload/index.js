import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Upload.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleExclamation,
	faCloudArrowUp,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Upload() {
	useEffect(() => {
		document.body.style.backgroundColor = 'white';

		return () => (document.body.style.backgroundColor = 'rgb(18, 18, 18)');
	}, []);
	const [rows, setRows] = useState(1);
	const [text, setText] = useState('');

	const [isToggle, setIsToggle] = useState(false);

	const handleTextChange = (e) => {
		const textareaLineHeight = 24; // chiều cao mỗi hàng của textarea (có thể thay đổi)
		const { scrollHeight, clientHeight } = e.target;
		const rows = Math.ceil(scrollHeight / textareaLineHeight);
		setRows(rows);
	};
	const handleToggleSwitch = () => {
		if (!isToggle) {
			setIsToggle(true);
		} else {
			setIsToggle(false);
		}
	};

	return (
		<div className={cx('wrapper')}>
			<div className={cx('container')}>
				<div className={cx('body-section')}>
					<div className={cx('title-section')}>
						<p>
							<span>Upload video</span>
						</p>
						<p>
							<span>Post a video to your account</span>
						</p>
					</div>
					<div className={cx('content-section')}>
						<div className={cx('uploader-section')}>
							<div className={cx('upload-content')}>
								<input className={cx('upload')} />
								<div className={cx('upload-card')}>
									<FontAwesomeIcon
										icon={faCloudArrowUp}
										className={cx('cloud-icon')}
									/>
									<p>
										<span>Select video to upload</span>
									</p>
									<p>
										<span>Or drag and drop a file</span>
									</p>
									<div className={cx('upload-desc')}>
										<p>
											<span>MP4 or WebM</span>
										</p>
										<p>
											<span>720x1280 resolution or higher</span>
										</p>
										<p>
											<span>Up to 3 minutes</span>
										</p>
										<p>
											<span>Less than 10 MBs</span>
										</p>
									</div>
									<div className={cx('upload-btn-section')}>
										<Button className={cx('file-btn')} primary>
											Select file
										</Button>
									</div>
								</div>
							</div>
						</div>
						<div className={cx('form-section')}>
							<div className={cx('caption-section')}>
								<div className={cx('caption-content')}>
									<div className={cx('caption-text')}>
										<strong>Caption</strong>
										<p>
											<span>0</span>
											<span>/ 200</span>
										</p>
									</div>
									<div className={cx('caption-input')}>
										<div className={cx('input-content')}>
											<textarea
												rows={rows}
												style={{ minHeight: `${rows * 24}px` }}
												defaultValue={text}
												onChange={(e) => {
													setText(e.target.value);
													handleTextChange(e);
												}}
												maxLength={200}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className={cx('cover-section')}>
								<strong>Cover</strong>
								<div className={cx('cover-content')}>
									<div className={cx('thumb-section')}>
										<div className={cx('thumb-content')}></div>
									</div>
								</div>
							</div>
							<div className={cx('allow-section')}>
								<p>
									<strong className={cx('allow-tile')}>
										Who can watch this video
									</strong>
								</p>
								<div className={cx('allow-select')}>
									<div className={cx('select-content')}>
										<select>
											<option value="public">Public</option>
											<option value="friends">Friends</option>
											<option value="private">Private</option>
										</select>
									</div>
								</div>

								<p>
									<strong>Allow users to:</strong>
								</p>

								<div className={cx('checkbox-section')}>
									<div className={cx('checkbox-content')}>
										<div className={cx('comment-section')}>
											<label htmlFor="comment" className={cx('comment-label')}>
												Comment
											</label>
											<input
												type="checkbox"
												name="comment"
												id="comment"
												defaultChecked={true}
												className={cx('comment-checkbox')}
											></input>
										</div>
										<div className={cx('duet-section')}>
											<label htmlFor="duet" className={cx('duet-label')}>
												Duel
											</label>
											<input
												type="checkbox"
												name="duet"
												id="duet"
												defaultChecked={true}
												className={cx('duet-checkbox')}
											></input>
										</div>
										<div className={cx('stitch-section')}>
											<label htmlFor="stitch" className={cx('stitch-label')}>
												Stitch
											</label>
											<input
												type="checkbox"
												name="stitch"
												id="stitch"
												defaultChecked={true}
												className={cx('stitch-checkbox')}
											></input>
										</div>
									</div>
								</div>
							</div>
							<div className={cx('switch-section')}>
								{/* <div className={cx('switch-content')}> */}
								<p>
									<strong>Run a copyright check</strong>
								</p>
								<div
									className={cx('switch-btn-section')}
									onClick={handleToggleSwitch}
								>
									<div
										className={
											!isToggle
												? cx('switch-btn-content-f')
												: cx('switch-btn-content-t')
										}
									>
										<span
											className={
												!isToggle ? cx('switch-btn-f') : cx('switch-btn-t')
											}
										></span>
									</div>
								</div>
								{/* </div> */}
							</div>
							{!isToggle ? (
								<div className={cx('copyright-section')}>
									<span>
										We'll check your video for potential copyright infringements
										on used sounds. If infringements are found, you can edit the
										video before posting.
									</span>

									<span>
										<span> Learn more</span>
									</span>
								</div>
							) : (
								<div className={cx('tooltip-section')}>
									<FontAwesomeIcon
										icon={faCircleExclamation}
										className={cx('warning-icon')}
									/>
									<span>
										{' '}
										Copyright check will not begin until your video is uploaded.
									</span>
								</div>
							)}
							<div className={cx('btn-arrow-section')}>
								<div className={cx('btn-cancel')}>
									<button className={cx('arrow-btn')}>
										<p>Discard</p>
									</button>
								</div>
								<div className={cx('btn-post')}>
									<button className={cx('arrow-btn-f')}>
										<p>Post</p>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

Upload.propTypes = {};

export default Upload;
