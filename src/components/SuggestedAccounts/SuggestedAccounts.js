import React, { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import { AccountItemLink } from '../AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({
	className,
	data = [],
	label,
	moreFunc,
	moreLabel,
	initialData,
	setIsShowModal,
	isShowModal,
}) {
	const [isShowAll, setIsShowAll] = useState(false);

	function handleClick() {
		setIsShowAll(!isShowAll);
		moreFunc();
	}
	return (
		<div className={(cx('wrapper'), ([className] = className))}>
			<p className={cx('label')}>{label}</p>
			{isShowAll
				? data.map((account) => (
						// <AccountItemLink key={account.id} to={`/@${account.nickname}`}>
						<AccountItem
							key={account.id}
							data={account}
							setIsShowModal={setIsShowModal}
							isShowModal={isShowModal}
						/>
						// </AccountItemLink>
				  ))
				: initialData &&
				  initialData.slice(0, 5).map((account) => (
						// <AccountItemLink key={account.id} to={`/@${account.nickname}`}>
						<AccountItem
							key={account.id}
							data={account}
							setIsShowModal={setIsShowModal}
							isShowModal={isShowModal}
						/>
						// </AccountItemLink>
				  ))}

			{(data.length >= 5 || initialData >= 5) && (
				<p className={cx('more-btn')} onClick={handleClick}>
					{isShowAll ? 'See less' : 'See all'}
				</p>
			)}
		</div>
	);
}
SuggestedAccounts.propTypes = {
	label: PropTypes.string.isRequired,
	data: PropTypes.array,
	className: PropTypes.string.isRequired,
	moreFunc: PropTypes.func,
	moreLabel: PropTypes.string,
	initialData: PropTypes.array.isRequired,
};
export default SuggestedAccounts;
