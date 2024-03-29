import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ModalPartials.module.scss';
import { ModalBodyNameContext } from '../Modal';

const cx = classNames.bind(styles);

function ResetPasswordWithEmail() {
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
							<span>Enter email address</span>
							<span
								onClick={(e) =>
									handleLoginEmail(e, 'reset-password-with-phone')
								}
							>
								Reset with phone number
							</span>
						</div>
						<div className={cx('input-section')}>
							<div className={cx('input-content')}>
								<span className={cx('label-phone')}>VN +84</span>
								<input
									className={cx('input-phone')}
									name="phoneNumber"
									type="text"
									placeholder="Email address"
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
									type="text"
									placeholder="Password"
								></input>
							</div>
						</div>
						{/* <div className={cx('login-password')}>
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
						</div> */}
						<div>
							<button className={cx('login-btn')}>Log in</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

ResetPasswordWithEmail.propTypes = {};

export default ResetPasswordWithEmail;
