import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { CheckActiveIcon } from '../Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './SuggestedAccounts.module.scss';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
	const renderPreview = (props) => {
		return (
			<div tabIndex="-1" {...props}>
				<PopperWrapper>
					<AccountPreview data={data} />
				</PopperWrapper>
			</div>
		);
	};
	return (
		<div>
			<Tippy
				interactive
				delay={[800, 0]}
				offset={[-20, 0]}
				placement="bottom"
				render={renderPreview}
			>
				<div className={cx('account-item')}>
					<img
						className={cx('avatar')}
						src={data.avatar}
						alt={data.nickname}
					></img>
					<div className={cx('item-info')}>
						<p className={cx('nickname')}>
							<strong>{data.nickname}</strong>
							{/* <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} /> */}
							{data.tick && (
								<span className={cx('check-icon')}>{<CheckActiveIcon />}</span>
							)}
						</p>
						<p
							className={cx('name')}
						>{`${data.first_name} ${data.last_name}`}</p>
					</div>
				</div>
			</Tippy>
		</div>
	);
}

AccountItem.propTypes = {
	data: PropTypes.object.isRequired,
};

export default AccountItem;
