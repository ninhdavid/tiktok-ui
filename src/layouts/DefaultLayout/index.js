import React, { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Header from '~/layouts/components/Header/Header';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
	const [isShowModal, setIsShowModal] = useState(false);
	const childrenWithProps = React.Children.map(children, (child) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, { isShowModal, setIsShowModal });
		}
		return child;
	});
	return (
		// <FollowAnUserProvider>
		<div className={cx('wrapper')}>
			<div className={'wrapper-content'}>
				<Header />
				<div className={cx('container')}>
					<div className={cx('sidebar')}>
						{/* <div className={cx('sidebar-none')}></div> */}
						<div
							className={cx('sidebar-active')}
							style={{ zIndex: isShowModal ? 3 : 1 }}
						>
							<Sidebar
								isShowModal={isShowModal}
								setIsShowModal={setIsShowModal}
							/>
						</div>
					</div>
					<div className={cx('content')}>
						<div className={cx('children-content')}>{childrenWithProps}</div>
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
