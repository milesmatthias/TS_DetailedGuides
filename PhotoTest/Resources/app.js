// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var img1 = Ti.UI.createImageView({
	height: 300,
	width: 300,
	top: 5
});

win1.add(img1);

var btn1 = Ti.UI.createButton({
	title: 'Show gallery',
	height: 50,
	width: 100,
	bottom: 5
});

var successFn = function(event){
	// Success: set the ImageView's image property to the media returned from the camera or gallery. 
	// Output the mediaType to the info console.	
	img1.image = event.media;
	Ti.API.info('Media type = '+event.mediaType);
};
var cancelFn = function(){
	// Cancel: don't do anything in this function	
};
var errorFn = function(error){
	// Error: Display an alert dialog box showing the error.code describing why the operation failed.
	alert('Unexpected error: '+error.code);
};

btn1.addEventListener('click', function(){
	if(Ti.Media.isCameraSupported){
		// show the camera
		Ti.Media.showCamera({
			success: successFn,
			cancel: cancelFn,
			error: errorFn
		});
	} else {
		// show the photo gallery
		Ti.Media.openPhotoGallery({
			success: successFn,
			cancel: cancelFn,
			error: errorFn
		});
	}
});

win1.add(btn1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
