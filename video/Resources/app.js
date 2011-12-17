var m = {}; // Namespace

m.win = Ti.UI.createWindow({
	backgroundColor: 'black',
	orientationModes: [Ti.UI.LANDSCAPE_LEFT]
});

m.vp = Ti.Media.createVideoPlayer({
	backgroundColor: 'black',
	movieControlStyle: Ti.Media.VIDEO_CONTROL_DEFAULT, // default video controls (not embedded)
	scalingMode: Ti.Media.VIDEO_SCALING_ASPECT_FILL,// fill the screen
	fullscreen: true,
	url: 'http://assets.appcelerator.com.s3.amazonaws.com/video/media.m4v'
});

if(Ti.App.iOS){
	m.win.add(m.vp);
}

m.vp.play();
m.win.open();
