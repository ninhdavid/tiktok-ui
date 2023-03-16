import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ModalPartials.module.scss';
import { ModalBodyNameContext } from '../Modal';

const cx = classNames.bind(styles);

function PhoneAndPasswordLoginForm() {
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
								Phone number
							</span>
						</div>
						<div className={cx('input-section')}>
							<div className={cx('input-content')}>
								<span className={cx('label-phone')}>VN +84</span>
								<input
									className={cx('input-phone')}
									name="phoneNumber"
									type="text"
									placeholder="Phone number"
								></input>
							</div>
							<div className={cx('input-content')}>
								<input
									className={cx('input')}
									name="password"
									type="password"
									placeholder="Password"
								></input>
							</div>
						</div>
						<div className={cx('login-password')}>
							<span
								onClick={(e) =>
									handleLoginEmail(e, 'reset-password-with-phone')
								}
							>
								Forgot password?
							</span>
							<span onClick={(e) => handleLoginEmail(e, 'login-with-phone')}>
								Log in with code
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

PhoneAndPasswordLoginForm.propTypes = {};

export default PhoneAndPasswordLoginForm;
