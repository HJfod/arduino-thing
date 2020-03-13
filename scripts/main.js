const ipc = require('electron').ipcRenderer;
const $ = require('jquery');
const fs = require('fs');

ipc.on('app', (event, arg) => {
	a = arg.split('=');
	switch (a[0]) {
		case 'coin':
			Number(a[1]) ? toggle_menu(1) : toggle_menu(0);
			break;
	}
});

function toggle_menu(type) {
	if (type) {
		$('#div_select').show();
		$('#div_coin').hide();
	}else{
		$('#div_select').hide();
		$('#div_coin').show();
	}
}

function play_game(which) {
	$('#div_game_' + which).show();
	eval(`begin_game_${which}();`);
	$('#div_select').hide();
}

$('#div_select').hide();
$('.div_game').hide();