import { useEffect, useState } from 'react';

function useStylesByElementWidth(ref, width) {
	const [isSmall, setIsSmall] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (ref.current.clientWidth <= width) {
				setIsSmall(true);
			} else {
				setIsSmall(false);
			}
		};

		handleResize(); // Xác định ban đầu

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [ref, width]);

	return isSmall;
}
export default useStylesByElementWidth;
