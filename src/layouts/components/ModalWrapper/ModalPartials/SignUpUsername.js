import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './ModalPartials.module.scss';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { ModalBodyNameContext } from '../../Header/Header';
const cx = classNames.bind(styles);

function SignUpUsername(props) {
	const value = useContext(ModalBodyNameContext);
	const handleLoginEmail = (e, tag) => {
		e.preventDefault();
		value.handleModalBodyName(tag);
	};
	return (
		<div className={cx('modal-content')}>
			<div className={cx('login-section')}>
				<p>Sign up</p>

				<form className={cx('form-section')}>
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
								></input>
							</div>
							<div className={cx('input-content')}>
								<input
									className={cx('input')}
									type="password"
									name="password"
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

SignUpUsername.propTypes = {};

export default SignUpUsername;
