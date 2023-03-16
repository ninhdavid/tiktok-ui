import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import LoginModal from '../ModalWrapper/LoginModal';
import {
	PhoneAndCodeLoginForm,
	PhoneAndPasswordLoginForm,
	EmailAndPasswordLoginForm,
	ResetPasswordWithPhone,
	ResetPasswordWithEmail,
	DefaultUserLogin,
	SignUpWithEmailAndPassword,
} from '../ModalWrapper/ModalPartials';
import SignUpModal from '../ModalWrapper/SignUpModal';
import ModalWrapper from './ModalWrapper';

export const ModalBodyNameContext = createContext();

function Modal({ onClose }) {
	const [children, setChildren] = useState(<LoginModal />);
	const [modalBodyName, setModalBodyName] = useState('login');
	const [navigateBack, setNavigateBack] = useState(null);
	const handleModalBodyName = (value) => {
		setModalBodyName(value ?? 'login');
	};
	const value = {
		modalBodyName,
		navigateBack,
		handleModalBodyName,
	};

	useEffect(() => {
		switch (modalBodyName) {
			case 'login':
				setChildren(<LoginModal />);
				setNavigateBack(null);
				break;
			case 'signup':
				setChildren(<SignUpModal />);
				setNavigateBack(null);
				break;
			case 'signup-with-email-and-password':
				setChildren(<SignUpWithEmailAndPassword />);
				setNavigateBack('signup');
				break;
			case 'login-with-default':
				setChildren(<DefaultUserLogin />);
				setNavigateBack('login');
				break;
			case 'login-with-phone':
				setChildren(<PhoneAndCodeLoginForm />);
				setNavigateBack('login');
				break;
			case 'login-with-phone-and-password':
				setChildren(<PhoneAndPasswordLoginForm />);
				setNavigateBack('login-with-phone');
				break;
			case 'login-with-email':
				setChildren(<EmailAndPasswordLoginForm />);
				setNavigateBack('login');
				break;
			case 'reset-password-with-phone':
				setChildren(<ResetPasswordWithPhone />);
				setNavigateBack('login-with-phone-and-password');
				break;
			case 'reset-password-with-email':
				setChildren(<ResetPasswordWithEmail />);
				setNavigateBack('login-with-phone-and-password');
				break;
			default:
				setChildren(<LoginModal />);
				break;
		}
	}, [modalBodyName]);
	return (
		<ModalBodyNameContext.Provider value={value}>
			<ModalWrapper children={children} onClose={onClose} />
		</ModalBodyNameContext.Provider>
	);
}

Modal.propTypes = { onClose: PropTypes.func };

export default Modal;
