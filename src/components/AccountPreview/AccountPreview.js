import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './AccountPreview.module.scss';
import { CheckActiveIcon } from '~/components/Icons';
import Button from '~/components/Button';
import Avatar from '~/components/Avatar';
import { AuthUserContext } from '~/App';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
	const [isFollow, setIsFollow] = useState(false);
	const { authUser } = useContext(AuthUserContext);
	return (
		<div className={cx('wrapper')}>
			<header className={cx('header')}>
				<Avatar
					className={cx('avatar')}
					src={data.avatar}
					alt={data.nickname}
				/>
				{data.is_followed ? (
					<Button className={cx('follow-btn')} textOutline>
						Following
					</Button>
				) : (
					<Button className={cx('follow-btn')} outline>
						Follow
					</Button>
				)}
			</header>
			<div className={cx('content')}>
				<p className={cx('nickname')}>
					<strong>{data.nickname}</strong>
					{/* <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} /> */}
					{data.tick && (
						<span className={cx('check-icon')}>{<CheckActiveIcon />}</span>
					)}
				</p>
				<p className={cx('name')}>{`${data.first_name} ${data.last_name}`} </p>
				<p className={cx('analytics')}>
					<span>
						<strong className={cx('value')}>{data.followers_count} </strong>
						<span className={cx('label')}>Followers</span>
					</span>
					<span>
						<strong className={cx('value')}>{data.likes_count} </strong>
						<span className={cx('label')}>Likes</span>
					</span>
				</p>
				<p className={cx('bio')}>
					<span>{data.bio}</span>
				</p>
			</div>
		</div>
	);
}

AccountPreview.propTypes = {
	data: PropTypes.object.isRequired,
};

export default AccountPreview;
