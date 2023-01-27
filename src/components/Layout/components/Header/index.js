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
import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { InboxIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
const cx = classNames.bind(styles);

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
		to: '/feedback',
	},
	{
		icon: <FontAwesomeIcon icon={faKeyboard} />,
		title: 'Keyboard shortcuts',
	},
];

function Header() {
	const currentUser = true;

	const handleMenuChange = (menuItem) => {
		switch (menuItem.type) {
			case 'languages':
				//handle change languages
				break;
			default:
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
				<div className={cx('logo')}>
					<img src={images.logo} alt="Tiktok" />
				</div>
				<Search />
				<div className={cx('action')}>
					<Button leftIcon={<FontAwesomeIcon icon={faPlus} />} text>
						Upload
					</Button>
					{currentUser ? (
						<>
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
							<Button primary>Log in</Button>
						</>
					)}
					<Tippy delay="300" content="Create effects">
						<div className={cx('logo')}>
							<img src={images.effectSite} alt="effectSite" />
						</div>
					</Tippy>
					<Menu
						items={currentUser ? userMenu : MENU_ITEMS}
						onChange={handleMenuChange}
					>
						{currentUser ? (
							<Image
								className={cx('user-avatar')}
								src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tiktok-obj/1684048218833921.jpeg?x-expires=1674907200&x-signature=6%2FDUMLP1Wyd8lB%2FMs494LRbBSwA%3D"
								// issue image default
								fallback="https://scontent.fkix2-2.fna.fbcdn.net/v/t1.18169-1/12311050_792983130848231_3233101808038080795_n.jpg?stp=c0.47.60.60a_cp0_dst-jpg_p60x60&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=20-5tKFCtKEAX_s1JYB&_nc_ht=scontent.fkix2-2.fna&oh=00_AfBbX7tLsp_l6OiFURDY7W3fUxioRqMkkthFEp9lmG57AQ&oe=63FA2584"
								alt="Nguyen Van A"
							/>
						) : (
							<>
								<button className={cx('more-btn')}>
									<FontAwesomeIcon icon={faEllipsisVertical} />
								</button>
							</>
						)}
					</Menu>
				</div>
			</div>
		</header>
	);
}

export default Header;
