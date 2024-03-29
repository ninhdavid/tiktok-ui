import React, { createContext, useState, useContext, useRef } from 'react';
import { Link, useNavigate, redirect } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlus,
	faEllipsisVertical,
	faEarthAsia,
	faCircleQuestion,
	faCoins,
	faGear,
	faVideoCamera,
	faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import {
	faKeyboard,
	faPaperPlane,
	faUser,
} from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { InboxIcon } from '~/components/Icons/Icon';
import Search from '../Search/Search';
import { AuthUserContext } from '~/App';
import Avatar from '~/components/Avatar';
import Modal from '~/layouts/components/ModalWrapper/Modal';
import config from '~/config';
import { useStylesByElementWidth } from '~/hooks';
import { AccountItemLink } from '~/components/AccountItem';

const cx = classNames.bind(styles);

export const ModalBodyNameContext = createContext();

const MENU_ITEMS = [
	{
		icon: <FontAwesomeIcon icon={faEarthAsia} />,
		title: 'English',
		children: {
			title: 'Language',
			data: [
				{
					type: 'language',
					code: 'en',
					title: 'English',
				},
				{
					type: 'language',
					code: 'vi-vn',
					title: 'Tiếng Việt (Việt Nam)',
				},
				{
					type: 'language',
					code: 'ja-jp',
					title: '日本語 (日本)',
				},
			],
		},
	},
	{
		icon: <FontAwesomeIcon icon={faCircleQuestion} />,
		title: 'Feedback and help',
		to: '',
	},
	{
		icon: <FontAwesomeIcon icon={faKeyboard} />,
		title: 'Keyboard shortcuts',
	},
];

function Header({ className }) {
	const navigate = useNavigate();
	const [modalBodyName, setModalBodyName] = useState('login');
	const [isShowModal, setIsShowModal] = useState(false);

	const { authUser } = useContext(AuthUserContext); //authUser nhận giá trị là JSON.parse(localStorage.getItem('user'));
	const accessToken =
		authUser && authUser.data && authUser.data.nickname
			? authUser.data.nickname
			: '';

	if (isShowModal) {
		// Disable scroll
		document.body.style.overflow = 'hidden';
	}
	const handleMenuChange = (menuItem) => {
		switch (menuItem.type) {
			case 'languages':
				//handle change languages
				break;
			default:
		}
		switch (menuItem.to) {
			case '/logout':
				localStorage.removeItem('user');
				navigate('/');
				window.location.reload();
				// window.location.href = window.location.origin + '/tiktok-ui/';

				break;
			case '/@profile':
				// window.location.href = `/@${authUser.data.nickname}`;
				navigate(`/@${authUser.data.nickname}`);
				break;
			default:
				break;
		}
	};

	const userMenu = [
		{
			icon: <FontAwesomeIcon icon={faUser} />,
			title: 'View profile',
			to: `/@${accessToken}`,
		},
		{
			icon: <FontAwesomeIcon icon={faCoins} />,
			title: 'Get coins',
			to: '',
		},
		{
			icon: <FontAwesomeIcon icon={faVideoCamera} />,
			title: 'Live Studio',
			to: '',
		},
		{
			icon: <FontAwesomeIcon icon={faGear} />,
			title: 'Setting',
			to: '',
		},
		...MENU_ITEMS,
		{
			icon: <FontAwesomeIcon icon={faArrowRightToBracket} />,
			title: 'Log out',
			to: '/logout',
			separate: true,
		},
	];
	const handleUploadBtn = (e) => {
		if (authUser && authUser.meta && authUser.meta.token) {
			navigate('/upload');
		} else {
			setIsShowModal(true);
		}
	};
	return (
		<header className={cx('wrapper')}>
			<div className={className ? cx('inner') : cx('innerSmall')}>
				<Link to={config.routes.home} className={cx('logo')}>
					<img src={images.logo} alt="Tiktok" />
				</Link>

				<Search />

				<div className={cx('action')}>
					<Button
						// to={config.routes.upload}
						leftIcon={<FontAwesomeIcon icon={faPlus} />}
						text
						onClick={handleUploadBtn}
					>
						Upload
					</Button>

					{accessToken ? (
						<>
							<Tippy delay="300" content="Create effects">
								<div className={cx('logo')}>
									<img src={images.effectSite} alt="effectSite" />
								</div>
							</Tippy>
							<Tippy delay="300" content="Messages" placement="bottom">
								<button className={cx('action-btn-plan')}>
									<FontAwesomeIcon icon={faPaperPlane} />
								</button>
							</Tippy>
							<Tippy delay="300" content="Inbox" placement="bottom">
								<button className={cx('inbox-btn')}>
									<InboxIcon className={cx('inbox-icon')} />
								</button>
							</Tippy>
						</>
					) : (
						<>
							<Button
								primary
								onClick={(e) => {
									e.preventDefault();
									setIsShowModal(true);
								}}
							>
								Log in
							</Button>
						</>
					)}

					<Menu
						key={accessToken ? 'userMenu' : 'defaultMenu'}
						items={accessToken ? userMenu : MENU_ITEMS}
						onChange={handleMenuChange}
					>
						{accessToken ? (
							<span>
								<Avatar
									className={cx('user-avatar')}
									src={authUser.data.avatar}
									alt={authUser.data.nickname}
								/>
							</span>
						) : (
							<button className={cx('more-btn')}>
								<FontAwesomeIcon icon={faEllipsisVertical} />
							</button>
						)}
					</Menu>
					{/* 
						{authUser ? (
							<Menu items={userMenu}>
								<span>
									<Avatar
										className={cx('user-avatar')}
										src={authUser.data.avatar}
										alt={authUser.data.nickname}
									/>
								</span>
							</Menu>
						) : (
							<Menu items={MENU_ITEMS} onChange={handleMenuChange}>
								<button className={cx('more-btn')}>
									<FontAwesomeIcon icon={faEllipsisVertical} />
								</button>
							</Menu>
						)} */}
				</div>
				{/* <ModalBodyNameContext.Provider value={value}>
							{isShowModal && (
								<ModalWrapper
									children={children}
									onClose={() => {
										setIsShowModal(false);
										setModalBodyName('');
									}}
								/>
							)}
						</ModalBodyNameContext.Provider> */}
				{isShowModal && (
					<Modal
						onClose={() => {
							setIsShowModal(false);
							setModalBodyName('');
							document.body.style.overflow = 'auto';
						}}
					/>
				)}
			</div>
		</header>
	);
}

export default Header;
