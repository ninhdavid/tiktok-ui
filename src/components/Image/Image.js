import classNames from 'classnames/bind';
import { forwardRef, useState, useRef, useEffect } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';
import PropTypes from 'prop-types';

const Image = forwardRef(
	(
		{
			src,
			alt,
			className,
			fallback: customFallback = images.noImage,
			...props
		},
		ref
	) => {
		const [fallback, setFallback] = useState('');

		const [imageSrc, setImageSrc] = useState(src);

		const handleImageError = () => {
			setImageSrc(fallback);
			setFallback(customFallback);
		};
		useEffect(() => {
			setImageSrc(src);
		}, [src]);

		return (
			<img
				className={classNames(styles.wrapper, className)}
				ref={ref}
				src={imageSrc}
				alt={alt}
				{...props}
				onError={handleImageError}
			/>
		);
	}
);
Image.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	className: PropTypes.string,
	fallback: PropTypes.string,
};
export default Image;
