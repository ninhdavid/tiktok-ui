import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ data = [], label, moreFunc, moreLabel }) {
	return (
		<div className={cx('wrapper')}>
			<p className={cx('label')}>{label}</p>
			{data.map((account, index) => (
				<AccountItem key={index} data={account} />
			))}

			<p className={cx('more-btn')} onClick={moreFunc}>
				{moreLabel}
			</p>
		</div>
	);
}
SuggestedAccounts.propTypes = {
	label: PropTypes.string.isRequired,
	data: PropTypes.array,
};
export default SuggestedAccounts;
