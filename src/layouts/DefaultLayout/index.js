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
		// <FollowAnUserProvider>
		<div className={cx('wrapper')}>
			<div className={'wrapper-content'}>
				<Header />
				<div className={cx('container')}>
					<div className={cx('sidebar')}>
						<div className={cx('sidebar-none')}></div>
						<div className={cx('sidebar-active')}>
							<Sidebar />
						</div>
					</div>
					<div className={cx('content')}>
						<div className={cx('children-content')}>{children}</div>
					</div>
				</div>
			</div>
		</div>
		// </FollowAnUserProvider>
	);
}
DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default DefaultLayout;
