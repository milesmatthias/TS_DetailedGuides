var m = {}; // Namespace

m.win1 = Titanium.UI.createWindow({  
    backgroundColor:'#fff'
});
m.tbl = Ti.UI.createTableView();
m.data = [];

m.xc = Ti.Network.createHTTPClient({
	onload: function(e){
		var xml = this.responseXML;
		var items = xml.documentElement.getElementsByTagName("item");
		for(var i=0;i<items.length;i++){
			m.data.push({
				title: items.item(i).getElementsByTagName("title").item(0).text
			});
			Ti.API.info("title #"+i+" = "+m.data[i].title);
		}
		m.tbl.setData(m.data);
	},
	onerror: function(e){
		Ti.API.info("HTTP call failed with error "+this.status);
		Ti.API.info(this.responseText);
		alert(e.error);
	},
	timeout: 5000
});
m.xc.open('GET', 'http://apod.nasa.gov/apod.rss');
m.xc.send();

m.win1.add(m.tbl);
m.win1.open();
