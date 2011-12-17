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

var btn = Ti.UI.createButton({
	title: 'Click to play sound',
	width: 200,
	height: 40,
	top: 20
});

var boomSound = Ti.Media.createSound({
	url: 'sounds/boom.m4a',
	preload: true
});

btn.addEventListener('click', function(){
	boomSound.play();
});

win1.add(btn);

var btnStream = Ti.UI.createButton({
	title: 'Click to stream sound',
	width: 200,
	height: 40,
	top: 75
});

var audioPlayer = Ti.Media.createAudioPlayer({
	url: 'http://www.freesound.org/data/previews/2/2686_5150-lq.mp3'
});

btnStream.addEventListener('click', function(){
	if(!audioPlayer.playing){
		audioPlayer.start();
		btnStream.title = 'Click to stop sound';		
	} else {
		audioPlayer.pause();
		btnStream.title = 'Click to stream sound';
	}
});

win1.add(btnStream);

Ti.App.addEventListener('pause', function(e){
	audioPlayer.setPaused(true);
});

Ti.App.addEventListener('resume', function(e){
	audioPlayer.setPaused(false);
});

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

var win2Sound = Ti.Media.createSound({
	url: 'sounds/ching.m4a',
	looping: true,
	preload: true
});

tabGroup.addEventListener('focus', function(){
	if(tabGroup.activeTab === tab1){
		win2Sound.pause();
	} else {
		win2Sound.play();
	}
});

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
