import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ModalPartials.module.scss';
import { ModalBodyNameContext } from '../Modal';

const cx = classNames.bind(styles);

function ResetPasswordWithPhone() {
	const value = useContext(ModalBodyNameContext);
	const handleLoginEmail = (e, tag) => {
		e.preventDefault();
		value.handleModalBodyName(tag);
	};
	return (
		<div className={cx('modal-content')}>
			<div className={cx('login-section')}>
				<p>Reset password</p>

				<form className={cx('form-section')}>
					<div className={cx('login-form')}>
						<div className={cx('header')}>
							<span>Enter phone number</span>
							<span
								onClick={(e) =>
									handleLoginEmail(e, 'reset-password-with-email')
								}
							>
								Reset with email
							</span>
						</div>
						<div className={cx('input-section')}>
							<div className={cx('input-content')}>
								<span className={cx('label-phone')}>VN +84</span>
								<input
									className={cx('input-phone')}
									type="text"
									name="phoneNumber"
									placeholder="Phone number"
								></input>
							</div>
							<div className={cx('input-content')}>
								<input
									className={cx('input')}
									name="phoneConfirm"
									type="text"
									placeholder="Enter 6-digital code"
								></input>
								<span className={cx('label')}>Send code</span>
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

						<div>
							<button className={cx('login-btn')}>Log in</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

ResetPasswordWithPhone.propTypes = {};

export default ResetPasswordWithPhone;
