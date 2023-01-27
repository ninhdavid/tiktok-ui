import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleXmark,
	faSpinner,
	faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/Accountitem';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
	const [searchValue, setSearchValue] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [showResult, setShowResult] = useState(true);
	const [loading, setLoading] = useState(false);

	const debounced = useDebounce(searchValue, 500);
	const inputRef = useRef();

	useEffect(() => {
		if (!searchValue.trim()) {
			setSearchResult([]);
			return;
		}
		setLoading(true);
		fetch(
			`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
				debounced
			)}&type=less`
		)
			.then((response) => response.json())
			.then((res) => {
				setSearchResult(res.data);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounced]);

	const handleClear = () => {
		setSearchValue('');
		setSearchResult([]);
		inputRef.current.focus();
	};
	const handleHideResult = () => {
		setShowResult(false);
	};

	return (
		<HeadlessTippy
			interactive={true}
			visible={showResult && searchResult.length > 0}
			render={(attrs) => (
				<div className={cx('search-result')} tabIndex="-1" {...attrs}>
					<PopperWrapper>
						<h4 className={cx('search-title')}>Account</h4>
						{searchResult.map((result) => {
							return <AccountItem key={result.id} data={result} />;
						})}
					</PopperWrapper>
				</div>
			)}
			onClickOutside={handleHideResult}
		>
			<div className={cx('search')}>
				<input
					ref={inputRef}
					value={searchValue}
					placeholder="Search accounts and videos"
					spellCheck={false}
					onChange={(e) => {
						setSearchValue(e.target.value);
					}}
					onFocus={() => {
						setShowResult(true);
					}}
				/>
				{!!searchValue && !loading && (
					<button className={cx('clear')} onClick={handleClear}>
						<FontAwesomeIcon icon={faCircleXmark} />
					</button>
				)}
				{loading && (
					<FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
				)}

				<button className={cx('search-btn')}>
					<FontAwesomeIcon icon={faMagnifyingGlass} />
				</button>
			</div>
		</HeadlessTippy>
	);
}

export default Search;
