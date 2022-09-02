export class ModeGame extends Phaser.Scene{
    constructor() {
        super('modeScene');
        this.modeName = '1 Player';
        this.playerQuantity = 1;
    }

    preload(){
        this.load.baseURL = './';
        this.load.image('jungle', '../img/background.png');
        this.load.image('logo', '../img/JumpingMonkey.png');
        this.load.image('monkey', '../img/monkey.png');
        this.load.image('buttons-mode', '../img/modeButtons.png');
    }
    create(){
        this.add.image(480, 320, 'jungle').setScale(2);
        this.add.image(400,50, 'logo');
        this.add.image(180,450, 'monkey');
        this.add.image(400,300, 'buttons-mode');

        const onePlayerOption = this.add.zone(310, 155, 180, 90);
        onePlayerOption.setOrigin(0);
        onePlayerOption.setInteractive();
        onePlayerOption.once('pointerdown', () => this.changeMode(1));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(onePlayerOption);

        const twoPlayersOption = this.add.zone(310, 255, 180, 90);
        twoPlayersOption.setOrigin(0);
        twoPlayersOption.setInteractive();
        twoPlayersOption.once('pointerdown', () => this.changeMode(2));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(twoPlayersOption);

        const backOption = this.add.zone(310, 357, 180, 90);
        backOption.setOrigin(0);
        backOption.setInteractive();
        backOption.once('pointerdown', () => this.scene.start('menuScene', {
                levelName: this.levelName
            })
        );
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(backOption);
    }
    changeMode(mode){
        if(mode === 1) {
            this.modeName = '1 Player';
        }
        else{
            this.modeName = '2 Players';
        }
        this.playerQuantity = mode;
        this.scene.start('menuScene', {
            modeName: this.modeName,
            playerQuantity: this.playerQuantity
        });
    }
    update(){

    }
};