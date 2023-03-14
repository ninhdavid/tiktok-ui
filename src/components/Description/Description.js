import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import classNames from 'classnames/bind';
// import styles from './Description.module.scss';
import HashTag from '../HashTag';

// const cx = classNames.bind(styles);

function Description({ data }) {
	const [description, setDescription] = useState('');

	useEffect(() => {
		const videoDesc = data.description;

		// Look for hashtags and @ tags in the description and wrap them in links
		const hashRegex = /#[A-Za-z0-9-_]+/g;
		const atRegex = /@[A-Za-z0-9-_]+/g;

		const descWithLinks = videoDesc
			.split(/(?=[#@])/) // Split the string on hashtag and at symbols
			.map((text, index) => {
				if (text.match(hashRegex)) {
					const tag = text.substring(1);
					return (
						<HashTag
							href={`/hashtag/${tag}`}
							textLink
							className="hashtag"
							key={index}
						>
							{text}
						</HashTag>
					);
				} else if (text.match(atRegex)) {
					const user = text.substring(1);
					return (
						<HashTag
							href={`/user/${user}`}
							textLink
							className="at-tag"
							key={index}
						>
							{text}
						</HashTag>
					);
				} else {
					return (
						<span className="normal-text" key={index}>
							{text}
						</span>
					);
				}
			});

		setDescription(descWithLinks);
	}, [data.description]);
	return <div className="video-description">{description}</div>;
}

Description.propTypes = { data: PropTypes.object.isRequired };

export default Description;
