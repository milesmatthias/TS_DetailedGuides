var m = {};

m.win1 = Titanium.UI.createWindow({  
    backgroundColor:'#fff'
});
m.winLbl = Ti.UI.createLabel({
	text:'httpclient',
	top:0,
	left:'auto',
	height:30,
	font:{fontWeight:'bold',fontSize:30},
	backgroundColor: 'black',
	color:'white'
})
m.win1.add(m.winLbl);

m.ind = Ti.UI.createProgressBar({
	//indicator centered in the window, 10 pixels from the top, with a width of 200 and height of 50. 
	left: 'auto',
	top: '20px',
	width: 200,
	height: 50,
	// Set the minimum value to 0, max to 1, and current value to 0. Show the indicator.
	min: 0,
	max: 1,
	value:0
});
m.win1.add(m.ind);
m.ind.show();

m.hc = Ti.Network.createHTTPClient({
	ondatastream: function(e){
		m.ind.value = e.progress;
		Ti.API.info('ONDATASTREAM - PROGRESS: ' + e.progress);
	},
	onload: function(e){
		// Log the HTTP status code to the console. See the API docs for the correct property to use to access the status code.
		Ti.API.info(this.status);
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'cool_photo.jpg');
        f.write(this.responseData); // write to the file
        Ti.App.fireEvent('downloadDone', {filePath:f.nativePath});
	},
	onerror: function(e){
		// Log the HTTP status code to the console.
		Ti.API.info(this.status);
		// Display the contents of the error message in an alert() dialog.
		alert(e.error);
	},
	timout:10000
});
m.hc.open("GET",'http://farm4.static.flickr.com/3244/3115485060_076a345932_o.jpg');
m.hc.send();

Ti.App.addEventListener('downloadDone', function(e){
	// Define an ImageView object whose image property is set equal to the binary data returned from the network.
	m.img = Ti.UI.createImageView({
		image: e.filePath
	});
	// Hide progress bar
	m.ind.hide();
	// Add that ImageView object to the win1 window so that it will be displayed.
	m.win1.add(m.img);
});

m.win1.open();
