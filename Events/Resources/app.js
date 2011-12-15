// A window with a white background color. 
	// Add a custom property named whichObj with the value 'window' to your window object.
var window = Ti.UI.createWindow({
	whichObj: 'window',
	backgroundColor: 'white'
});

// Add a click event listener on the window object. It should log two messages to the console:
	// Message 1: Simply output the word 'window' to the log so you know the window received the click event
	// Message 2: Log the whichObj property value to the console so you know which object actually received the user's click. 
		// Keep in mind the event object properties that you'll need to reference to access this property.
window.addEventListener('click', function(e){
	Ti.API.info('window');
	Ti.API.info('The '+e.source.whichObj+' object fired this event.');
});

// A view that fills 80% of the width and height of the window. It should have a yellow background. 
	// Add a custom property named whichObj with the value 'view' to your view object. 
var view = Ti.UI.createView({
	width: '80%',
	height: '80%',
	backgroundColor: 'yellow',
	whichObj: 'view'
});

// Add a click event listener to the view object. 
	// It should log the word 'view' to the console so you know the view received the click event.
view.addEventListener('click', function(e){
	Ti.API.info('view');
});

// A button centered vertically and horizontally within the view. 
	// Add a custom property named whichObj with the value 'button' to your button object. 
var button = Ti.UI.createButton({
	title: 'Button',
	height: '30%',
	width: '50%',
	whichObj: 'button'
});


// Add a click event listener to the button. It should take two actions:
	// It should print the word 'button' to the log so you know the button received the click event.
	// It should fire an app-level event named changeBG and pass an anonymous object defining a color.
button.addEventListener('click', function(e){
	Ti.API.info('button');
	Ti.App.fireEvent('changeBG', {
		color: 'blue'
	});
});


// Add an app-level event listener which watches for the changeBG event. 
	// When received, it should update the view's background color with the value passed via the event object.
Ti.App.addEventListener('changeBG', function(e){
	view.backgroundColor = e.color;
});

// Make sure to add the button to the view.
view.add(button);
// Make sure to add the view to the window.
window.add(view);
// Open the window so we can see it!
window.open();
