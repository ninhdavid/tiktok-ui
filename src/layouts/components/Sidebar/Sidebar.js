import React, { useEffect, useState, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import classNames from 'classnames/bind';
import config from '~/config';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
	FollowedUsersActiveIcon,
	FollowedUsersIcon,
	HomeIcon,
	HomeIconActive,
	LiveActiveIcon,
	LiveIcon,
} from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { AuthUserContext } from '~/App';
import SuggestedAccounts from '~/components/SuggestedAccounts/SuggestedAccounts';
import * as userService from '~/services/userService';
import HashTag from '~/components/HashTag';
import Button from '~/components/Button';
import { Modal } from '../ModalWrapper';
import { useStylesByElementWidth } from '~/hooks';
import { height } from '@mui/system';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar({ small, setIsShowModal, isShowModal }) {
	const { authUser } = useContext(AuthUserContext);

	const sectionRef = useRef(null);
	// const isSmall = useStylesByElementWidth(sectionRef, 332);

	const [suggestPerPage, setSuggestPerPage] = useState(PER_PAGE);
	const [suggestUsers, setSuggestUsers] = useState([]);
	const [followPerPage, setFollowPerPage] = useState(INIT_PAGE);
	const [followUsers, setFollowUser] = useState([]);
	const [showSuggestedAccounts, setShowSuggestedAccounts] = useState(true);

	// const [isShowModal, setIsShowModal] = useState(false);
	const [modalBodyName, setModalBodyName] = useState('login');

	const accessToken =
		authUser && authUser.meta.token ? authUser.meta.token : '';

	const [initialSuggestedUsers, setInitialSuggestedUsers] = useState([]);
	const [initialFollowedUsers, setInitialFollowedUsers] = useState([]);
	const location = useLocation();

	if (isShowModal) {
		// Disable scroll
		document.body.style.overflow = 'hidden';
	}
	// Get suggested users
	useEffect(() => {
		userService
			.getSuggestedUsers({
				page: 1,
				perPage: suggestPerPage,
				accessToken: accessToken,
			})
			.then((data) => {
				if (Array.isArray(data)) {
					setSuggestUsers(data);
					setInitialSuggestedUsers(data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [accessToken, suggestPerPage]);

	// Get following users
	useEffect(() => {
		if (accessToken) {
			userService
				.getFollowingUsers({ page: followPerPage, accessToken: accessToken })
				.then((data) => {
					if (Array.isArray(data)) {
						if (followPerPage === INIT_PAGE) {
							setFollowUser(data);
							setInitialFollowedUsers(data);
						} else {
							setFollowUser((prev) => [...prev, ...data]);
						}
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			setFollowUser([]);
		}
	}, [accessToken, followPerPage]);

	function moreSuggestUsers() {
		if (suggestUsers.length === PER_PAGE) {
			// setSuggestPerPage(PER_PAGE * 4); // Get 20 users
			setSuggestPerPage(PER_PAGE * 2);
		} else {
			setSuggestPerPage(PER_PAGE);
			setSuggestUsers(initialSuggestedUsers);
		}
	}

	function moreFollowUsers() {
		// Stop call API if last page has < PER_PAGE users (no more users)
		// Or has reached 6th page
		if (
			followUsers.length === PER_PAGE * 6 ||
			followUsers.length < followPerPage * PER_PAGE
		) {
			setFollowPerPage(INIT_PAGE);
		} else {
			setFollowPerPage((prevPage) => prevPage + 1);
		}
	}

	const handleMenuItemClick = (route) => {
		if (route === config.routes.following && !authUser) {
			setShowSuggestedAccounts(false);
		} else {
			setShowSuggestedAccounts(true);
		}
	};
	useEffect(() => {
		if (location.pathname === config.routes.following && !authUser) {
			setShowSuggestedAccounts(false);
		} else {
			setShowSuggestedAccounts(true);
		}
	}, [location.pathname, authUser]);
	const introduce = [
		{
			tagName: 'About',
			href: '#',
		},
		{
			tagName: 'Newsroom',
			href: '#',
		},
		{
			tagName: 'Contact',
			href: '#',
		},
		{
			tagName: 'Careers',
			href: '#',
		},
		{
			tagName: 'ByteDance',
			href: '#',
		},
	];
	const recommend = [
		{
			tagName: 'TikTok for Good',
			href: '#',
		},
		{
			tagName: 'Advertise',
			href: '#',
		},
		{
			tagName: 'Developers',
			href: '#',
		},
		{
			tagName: 'Transparency',
			href: '#',
		},
		{
			tagName: 'TikTok Rewards',
			href: '#',
		},
		{
			tagName: 'TikTok Browse',
			href: '#',
		},
		{
			tagName: 'TikTok Embeds',
			href: '#',
		},
	];
	const support = [
		{
			tagName: 'Help',
			href: '#',
		},
		{
			tagName: 'Safety',
			href: '#',
		},
		{
			tagName: 'Terms',
			href: '#',
		},
		{
			tagName: 'Privacy',
			href: '#',
		},
		{
			tagName: 'Creator Portal',
			href: '#',
		},
		{
			tagName: 'Community Guidelines',
			href: '#',
		},
	];
	function renderLink(initial) {
		return initial.map((result, index) => (
			<a
				className={cx('footer-link')}
				key={index}
				href={result.href}
				alt={result.tagName}
				style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '5px' }}
			>
				{result.tagName}
			</a>
		));
	}

	// function renderBtnLogin() {
	// 	return (
	// 		<div className={cx('login-section')}>
	// 			<p>
	// 				<span>
	// 					Log in to follow creators, like videos, and view comments.
	// 				</span>
	// 			</p>
	// 			<Button
	// 				className={cx('login-btn')}
	// 				outline
	// 				onClick={(e) => {
	// 					e.preventDefault();
	// 					setIsShowModal(true);
	// 				}}
	// 			>
	// 				Log in
	// 			</Button>
	// 		</div>
	// 	);
	// }
	const handleLoginBtn = (e) => {
		e.preventDefault();
		setIsShowModal(true);
	};
	return (
		<>
			{/* {isShowModal && (
				<Modal
					onClose={() => {
						setIsShowModal(false);
						document.body.style.overflow = 'auto';
						setModalBodyName('');
					}}
				/>
			)} */}
			<aside className={!small ? cx('wrapper-l') : cx('wrapper-s')}>
				{/* <PerfectScrollbar> */}
				<SimpleBar
					forceVisible="y"
					autoHide={false}
					className={!small ? cx('simple-l') : cx('simple-s')}
				>
					<div className={cx('scroll-inner')}>
						<Menu className={cx('menu')}>
							<MenuItem
								title="For You"
								to={config.routes.home}
								icon={<HomeIcon />}
								activeIcon={<HomeIconActive />}
								onClick={() => handleMenuItemClick(config.routes.home)}
							/>
							<MenuItem
								title="Following"
								to={config.routes.following}
								icon={<FollowedUsersIcon />}
								activeIcon={<FollowedUsersActiveIcon />}
								onClick={() => handleMenuItemClick(config.routes.following)}
							/>
							<MenuItem
								title="LIVE"
								to={config.routes.live}
								icon={<LiveIcon />}
								activeIcon={<LiveActiveIcon />}
								onClick={() => handleMenuItemClick(config.routes.live)}
							/>

							{/* {!accessToken && renderBtnLogin()} */}
							{!accessToken && (
								<div className={cx('login-section')}>
									<p>
										<span>
											Log in to follow creators, like videos, and view comments.
										</span>
									</p>
									<Button
										className={cx('login-btn')}
										outline
										onClick={handleLoginBtn}
									>
										Log in
									</Button>
								</div>
							)}
						</Menu>

						{isShowModal && (
							<Modal
								onClose={() => {
									setIsShowModal(false);
									document.body.style.overflow = 'auto';
									setModalBodyName('');
								}}
							/>
						)}
						{showSuggestedAccounts && (
							<SuggestedAccounts
								className={cx('suggestedAccounts')}
								label="Suggested Accounts"
								// moreLabel={suggestUsers.length === PER_PAGE ? 'See all' : 'See less'}
								data={suggestUsers}
								moreFunc={moreSuggestUsers}
								initialData={initialSuggestedUsers}
								setIsShowModal={setIsShowModal}
								isShowModal={isShowModal}
							/>
						)}
						{accessToken && (
							<SuggestedAccounts
								className={cx('followedAccounts')}
								label="Following Accounts"
								// moreLabel={
								// 	followUsers.length === PER_PAGE * 6 ||
								// 	followUsers.length < PER_PAGE * followPerPage
								// 		? 'See less'
								// 		: 'See more'
								// }
								data={followUsers}
								moreFunc={moreFollowUsers}
								initialData={initialFollowedUsers}
								setIsShowModal={setIsShowModal}
								isShowModal={isShowModal}
							/>
						)}
						<div className={cx('discover-section')}>
							<p>Discover</p>
							<section>
								<div
									ref={sectionRef}
									className={!small ? cx('music') : cx('small-section')}
								>
									<HashTag primary rounded tag="hashtag" className={cx('icon')}>
										suthatla
									</HashTag>
									<HashTag primary rounded tag="hashtag" className={cx('icon')}>
										sansangthaydoi
									</HashTag>
								</div>
								<div className={cx('hashtag')}>
									<HashTag primary rounded tag="music" className={cx('icon')}>
										Yêu đơn phương là gì (MEE Remix) - Mee media & h0n & BHMedia
									</HashTag>
								</div>
								<div
									ref={sectionRef}
									className={!small ? cx('music') : cx('small-section')}
								>
									<HashTag primary rounded tag="hashtag" className={cx('icon')}>
										genzlife
									</HashTag>
								</div>
							</section>
						</div>

						<div className={cx('footer-section')}>
							<div className={cx('footer-content')}>
								<div className={cx('footer-introduce')}>
									{renderLink(introduce)}
								</div>
								<div className={cx('footer-recommend')}>
									{renderLink(recommend)}
								</div>
								<div className={cx('footer-support')}>
									{renderLink(support)}
								</div>
								<div className={cx('footer-copyright')}>
									<FontAwesomeIcon icon={faCopyright} /> 2023 TikTok
								</div>
							</div>
						</div>
					</div>
				</SimpleBar>
				{/* </PerfectScrollbar> */}
			</aside>
		</>
	);
}

export default Sidebar;
