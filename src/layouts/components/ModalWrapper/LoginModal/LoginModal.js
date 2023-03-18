import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './LoginModal.module.scss';
// import { ModalBodyNameContext } from '../../Header/Header';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { ModalBodyNameContext } from '../Modal';

const cx = classNames.bind(styles);

function LoginModal() {
	const value = useContext(ModalBodyNameContext);

	const selector = [
		{
			// href: '/login/phone-or-email',
			icon: <FontAwesomeIcon icon={faUser} className={cx('icon')} />,
			text: 'Default Account',
			navigate: 'login-with-default',
		},
		{
			href: '/login/phone-or-email',
			icon: <FontAwesomeIcon icon={faUser} className={cx('icon')} />,
			text: 'Use phone / email / username',
			navigate: 'login-with-phone',
		},
	];

	function handleOnClick(e, tag) {
		e.preventDefault();
		value.handleModalBodyName(tag);
	}

	const renderLoginForm = () => {
		return selector.map((result, index) => {
			return result.href ? (
				<a
					href={result.href}
					alt={result.text}
					// onClick={(e) => {
					// 	e.preventDefault();
					// 	value.handleModalBodyName(result.navigate);
					// }}
					onClick={(e) => {
						handleOnClick(e, result.navigate);
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
						handleOnClick(e, result.navigate);
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
				<p>Log in to TikTok</p>

				{renderLoginForm()}
			</div>
		</div>
	);
}

LoginModal.propTypes = {};

export default LoginModal;
