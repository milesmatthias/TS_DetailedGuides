var m = {};

m.win1 = Titanium.UI.createWindow({  
    backgroundColor:'#fff'
});
m.winLbl = Ti.UI.createLabel({
	text:'httpclient',
	top:0,
	left:'30%',
	height:30,
	font:{fontWeight:'bold',fontSize:30},
	backgroundColor: 'black',
	color:'white'
})
m.win1.add(m.winLbl);

m.hc = Ti.Network.createHTTPClient({
	onload: function(e){
		// Log the HTTP status code to the console. See the API docs for the correct property to use to access the status code.
		Ti.API.info(this.status);
		// Define an ImageView object whose image property is set equal to the binary data returned from the network.
		m.img = Ti.UI.createImageView({
			image: this.responseData
		});
		// Add that ImageView object to the win1 window so that it will be displayed.
		m.win1.add(m.img);
	},
	onerror: function(e){
		// Log the HTTP status code to the console.
		Ti.API.info(this.status);
		// Display the contents of the error message in an alert() dialog.
		alert(e.error);
	},
	timout:5000
});
m.hc.open("GET",'http://developer.appcelerator.com/assets/img/DEV_appteam_photo.png');
m.hc.send();

m.win1.open();
