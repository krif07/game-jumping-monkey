export class EndGame extends Phaser.Scene{
    constructor() {
        super('endGameScene');
    }

    init(data){
        this.playerQuantity = data.playerQuantity;
        this.scorePlayer = data.scorePlayer;
        this.scoreSecondPlayer = data.scoreSecondPlayer;
        this.levelName = data.levelName;
        this.modeName = data.modeName;
    }

    preload(){
        this.load.baseURL = './';
        this.load.image('jungle', '../img/background.png');
        this.load.image('logo', '../img/JumpingMonkey.png');
        this.load.image('monkey', '../img/monkey.png');
    }
    create(){
        this.add.image(480, 320, 'jungle').setScale(2);
        this.add.image(400,50, 'logo');
        this.add.image(180,450, 'monkey');

        this.add.text(100, 150, 'Player 1: ' + this.scorePlayer + ' Points', {fontSize: '32px', fill: '#fff'});
        if(this.playerQuantity > 1) {
            this.add.text(100, 230, 'Player 2: ' + this.scoreSecondPlayer + ' Points', {fontSize: '32px', fill: '#fff'});
        }
        this.add.text(400, 360, 'Level: ' + this.levelName, {fontSize: '32px', fill: '#fff'});
        this.add.text(400, 400, 'Mode: ' + this.modeName, {fontSize: '32px', fill: '#fff'});

        const backOption = this.add.zone(0, 0, 800, 530);
        backOption.setOrigin(0);
        backOption.setInteractive();
        backOption.once('pointerdown', () => this.redirectScene('menuScene'));
    }
    redirectScene(sceneName) {
        this.scene.start(sceneName);
    }
    update(){

    }
};