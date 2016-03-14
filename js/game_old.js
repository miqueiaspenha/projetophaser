window.onload = function () {
	game = new Phaser.Game(1000, 640, Phaser.AUTO, '', {
		preload: carregaAssets,
		create: criaCenario,
		update: atualizaJogo
	});
}

function carregaAssets() {
	// game.load.image('fundo', 'assets/images/fundo.jpg');
	// game.load.image('chao', 'assets/images/chao.jpg');
	// game.load.image('degraus', 'assets/images/degraus.jpg');
	game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
	game.load.image('inimigo',  'assets/images/inimigo.png');

	game.load.image('tilesCenario', 'assets/images/tileset.png');

	game.load.tilemap('mapa', 'assets/images/mapacaverna.json', null, Phaser.Tilemap.TILED_JSON);
}

function criaCenario() {

	game.physics

	criaFundo();

	plataformas = game.add.group();

	inimigos = game.add.group();

	inimigos.enableBody = true;

	game.physics.startSystem(Phaser.Physics.ARCADE);

	cursors = game.input.keyboard.createCursorKeys();

	criaChao();

	criaJogador();

	criaInimigo();

	criaDegraus();

}

function atualizaJogo() {

	game.physics.arcade.collide(jogador, plataformas);

	game.physics.arcade.collide(inimigos, plataformas);

	jogador.body.velocity.x = 0;

	if(cursors.left.isDown) {
		jogador.body.velocity.x = -250;
		jogador.animations.play('left');
	}
	else if(cursors.right.isDown) {
		jogador.body.velocity.x = 250;
		jogador.animations.play('right');
	}
	else {
		jogador.animations.stop();
		jogador.frame = 4;
	}

	if(cursors.up.isDown && jogador.body.touching.down) {
		jogador.body.velocity.y = -650;
	}

	aproximaInimigo();

	game.physics.arcade.overlap(jogador, inimigos, encostouInimigo);
}

function criaFundo() {
	game.add.sprite(0, 0, 'fundo');
}

function criaChao() {
	plataformas.enableBody = true;

	var chao = plataformas.create(0, game.world.height - 30, 'chao');

	chao.body.immovable = true;

	chao.scale.setTo(2, 1);
}

function criaJogador() {
	jogador = game.add.sprite(50, game.world.height - 250, 'dude');
	game.physics.arcade.enable(jogador);
	jogador.body.bounce.y = 0.2;
	jogador.body.gravity.y = 1500;
	jogador.body.collideWorldBounds = true;
	jogador.animations.add('left', [0,1,2,3], 10, true);
	jogador.animations.add('right', [5,6,7,8], 10, true);
}

function criaInimigo() {
	
	var inimigo = inimigos.create(500, 400, 'inimigo');

	inimigo.body.gravity.y = 1500;

	inimigo.body.collideWorldBounds = true;
}

function aproximaInimigo() {
	
	var inimigo = inimigos.children[0];

	inimigo.body.velocity.x = 0;

	if(inimigo.position.x < jogador.body.position.x) {
		inimigo.body.velocity.x += 100;
	}
	else {
		inimigo.body.velocity.x -= 100;
	}
}

function encostouInimigo() {
	
	jogador.kill();

	var textoJogo = game.add.text(game.camera.width / 2 - 150, game.camera.height / 2, "Vocẽ morreu", {
		font: "48px Arial",
		fill: "#ff0044",
		align: "center"
	});
}

function criaDegraus() {
	
	var degrau1 = plataformas.create(0, 440, 'degraus');
	degrau1.body.immovable = true;

	var degrau2 = plataformas.create(550, 350, 'degraus');
	degrau2.body.immovable = true;

	var degrau3 = plataformas.create(750, 270, 'degraus');
	degrau3.body.immovable = false;
}