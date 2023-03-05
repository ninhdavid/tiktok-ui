import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image/Image';

function Avatar({ className, src, alt, ...props }) {
	return <Image className={className} src={src} alt={alt} {...props} />;
}

Avatar.propTypes = {
	className: PropTypes.string,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
};

export default Avatar;
