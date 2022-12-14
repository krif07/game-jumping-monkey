export class Menu extends Phaser.Scene{
    constructor() {
        super('menuScene');
        this.levelName = 'Easy';
        this.level = 1;
        this.modeName = '1 Player';
        this.playerQuantity = 1;
    }

    init(data){
        if(data !== null && JSON.stringify(data) !== JSON.stringify({})) {
            if(data.levelName !== null && data.levelName !== undefined) {
                this.levelName = data.levelName;
                this.level = data.level;
            }
            if(data.playerQuantity !== null && data.playerQuantity !== undefined){
                this.playerQuantity = data.playerQuantity;
                this.modeName = data.modeName;
            }
        }
    }

    preload(){
        this.load.baseURL = './';
        this.load.image('jungle', '../img/background.png');
        this.load.image('logo', '../img/JumpingMonkey.png');
        this.load.image('monkey', '../img/monkey.png');
        this.load.image('buttons-menu', '../img/buttons.png');
    }
    create(){
        this.add.image(480, 320, 'jungle').setScale(2);
        this.add.image(400,50, 'logo');
        this.add.image(180,450, 'monkey');
        this.add.image(400,300, 'buttons-menu');

        const startOption = this.add.zone(310, 98, 180, 90);
        startOption.setOrigin(0);
        startOption.setInteractive();
        startOption.once('pointerdown', () => this.scene.start('gameScene', {
            playerQuantity: this.playerQuantity,
            level : this.level,
            levelName: this.levelName,
            modeName: this.modeName
        }));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(startOption);

        const levelOption = this.add.zone(310, 202, 180, 90);
        levelOption.setOrigin(0);
        levelOption.setInteractive();
        levelOption.once('pointerdown', () => this.scene.start('levelScene'));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(levelOption);

        const modeOption = this.add.zone(310, 305, 180, 90);
        modeOption.setOrigin(0);
        modeOption.setInteractive();
        modeOption.once('pointerdown', () => this.scene.start('modeScene'));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(modeOption);

        const controlsOption = this.add.zone(310, 410, 180, 90);
        controlsOption.setOrigin(0);
        controlsOption.setInteractive();
        controlsOption.once('pointerdown', () => this.scene.start('controlsScene'));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(controlsOption);

        this.add.text(510, 400, 'Level: ' + this.levelName, {fontSize: '32px', fill: '#fff'});
        this.add.text(510, 450, 'Mode: ' + this.modeName, {fontSize: '32px', fill: '#fff'});
    }
    update(){

    }
};