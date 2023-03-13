import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './ModalPartials.module.scss';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { ModalBodyNameContext } from '../../Header/Header';
const cx = classNames.bind(styles);

function PhoneAndCodeLoginForm(props) {
	const value = useContext(ModalBodyNameContext);
	const handleLoginEmail = (e, tag) => {
		e.preventDefault();
		value.handleModalBodyName(tag);
	};
	return (
		<div className={cx('modal-content')}>
			<div className={cx('login-section')}>
				<p>Log in</p>

				<form className={cx('form-section')}>
					<div className={cx('login-form')}>
						<div className={cx('header')}>
							<span>Phone</span>
							<span onClick={(e) => handleLoginEmail(e, 'login-with-email')}>
								Login with email or username
							</span>
						</div>
						<div className={cx('input-section')}>
							<div className={cx('input-content')}>
								<span className={cx('label-phone')}>VN +84</span>
								<input
									className={cx('input-phone')}
									type="text"
									placeholder="Phone number"
								></input>
							</div>
							<div className={cx('input-content')}>
								<input
									className={cx('input')}
									type="text"
									placeholder="Enter 6-digital code"
								></input>
								<span className={cx('label')}>Send code</span>
							</div>
						</div>
						<div className={cx('login-password')}>
							<span
								onClick={(e) =>
									handleLoginEmail(e, 'login-with-phone-and-password')
								}
							>
								Log in with password
							</span>
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

PhoneAndCodeLoginForm.propTypes = {};

export default PhoneAndCodeLoginForm;
