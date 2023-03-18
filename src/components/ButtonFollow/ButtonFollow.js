import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ButtonFollow.module.scss';
import Button from '~/components/Button';
import { useFollowAnUser } from '~/hooks/useFollowAnUser';

const cx = classNames.bind(styles);
function ButtonComponent({ className, data, onClick }) {
	const { isFollowed, followedUser, unFollowedUser } = useFollowAnUser();
	const [showData, setShowData] = useState(true);

	const handleButtonClick = () => {
		setShowData(false);

		onClick();
	};

	return (
		<>
			{showData ? (
				data.is_followed ? (
					<Button
						className={cx(className)}
						textOutline
						small
						onClick={handleButtonClick}
					>
						Following
					</Button>
				) : (
					<Button
						className={cx(className)}
						outline
						small
						onClick={handleButtonClick}
					>
						Follow
					</Button>
				)
			) : isFollowed ? (
				<Button
					className={cx(className)}
					textOutline
					small
					onClick={handleButtonClick}
				>
					Following
				</Button>
			) : (
				<Button
					className={cx(className)}
					outline
					small
					onClick={handleButtonClick}
				>
					Follow
				</Button>
			)}
		</>
	);
}

ButtonComponent.propTypes = {
	data: PropTypes.any,
	onClick: PropTypes.func.isRequired,
};

export default ButtonComponent;
