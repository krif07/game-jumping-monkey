export class MainScene extends Phaser.Scene{
    constructor() {
        super('gameScene');
        this.level = 1;
        this.playerQuantity = 2;
        this.player = "";
        this.secondPlayer = "";
        this.scoreText = "";
        this.scoreTextPlayer2 = "";
        this.gameTime = 60;
        this.timer = 0;
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
        let self = this;
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
        this.player.score = 0;
        this.physics.add.collider(this.player, platforms);

        if(this.playerQuantity > 1) {
            this.secondPlayer = this.physics.add.sprite(500, 450, 'secondPlayer');
            this.secondPlayer.setCollideWorldBounds(true);
            this.secondPlayer.setBounce(0.2);
            this.secondPlayer.score = 0;
            this.physics.add.collider(this.secondPlayer, platforms);
            this.scoreTextPlayer2 = this.add.text(516, 16, 'P2 score: 0', { fontSize: '32px', fill: '#000'});
            this.timeText = this.add.text(350, 0, this.gameTime, {fontFamily: 'font1', fontSize: '64px', color: 'white'});
            //this.refreshTime();
        }

        let stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 50},
        });
        this.physics.add.collider(stars, platforms);
        stars.children.iterate(function (child) {
           child.setBounce(0.5);
        });
        this.physics.add.overlap(this.player, stars, collectStar, null, this);

        let bombs = this.physics.add.group();
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(this.player, bombs, hitBomb, null, this);

        if(this.playerQuantity > 1){
            this.physics.add.overlap(this.secondPlayer, stars, collectStarPlayer2, null, this);
            this.physics.add.collider(this.secondPlayer, bombs, hitBombPlayer2, null, this);
        }
        function collectStar(player, star){
            this.player.score += 10;
            colliderStar(star);
            this.scoreText.setText('P1 score: ' + this.player.score);
        }
        function collectStarPlayer2(player, star){
            this.secondPlayer.score += 10;
            colliderStar(star);
            this.scoreTextPlayer2.setText('P2 score: ' + this.secondPlayer.score);
        }
        function colliderStar(star){
            star.disableBody(true, true);
            if(stars.countActive(true) === 0){
                let bomb = bombs.create(Phaser.Math.Between(0, 800), 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-400*self.level, 400*self.level), 20);

                stars.children.iterate(function (child){
                    child.enableBody(true, child.x, 0, true, true);
                });
            }
        }
        function hitBomb(element, bomb){
            if(this.playerQuantity === 1) {
                this.physics.pause();
                this.player.setTint(0xff0000);
                this.player.anims.play('turn');
                endScene();
            }
            else{
                this.player.score = this.player.score -50 <= 0 ? 0 : this.player.score - 50;
                this.scoreText.setText('P1 score: ' + this.player.score);
            }
        }
        function hitBombPlayer2(element, bomb){
            this.secondPlayer.score = this.secondPlayer.score -50 <= 0 ? 0 : this.secondPlayer.score - 50;
            this.scoreTextPlayer2.setText('P2 score: ' + this.secondPlayer.score);
        }
        function endScene(){
            self.time.addEvent({
                delay: 1500,
                loop: false,
                callBack: () => {
                    self.scene.start("endScene");
                }
            });
        }
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start:0, end:3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start:5, end:8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'leftP2',
            frames: this.anims.generateFrameNumbers('secondPlayer', { start:0, end:3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turnP2',
            frames: [{ key: 'secondPlayer', frame: 4 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'rightP2',
            frames: this.anims.generateFrameNumbers('secondPlayer', { start:5, end:8 }),
            frameRate: 10,
            repeat: -1
        });
        this.scoreText = this.add.text(16, 16, 'P1 score: 0', { fontSize: '32px', fill: '#000'});
    }

    refreshTime(){
        this.gameTime--;
        this.timeText.setText(this.gameTime);
        if(this.gameTime === 0){
            //this.physics.pause();
            this.player.setTint(0xff0000);
            this.secondPlayer.setTint(0xff0000);

            this.time.addEvent({
                delay: 1500,
                loop: false,
                callback: () => {
                    //this.scene.start("endScene");
                }
            });
        }
        else{
            console.log("refreshTime", this.gameTime);
            this.time.delayedCall({
                delay: 1000,
                callback: this.refreshTime(),
                callbackScope: this
            });
        }
    }

    update(time, delta){
        this.timer += delta;
        while (this.timer > 1000) {
            this.timer -= 1000;
            this.gameTime --;

            this.timeText.setText(this.gameTime);
            if(this.gameTime === 0){
                this.physics.pause();
                this.player.setTint(0xff0000);
                this.secondPlayer.setTint(0xff0000);

                this.time.addEvent({
                    delay: 1500,
                    loop: false,
                    callback: () => {
                        this.scene.start("endScene");
                    }
                });
            }
        }
        let cursors = this.input.keyboard.createCursorKeys();

        if(cursors.left.isDown){
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if(cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else{
            this.player.setVelocityX(0);
            this.player.anims.play('turn', true);
        }
        if(cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-330);
        }

        if(this.playerQuantity > 1){
            let keyObjUp = this.input.keyboard.addKey('W');
            let player2Up = keyObjUp.isDown;
            let keyObjRight = this.input.keyboard.addKey('D');
            let player2Right = keyObjRight.isDown;
            let keyObjLeft = this.input.keyboard.addKey('A');
            let player2Left = keyObjLeft.isDown;

            if(player2Left){
                this.secondPlayer.setVelocityX(-160);
                this.secondPlayer.anims.play('leftP2', true);
            }
            else if(player2Right){
                this.secondPlayer.setVelocityX(160);
                this.secondPlayer.anims.play('rightP2', true);
            }
            else{
                this.secondPlayer.setVelocityX(0);
                this.secondPlayer.anims.play('turnP2', true);
            }
            if(player2Up && this.secondPlayer.body.touching.down){
                this.secondPlayer.setVelocityY(-330);
            }
        }
    }
};