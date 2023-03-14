import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './HashTag.module.scss';
import { faMusic, faHashtag } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function HashTag({
	to,
	href,
	primary = false,
	outline = false,
	disabled = false,
	text = false,
	textLink = false,
	rounded = false,
	small = false,
	large = false,
	leftIcon,
	rightIcon,
	className,
	children,
	onClick,
	tag,
	...passProps
}) {
	let Comp = 'button';
	const props = { onClick, ...passProps };

	if (disabled) {
		Object.keys(props).forEach((key) => {
			if (key.startsWith('on') && typeof props[key] === 'function') {
				delete props[key];
			}
		});
	}
	if (to) {
		props.to = to;
		Comp = Link;
	} else {
		props.href = href;
		Comp = 'a';
	}

	const classes = cx('wrapper', {
		primary,
		outline,
		disabled,
		textLink,
		text,
		rounded,
		small,
		large,
		[className]: className,
	});

	const icon = {
		hashtag: <FontAwesomeIcon className={className} icon={faHashtag} />,
		music: <FontAwesomeIcon className={className} icon={faMusic} />,
	};
	// console.log(icon[tag]);
	return (
		<Comp className={classes} {...props}>
			{tag && <span className={cx('icon')}>{icon[tag]}</span>}
			<span className={cx('title')}>{children}</span>
		</Comp>
	);
}

HashTag.propTypes = {
	to: PropTypes.string,
	href: PropTypes.string,
	primary: PropTypes.bool,
	outline: PropTypes.bool,
	disabled: PropTypes.bool,
	text: PropTypes.bool,
	textLink: PropTypes.bool,
	rounded: PropTypes.bool,
	small: PropTypes.bool,
	large: PropTypes.bool,
	leftIcon: PropTypes.node,
	rightIcon: PropTypes.node,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
};

export default HashTag;
