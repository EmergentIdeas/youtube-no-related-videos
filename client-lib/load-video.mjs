function videoToBack(playerId) {
	let el = document.querySelector('#' + playerId)
	el.style.zIndex = -2
}

function videoToFront(playerId) {
	let el = document.querySelector('#' + playerId)
	el.style.zIndex = 2
}

/**
 * Adds an embedded YouTube video to the page. 
 * @param {Object} options
 * @param {string} options.videoHolderSelector The selector for the parent which contains the video and the poster
 * @param {string} options.playerId The id of the video div, no # (this is how the YouTube api wants it)
 * @param {int} options.width The width of the video, probably overridden by styles
 * @param {int} options.height The height of the video, probably overridden by styles
 * @param {string} options.videoId The youtube id of the video to load
 * @param {string} options.posterSelector Combined with the videoHolderSelector to determine which element represents the poster
 * @returns An object which holds the ready state and the player object (when it is eventually set)
 */
export default function loadVideo({
	videoHolderSelector = '.video-holder'
	, playerId = 'player'
	, width = 640
	, height = 390
	, videoId
	, posterSelector = 'img'
} = {}) {
	let videoStatus = {
		ready: false
		, player: null
	}

	let onPlayerStateChange = function (event) {
		if (event.data == YT.PlayerState.ENDED) {
			videoStatus.player.seekTo(0)
			videoStatus.player.pauseVideo()
			videoToBack(playerId)
		}
	}

	let onPlayerReady = function (event) {
		videoStatus.ready = true
		setTimeout(function () {
			videoToFront(playerId)
		}, 400)
	}

	let imageClick = function () {
		if (videoStatus.player && videoStatus.ready) {
			videoToFront(playerId)
			videoStatus.player.playVideo()
		}
		else {
			setTimeout(imageClick, 300)
		}
	}

	let img = document.querySelector(videoHolderSelector + ' ' + posterSelector)
	if (img) {
		img.addEventListener('click', function (evt) {
			imageClick()
		})
	}

	let makeVideo = function () {
		videoStatus.player = new YT.Player(playerId, {
			height: '' + height,
			width: '' + width,
			videoId: videoId,
			playerVars: {
				rel: 0,
				'playsinline': 1
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		})
	}

	if (typeof YT !== 'undefined') {
		makeVideo()
	}
	else {
		let tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		window.onYouTubeIframeAPIReady = function () {
			makeVideo()
		}
		document.querySelector('head').appendChild(tag)
	}

	return videoStatus
}