import React, { createContext, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css';

import config from '~/config/routes';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { InboxIcon } from '~/components/Icons/Icon';
import Search from '../Search/Search';
import { AuthUserContext } from '~/App';
import Avatar from '~/components/Avatar';
import Modal from '~/layouts/components/ModalWrapper/Modal';

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
					code: 'en',
					title: 'English',
				},
				{
					type: 'language',
					code: 'vi-vn',
					title: 'Tiếng Việt (Việt Nam)',
				},
			],
		},
	},
	{
		icon: <FontAwesomeIcon icon={faCircleQuestion} />,
		title: 'Feedback and help',
		to: '/feedback',
	},
	{
		icon: <FontAwesomeIcon icon={faKeyboard} />,
		title: 'Keyboard shortcuts',
	},
];

function Header() {
	const [isShowModal, setIsShowModal] = useState(false);
	const [modalBodyName, setModalBodyName] = useState('login');

	const { authUser } = useContext(AuthUserContext); //authUser nhận giá trị là JSON.parse(localStorage.getItem('user'));

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
				window.location.reload();
				break;
			case '/@profile':
				window.location.href = `/@${authUser.data.nickname}`;
				break;
			default:
				break;
		}
	};

	const userMenu = [
		{
			icon: <FontAwesomeIcon icon={faUser} />,
			title: 'Feedback and help',
			to: '/@hoaa',
		},
		{
			icon: <FontAwesomeIcon icon={faCoins} />,
			title: 'Get coins',
			to: '/coin',
		},
		{
			icon: <FontAwesomeIcon icon={faVideoCamera} />,
			title: 'Live Studio',
			to: '/live',
		},
		{
			icon: <FontAwesomeIcon icon={faGear} />,
			title: 'Setting',
			to: '/setting',
		},
		...MENU_ITEMS,
		{
			icon: <FontAwesomeIcon icon={faArrowRightToBracket} />,
			title: 'Log out',
			to: '/logout',
			separate: true,
		},
	];

	return (
		<header className={cx('wrapper')}>
			<div className={cx('inner')}>
				<Link to={config.home} className={cx('logo')}>
					<img src={images.logo} alt="Tiktok" />
				</Link>

				<Search />

				<div className={cx('action')}>
					<Button leftIcon={<FontAwesomeIcon icon={faPlus} />} text>
						Upload
					</Button>

					{authUser ? (
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
							}}
						/>
					)}
					<Menu
						key={authUser ? 'userMenu' : 'defaultMenu'}
						items={authUser ? userMenu : MENU_ITEMS}
						onChange={handleMenuChange}
					>
						{authUser ? (
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
			</div>
		</header>
	);
}

export default Header;
