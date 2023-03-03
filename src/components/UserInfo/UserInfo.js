import React from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './UserInfo.module.scss';
const cx = classNames.bind(styles);

function UserInfo({ fullname, tick, nickname }) {
	return (
		<>
			{/* <div className={cx('info')}> */}
			<p className={cx('name')}>
				<span>{fullname}</span>
				{tick && (
					<FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
				)}
			</p>
			<span className={cx('username')}>{nickname}</span>
			{/* </div> */}
		</>
	);
}

UserInfo.propTypes = {
	fullname: PropTypes.string.isRequired,
	tick: PropTypes.bool.isRequired,
	nickname: PropTypes.string.isRequired,
};

export default UserInfo;
