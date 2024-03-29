import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Upload.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleExclamation,
	faCloudArrowUp,
	faM,
} from '@fortawesome/free-solid-svg-icons';
import { useDebounce } from '~/hooks';
import ToastModal from './ToastModal';
import useUploadFile from '~/hooks/useUploadFile';
import { AuthUserContext } from '~/App';
import Loader from './ToastModal/Loader';

const cx = classNames.bind(styles);

function Upload({ isShowModal }) {
	const initialState = {
		description: '',
		upload_file: '',
		thumbnail_time: 1,
		music: 'Nhạc xinh quá',
		viewable: 'public',
		allows: ['comment', 'duet', 'stitch'],
	};

	const [state, setState] = useState(initialState);
	useEffect(() => {
		document.body.style.backgroundColor = 'white';

		return () => (document.body.style.backgroundColor = 'rgb(18, 18, 18)');
	}, []);

	const { authUser } = useContext(AuthUserContext);
	const accessToken =
		authUser && authUser.meta.token ? authUser.meta.token : '';

	const [uploadFile, isLoading, error] = useUploadFile();
	const [isModal, setIsModal] = useState(false);

	const [rows, setRows] = useState(1);
	const [textValue, setTextValue] = useState(initialState.description);
	const [videoInitial, setVideoInitial] = useState(initialState.upload_file);
	const [isVideo, setIsVideo] = useState(false);
	const [thumbnailTime, setThumbnailTime] = useState([]);
	const [thumbTimePost, setThumbTimePost] = useState();
	const [selectValue, setSelectValue] = useState(initialState.viewable);

	const [isToggle, setIsToggle] = useState(false);

	const [videoSrc, setVideoSrc] = useState('');
	const [checkboxValue, setCheckboxValue] = useState(initialState.allows);
	const inputFileRef = useRef(null);
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const textInputRef = useRef(null);
	const formRef = useRef(null);
	const [videoUrl, setVideoUrl] = useState(null);
	const [thumbnails, setThumbnails] = useState([]);
	const [isFormValid, setIsFormValid] = useState(false);

	const handleFileUpload = (e) => {
		const file = e.target.files[0];

		if (!file.type.includes('video')) {
			alert('Only allow uploading video files!');
			return;
		}
		const maxFileSize = 10 * 1024 * 1024; // 10MB
		if (file.size > maxFileSize) {
			alert('File size is too large!');
			return;
		}

		const fileReader = new FileReader();

		fileReader.onloadend = () => {
			const videoUrl = URL.createObjectURL(file);
			setVideoSrc(videoUrl);
			generateThumbnails(file);
			setIsVideo(true);
			setState((prevState) => ({ ...prevState, upload_file: file }));
		};

		fileReader.readAsDataURL(file);

		setVideoUrl(URL.createObjectURL(file)); // set video URL for preview
		setThumbnails([]); // clear existing thumbnails
	};

	const generateThumbnails = (file) => {
		const video = document.createElement('video');
		video.src = URL.createObjectURL(file);

		video.onloadedmetadata = () => {
			const canvas = document.createElement('canvas');
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;

			const ctx = canvas.getContext('2d');

			const timeInterval = video.duration / 9;
			let currentTime = 0;
			const generateThumbnail = () => {
				// if (currentTime <= video.duration) {
				if (currentTime <= video.duration) {
					video.currentTime = currentTime;
					const num = video.currentTime;
					const number = Math.floor(num);
					setThumbnailTime((thumbnailTime) => [...thumbnailTime, number]);
					ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

					const dataUri = canvas.toDataURL('image/jpeg');
					setThumbnails((thumbnails) => [...thumbnails, dataUri]);

					currentTime += timeInterval;
					setTimeout(generateThumbnail, 300); // wait for video to load
				}
			};

			generateThumbnail();
		};
	};
	const handleClickUploadFile = () => {
		inputFileRef.current.click();
	};

	const handleTextChange = (e) => {
		const textareaLineHeight = 24; // chiều cao mỗi hàng của textarea (có thể thay đổi)
		const { scrollHeight, clientHeight } = e.target;
		const rows = Math.ceil(scrollHeight / textareaLineHeight);
		setRows(rows);
		setTextValue(textInputRef.current.value);
	};
	const debouncedTextValue = useDebounce(textValue, 2000);
	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			description: debouncedTextValue,
		}));
	}, [debouncedTextValue]);

	const handleToggleSwitch = () => {
		if (isToggle) {
			setIsToggle(false);
		} else {
			setIsToggle(true);
		}
	};
	const handleSelectChange = (e) => {
		setState((prev) => ({
			...prev,
			viewable: e.target.value,
		}));
		setSelectValue(e.target.value);
	};

	const handleCheckboxChange = (name) => {
		const updatedAllows = checkboxValue.includes(name)
			? checkboxValue.filter((item) => item !== name)
			: [...checkboxValue, name];
		setState((prevState) => ({
			...prevState,
			allows: updatedAllows,
		}));
		setCheckboxValue(updatedAllows);
	};
	const handleThumbnailClick = (e) => {
		const time = e.currentTarget.getAttribute('data-time');
		setThumbTimePost(time);
		setState((prevState) => ({ ...prevState, thumbnail_time: time }));
	};

	const handleIsShowModal = () => {
		if (!isModal) {
			setIsModal(true);
		} else {
			setIsModal(false);
		}
	};
	const handleDiscard = () => {
		setIsModal(false);
		setState(initialState);
		setIsVideo(false);
		setCheckboxValue(initialState.allows);
		setSelectValue(initialState.selectValue);
		setThumbnails([]);
		setIsToggle(false);
		// formRef.current.reset();
	};

	useEffect(() => {
		setIsFormValid(Object.values(state).every((value) => value !== ''));
	}, [state]);

	const handleSubmit = (e) => {
		if (!isFormValid) {
			e.preventDefault();
			console.log('Please fill in all fields');
		} else {
			uploadFile(state, accessToken);
		}
	};

	return (
		<>
			{!isLoading ? (
				<>
					{!isModal ? (
						<div className={cx('wrapper')}>
							<div className={cx('container')}>
								<form
									className={cx('body-section')}
									ref={formRef}
									onSubmit={handleSubmit}
								>
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
												<input
													type="file"
													name="inputFile"
													id="inputFile"
													onChange={handleFileUpload}
													ref={inputFileRef}
													accept="video/mp4,video/webm"
													style={{ display: 'none' }}
													className={cx('upload')}
													defaultValue={videoInitial}
												/>
												{isVideo && videoUrl && (
													<video
														src={videoUrl}
														width="400"
														height="300"
														muted
														controls
													></video>
												)}
												<div
													className={cx('upload-card')}
													onClick={handleClickUploadFile}
												>
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
															<span>{textValue.length}</span>
															<span>/ 200</span>
														</p>
													</div>
													<div className={cx('caption-input')}>
														<div className={cx('input-content')}>
															<textarea
																ref={textInputRef}
																rows={rows}
																style={{ minHeight: `${rows * 24}px` }}
																defaultValue=""
																onChange={(e) => {
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
														{thumbnails.length > 0 &&
															thumbnails.slice(1).map((thumbnail, index) => (
																<div
																	className={cx('thumb-content')}
																	key={index}
																	data-time={thumbnailTime[index]}
																	onClick={handleThumbnailClick}
																>
																	<img src={thumbnail} alt={thumbnail} />
																</div>
															))}
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
														<select
															value={selectValue}
															onChange={handleSelectChange}
														>
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
															<label
																htmlFor="comment"
																className={cx('comment-label')}
															>
																Comment
															</label>
															<input
																type="checkbox"
																name="comment"
																id="comment"
																// defaultChecked={checkboxValue}
																checked={checkboxValue.includes('comment')}
																className={cx('comment-checkbox')}
																onChange={() => handleCheckboxChange('comment')}
															></input>
														</div>
														<div className={cx('duet-section')}>
															<label
																htmlFor="duet"
																className={cx('duet-label')}
															>
																Duet
															</label>
															<input
																type="checkbox"
																name="duet"
																id="duet"
																checked={checkboxValue.includes('duet')}
																onChange={() => handleCheckboxChange('duet')}
																className={cx('duet-checkbox')}
															></input>
														</div>
														<div className={cx('stitch-section')}>
															<label
																htmlFor="stitch"
																className={cx('stitch-label')}
															>
																Stitch
															</label>
															<input
																type="checkbox"
																name="stitch"
																id="stitch"
																checked={checkboxValue.includes('stitch')}
																onChange={() => handleCheckboxChange('stitch')}
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
																!isToggle
																	? cx('switch-btn-f')
																	: cx('switch-btn-t')
															}
														></span>
													</div>
												</div>
												{/* </div> */}
											</div>
											{!isToggle ? (
												<div className={cx('copyright-section')}>
													<span>
														We'll check your video for potential copyright
														infringements on used sounds. If infringements are
														found, you can edit the video before posting.
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
														Copyright check will not begin until your video is
														uploaded.
													</span>
												</div>
											)}
											<div className={cx('btn-arrow-section')}>
												<div className={cx('btn-cancel')}>
													<button
														type="reset"
														className={cx('arrow-btn')}
														onClick={handleIsShowModal}
													>
														<p>Discard</p>
													</button>
												</div>
												<div className={cx('btn-post')}>
													<button
														className={cx({
															'arrow-btn-f': !isFormValid,
															'arrow-btn-t': isFormValid,
														})}
													>
														<p>Post</p>
													</button>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					) : (
						<ToastModal
							isShowModal={handleIsShowModal}
							isDiscard={handleDiscard}
						/>
					)}
				</>
			) : (
				<Loader />
			)}
		</>
	);
}

Upload.propTypes = {};

export default Upload;
