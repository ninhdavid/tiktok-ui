import { useState, useEffect, useContext, createContext } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Header from '~/layouts/components/Header/Header';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
import * as userService from '~/services/userService';
import { AuthUserContext } from '~/App';
import { FollowAnUserProvider } from '~/hooks/useFollowAnUser';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
	return (
		<FollowAnUserProvider>
			<div className={cx('wrapper')}>
				<Header />
				<div className={cx('container')}>
					<Sidebar />
					<div className={cx('content')}>{children}</div>
				</div>
			</div>
		</FollowAnUserProvider>
	);
}
DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default DefaultLayout;
