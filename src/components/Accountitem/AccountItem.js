import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '../Image/Image';
import styles from './AccountItem.module.scss';
import Avatar from '../Avatar';
import UserInfo from '../UserInfo';
import AccountItemLink from './AccountItemLink';

const cx = classNames.bind(styles);
function AccountItem({ data }) {
	return (
		<AccountItemLink to={`/@${data.nickname}`} className={cx('wrapper')}>
			{/* <Link to={`/@${data.nickname}`} className={cx('wrapper')}> */}
			{/* <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} /> */}
			<Avatar className={cx('avatar')} src={data.avatar} alt={data.full_name} />
			<div className={cx('info')}>
				{/* <p className={cx('name')}>
					<span>{data.full_name}</span>
					{data.tick && (
						<FontAwesomeIcon
							className={cx('check-icon')}
							icon={faCheckCircle}
						/>
					)}
				</p>
				<span className={cx('username')}>{data.nickname}</span> */}
				<UserInfo
					fullname={data.full_name}
					tick={data.tick}
					nickname={data.nickname}
				/>
			</div>
			{/* </Link> */}
		</AccountItemLink>
	);
}
AccountItem.propTypes = {
	data: PropTypes.object.isRequired,
};
export default AccountItem;
