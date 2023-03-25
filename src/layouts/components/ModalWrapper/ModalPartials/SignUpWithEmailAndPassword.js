import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ModalPartials.module.scss';
import useSignupAuth from '~/hooks/useSignupAuth';
import { ModalBodyNameContext } from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function SignUpWithEmailAndPassword({ setIsToastSignup }) {
	const value = useContext(ModalBodyNameContext);
	const [signupUser, isSignUp, error] = useSignupAuth();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleLoginEmail = (tag) => {
		value.handleModalBodyName(tag);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		signupUser(username, password, setIsToastSignup);
		setIsLoading(true);
	};
	useEffect(() => {
		if (isSignUp) {
			setIsLoading(false);
			handleLoginEmail('login-with-email');
		}
	}, [isSignUp]);
	return (
		<div className={cx('modal-content')}>
			<div className={cx('login-section')}>
				<p>Sign up</p>

				{isLoading && (
					<div className={cx('icon-section')}>
						<FontAwesomeIcon icon={faSpinner} className={cx('spinner-icon')} />
					</div>
				)}
				{!isLoading && (
					<form className={cx('form-section')} onSubmit={handleSubmit}>
						<div className={cx('login-form')}>
							<div className={cx('header')}>
								<span>Email</span>
								<span></span>
							</div>
							<div className={cx('input-section')}>
								<div className={cx('input-content')}>
									<input
										type="text"
										name="email"
										placeholder="Email"
										className={cx('input-phone')}
										value={username}
										onChange={(e) => {
											setUsername(e.target.value);
										}}
									></input>
								</div>
								<div className={cx('input-content')}>
									<input
										className={cx('input')}
										type="password"
										name="password"
										placeholder="Password"
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
									></input>
								</div>
							</div>

							<div>
								<button type="submit" className={cx('login-btn')}>
									Log in
								</button>
							</div>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}

SignUpWithEmailAndPassword.propTypes = {};

export default SignUpWithEmailAndPassword;
