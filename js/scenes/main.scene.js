export class MainScene extends Phaser.Scene{
    constructor() {
        super('gameScene');
    }

    preload(){
        this.load.baseURL = './';
        this.load.image('jungle', '../img/background.png');
        this.load.image('platform', '../img/platform1.png');
        this.load.image('ground', '../img/platform4.png');
        this.load.image('star', '../img/star.png');
        this.load.image('bomb', '../img/bomb.png');
        this.load.image('controlPlayer1', '../img/Player1.png');
        this.load.image('controlPlayer2', '../img/Player2.png');

        this.load.spritesheet('dude', '../img/dude.png', { frameWidth: 32, frameHeight: 48});
        this.load.spritesheet('secondPlayer', '../img/secondPlayer.png', { frameWidth: 32, frameHeight: 48});
    }
    create(){
        this.add.image(400,265, 'jungle').setScale(2);
        let platforms = this.physics.add.staticGroup();
        platforms.create(180, 530, 'ground');
        platforms.create(560, 530, 'ground');
        platforms.create(800, 530, 'platform');
        platforms.create(180, 500, 'ground');
        platforms.create(560, 500, 'ground');
        platforms.create(800, 500, 'platform');
    }
    update(){

    }
};