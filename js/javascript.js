import { MainScene } from './scenes/main.scene.js';
import { Menu } from "./scenes/menu.js";
import { Level } from "./scenes/level.js";
import { ModeGame } from "./scenes/mode.game.js";
import { Controls } from "./scenes/controls.js";
import { EndGame } from "./scenes/end.game.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 530,
    scene: [MainScene, Menu, Level, ModeGame, Controls, EndGame],
    scale: {
        mode: Phaser.Scale.FIT
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                y: 300,
            },
        },
    },
}

new Phaser.Game(config);