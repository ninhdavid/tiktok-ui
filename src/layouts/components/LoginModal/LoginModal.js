import React from 'react';
import PropTypes from 'prop-types';
import styles from './LoginModal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function LoginModal(props) {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('container')}>
				<div className={cx('content')}>
					<p>Log in to TikTok</p>
				</div>
			</div>
		</div>
	);
}

LoginModal.propTypes = {};

export default LoginModal;
