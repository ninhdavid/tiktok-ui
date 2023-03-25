import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Live() {
	const navigate = useNavigate();
	useEffect(() => {
		const timeOut = setTimeout(() => {
			navigate('/');
		}, 700);
		return () => clearTimeout(timeOut);
	}, []);

	return <div>Live is coming soon!</div>;
}

export default Live;
