var requests = require('../../requests.js');

module.exports.pair = function (socket) {
	// socket is a direct channel to the front-end

	// this method is run when Homey.emit('list_devices') is run on the front-end
	// which happens when you use the template `list_devices`
	socket.on('list_devices', function (data, callback) {

		Homey.log("LG SmartTV app - list_devices tempIP is " + tempIP);
		
		var devices = [{
			name				: tempIP,
			data: {
				id				: tempIP,
			},
			settings: {
				"ipaddress" 	: tempIP
			}
		}];

		callback (null, devices);

	});

	// this is called when the user presses save settings button in start.html
	socket.on('get_devices', function (data, callback) {
		
		Homey.log('Starting discovery...');

		discover(function (data) {
			
			Homey.log('received discovery: ' + JSON.stringify (data));
			
			socket.emit ('continue', null);
			
		});

	});

	socket.on('disconnect', function(){
		Homey.log("LG SmartTV app - User aborted pairing, or pairing is finished");
	});
}