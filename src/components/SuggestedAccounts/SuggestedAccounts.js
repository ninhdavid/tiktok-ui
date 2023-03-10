import React, { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({
	className,
	data = [],
	label,
	moreFunc,
	moreLabel,
	initialData,
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
				? data.map((account, index) => (
						<AccountItem key={index} data={account} />
				  ))
				: initialData &&
				  initialData
						.slice(0, 5)
						.map((account, index) => (
							<AccountItem key={index} data={account} />
						))}
			<p className={cx('more-btn')} onClick={handleClick}>
				{isShowAll ? 'See less' : 'See all'}
			</p>
		</div>
	);
}
SuggestedAccounts.propTypes = {
	label: PropTypes.string.isRequired,
	data: PropTypes.array,
};
export default SuggestedAccounts;
