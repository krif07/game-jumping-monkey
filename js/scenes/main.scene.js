export class MainScene extends Phaser.Scene{
    constructor() {
        super('gameScene');
        this.level = 1;
        this.playerQuantity = 1;
        this.player = "";
        this.secondPlayer = "";
        this.scoreText = "";
        this.scoreTextPlayer2 = "";
        this.gameTime = 60;
        this.timer = 0;
        this.goLeftP1 = false;
        this.goLeftP2 = false;
        this.goRightP1 = false;
        this.goRightP2 = false;
        this.goUpP1 = false;
        this.goUpP2 = false;
        this.musicStart = true;
        this.levelName = 'Easy';
        this.modeName = '1 Player';
    }

    init(data){
        if(data !== null && JSON.stringify(data) !== JSON.stringify({})) {
            if (data.playerQuantity !== null && data.playerQuantity !== undefined) {
                this.playerQuantity = data.playerQuantity;
            }
            if(data.level !== null && data.level !== undefined){
                this.level = data.level;
                this.levelName = data.levelName;
            }
            if(data.modeName !== null && data.modeName !== undefined){
                this.modeName = data.modeName;
            }
        }
    }

    preload(){
        this.load.baseURL = './';
        this.load.image('jungle', '../img/background.png');
        this.load.image('platform', '../img/platform1.png');
        this.load.image('ground', '../img/platform4.png');
        this.load.image('star', '../img/star.png');
        this.load.image('bomb', '../img/bomb.png');

        this.load.spritesheet('dude', '../img/dude.png', { frameWidth: 32, frameHeight: 48});
        this.load.spritesheet('secondPlayer', '../img/secondPlayer.png', { frameWidth: 32, frameHeight: 48});

        this.load.audio('music', '../sounds/Banana_Craziness.mp3')
        this.load.audio('getStar', '../sounds/Rise06.mp3')
        this.load.audio('crash', '../sounds/bzzzt.wav')
    }
    create(){
        let self = this;
        this.gameTime = 60;
        /*let progressBar = this.add.graphics();
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.add.text(width /2, height /2 -50, 'Loading...', {font: '20px monospace', fill: '#ffffff'});
        let percentText = this.add.text(width /2, height -180, '0%', {font: '18px monospace', fill: '#ffffff'});
        let assetText = this.add.text(width /2, height -100, '', {font: '18px monospace', fill: '#ffffff'});

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });*/

        if(this.musicStart){
            this.musicStart = false;
            const music = this.sound.add('music');
            music.play({volume:0.15, loop:true});
        }
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
            platforms.create(220, 220, 'ground');
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
            colliderStar(star, this);
            this.scoreText.setText('P1 score: ' + this.player.score);
        }
        function collectStarPlayer2(player, star){
            this.secondPlayer.score += 10;
            colliderStar(star, this);
            this.scoreTextPlayer2.setText('P2 score: ' + this.secondPlayer.score);
        }
        function colliderStar(star, context){
            const musicStar = context.sound.add('getStar');
            musicStar.play({volume:1, loop: false});

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
            const musicCrash = self.sound.add('crash');
            musicCrash.play({volume:1, loop: false});

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
            const musicCrash = self.sound.add('crash');
            musicCrash.play({volume:1, loop: false});
            this.secondPlayer.score = this.secondPlayer.score -50 <= 0 ? 0 : this.secondPlayer.score - 50;
            this.scoreTextPlayer2.setText('P2 score: ' + this.secondPlayer.score);
        }
        function endScene(){
            self.scene.start('endGameScene', {
                playerQuantity: self.playerQuantity,
                scorePlayer: self.player.score,
                scoreSecondPlayer: self.secondPlayer.score,
                levelName: self.levelName,
                level: self.level,
                modeName: self.modeName
            });
            /*self.time.addEvent({
                delay: 1500,
                loop: false,
                callBack: () => {
                    self.scene.start('endGameScene', {
                        playerQuantity: self.playerQuantity,
                        scorePlayer: self.player.score,
                        scoreSecondPlayer: self.secondPlayer.score,
                        levelName: self.levelName,
                        modeName: self.modeName
                    });
                }
            });*/
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

        /* MOBILE CONTROLS */
        if(screen.width <= 900){
            this.add.image(100, 450, 'controlsPlayer1').setScale(0.5);
            const leftOptionP1 = self.add.zone(15, 420, 50, 50);
            leftOptionP1.setOrigin(0);
            leftOptionP1.setInteractive();
            leftOptionP1.on('pointerdown', () => setLeftP1(true));
            leftOptionP1.on('pointerup', () => setLeftP1(false));
            leftOptionP1.on('pointerout', () => setLeftP1(false));
            //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(leftOptionP1);
            const rightOptionP1 = self.add.zone(130, 420, 50, 50);
            rightOptionP1.setOrigin(0);
            rightOptionP1.setInteractive();
            rightOptionP1.on('pointerdown', () => setRightP1(true));
            rightOptionP1.on('pointerup', () => setRightP1(false));
            rightOptionP1.on('pointerout', () => setRightP1(false));
            //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(rightOptionP1);
            const upOptionP1 = self.add.zone(75, 395, 50, 50);
            upOptionP1.setOrigin(0);
            upOptionP1.setInteractive();
            upOptionP1.on('pointerdown', () => setUpP1(true));
            upOptionP1.on('pointerup', () => setUpP1(false));
            upOptionP1.on('pointerout', () => setUpP1(false));
            //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(upOptionP1);

            if(self.playerQuantity > 1){
                this.add.image(700, 450, 'controlsPlayer2').setScale(0.5);
                const leftOptionP2 = self.add.zone(615, 420, 50, 50);
                leftOptionP2.setOrigin(0);
                leftOptionP2.setInteractive();
                leftOptionP2.on('pointerdown', () => setLeftP2(true));
                leftOptionP2.on('pointerup', () => setLeftP2(false));
                leftOptionP2.on('pointerout', () => setLeftP2(false));
                //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(leftOptionP2);
                const rightOptionP2 = self.add.zone(730, 420, 50, 50);
                rightOptionP2.setOrigin(0);
                rightOptionP2.setInteractive();
                rightOptionP2.on('pointerdown', () => setRightP2(true));
                rightOptionP2.on('pointerup', () => setRightP2(false));
                rightOptionP2.on('pointerout', () => setRightP2(false));
                //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(rightOptionP2);
                const upOptionP2 = self.add.zone(675, 395, 50, 50);
                upOptionP2.setOrigin(0);
                upOptionP2.setInteractive();
                upOptionP2.on('pointerdown', () => setUpP2(true));
                upOptionP2.on('pointerup', () => setUpP2(false));
                upOptionP2.on('pointerout', () => setUpP2(false));
                //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(upOptionP2);
            }

            function setLeftP1(status){
                self.goLeftP1 = status;
            }
            function setLeftP2(status){
                self.goLeftP2 = status;
            }
            function setRightP1(status){
                self.goRightP1 = status;
            }
            function setRightP2(status){
                self.goRightP2 = status;
            }
            function setUpP1(status){
                self.goUpP1= status;
            }
            function setUpP2(status){
                self.goUpP2 = status;
            }
        }
        /* MOBILE CONTROLS */
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
            this.time.delayedCall({
                delay: 1000,
                callback: this.refreshTime(),
                callbackScope: this
            });
        }
    }

    update(time, delta) {
        const self = this;

        if(this.playerQuantity > 1){
            this.timer += delta;
            while (this.timer > 1000) {
                this.timer -= 1000;
                this.gameTime--;

                this.timeText.setText(this.gameTime);
                if (this.gameTime === 0) {
                    this.physics.pause();
                    this.player.setTint(0xff0000);
                    this.secondPlayer.setTint(0xff0000);

                    this.time.addEvent({
                        delay: 1500,
                        loop: false,
                        callback: () => {
                            self.scene.start('endGameScene', {
                                playerQuantity: self.playerQuantity,
                                scorePlayer: self.player.score,
                                scoreSecondPlayer: self.secondPlayer.score,
                                levelName: self.levelName,
                                level: self.level,
                                modeName: self.modeName
                            });
                        }
                    });
                }
            }
        }
        let cursors = this.input.keyboard.createCursorKeys();

        if(cursors.left.isDown || this.goLeftP1){
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if(cursors.right.isDown || this.goRightP1){
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else{
            this.player.setVelocityX(0);
            this.player.anims.play('turn', true);
        }
        if((cursors.up.isDown || this.goUpP1) && this.player.body.touching.down){
            this.player.setVelocityY(-330);
        }

        if(this.playerQuantity > 1){
            let keyObjUp = this.input.keyboard.addKey('W');
            let player2Up = keyObjUp.isDown;
            let keyObjRight = this.input.keyboard.addKey('D');
            let player2Right = keyObjRight.isDown;
            let keyObjLeft = this.input.keyboard.addKey('A');
            let player2Left = keyObjLeft.isDown;

            if(player2Left || this.goLeftP2){
                this.secondPlayer.setVelocityX(-160);
                this.secondPlayer.anims.play('leftP2', true);
            }
            else if(player2Right || this.goRightP2){
                this.secondPlayer.setVelocityX(160);
                this.secondPlayer.anims.play('rightP2', true);
            }
            else{
                this.secondPlayer.setVelocityX(0);
                this.secondPlayer.anims.play('turnP2', true);
            }
            if((player2Up || this.goUpP2) && this.secondPlayer.body.touching.down){
                this.secondPlayer.setVelocityY(-330);
            }
        }
    }
};