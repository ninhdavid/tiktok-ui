import React, { useEffect, useState, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';

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
import SuggestedAccounts from '~/components/SuggestedAccounts/SuggestedAccounts';
import * as userService from '~/services/userService';
import { AuthUserContext } from '~/App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import HashTag from '~/components/HashTag';
import Button from '~/components/Button';
import { Modal } from '../ModalWrapper';
import { useStylesByElementWidth } from '~/hooks';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
	const { authUser } = useContext(AuthUserContext);

	const sectionRef = useRef(null);
	const isSmall = useStylesByElementWidth(sectionRef, 240);

	const [suggestPerPage, setSuggestPerPage] = useState(PER_PAGE);
	const [suggestUsers, setSuggestUsers] = useState([]);
	const [followPerPage, setFollowPerPage] = useState(INIT_PAGE);
	const [followUsers, setFollowUser] = useState([]);
	const [showSuggestedAccounts, setShowSuggestedAccounts] = useState(true);

	const [isShowModal, setIsShowModal] = useState(false);
	const [modalBodyName, setModalBodyName] = useState('login');

	const accessToken =
		authUser && authUser.meta.token ? authUser.meta.token : '';

	const [initialSuggestedUsers, setInitialSuggestedUsers] = useState([]);
	const [initialFollowedUsers, setInitialFollowedUsers] = useState([]);
	const location = useLocation();

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

	function renderBtnLogin() {
		return (
			<div className={cx('login-section')}>
				<p>
					<span>
						Log in to follow creators, like videos, and view comments.
					</span>
				</p>
				<Button
					className={cx('login-btn')}
					outline
					onClick={(e) => {
						e.preventDefault();
						setIsShowModal(true);
					}}
				>
					Log in
				</Button>
			</div>
		);
	}

	return (
		<aside className={cx('wrapper')}>
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

				{!accessToken && renderBtnLogin()}
			</Menu>

			{isShowModal && (
				<Modal
					onClose={() => {
						setIsShowModal(false);
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
				/>
			)}
			<div className={cx('discover-section')}>
				<p>Discover</p>
				<section>
					<div className={cx('hashtag')}>
						<HashTag primary rounded tag="hashtag" className={cx('icon')}>
							Testing hashtag
						</HashTag>
					</div>
					<div
						ref={sectionRef}
						className={!isSmall ? cx('music') : cx('small-section')}
					>
						<HashTag primary rounded tag="music" className={cx('icon')}>
							Testing
						</HashTag>
						<HashTag primary rounded tag="music" className={cx('icon')}>
							Testing
						</HashTag>
					</div>
				</section>
			</div>

			<div className={cx('footer-section')}>
				<div className={cx('footer-content')}>
					<div className={cx('footer-introduce')}>{renderLink(introduce)}</div>
					<div className={cx('footer-recommend')}>{renderLink(recommend)}</div>
					<div className={cx('footer-support')}>{renderLink(support)}</div>
					<div className={cx('footer-copyright')}>
						<FontAwesomeIcon icon={faCopyright} /> 2023 TikTok
					</div>
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
