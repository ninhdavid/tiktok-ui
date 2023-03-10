import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './AccountPreview.module.scss';
import { CheckActiveIcon } from '~/components/Icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
	return (
		<div className={cx('wrapper')}>
			<header className={cx('header')}>
				<img
					className={cx('avatar')}
					src={data.avatar}
					alt={data.nickname}
				></img>

				<Button className={cx('follow-btn')} primary>
					Follow
				</Button>
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
			</div>
		</div>
	);
}

AccountPreview.propTypes = {
	data: PropTypes.object.isRequired,
};

export default AccountPreview;
