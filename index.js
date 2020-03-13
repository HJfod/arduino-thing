const { BrowserWindow, app } = require('electron');
const ipc = require('electron').ipcMain;

let window;

app.on('ready', () => {
	
	window = new BrowserWindow({ webPreferences: { nodeIntegration: true } });
	
	window.loadFile('main.html');
	
	window.on('closed', () => {
		app.quit();
	});
	
	ipc.on('app', (event, arg) => {
		a = arg.split('=');
		switch (a[0]) {
			case 'flash-led':
			
				break;
		}
	});
});



const five = require('johnny-five');
const board = new five.Board();

let c = {
	l_blink: { obj: null, pin: 5 },
	b_start: { obj: null, pin: 4 },
	b_coin: { obj: null, pin: 3 },
}

board.on('ready', () => {
	c.l_blink.obj = new five.Led(c.l_blink.pin);
	c.b_start.obj = new five.Button(c.b_start.pin);
	c.b_coin.obj = new five.Button(c.b_coin.pin);
	
	c.b_start.obj.on('press', () => {
		window.webContents.send('app','pressed=' + c.b_start.pin);
	});
	
	c.b_coin.obj.on('press', () => {
		window.webContents.send('app','coin=1');
	}).on('release', () => {
		window.webContents.send('app','coin=0');
	});
	
	console.log('ready');
});