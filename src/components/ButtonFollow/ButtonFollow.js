import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ButtonFollow.module.scss';
import Button from '~/components/Button';
import { useFollowAnUser } from '~/hooks/useFollowAnUser';

const cx = classNames.bind(styles);
function ButtonFollow({ className, data, onClick, primary, large }) {
	const { isFollowed, setIsFollowed, followedUser, unFollowedUser } =
		useFollowAnUser();

	const [showData, setShowData] = useState(true); // help isFollowed from parent component

	const handleButtonClick = () => {
		onClick();
		setShowData(false);
	};
	return (
		<>
			{showData ? (
				data.is_followed ? (
					<Button
						className={cx(className)}
						textOutline
						// small
						// small={!large ? true : false}
						// large={!large ? false : true}
						onClick={handleButtonClick}
					>
						Following
					</Button>
				) : (
					<Button
						className={cx(className)}
						primary={!primary ? false : true}
						outline={!primary ? true : false}
						// small={!large ? true : false}
						// large={!large ? false : true}
						onClick={handleButtonClick}
					>
						Follow
					</Button>
				)
			) : isFollowed ? (
				<Button
					className={cx(className)}
					textOutline
					// small={!large ? true : false}
					// large={!large ? false : true}
					onClick={handleButtonClick}
				>
					Following
				</Button>
			) : (
				<Button
					className={cx(className)}
					primary={!primary ? false : true}
					outline={!primary ? true : false}
					// small={!large ? true : false}
					// large={!large ? false : true}
					onClick={handleButtonClick}
				>
					Follow
				</Button>
			)}
		</>
	);
}

ButtonFollow.propTypes = {
	data: PropTypes.any,
	onClick: PropTypes.func.isRequired,
};

export default ButtonFollow;
