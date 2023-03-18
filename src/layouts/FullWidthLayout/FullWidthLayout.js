import { useState, useEffect, useContext, createContext, useRef } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Header from '~/layouts/components/Header/Header';
import Sidebar from '../components/Sidebar';
import styles from './FullWidthLayout.module.scss';
import { FollowAnUserProvider } from '~/hooks/useFollowAnUser';

const cx = classNames.bind(styles);

function FullWidthLayout({ children }) {
	return (
		<FollowAnUserProvider>
			<div className={cx('wrapper')}>
				<div className={cx('wrapper-content')}>
					<Header className={'isFullWidth'} />
					<div className={cx('container')}>
						<div className={cx('sidebar-content')}>
							<Sidebar />
						</div>
						<div className={cx('content')}>{children}</div>
					</div>
				</div>
			</div>
		</FollowAnUserProvider>
	);
}
FullWidthLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default FullWidthLayout;
