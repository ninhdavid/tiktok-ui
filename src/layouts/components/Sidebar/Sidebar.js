import { useEffect, useState, useContext } from 'react';
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

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
	const authUser = useContext(AuthUserContext);

	const [suggestPerPage, setSuggestPerPage] = useState(PER_PAGE);
	const [suggestUsers, setSuggestUsers] = useState([]);
	const [followPerPage, setFollowPerPage] = useState(INIT_PAGE);
	const [followUsers, setFollowUser] = useState([]);

	const accessToken =
		authUser && authUser.meta.token ? authUser.meta.token : '';

	const [initialSuggestedUsers, setInitialSuggestedUsers] = useState([]);

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
	return (
		<aside className={cx('wrapper')}>
			<Menu>
				<MenuItem
					title="For You"
					to={config.routes.home}
					icon={<HomeIcon />}
					activeIcon={<HomeIconActive />}
				/>
				<MenuItem
					title="Following"
					to={config.routes.following}
					icon={<FollowedUsersIcon />}
					activeIcon={<FollowedUsersActiveIcon />}
				/>
				<MenuItem
					title="LIVE"
					to={config.routes.live}
					icon={<LiveIcon />}
					activeIcon={<LiveActiveIcon />}
				/>
			</Menu>
			<SuggestedAccounts
				label="Suggested Accounts"
				// moreLabel={suggestUsers.length === PER_PAGE ? 'See all' : 'See less'}
				data={suggestUsers}
				moreFunc={moreSuggestUsers}
				initialData={initialSuggestedUsers}
			/>

			{accessToken && (
				<SuggestedAccounts
					label="Following Accounts"
					// moreLabel={
					// 	followUsers.length === PER_PAGE * 6 ||
					// 	followUsers.length < PER_PAGE * followPerPage
					// 		? 'See less'
					// 		: 'See more'
					// }
					data={followUsers}
					moreFunc={moreFollowUsers}
					initialData={initialSuggestedUsers}
				/>
			)}
		</aside>
	);
}

export default Sidebar;
