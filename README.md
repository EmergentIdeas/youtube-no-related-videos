# Youtube No Related Videos

## Purpose

Lots of companies like to use YouTube videos because it makes them easy to convert,
store, and track the viewing of. However, the YouTube branding sometimes looks bad
in a well designed page and the related videos it shows, even when restricted to 
the same channel, are almost never what I want the user to see after they watch 
the video.

So, this code makes a little dance. Show a poster over video, wait for the video
to load before showing, let the video do its normal thing, but when the video is
done, reset the position of the video to its start, pause, and show the poster.


## Install

```bash
npm install @dankolz/youtube-no-related-videos
```

## Usage

```js
import loadVideo from "@dankolz/youtube-no-related-videos"

loadVideo({
	videoId: '71U_UHKSkFg'
})
```

```html
<div class="youtube-no-related-videos-holder">
	<picture class="">
		<img src="./poster-3.jpg" alt="poster-3" width="843" height="474" style="height: auto">
	</picture>
	<div id="player">
	</div>
</div>
````

This will also require some css which you can include something like:

```less
@import "../node_modules/@dankolz/youtube-no-related-videos/less/youtube-no-related-videos.less";
```

or copy the css out of demo.css or write your own. The javascript is just changing the z-index
of various parts, so it works with a lot of different layouts.

This code handles adding the YouTube api js to the page if it's not already there.

## Demo

There's a demo (example.html) but unfortunately you have to run a server to get it to work right, so:

```bash
npm run demo
```

Then point your browser to: [http://localhost:3000/example.html](http://localhost:3000/example.html)


