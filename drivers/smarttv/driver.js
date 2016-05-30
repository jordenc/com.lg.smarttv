//var requests = require('../../requests.js');
var tempIP = '';

module.exports.pair = function (socket) {
	// socket is a direct channel to the front-end

	// this method is run when Homey.emit('list_devices') is run on the front-end
	// which happens when you use the template `list_devices`
	socket.on('list_devices', function( data, callback ){
        
        var new_devices = [];
        Homey.log ('list_devices got ' + JSON.stringify(tempIP));

		new_devices = [
            {
                name: tempIP,
                data: {
                    id: tempIP
                },
                settings: {
                	"ipaddress": tempIP
            	},
            	capabilities: [
					'onoff',
					'volume_set'
				]

            }
        ]
        
		Homey.log('new_devices = ' + JSON.stringify(new_devices));
        
        callback(null, new_devices);

    });
	
	socket.on('manual_add', function (device) {
		
		Homey.log('manual pairing: device added', device);
    	
		devices[device.data.id] = {
        	id: device.data.id,
			name: device.name,
			settings: {
				ipaddress: device.settings.ipaddress
            },
            capabilities: [
	        	'onoff',
	        	'volume_set'
	        ]
        }
        
        Homey.log('devices=' + JSON.stringify(devices));
        
    });

	socket.on('get_devices', function (data, callback) {
		
		Homey.log('Starting discovery...');
		
		var dgram = require('dgram');
		var http = require('http');
		var net = require('net');
		
		//var address = '192.168.1.65';
		
		// Scan for devices on localhost
		function discover(callback) {
			Homey.log('__DISCOVERY STARTED__');
			var message_discovery = new Buffer(
				'M-SEARCH * HTTP/1.1\r\n' +
				'HOST: 239.255.255.250:1900\r\n' +
				'MAN: "ssdp:discover"\r\n' +
				'MX: 3\r\n' +
				'ST: urn:schemas-upnp-org:device:MediaRenderer:1\r\n\r\n');
		
			var client = dgram.createSocket("udp4");
		
			// send message
			client.send(message_discovery, 0, message_discovery.length, 1900, '239.255.255.250', function (error) {
				
				if (error) {
					Homey.log('Timeout? ' + JSON.stringify (error));
					callback(null, false);
				}
			});
		
			client.on('message', function (msg, req_info) {
				Homey.log('msg=' + msg + ', req_info = ' + req_info);
				callback(req_info);
			});
		
			client.on('error', function (error) {
				Homey.log('Error: ' + error);
			});
			
			function close() {
			    Homey.log('__DISCOVERY ENDED__');
		        client.close();
		        
		        //testing code:
		        //data.address = '192.168.1.210';
		        //tempIP = data.address;
		        //socket.emit ('continue', data);
				
				socket.emit ('done', null);
				
		    }
			
			setTimeout(close, 3000);
			
		}
		
		discover(function (data) {
			
			Homey.log('received discovery: ' + JSON.stringify (data));
			
			if (data !== null) {
			
				tempIP = data.address;
				socket.emit ('continue', null);
			
			} else {
				
				socket.emit ('done', null);
				
			}
			
		});

	});

	socket.on('disconnect', function(){
		Homey.log("LG SmartTV app - User aborted pairing, or pairing is finished");
	});
}