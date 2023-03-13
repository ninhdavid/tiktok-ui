import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SignUpModal.module.scss';
import { ModalBodyNameContext } from '../../Header/Header';
import { faUser } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function SignUpModal() {
	const value = useContext(ModalBodyNameContext);

	const selector = [
		{
			// href: '/login/phone-or-email',
			icon: <FontAwesomeIcon icon={faUser} className={cx('icon')} />,
			text: 'Username and password',
			navigate: 'signup-with-username',
		},
		{
			href: '/signup/phone-or-email',
			icon: <FontAwesomeIcon icon={faUser} className={cx('icon')} />,
			text: 'Use phone or email',
			navigate: 'signup',
		},
	];

	// function handleOnClick(e) {
	// 	e.preventDefault();
	// 	value.handleModalBodyName('login-with-email');
	// }

	const renderLoginForm = () => {
		return selector.map((result, index) => {
			return result.href ? (
				<a
					href={result.href}
					alt={result.text}
					onClick={(e) => {
						e.preventDefault();
						value.handleModalBodyName(result.navigate);
					}}
					key={index}
				>
					<div className={cx('menu-item')}>
						{result.icon}
						<p>{result.text}</p>
					</div>
				</a>
			) : (
				<div
					key={index}
					className={cx('menu-item')}
					onClick={(e) => {
						e.preventDefault();
						value.handleModalBodyName(result.navigate);
					}}
				>
					{result.icon}
					<p>{result.text}</p>
				</div>
			);
		});
	};

	return (
		<div className={cx('modal-content')}>
			<div className={cx('login-section')}>
				<p>Sign up for TikTok</p>

				{renderLoginForm()}
				{/* <form className={cx('form-section')}>
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
								</form> */}
			</div>
		</div>
	);
}

SignUpModal.propTypes = {};

export default SignUpModal;
