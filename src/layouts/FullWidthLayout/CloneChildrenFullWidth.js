import React, {
	useState,
	useEffect,
	useContext,
	createContext,
	useRef,
} from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Header from '~/layouts/components/Header/Header';
import Sidebar from '../components/Sidebar';
import styles from './FullWidthLayout.module.scss';
import { FollowAnUserProvider } from '~/hooks/useFollowAnUser';

const cx = classNames.bind(styles);

function CloneChildrenFullWidth({ children, isShowModal, setIsShowModal }) {
	// const [isShowModal, setIsShowModal] = useState(false);
	const childrenWithProps = React.Children.map(children, (child) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, { isShowModal, setIsShowModal });
		}
		return child;
	});

	return (
		// <FollowAnUserProvider>
		<>
			<div className={cx('container')}>
				<div
					className={cx('sidebar-content')}
					style={{ zIndex: isShowModal ? 3 : 1 }}
				>
					<Sidebar
						small
						isShowModal={isShowModal}
						setIsShowModal={setIsShowModal}
					/>
				</div>
				<div className={cx('content')}>{childrenWithProps}</div>
			</div>
		</>

		// </FollowAnUserProvider>
	);
}
CloneChildrenFullWidth.propTypes = {
	children: PropTypes.node.isRequired,
};
export default CloneChildrenFullWidth;
