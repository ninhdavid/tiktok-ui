import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header/Header';
import FullWidthLayout from '../FullWidthLayout';
import styles from './HeaderOnly.module.scss';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
	return (
		<FullWidthLayout>
			<Header className={cx('isFullWidth')} />
			<div className="container">
				<div className="content">{children}</div>
			</div>
		</FullWidthLayout>
	);
}

export default HeaderOnly;
