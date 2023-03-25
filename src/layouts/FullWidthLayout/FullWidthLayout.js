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
import CloneChildrenFullWidth from './CloneChildrenFullWidth';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function FullWidthLayout({ children }) {
	const match = useParams();
	const [isShowModal, setIsShowModal] = useState(false);

	return (
		// <FollowAnUserProvider>
		<div className={cx('wrapper')}>
			<div className={cx('wrapper-content')}>
				<Header className={'isFullWidth'} />

				{/* <div className={cx('sidebar-content')}>
						<Sidebar />
					</div>
					<div className={cx('content')}>{children}</div> */}
				{match.nickname ? (
					<CloneChildrenFullWidth
						children={children}
						isShowModal={isShowModal}
						setIsShowModal={setIsShowModal}
					/>
				) : (
					children
				)}
			</div>
		</div>
		// </FollowAnUserProvider>
	);
}
FullWidthLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default FullWidthLayout;
