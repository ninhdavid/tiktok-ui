import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as videoServices from '~/services/videoService';

function useUploadFile() {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const authUser = JSON.parse(localStorage.getItem('user'));
	function uploadFile(dataFile, accessToken) {
		setIsLoading(true);

		videoServices
			.createAndUploadVideo(dataFile, accessToken)
			.then((data) => {
				if (data) {
					// alert(dataFile + ' has been successfully uploaded');
					// console.log(data);
					setTimeout(() => navigate(`/@${authUser.data.nickname}`), 300);
				} else {
					setError(error);
				}
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}
	return [uploadFile, isLoading, error];
}

export default useUploadFile;
