import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './ModalPartials.module.scss';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { ModalBodyNameContext } from '../../Header/Header';
import { useLoginAuth } from '~/hooks';
import { AuthUserContext } from '~/App';

const cx = classNames.bind(styles);

function DefaultUserLogin({ onClose }) {
	const value = useContext(ModalBodyNameContext);
	const [loginUser, isLoggedIn] = useLoginAuth();
	const [username, setUsername] = useState('defaulttester01@gmail.com');
	const [password, setPassword] = useState('123456');
	const { authUser, setAuthUser } = useContext(AuthUserContext);

	const handleLoginEmail = (e, tag) => {
		e.preventDefault();
		value.handleModalBodyName(tag);
	};
	function handleSubmit(e) {
		e.preventDefault();
		loginUser(username, password, setAuthUser);
		onClose();
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
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								></input>
							</div>
							<div className={cx('input-content')}>
								<input
									className={cx('input')}
									name="password"
									type="password"
									placeholder="Password"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
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
