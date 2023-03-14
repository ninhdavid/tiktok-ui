import React, { createContext, useState, useEffect, useContext } from 'react';
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
import Image from '~/components/Image';
import Search from '../Search/Search';
import LoginModal from '../ModalWrapper/LoginModal';
import ModalWrapper from '../ModalWrapper';
import {
	PhoneAndCodeLoginForm,
	PhoneAndPasswordLoginForm,
	EmailAndPasswordLoginForm,
	ResetPasswordWithPhone,
	ResetPasswordWithEmail,
	DefaultUserLogin,
	SignUpUsername,
	SignUpWithEmailAndPassword,
} from '../ModalWrapper/ModalPartials';
import SignUpModal from '../ModalWrapper/SignUpModal';
import { AuthUserContext } from '~/App';
import Avatar from '~/components/Avatar';
import { useLoginAuth } from '~/hooks';

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

function Header({ newData }) {
	const [isShowModal, setIsShowModal] = useState(false);
	const [children, setChildren] = useState(<LoginModal />);
	const [modalBodyName, setModalBodyName] = useState('login');
	const [navigateBack, setNavigateBack] = useState(null);
	const { authUser } = useContext(AuthUserContext); //authUser nhận giá trị là JSON.parse(localStorage.getItem('user'));
	const [newdata, setNewdata] = useState(authUser);
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

	const handleModalBodyName = (value) => {
		setModalBodyName(value ?? 'login');
	};
	const value = {
		modalBodyName,
		navigateBack,
		handleModalBodyName,
	};

	useEffect(() => {
		switch (modalBodyName) {
			case 'login':
				setChildren(<LoginModal />);
				setNavigateBack(null);
				break;
			case 'signup':
				setChildren(<SignUpModal />);
				setNavigateBack(null);
				break;
			case 'signup-with-email-and-password':
				setChildren(<SignUpWithEmailAndPassword />);
				setNavigateBack('signup');
				break;
			case 'login-with-default':
				setChildren(<DefaultUserLogin />);
				setNavigateBack('login');
				break;
			case 'login-with-phone':
				setChildren(<PhoneAndCodeLoginForm />);
				setNavigateBack('login');
				break;
			case 'login-with-phone-and-password':
				setChildren(<PhoneAndPasswordLoginForm />);
				setNavigateBack('login-with-phone');
				break;
			case 'login-with-email':
				setChildren(<EmailAndPasswordLoginForm />);
				setNavigateBack('login');
				break;
			case 'reset-password-with-phone':
				setChildren(<ResetPasswordWithPhone />);
				setNavigateBack('login-with-phone-and-password');
				break;
			case 'reset-password-with-email':
				setChildren(<ResetPasswordWithEmail />);
				setNavigateBack('login-with-phone-and-password');
				break;
			default:
				setChildren(<LoginModal />);
				break;
		}
	}, [modalBodyName]);

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

					<ModalBodyNameContext.Provider value={value}>
						{isShowModal && (
							<ModalWrapper
								children={children}
								onClose={() => {
									setIsShowModal(false);
									setModalBodyName('');
								}}
							/>
						)}
					</ModalBodyNameContext.Provider>
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
