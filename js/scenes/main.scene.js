export class MainScene extends Phaser.Scene{
    constructor() {
        super('gameScene');
        this.level = 2;
        this.playerQuantity = 1;
        this.player = "";
        this.secondPlayer = "";
    }

    /*init(data){
        this.level = data.level;
    }*/

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

        if (this.level === 1){
            platforms.create(400, 400, 'ground');
            platforms.create(300, 280, 'ground');
            platforms.create(50, 190, 'ground');
            platforms.create(750, 160, 'ground');
        }
        else if (this.level === 2){
            platforms.create(145, 100, 'ground');
            platforms.create(240, 100, 'ground');
            platforms.create(240, 220, 'ground');
            platforms.create(650, 180, 'ground');
            platforms.create(480, 320, 'ground');
            platforms.create(520, 420, 'ground');
        }

        this.player = this.physics.add.sprite(280, 450, 'dude');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.physics.add.collider(this.player, platforms);

        if(this.playerQuantity > 1) {
            this.secondPlayer = this.physics.add.sprite(500, 450, 'secondPlayer');
            this.secondPlayer.setCollideWorldBounds(true);
            this.secondPlayer.setBounce(0.2);
            this.physics.add.collider(this.secondPlayer, platforms);
        }
    }
    update(){

    }
};