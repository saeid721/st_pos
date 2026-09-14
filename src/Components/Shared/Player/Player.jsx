import Plyr from 'plyr';
import 'plyr/dist/plyr.css'; // Ensure Plyr's CSS is loaded
import React, { useEffect, useRef } from 'react';

const Player = ({ video, poster }) => {
	const videoRef = useRef(null);

	useEffect(() => {
		const videoElement = videoRef.current;
		// Initialize Plyr on the video element
		new Plyr(videoElement);

		// Cleanup the player instance when the component unmounts
	}, []);

	return (
		<video
			ref={videoRef}
			style={{
				width: '100%',
				height: 'inherit',
			}}
			controls
			crossOrigin="anonymous"
			poster={poster}
		>
			<source src={video} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	);
};

Player.defaultProps = {
	video:
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Replace with your MP4 video URL
	poster:
		'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg', // Replace with your poster image URL
};

export default Player;
