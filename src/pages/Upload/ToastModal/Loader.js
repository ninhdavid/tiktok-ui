import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ToastModal.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Loader() {
	return (
		<div className={cx('wrapper')} aria-hidden="true">
			<div className={cx('content')}>
				<div className={cx('spinner-section')} aria-modal="true">
					<FontAwesomeIcon icon={faSpinner} className={cx('spinner-icon')} />
				</div>
			</div>
			;
		</div>
	);
}

Loader.propTypes = {};

export default Loader;
