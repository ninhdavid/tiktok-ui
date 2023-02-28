import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './AccountPreview.module.scss';
import { CheckActiveIcon } from '~/components/Icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountPreview(props) {
	return (
		<div className={cx('wrapper')}>
			<header className={cx('header')}>
				<img
					className={cx('avatar')}
					src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1677682800&x-signature=ac1KlTEVwztVD9jr%2Fy4hl8aZrEA%3D"
					alt=""
				></img>

				<Button className={cx('follow-btn')} primary>
					Follow
				</Button>
			</header>
			<div className={cx('content')}>
				<p className={cx('nickname')}>
					<strong>theanh28entertainment</strong>
					{/* <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} /> */}
					<span className={cx('check-icon')}>{<CheckActiveIcon />}</span>
				</p>
				<p className={cx('name')}>Theanh28 Entertainment</p>
				<p className={cx('analytics')}>
					<p>
						<strong className={cx('value')}>8.2M </strong>
						<span className={cx('label')}>Followers</span>
					</p>
					<p>
						<strong className={cx('value')}>8.2M </strong>
						<span className={cx('label')}>Likes</span>
					</p>
				</p>
			</div>
		</div>
	);
}

AccountPreview.propTypes = {};

export default AccountPreview;
