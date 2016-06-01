# LG SmartTV support for Homey
Control your LG SmartTV with Homey. Only network-enabled TV's are supported.

**Want to show your appreciation for this app? A donation is possible via http://www.d2c.nl **

This is a very simple app I made, based on https://github.com/migueljteixeira/nodejs-lgtvRemoteControl - big thanks to that. I hope everything works well, I don't have an LG tv myself :)

Steps to add a device:
- Install the app to Homey
- Turn on your television
- Add a device, choose LG SmartTV. The app will scan your network for a few seconds to see if it discovers any LG TV's.
- If discovery finds one, the IP will be filled in. Otherwise, you'll need to add the IP yourself.
- Click the 'Request pairing key' button. Your TV will now show the pairing key, which you need to enter into the field.
- Click the 'Try pairing' button, it should now fill in the session key and show the 'Save' button. When you hit 'save', the device will be added.

There is only one card available in your Homey flows, the 'send command' card. I might add new functionality in the future, however please keep in mind that this is kinda hard as I don't have a LG TV myself! (someone donate me one ;)) 

**Version 0.1.1:**
- First release