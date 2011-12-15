var m={}; // Namespace

m.win = Titanium.UI.createWindow({  
    title:'json',
    backgroundColor:'#fff'
});

m.tbl = Ti.UI.createTableView({
	minRowHeight: 44
});

m.xc = Ti.Network.createHTTPClient({
	onload: function(e){
		var json = JSON.parse(this.responseText);
		var data = [];
		Ti.API.info("Num of fighters returned is "+json.fighters.length);
		for(var i=0;i < json.fighters.length;i++){
			Ti.API.info("i is "+i);
			var nameLbl = Ti.UI.createLabel({
				text: json.fighters[i].name,
				top: 1,
				left: 1,
				height: 30,
				font: {fontWeight:'bold',fontSize:30},
				color: 'black'
			});
			var nicknameLbl = Ti.UI.createLabel({
				text: json.fighters[i].nickname,
				top:34,
				left: 1,
				height: 14,
				font:{fontSize: 14},
				color: 'black'
			});
			Ti.API.info("Name is "+nameLbl.text);
			Ti.API.info("Nickname is "+nicknameLbl.text);
			var row = Ti.UI.createTableViewRow({
				height: 50
			});
			row.add(nameLbl);
			row.add(nicknameLbl);
			data.push(row);
			// Add a label with large, bold text listing the fighter's name. Position it at the top-left of the row.
			// Add a label with smaller, normal text listing the fighter's nickname. Position it below the first label.	
		}
		// Set the resulting data as the TableView's data to populate the table.
		m.tbl.setData(data);
		Ti.API.info("Outside loop");
	},
	onerror: function(e){
		Ti.API.info(this.status);
		Ti.API.info(this.responseText);
		alert(e.error);
	},
	timeout: 5000
});
m.xc.open("GET", 'https://raw.github.com/appcelerator/Documentation-Examples/master/HTTPClient/data/json.txt');
m.xc.send();

m.win.add(m.tbl);
m.win.open();
