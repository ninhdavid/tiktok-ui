import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { withBoundary } from '@tippyjs/react';

import { CheckActiveIcon } from '../Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './SuggestedAccounts.module.scss';
import AccountPreview from '../AccountPreview';
import Avatar from '../Avatar';
import { AccountItemLink } from '../AccountItem';

const cx = classNames.bind(styles);

function AccountItem({ data, setIsShowModal, isShowModal }) {
	const renderPreview = (props) => {
		if (!data.is_followed) {
			//1st: (!data.is_followed): giá trị này hoạt động tôt
			return (
				<div tabIndex="-1" {...props}>
					<PopperWrapper>
						<AccountPreview
							data={data}
							primary={true}
							setIsShowModal={setIsShowModal}
							isShowModal={isShowModal}
						/>
					</PopperWrapper>
				</div>
			);
		}
	};
	return (
		<div>
			<Tippy
				disabled={isShowModal}
				interactive={true}
				delay={[800, 0]}
				offset={[-20, 0]}
				placement="bottom"
				render={renderPreview}
			>
				<span tabIndex={-1}>
					<AccountItemLink to={`/@${data.nickname}`}>
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
										<span className={cx('check-icon')}>
											{<CheckActiveIcon />}
										</span>
									)}
								</p>
								<p
									className={cx('name')}
								>{`${data.first_name} ${data.last_name}`}</p>
							</div>
						</div>
					</AccountItemLink>
				</span>
			</Tippy>
		</div>
	);
}

AccountItem.propTypes = {
	data: PropTypes.object.isRequired,
};

export default AccountItem;
