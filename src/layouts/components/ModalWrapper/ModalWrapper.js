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

	function handleNavigateBack(e) {
		e.preventDefault();
		value.handleModalBodyName(value.navigateBack);
	}
	return (
		<div className={cx('wrapper')}>
			<div className={cx('container')}>
				<div className={cx('content')}>
					<div className={cx('modal-section')}>
						<div className={cx('modal-content')}>
							{children}
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
						<span className={cx('footer-span')}>sign up</span>
					</div>
					<div className={cx('btn-section')}>
						<button
							className={cx('navigateBack')}
							onClick={(e) => handleNavigateBack(e)}
						>
							<FontAwesomeIcon icon={faAngleLeft} className={cx('btn-back')} />
						</button>
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
