import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../LoginModal';
import { faUser } from '@fortawesome/free-regular-svg-icons';
const cx = classNames.bind(styles);

function EmailAndPasswordLoginForm(props) {
	return (
		<div className={cx('modal-content')}>
			<div className={cx('login-section')}>
				<p>Log in to TikTok</p>

				<form className={cx('form-section')}>
					<div className={cx('login-form')}>
						<div className={cx('header')}>
							<span>Phone</span>
							<span>Log in with email or username</span>
						</div>
						<div className={cx('input-section')}>
							<div className={cx('input-content')}>
								<span className={cx('label-phone')}>VN +84</span>
								<input className={cx('input-phone')}></input>
							</div>
							<div className={cx('input-content')}>
								<input className={cx('input')}></input>
								<span className={cx('label')}>Send code</span>
							</div>
						</div>
						<div className={cx('login-password')}>
							<span>Log in with password</span>
							<span>Log in with password</span>
						</div>
						<div>
							<button className={cx('login-btn')}>Log in</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

EmailAndPasswordLoginForm.propTypes = {};

export default EmailAndPasswordLoginForm;
