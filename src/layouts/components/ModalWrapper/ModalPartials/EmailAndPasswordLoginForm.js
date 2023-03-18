import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ModalPartials.module.scss';
import { ModalBodyNameContext } from '../Modal';
import { useLoginAuth } from '~/hooks';
import { AuthUserContext } from '~/App';

const cx = classNames.bind(styles);

function EmailAndPasswordLoginForm({ onClose }) {
	const value = useContext(ModalBodyNameContext);
	const [loginUser] = useLoginAuth();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { setAuthUser } = useContext(AuthUserContext);

	function handleSubmit(e) {
		e.preventDefault();
		loginUser(username, password, setAuthUser);
		onClose();
	}
	const handleLoginEmail = (e, tag) => {
		e.preventDefault();
		value.handleModalBodyName(tag);
	};
	return (
		<div className={cx('modal-content')}>
			<div className={cx('login-section')}>
				<p>Log in</p>

				<form className={cx('form-section')} onSubmit={handleSubmit}>
					<div className={cx('login-form')}>
						<div className={cx('header')}>
							<span>Email or username</span>
							<span onClick={(e) => handleLoginEmail(e, 'login-with-phone')}>
								Log in with phone
							</span>
						</div>
						<div className={cx('input-section')}>
							<div className={cx('input-content')}>
								<input
									type="text"
									name="email"
									placeholder="Email or username"
									className={cx('input-phone')}
									onChange={(e) => setUsername(e.target.value)}
									value={username}
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
						<div className={cx('login-password')}>
							<span
								onClick={(e) =>
									handleLoginEmail(e, 'reset-password-with-email')
								}
							>
								Forgot password?
							</span>
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

EmailAndPasswordLoginForm.propTypes = { onClose: PropTypes.func };

export default EmailAndPasswordLoginForm;
