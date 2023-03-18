import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { CheckActiveIcon } from '../Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './SuggestedAccounts.module.scss';
import AccountPreview from '../AccountPreview';
import Avatar from '../Avatar';
import { useMatch, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
	const renderPreview = (props) => {
		if (!data.is_followed) {
			//1st: (!data.is_followed): giá trị này hoạt động tôt
			return (
				<div tabIndex="-1" {...props}>
					<PopperWrapper>
						<AccountPreview data={data} />
					</PopperWrapper>
				</div>
			);
		}
	};
	return (
		<div>
			<Tippy
				interactive
				delay={[800, 0]}
				offset={[-20, 2]}
				placement="bottom"
				render={renderPreview}
			>
				<div className={cx('account-item')}>
					<Avatar
						className={cx('avatar')}
						src={data.avatar}
						alt={data.nickname}
					/>
					<div className={cx('item-info')}>
						<p className={cx('nickname')}>
							<strong>{data.nickname}</strong>
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
