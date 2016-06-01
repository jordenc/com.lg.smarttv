var address = '';
var devices = [];
var tempIP = '';
var dgram = require('dgram');
var http = require('http');
var net = require('net');

var allpossibleKeys = [
		{	inputName: "400",
		friendlyName: "KEY_IDX_3D"
		},
		{	inputName: "13",
		friendlyName: "KEY_IDX_ARROW_DOWN"
		},
		{	inputName: "14",
		friendlyName: "KEY_IDX_ARROW_LEFT"
		},
		{	inputName: "15",
		friendlyName: "KEY_IDX_ARROW_RIGHT"
		},
		{	inputName: "12",
		friendlyName: "KEY_IDX_ARROW_UP"
		},
		{	inputName: "23",
		friendlyName: "KEY_IDX_BACK"
		},
		{	inputName: "29",
		friendlyName: "KEY_IDX_BLUE"
		},
		{	inputName: "28",
		friendlyName: "KEY_IDX_CH_DOWN"
		},
		{	inputName: "27",
		friendlyName: "KEY_IDX_CH_UP"
		},
		{	inputName: "472",
		friendlyName: "KEY_IDX_DATA"
		},
		{	inputName: "20",
		friendlyName: "KEY_IDX_ENTER"
		},
		{	inputName: "412",
		friendlyName: "KEY_IDX_EXIT"
		},
		{	inputName: "47",
		friendlyName: "KEY_IDX_EXTERNAL_INPUT"
		},
		{	inputName: "36",
		friendlyName: "KEY_IDX_FORWARD"
		},
		{	inputName: "2",
		friendlyName: "KEY_IDX_GAMEPAD_ARROW_DOWN"
		},
		{	inputName: "3",
		friendlyName: "KEY_IDX_GAMEPAD_ARROW_LEFT"
		},
		{	inputName: "4",
		friendlyName: "KEY_IDX_GAMEPAD_ARROW_RIGHT"
		},
		{	inputName: "1",
		friendlyName: "KEY_IDX_GAMEPAD_ARROW_UP"
		},
		{	inputName: "5",
		friendlyName: "KEY_IDX_GAMEPAD_BTN_1"
		},
		{	inputName: "6",
		friendlyName: "KEY_IDX_GAMEPAD_BTN_2"
		},
		{	inputName: "7",
		friendlyName: "KEY_IDX_GAMEPAD_BTN_3"
		},
		{	inputName: "8",
		friendlyName: "KEY_IDX_GAMEPAD_BTN_4"
		},
		{	inputName: "9",
		friendlyName: "KEY_IDX_GAMEPAD_MENU"
		},
		{	inputName: "30",
		friendlyName: "KEY_IDX_GREEN"
		},
		{	inputName: "21",
		friendlyName: "KEY_IDX_HOME"
		},
		{	inputName: "419",
		friendlyName: "KEY_IDX_JP_BS"
		},
		{	inputName: "420",
		friendlyName: "KEY_IDX_JP_BS_NUM_1"
		},
		{	inputName: "429",
		friendlyName: "KEY_IDX_JP_BS_NUM_10"
		},
		{	inputName: "430",
		friendlyName: "KEY_IDX_JP_BS_NUM_11"
		},
		{	inputName: "431",
		friendlyName: "KEY_IDX_JP_BS_NUM_12"
		},
		{	inputName: "421",
		friendlyName: "KEY_IDX_JP_BS_NUM_2"
		},
		{	inputName: "422",
		friendlyName: "KEY_IDX_JP_BS_NUM_3"
		},
		{	inputName: "423",
		friendlyName: "KEY_IDX_JP_BS_NUM_4"
		},
		{	inputName: "424",
		friendlyName: "KEY_IDX_JP_BS_NUM_5"
		},
		{	inputName: "425",
		friendlyName: "KEY_IDX_JP_BS_NUM_6"
		},
		{	inputName: "426",
		friendlyName: "KEY_IDX_JP_BS_NUM_7"
		},
		{	inputName: "427",
		friendlyName: "KEY_IDX_JP_BS_NUM_8"
		},
		{	inputName: "428",
		friendlyName: "KEY_IDX_JP_BS_NUM_9"
		},
		{	inputName: "432",
		friendlyName: "KEY_IDX_JP_CS1"
		},
		{	inputName: "433",
		friendlyName: "KEY_IDX_JP_CS1_NUM_1"
		},
		{	inputName: "442",
		friendlyName: "KEY_IDX_JP_CS1_NUM_10"
		},
		{	inputName: "443",
		friendlyName: "KEY_IDX_JP_CS1_NUM_11"
		},
		{	inputName: "444",
		friendlyName: "KEY_IDX_JP_CS1_NUM_12"
		},
		{	inputName: "434",
		friendlyName: "KEY_IDX_JP_CS1_NUM_2"
		},
		{	inputName: "435",
		friendlyName: "KEY_IDX_JP_CS1_NUM_3"
		},
		{	inputName: "436",
		friendlyName: "KEY_IDX_JP_CS1_NUM_4"
		},
		{	inputName: "437",
		friendlyName: "KEY_IDX_JP_CS1_NUM_5"
		},
		{	inputName: "438",
		friendlyName: "KEY_IDX_JP_CS1_NUM_6"
		},
		{	inputName: "439",
		friendlyName: "KEY_IDX_JP_CS1_NUM_7"
		},
		{	inputName: "440",
		friendlyName: "KEY_IDX_JP_CS1_NUM_8"
		},
		{	inputName: "441",
		friendlyName: "KEY_IDX_JP_CS1_NUM_9"
		},
		{	inputName: "445",
		friendlyName: "KEY_IDX_JP_CS2"
		},
		{	inputName: "446",
		friendlyName: "KEY_IDX_JP_CS2_NUM_1"
		},
		{	inputName: "455",
		friendlyName: "KEY_IDX_JP_CS2_NUM_10"
		},
		{	inputName: "456",
		friendlyName: "KEY_IDX_JP_CS2_NUM_11"
		},
		{	inputName: "457",
		friendlyName: "KEY_IDX_JP_CS2_NUM_12"
		},
		{	inputName: "447",
		friendlyName: "KEY_IDX_JP_CS2_NUM_2"
		},
		{	inputName: "448",
		friendlyName: "KEY_IDX_JP_CS2_NUM_3"
		},
		{	inputName: "449",
		friendlyName: "KEY_IDX_JP_CS2_NUM_4"
		},
		{	inputName: "450",
		friendlyName: "KEY_IDX_JP_CS2_NUM_5"
		},
		{	inputName: "451",
		friendlyName: "KEY_IDX_JP_CS2_NUM_6"
		},
		{	inputName: "452",
		friendlyName: "KEY_IDX_JP_CS2_NUM_7"
		},
		{	inputName: "453",
		friendlyName: "KEY_IDX_JP_CS2_NUM_8"
		},
		{	inputName: "454",
		friendlyName: "KEY_IDX_JP_CS2_NUM_9"
		},
		{	inputName: "458",
		friendlyName: "KEY_IDX_JP_JS"
		},
		{	inputName: "459",
		friendlyName: "KEY_IDX_JP_JS_NUM_1"
		},
		{	inputName: "468",
		friendlyName: "KEY_IDX_JP_JS_NUM_10"
		},
		{	inputName: "469",
		friendlyName: "KEY_IDX_JP_JS_NUM_11"
		},
		{	inputName: "470",
		friendlyName: "KEY_IDX_JP_JS_NUM_12"
		},
		{	inputName: "460",
		friendlyName: "KEY_IDX_JP_JS_NUM_2"
		},
		{	inputName: "461",
		friendlyName: "KEY_IDX_JP_JS_NUM_3"
		},
		{	inputName: "462",
		friendlyName: "KEY_IDX_JP_JS_NUM_4"
		},
		{	inputName: "463",
		friendlyName: "KEY_IDX_JP_JS_NUM_5"
		},
		{	inputName: "464",
		friendlyName: "KEY_IDX_JP_JS_NUM_6"
		},
		{	inputName: "465",
		friendlyName: "KEY_IDX_JP_JS_NUM_7"
		},
		{	inputName: "466",
		friendlyName: "KEY_IDX_JP_JS_NUM_8"
		},
		{	inputName: "467",
		friendlyName: "KEY_IDX_JP_JS_NUM_9"
		},
		{	inputName: "22",
		friendlyName: "KEY_IDX_MENU"
		},
		{	inputName: "26",
		friendlyName: "KEY_IDX_MUTE"
		},
		{	inputName: "417",
		friendlyName: "KEY_IDX_MYAPPS"
		},
		{	inputName: "408",
		friendlyName: "KEY_IDX_NETCAST"
		},
		{	inputName: "2",
		friendlyName: "KEY_IDX_NUM_0"
		},
		{	inputName: "3",
		friendlyName: "KEY_IDX_NUM_1"
		},
		{	inputName: "4",
		friendlyName: "KEY_IDX_NUM_2"
		},
		{	inputName: "5",
		friendlyName: "KEY_IDX_NUM_3"
		},
		{	inputName: "6",
		friendlyName: "KEY_IDX_NUM_4"
		},
		{	inputName: "7",
		friendlyName: "KEY_IDX_NUM_5"
		},
		{	inputName: "8",
		friendlyName: "KEY_IDX_NUM_6"
		},
		{	inputName: "9",
		friendlyName: "KEY_IDX_NUM_7"
		},
		{	inputName: "10",
		friendlyName: "KEY_IDX_NUM_8"
		},
		{	inputName: "11",
		friendlyName: "KEY_IDX_NUM_9"
		},
		{	inputName: "34",
		friendlyName: "KEY_IDX_PAUSE"
		},
		{	inputName: "33",
		friendlyName: "KEY_IDX_PLAY"
		},
		{	inputName: "1",
		friendlyName: "KEY_IDX_POWER_OFF"
		},
		{	inputName: "403",
		friendlyName: "KEY_IDX_PREV_CHANNEL"
		},
		{	inputName: "405",
		friendlyName: "KEY_IDX_QMENU"
		},
		{	inputName: "40",
		friendlyName: "KEY_IDX_REC"
		},
		{	inputName: "31",
		friendlyName: "KEY_IDX_RED"
		},
		{	inputName: "37",
		friendlyName: "KEY_IDX_REWIND"
		},
		{	inputName: "1",
		friendlyName: "KEY_IDX_SIMPLELINK_DISC_MENU"
		},
		{	inputName: "4",
		friendlyName: "KEY_IDX_SIMPLELINK_GUIDE"
		},
		{	inputName: "0",
		friendlyName: "KEY_IDX_SIMPLELINK_HOME"
		},
		{	inputName: "2",
		friendlyName: "KEY_IDX_SIMPLELINK_INFO_MENU"
		},
		{	inputName: "6",
		friendlyName: "KEY_IDX_SIMPLELINK_POWER_ONOFF"
		},
		{	inputName: "5",
		friendlyName: "KEY_IDX_SIMPLELINK_RECLIST"
		},
		{	inputName: "3",
		friendlyName: "KEY_IDX_SIMPLELINK_TITLE_POPUP"
		},
		{	inputName: "39",
		friendlyName: "KEY_IDX_SKIP_BACKWARD"
		},
		{	inputName: "38",
		friendlyName: "KEY_IDX_SKIP_FORWARD"
		},
		{	inputName: "30",
		friendlyName: "KEY_IDX_STB_BACK"
		},
		{	inputName: "16",
		friendlyName: "KEY_IDX_STB_BLUE"
		},
		{	inputName: "38",
		friendlyName: "KEY_IDX_STB_CH_DOWN"
		},
		{	inputName: "37",
		friendlyName: "KEY_IDX_STB_CH_UP"
		},
		{	inputName: "19",
		friendlyName: "KEY_IDX_STB_DASH"
		},
		{	inputName: "34",
		friendlyName: "KEY_IDX_STB_DOWN"
		},
		{	inputName: "7",
		friendlyName: "KEY_IDX_STB_EXIT"
		},
		{	inputName: "12",
		friendlyName: "KEY_IDX_STB_FORWARD"
		},
		{	inputName: "14",
		friendlyName: "KEY_IDX_STB_GREEN"
		},
		{	inputName: "2",
		friendlyName: "KEY_IDX_STB_GUIDE"
		},
		{	inputName: "35",
		friendlyName: "KEY_IDX_STB_LEFT"
		},
		{	inputName: "1",
		friendlyName: "KEY_IDX_STB_MENU"
		},
		{	inputName: "29",
		friendlyName: "KEY_IDX_STB_NUM0"
		},
		{	inputName: "20",
		friendlyName: "KEY_IDX_STB_NUM1"
		},
		{	inputName: "21",
		friendlyName: "KEY_IDX_STB_NUM2"
		},
		{	inputName: "22",
		friendlyName: "KEY_IDX_STB_NUM3"
		},
		{	inputName: "23",
		friendlyName: "KEY_IDX_STB_NUM4"
		},
		{	inputName: "24",
		friendlyName: "KEY_IDX_STB_NUM5"
		},
		{	inputName: "25",
		friendlyName: "KEY_IDX_STB_NUM6"
		},
		{	inputName: "26",
		friendlyName: "KEY_IDX_STB_NUM7"
		},
		{	inputName: "27",
		friendlyName: "KEY_IDX_STB_NUM8"
		},
		{	inputName: "28",
		friendlyName: "KEY_IDX_STB_NUM9"
		},
		{	inputName: "18",
		friendlyName: "KEY_IDX_STB_OK"
		},
		{	inputName: "11",
		friendlyName: "KEY_IDX_STB_PAUSE"
		},
		{	inputName: "10",
		friendlyName: "KEY_IDX_STB_PLAY"
		},
		{	inputName: "0",
		friendlyName: "KEY_IDX_STB_POWER_ONOFF"
		},
		{	inputName: "17",
		friendlyName: "KEY_IDX_STB_REC"
		},
		{	inputName: "13",
		friendlyName: "KEY_IDX_STB_RED"
		},
		{	inputName: "8",
		friendlyName: "KEY_IDX_STB_REWIND"
		},
		{	inputName: "36",
		friendlyName: "KEY_IDX_STB_RIGHT"
		},
		{	inputName: "61",
		friendlyName: "KEY_IDX_STB_SKIP_BACKWARD"
		},
		{	inputName: "62",
		friendlyName: "KEY_IDX_STB_SKIP_FORWARD"
		},
		{	inputName: "9",
		friendlyName: "KEY_IDX_STB_STOP"
		},
		{	inputName: "33",
		friendlyName: "KEY_IDX_STB_UP"
		},
		{	inputName: "15",
		friendlyName: "KEY_IDX_STB_YELLOW"
		},
		{	inputName: "35",
		friendlyName: "KEY_IDX_STOP"
		},
		{	inputName: "25",
		friendlyName: "KEY_IDX_VOL_DOWN"
		},
		{	inputName: "24",
		friendlyName: "KEY_IDX_VOL_UP"
		},
		{	inputName: "32",
		friendlyName: "KEY_IDX_YELLOW"
		}
];


module.exports.settings = function( device_data, newSettingsObj, oldSettingsObj, changedKeysArr, callback ) {

    Homey.log ('Changed settings: ' + JSON.stringify(device_data) + ' / ' + JSON.stringify(newSettingsObj) + ' / old = ' + JSON.stringify(oldSettingsObj));
    
    try {
	    changedKeysArr.forEach(function (key) {
		    devices[device_data.id].settings[key] = newSettingsObj[key];
		});
		
		callback(null, true);
		
    } catch (error) {
	    
      callback(error);
      
    }

};

module.exports.init = function(devices_data, callback) {
	
	devices_data.forEach(function initdevice(device) {
	    
	    Homey.log('add device: ' + JSON.stringify(device));
	    devices[device.id] = device;
	    
	    module.exports.getSettings(device, function(err, settings){
		    
		    devices[device.id].settings = settings;
		    
		});
		
	});
	
	Homey.log('Driver Init done');
	callback (null, true);
	
};

module.exports.deleted = function( device_data ) {
    
    Homey.log('deleted: ' + JSON.stringify(device_data));
    
    devices[device_data.id] = [];
	
};

// CAPABILITIES
/*
module.exports.capabilities = {
    onoff: {

        get: function( device_data, callback ){

			Homey.log('Getting device_status of ' + devices[device_data.id].settings.ipaddress);
			callback (null, true);
            
        },

        set: function( device_data, turnon, callback ) {
	        
	        Homey.log('Setting device_status of ' + devices[device_data.id].settings.ipaddress + ' to ' + turnon);

				callback (null, true);
			
			}
    },
    volume_set: {

        get: function( device_data, callback ){

			Homey.log('Getting volume of ' + devices[device_data.id].settings.ipaddress);
			callback (null, 12);
            
        },

        set: function( device_data, volume, callback ) {
	        
	        Homey.log('Setting volume of ' + devices[device_data.id].settings.ipaddress + ' to ' + volume);
			callback (null, true);
			
        }
    }
}
*/
// END CAPABILITIES

function requestPairing (address, pairingKey, callback) {
	var message_request = '<?xml version="1.0" encoding="utf-8"?>' +
		'<auth><type>AuthReq</type><value>' +
		pairingKey + '</value></auth>';

	var options = {
		hostname : address,
		port : 8080,
		path : '/udap/api/pairing',
		method : 'POST'
	};

	// make HTTP request
	var req = http.request(options, function (res) {

		if(res.statusCode == 200) {
			Homey.log('\n> The Pairing request has succeeded.')

			res.on('data', function(data){
				Homey.log('> Response: ' + data);
				
				var splits = data.toString().split("<session>");
				
				var splits = splits[1].split("</session>");
				
				var session = splits[0];
				
				Homey.log('___ SESSION = ' + session + ' ___');
				//callback(null, session);
				callback (null, session);
				
			});
		} else {
			Homey.log('Error: ' + res.statusCode + ' (statusCode)');
			callback (res.statusCode, false);
		}
	});

	req.on('error', function (error) {
		Homey.log('Error trying to pair: ' + error);
		callback (error, false);
	});

	req.setHeader('Content-Type', 'text/xml; charset=utf-8');
	req.end(message_request);
}
		    
module.exports.pair = function (socket) {
	// socket is a direct channel to the front-end

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
                	"ipaddress": tempIP,
                	"pairingkey": ""
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
				ipaddress: device.settings.ipaddress,
				pairingkey: device.settings.pairingkey
            },
            capabilities: [
	        	'onoff',
	        	'volume_set'
	        ]
        }
        
        Homey.log('devices=' + JSON.stringify(devices));
        
    });

	socket.on('get_devices', function (data, callback) {
		
		callback( null, 'Started discovery!' );
		Homey.log('Starting discovery...');
		
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
		        
				//socket.emit ('fill', tempIP);
				socket.emit ('fill');
				
		    }
			
			setTimeout(close, 5000);
			
		}
		
		discover(function (data) {
			
			Homey.log('received discovery: ' + JSON.stringify (data));
			
			//if (data !== null) {
			
				tempIP = data.address;
				socket.emit ('fill', tempIP);
			
			//} else {
				
			//	socket.emit ('done', null);
				
			//}
			
		});

	});
	
	socket.on('requestpairingkey', function(data) {
		
		function requestPairingKey (address, callback) {
			var message_request = '<?xml version="1.0" encoding="utf-8"?>' +
				'<auth><type>AuthKeyReq</type></auth>';
		
			var options = {
				hostname : address,
				port : 8080,
				path : '/udap/api/pairing',
				method : 'POST'
			};
		
			// make HTTP request
			var req = http.request(options, function (res) {
		
				if(res.statusCode == 200) {
					console.log('> The Pairing Key is being displayed on the TV screen.')
					callback(true);
				}
				else {
					console.log('Error: ' + res.statusCode + ' (statusCode)');
					socket.emit('error', 'Error statuscode: ' + rest.statusCode);
				}
			});
		
			req.on('error', function (error) {
				//console.log('Error: ' + error);
				Homey.log('Error trying to request pairing key: ' + error);
				socket.emit('error', error);
			});
		
			req.setHeader('Content-Type', 'text/xml; charset=utf-8');
			req.end(message_request);
		}
		
		Homey.log('requestpairingkey IP = ' + JSON.stringify(data));
		
		requestPairingKey (data.ip, function (callback) {
			
			Homey.log('REQUEST callback = ' + JSON.stringify(callback));
			
		});
		
	});
	
	socket.on('requestPairing', function (data, callback) {
		
		requestPairing(data.ip, data.pairingkey, function (error, pairingSucceeded) {

			// if pairing was successful, continue
			if(pairingSucceeded) {
				
				//callback (pairingSucceeded);
				socket.emit ('session_key', session);
				
			} else {
				
				Homey.log(error);
				
			}
				
		});
		
		
	});

	socket.on('disconnect', function(){
		Homey.log("LG SmartTV app - User aborted pairing, or pairing is finished");
	});
	
};


Homey.manager('flow').on('action.sendcommand', function (callback, args){
	
	Homey.log('RECEIVED ARGS: ' + JSON.stringify(args));
	
	Homey.log ('Making a request... address = ' + devices[args.device.id].settings.ipaddress + ' / sessionID = ' + devices[args.device.id].settings.session + ' / commandKey = ' + args.command.inputName);
	
	requestCommandKey(devices[args.device.id].settings.ipaddress, devices[args.device.id].settings.pairingkey, args.command.inputName, callback);
	
});

Homey.manager('flow').on('action.sendcommand.command.autocomplete', function (callback, value) {
	var items = searchForCommandsByValue(value.query);
	callback(null, items);
});

function requestCommandKey(address, pairingkey, commandKey, callback) {
	
	requestPairing (address, pairingKey, function (error, sessionID) {
	
		if (!error) {
		
			var message_request = '<?xml version="1.0" encoding="utf-8"?><command><session>' +
				sessionID +
				"</session><type>HandleKeyInput</type><value>" +
				commandKey +
				"</value></command>"
		
			var options = {
				hostname : address,
				port : 8080,
				path : '/udap/api/command',
				method : 'POST'
			};
		
			// make HTTP request
			var req = http.request(options, function (res) {
		
				if(res.statusCode != 200) {
					callback (res.statusCode, false);
					Homey.log('Error: ' + res.statusCode + ' (statusCode)');
				} else {
					
					callback (null, true);
					
				}
			});
		
			req.on('error', function (error) {
				Homey.log('Error: ' + JSON.stringify(error));
				callback (error.errno, false);
			});
		
			req.setHeader('Content-Type', 'text/xml; charset=utf-8');
			req.end(message_request);
			
		} else callback (error, false);
		
	});
	
}


function searchForCommandsByValue (value) {
	var possibleKeys = allpossibleKeys;
	var tempItems = [];
	for (var i = 0; i < possibleKeys.length; i++) {
		var tempInput = possibleKeys[i];
		if ( tempInput.friendlyName.toLowerCase().indexOf(value.toLowerCase()) >= 0 ) {
			tempItems.push({ icon: "", name: tempInput.friendlyName, inputName: tempInput.inputName });
		}
	}
	return tempItems;
}