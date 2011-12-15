// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var myapp = {}; // App namespace.

myapp.iconDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'icons');
if(!myapp.iconDir.exists()){
	myapp.iconDir.createDirectory();	
}

myapp.getImage = function(icon){
	var i = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'icons/'+icon);
	if(!i.exists()) {
		// image hasn't been saved, so grab it and save it
		Ti.API.info('Fetching http://www.worldweather.org/img_cartoon/'+icon);
		// create an image view to hold our remote icon
		var tmpImage = Ti.UI.createImageView({
			image: 'http://www.worldweather.org/img_cartoon/'+icon
		});
		// it takes a few seconds to load the image from the URL, so wait 5 sec. to cache the image
		setTimeout(function() {
			var cachedImage = tmpImage.toImage();
			if(cachedImage.width == 35) {
				// actual images are 35 px wide, any other width indicates a failure to load the icon
				i.write(cachedImage);
				Ti.API.info('Caching '+icon);
			}
		}, 5000);
		// return the URL so that an image is shown the first time the app is run
		return 'http://www.worldweather.org/img_cartoon/'+icon;
	} else {
		// image has been cached previously, so return its path
		Ti.API.info('Returning cached image '+ i.name);
		return i.nativePath;
	}
	/*Ti.API.info('name = '+name);
	var icon = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'icons/'+name);
	if(icon.exists()){
		return icon.nativePath;
	}else{
		Ti.API.info('The icon doesn\'t exist!');
		var rmtImg = Ti.UI.createImageView({
			image: 'http://www.worldweather.org/img_cartoon/'+name
		})
		var t = setTimeout(function(){
			var cachedImg = rmtImg.toImage();
			Ti.API.info('width = '+cachedImg.width);
			//if(cachedImg.width === 35){
				icon.write(cachedImg);
			//}
		}, 5000);
		return 'http://www.worldweather.org/img_cartoon/'+name;
	}*/
};

myapp.db = Ti.Database.install('/weather.sqlite', 'weather');

myapp.convertTemp = function(temp) {
    if(Ti.App.Properties.getString('units','c')==='f') {
        return Math.round(temp*1.8+32) +'\u00b0F'; // convert to Fahrenheit & append degree symbol-F
    } else {
        return temp +'\u00b0C';
    }
};

myapp.getRows = function(){
	var ret = [];
	myapp.db = Ti.Database.open('weather');
	myapp.dbResults = myapp.db.execute('SELECT city, temp, condition, icon FROM cities JOIN conditionCodes ON cities.conditionID = conditionCodes.conditionID ORDER BY city');
	while(myapp.dbResults.isValidRow()){
		var tblRow = Ti.UI.createTableViewRow({
			minRowHeight:32
		});
		var img = Ti.UI.createImageView({
			image: myapp.getImage(myapp.dbResults.fieldByName('icon')),
			top: 0,
			left: 0,
			height: 32,
			width: 32
		});
		var lblCity = Ti.UI.createLabel({
			text: myapp.dbResults.fieldByName('city'),
			font: {fontWeight:'bold',fontSize:20},
			left: 40,
			top: 2
		});
		var lblTemp = Ti.UI.createLabel({
			text: myapp.convertTemp(myapp.dbResults.fieldByName('temp')),
			right: 2,
			top: 2,
			width: 50,
			font: {fontSize:15}
		});
		tblRow.add(img);
		tblRow.add(lblCity);
		tblRow.add(lblTemp);
		ret.push(tblRow);
		myapp.dbResults.next();
	}
	myapp.dbResults.close();
	return ret;
};

// create tab group
myapp.tabGroup = Titanium.UI.createTabGroup();

//
// create base UI tab and root window
//
myapp.win1 = Titanium.UI.createWindow({  
    title:'Current Conditions',
    backgroundColor:'#fff'
});
myapp.tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Current Conditions',
    window:myapp.win1
});

myapp.label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

myapp.tblWeather = Ti.UI.createTableView();

myapp.populate = function(){
	myapp.tblWeather.setData(myapp.getRows());
};

myapp.win1.add(myapp.label1);
myapp.win1.add(myapp.tblWeather);

Ti.App.addEventListener('unit_switch', function(e){
	myapp.populate();
});

//
// create controls tab and root window
//
myapp.win2 = Titanium.UI.createWindow({  
    title:'Units',
    backgroundColor:'#fff'
});
myapp.tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Units',
    window:myapp.win2
});

myapp.label2 = Titanium.UI.createLabel({
	color:'black', 
	text:'Fahrenheit', 
	font:{fontSize:22,fontFamily:'Helvetica Neue', fontWeight:'bold'},
	left: 10,
	top:5,
	height:25
});

myapp.label3 = Ti.UI.createLabel({
	color:'black', 
	text:'Output will be shown in Celsius',
	font:{fontSize:18,fontFamily:'Helvetica Neue'},
	left: 10,
	top:40, 
	height:20
});

myapp.unitSwitch = Ti.UI.createSwitch({
	right:10,
	top: 5,
	width: 'auto',
	value: (Ti.App.Properties.getString('units')) ? true : false
});

myapp.unitSwitch.addEventListener('change', function(e){
	if (myapp.unitSwitch.value === true){
		myapp.label3.text = 'Output will be shown in Fahrenheit';
		Ti.App.Properties.setString('units', 'f');
	} else {
		myapp.label3.text = 'Output will be shown in Celsius';
		Ti.App.Properties.setString('units', 'c');
	}
	Ti.App.fireEvent('unit_switch');
});

myapp.win2.add(myapp.label2);
myapp.win2.add(myapp.label3);
myapp.win2.add(myapp.unitSwitch);

//
//  add tabs
//
myapp.tabGroup.addTab(myapp.tab1);  
myapp.tabGroup.addTab(myapp.tab2);  


// open tab group
myapp.tabGroup.open();
