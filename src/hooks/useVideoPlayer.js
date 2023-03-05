import React, { useState } from 'react';

function useVideoPlayer() {
	const [playerState, setPlayerState] = useState({
		isPlaying: false,
		progress: 0,
		volume: 50,
		isMuted: false,
	});
	return <div>useVideoPlayer</div>;
}

export default useVideoPlayer;
