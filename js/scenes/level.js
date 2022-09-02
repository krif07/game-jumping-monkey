export class Level extends Phaser.Scene{
    constructor() {
        super('levelScene');
        this.levelName = 'Easy';
    }

    preload(){
        this.load.baseURL = './';
        this.load.image('jungle', '../img/background.png');
        this.load.image('logo', '../img/JumpingMonkey.png');
        this.load.image('monkey', '../img/monkey.png');
        this.load.image('buttons-level', '../img/levelButtons.png');
    }
    create(){
        this.add.image(480, 320, 'jungle').setScale(2);
        this.add.image(400,50, 'logo');
        this.add.image(180,450, 'monkey');
        this.add.image(400,300, 'buttons-level');

        const easyOption = this.add.zone(310, 98, 180, 90);
        easyOption.setOrigin(0);
        easyOption.setInteractive();
        easyOption.once('pointerdown', () => this.changeLevel(1));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(easyOption);

        const mediumOption = this.add.zone(310, 202, 180, 90);
        mediumOption.setOrigin(0);
        mediumOption.setInteractive();
        mediumOption.once('pointerdown', () => this.changeLevel(2));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(mediumOption);

        const hardOption = this.add.zone(310, 305, 180, 90);
        hardOption.setOrigin(0);
        hardOption.setInteractive();
        hardOption.once('pointerdown', () => this.changeLevel(3));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(hardOption);

        const backOption = this.add.zone(310, 410, 180, 90);
        backOption.setOrigin(0);
        backOption.setInteractive();
        backOption.once('pointerdown', () => this.scene.start('menuScene', {
                levelName: this.levelName
            })
        );
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(controlsOption);

    }
    changeLevel(level){
        switch (level) {
            case 1:
                this.levelName = 'Easy';
                break;
            case 2:
                this.levelName = 'Medium';
                break;
            case 3:
                this.levelName = 'Hard';
                break;
        }
        this.scene.start('menuScene', {
            levelName: this.levelName
        });
    }
    update(){

    }
};