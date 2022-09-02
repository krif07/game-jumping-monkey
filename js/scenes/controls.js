export class Controls extends Phaser.Scene{
    constructor() {
        super('controlsScene');
    }

    preload(){
        this.load.baseURL = './';
        this.load.image('jungle', '../img/background.png');
        this.load.image('logo', '../img/JumpingMonkey.png');
        this.load.image('monkey', '../img/monkey.png');
        this.load.image('p1Text', '../img/Player1text.png');
        this.load.image('p2Text', '../img/Player2text.png');
        this.load.image('controlsPlayer1', '../img/Player1.png');
        this.load.image('controlsPlayer2', '../img/Player2.png');
    }
    create(){
        this.add.image(480, 320, 'jungle').setScale(2);
        this.add.image(400,50, 'logo');
        this.add.image(180,450, 'monkey');
        this.add.image(200,505, 'p1Text');
        this.add.image(600,505, 'p2Text');
        this.add.image(200,350, 'controlsPlayer1');
        this.add.image(600,350, 'controlsPlayer2');

        const backOption = this.add.zone(0, 0, 800, 530);
        backOption.setOrigin(0);
        backOption.setInteractive();
        backOption.once('pointerdown', () => this.scene.start('menuScene'));
    }
    update(){

    }
};