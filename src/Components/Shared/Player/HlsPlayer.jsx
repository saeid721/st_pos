import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { useEffect, useRef } from 'react';

const HlsPlayer = ({ video, poster, subtitles }) => {
	const videoRef = useRef(null);
	const hlsRef = useRef(null);
	const playerRef = useRef(null);

	console.log('subtitles', subtitles);

	useEffect(() => {
		const videoElement = videoRef.current;
		const hls = Hls.isSupported() ? new Hls() : null;

		if (hls) {
			hls.loadSource(video);
			hls.attachMedia(videoElement);

			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				const availableQualities = hls.levels.map((l) => l.height);
				availableQualities.unshift(0); // Add "Auto" option

				const playerOptions = {
					quality: {
						default: 0, // Default - AUTO
						options: availableQualities,
						forced: true,
						onChange: (newQuality) => {
							updateQuality(newQuality);
						},
					},
					captions: {
						active: true, // Automatically enable captions if available
						update: true,
						language: 'English',
					},
					i18n: {
						qualityLabel: {
							0: 'Auto',
						},
					},
				};

				playerRef.current = new Plyr(videoElement, playerOptions);

				hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
					const span = document.querySelector(
						".plyr__menu__container [data-plyr='quality'][value='0'] span"
					);

					if (hls.autoLevelEnabled) {
						span.innerHTML = `AUTO (${hls.levels[data.level].height}p)`;
					} else {
						span.innerHTML = `AUTO`;
					}
				});
			});

			hlsRef.current = hls;
		} else {
			playerRef.current = new Plyr(videoElement, {});
		}

		return () => {
			if (hlsRef.current) {
				hlsRef.current.destroy();
			}
			if (playerRef.current) {
				playerRef.current.destroy();
			}
		};
	}, [video]);

	const updateQuality = (newQuality) => {
		const hls = hlsRef.current;
		if (newQuality === 0) {
			hls.currentLevel = -1; // Enable AUTO quality
		} else {
			hls.levels.forEach((level, levelIndex) => {
				if (level.height === newQuality) {
					hls.currentLevel = levelIndex;
				}
			});
		}
	};

	return (
		<video
			style={{
				width: '100%',
				height: 'inherit',
			}}
			ref={videoRef}
			controls
			crossOrigin="anonymous"
			poster={poster}
		>
			{/* Subtitles dynamically added */}
			{subtitles.map((subtitle, index) => (
				<track
					key={index}
					kind="subtitles"
					label={subtitle.label}
					srclang={subtitle.srclang}
					src={subtitle.src}
					default={subtitle.default}
					crossOrigin="anonymous"
				/>
			))}
		</video>
	);
};

HlsPlayer.defaultProps = {
	video: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
	poster: 'https://bitdash-a.akamaihd.net/content/sintel/poster.png',
	subtitles: [
		{
			label: 'English',
			srclang: 'en',
			src: 'http://localhost:5000/api/public/uploads/subtitle-1728390978176.vtt',
			default: true,
		},
		{
			label: 'French',
			srclang: 'fr',
			src: '/subtitle_fr.vtt',
			default: false,
		},

		{
			label: 'Bangla',
			srclang: 'bn',
			src: '/top.gun.maverick_bangla_subtitle.vtt',
			default: false,
		},

	],
};

export default HlsPlayer;
