import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function Button({
	to,
	href,
	primary = false,
	outline = false,
	disabled = false,
	text = false,
	textOutline = false,
	rounded = false,
	small = false,
	large = false,
	leftIcon,
	rightIcon,
	className,
	children,
	onClick,
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
		text,
		textOutline,
		rounded,
		small,
		large,
		[className]: className,
	});

	return (
		<Comp className={classes} {...props}>
			{leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
			<span className={cx('title')}>{children}</span>
			{rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
		</Comp>
	);
}
Button.propTypes = {
	to: PropTypes.string,
	href: PropTypes.string,
	primary: PropTypes.bool,
	outline: PropTypes.bool,
	disabled: PropTypes.bool,
	text: PropTypes.bool,
	textOutline: PropTypes.bool,
	rounded: PropTypes.bool,
	small: PropTypes.bool,
	large: PropTypes.bool,
	leftIcon: PropTypes.node,
	rightIcon: PropTypes.node,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
};
export default Button;
