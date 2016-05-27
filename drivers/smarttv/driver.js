//var requests = require('../../requests.js');

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
		
		var dgram = require('dgram');
		var http = require('http');
		var net = require('net');
		
		var address = '192.168.1.65';
		
		// Scan for devices on localhost
		function discover(callback) {
			var message_discovery = new Buffer(
				'M-SEARCH * HTTP/1.1\r\n' +
				'HOST: 239.255.255.250:1900\r\n' +
				'MAN: "ssdp:discover"\r\n' +
				'MX: 3\r\n' +
				'ST: urn:schemas-upnp-org:device:MediaRenderer:1\r\n\r\n');
		
			var client = dgram.createSocket("udp4");
		
			// send message
			client.send(message_discovery, 0, message_discovery.length, 1900, '239.255.255.250');
		
			client.on('message', function (msg, req_info) {
				callback(req_info);
			});
		
			client.on('error', function (error) {
				console.log('Error: ' + error);
			});
		}
		
		discover(function (data) {
			
			Homey.log('received discovery: ' + JSON.stringify (data));
			
			socket.emit ('continue', null);
			
		});

	});

	socket.on('disconnect', function(){
		Homey.log("LG SmartTV app - User aborted pairing, or pairing is finished");
	});
}