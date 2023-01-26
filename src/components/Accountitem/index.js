import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Accountitem.module.scss';

const cx = classNames.bind(styles);
function AccountItem() {
	return (
		<div className={cx('wrapper')}>
			<img
				className={cx('avatar')}
				src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/7ec927112ebac31d5c4a29c3f7bdb710.jpeg?x-expires=1674813600&x-signature=DLq0buWrTcnpPxrkjuXR8TbqBQI%3D"
				alt="Hoaa"
			/>
			<div className={cx('info')}>
				<p className={cx('name')}>
					<span>Nguyen Van A</span>
					<FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
				</p>
				<span className={cx('username')}>nguyenvana</span>
			</div>
		</div>
	);
}

export default AccountItem;
