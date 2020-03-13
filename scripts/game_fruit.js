const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');
const fruits = ['fruit0.png','fruit1.png','fruit2.png','fruit3.png'];

const game = {
	rows: 3,
	row_length: 18,
	luck: 4,
	width: 1280,
	height: 720,
	fruit_size: 0.8,
	spin_speed: 0.005,
	spin_delay: 1000,
	display_margin: 3
};

let row = [];
for (let i = 0; i < game.rows; i++) {
	row[i] = {
		position: game.width / game.rows * i,
		spinning: false,
		spin: 0,
		goal: 0,
		contents: []
	};
};

let img = [];
let image_size = game.width / game.rows * game.fruit_size;

function randomize_row(which){
	for (let j = 0; j < game.row_length; j++){
		row[which].contents[j] = fruits[Math.round(Math.random()*(fruits.length-1))];
	}
	img[which] = [];
	for (let j in row[which].contents){
		img[which][j] = document.createElement('img');
		img[which][j].src = 'resources/' + row[which].contents[j];
	}
	console.log('raamdd')
}

function init_game() {
	for (let i = 0; i < game.rows; i++){
		randomize_row(i);
	}
}

function draw(force = false) {
	ctx.clearRect(0,0,canvas.width,canvas.height);

	let spin_speed = game.spin_speed * image_size;

	let image_margin = (1 - game.fruit_size) / 2 * (game.width / game.rows);

	for (let i in row){
		for (let j in row[i].contents){
			if (row[i].spin < row[i].goal){
				row[i].spin += spin_speed;
			}else{
				row[i].spin = row[i].goal;
			}
			
			ctx.drawImage(img[i][j],row[i].position+image_margin,image_size*j+image_size/2+image_margin-row[i].spin,image_size,image_size);
		}
	}

	for (let i in row) {
		if ((row[i].spin < row[i].goal) || (force == true)){
			console.log('yes');
			requestAnimationFrame(draw);
			break;
		}
	};
}

function fruit_spin() {
	
	for (let i in row){
		setTimeout(() => {
			randomize_row(i);
			row[i].spin = 0;
			row[i].goal = Math.round(image_size * (game.row_length-game.display_margin));
		}, i*game.spin_delay);
	}
	
	setTimeout(draw,0);
}

function begin_game_fruit() {
	init_game();
	draw();
}