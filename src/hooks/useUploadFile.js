import { useState } from 'react';
import * as videoServices from '~/services/videoService';

function useUploadFile() {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	function uploadFile(dataFile, accessToken) {
		setIsLoading(true);

		videoServices
			.createAndUploadVideo(dataFile, accessToken)
			.then((data) => {
				if (data.meta && data.meta.token) {
					alert(dataFile + ' has been successfully uploaded');
					console.log(data);
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
