import { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Header from './Header';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({
	children,
	items = [],
	onChange = defaultFn,
	hideOnClick = false,
}) {
	const [history, setHistory] = useState([{ data: items }]);
	const current = history[history.length - 1];
	const renderItems = () => {
		return current.data.map((item, index) => {
			const isParent = !!item.children;

			return (
				<MenuItem
					key={index}
					data={item}
					onClick={() => {
						if (isParent) {
							setHistory((prev) => [...prev, item.children]);
						} else {
							onChange(item);
						}
					}}
				/>
			);
		});
	};
	const handleBack = () => {
		setHistory((prev) => prev.slice(0, prev.length - 1));
	};
	const renderResult = (attrs) => (
		<div className={cx('menu-list')} tabIndex="-1" {...attrs}>
			<PopperWrapper className={cx('menu-popper')}>
				{history.length > 1 && (
					<Header title={current.title} onBack={handleBack} />
				)}
				<div className={cx('menu-scroll')}>{renderItems()}</div>
			</PopperWrapper>
		</div>
	);

	// form current to first menu page
	const handleResetMenu = () => {
		setHistory((prev) => prev.slice(0, 1));
	};
	return (
		<Tippy
			hideOnClick={hideOnClick}
			offset={[20, 10]}
			interactive={true}
			delay={[50, 400]}
			placement="bottom-end"
			render={renderResult}
			onHide={handleResetMenu}
		>
			{children}
		</Tippy>
	);
}

Menu.propTypes = {
	children: PropTypes.node,
	items: PropTypes.array,
	onChange: PropTypes.func,
	hideOnClick: PropTypes.bool,
};

export default Menu;
