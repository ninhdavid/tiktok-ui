import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faAngleLeft,
	faClose,
	faUser,
} from '@fortawesome/free-solid-svg-icons';

import styles from './ModalWrapper.module.scss';
import { ModalBodyNameContext } from '../Header/Header';

const cx = classNames.bind(styles);

function ModalWrapper({ children, onClose }) {
	const value = useContext(ModalBodyNameContext);
	const [isSignUp, setIsSignup] = useState(false);

	function handleNavigateBack(e) {
		e.preventDefault();
		value.handleModalBodyName(value.navigateBack);
	}
	function handleOnchangeSignUp(e) {
		e.preventDefault();
		if (!isSignUp) {
			value.handleModalBodyName('signup');
			setIsSignup(true);
		} else {
			value.handleModalBodyName('login');
			setIsSignup(false);
		}
	}
	const childrenWithProps = React.Children.map(children, (child) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, { onClose: onClose });
		}
		return child;
	});
	return (
		<div className={cx('wrapper')}>
			<div className={cx('container')}>
				<div className={cx('content')}>
					<div className={cx('modal-section')}>
						<div className={cx('modal-content')}>
							{childrenWithProps}
							{/* <div className={cx('login-section')}>
								<p>Log in to TikTok</p>
								<div className={cx('menu-item')}>
									<FontAwesomeIcon icon={faUser} className={cx('icon')} />
									<p>Default Account</p>
								</div>
								<form className={cx('form-section')}>
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
								</form>
							</div> */}
						</div>
					</div>
					<div className={cx('footer-section')}>
						<div data-e2e="bottom-text">Don't have an account? </div>
						<span className={cx('footer-span')} onClick={handleOnchangeSignUp}>
							{!isSignUp ? 'Sign up' : 'Log in'}
						</span>
					</div>
					<div className={cx('btn-section')}>
						{value.navigateBack && (
							<button
								className={cx('navigateBack')}
								onClick={(e) => handleNavigateBack(e)}
							>
								<FontAwesomeIcon
									icon={faAngleLeft}
									className={cx('btn-back')}
								/>
							</button>
						)}
						<button className={cx('close')} onClick={onClose}>
							<FontAwesomeIcon icon={faClose} className={cx('btn-close')} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

ModalWrapper.propTypes = {};

export default ModalWrapper;
