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

import * as searchService from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem/';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
	const [searchValue, setSearchValue] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [showResult, setShowResult] = useState(false);
	const [loading, setLoading] = useState(false);

	const debouncedValue = useDebounce(searchValue, 500);
	const inputRef = useRef();

	useEffect(() => {
		if (!debouncedValue.trim()) {
			setSearchResult([]);
			return;
		}
		const fetchApi = async () => {
			setLoading(true);
			const result = await searchService.search(debouncedValue);
			setSearchResult(result);

			setLoading(false);
		};
		fetchApi();
	}, [debouncedValue]);

	const handleClear = () => {
		setSearchValue('');
		setSearchResult([]);
		inputRef.current.focus();
	};
	const handleHideResult = () => {
		setShowResult(false);
	};
	const handleChange = (e) => {
		const searchValue = e.target.value;
		if (!searchValue.startsWith(' ')) {
			setSearchValue(searchValue);
		}
	};

	return (
		<div>
			{/* <div> disable tippy error */}
			<HeadlessTippy
				interactive={true}
				visible={showResult && searchResult.length > 0}
				render={(attrs) => (
					<div className={cx('search-result')} tabIndex="-1" {...attrs}>
						<PopperWrapper className={cx('result-section')}>
							<h4 className={cx('search-title')}>Account</h4>
							{searchResult.map((result) => (
								<AccountItem key={result.id} data={result} />
							))}
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
						onChange={handleChange}
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

					<button
						className={cx('search-btn')}
						onMouseDown={(e) => {
							e.preventDefault();
						}}
					>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</button>
				</div>
			</HeadlessTippy>
		</div>
	);
}

export default Search;
