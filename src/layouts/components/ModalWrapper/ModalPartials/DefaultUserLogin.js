import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './ModalPartials.module.scss';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { ModalBodyNameContext } from '../../Header/Header';
import { useLoginAuth } from '~/hooks';

const cx = classNames.bind(styles);

function DefaultUserLogin(props) {
	const value = useContext(ModalBodyNameContext);
	const [loginUser, isLoggedIn] = useLoginAuth();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLoginEmail = (e, tag) => {
		e.preventDefault();
		value.handleModalBodyName(tag);
	};
	function handleSubmit(e) {
		e.preventDefault();
		loginUser(username, password);
	}
	return (
		<div className={cx('modal-content')}>
			<div className={cx('login-section')}>
				<p>Log in</p>

				<form className={cx('form-section')} onSubmit={handleSubmit}>
					<div className={cx('login-form')}>
						<div className={cx('header')}>
							<span>Email or username</span>
						</div>
						<div className={cx('input-section')}>
							<div className={cx('input-content')}>
								<input
									name="email"
									type="text"
									placeholder="Email or username"
									className={cx('input-phone')}
									value="defaulttester01@gmail.com"
								></input>
							</div>
							<div className={cx('input-content')}>
								<input
									className={cx('input')}
									name="password"
									type="password"
									placeholder="Password"
									value="123456"
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
			</div>
		</div>
	);
}

DefaultUserLogin.propTypes = {};

export default DefaultUserLogin;
