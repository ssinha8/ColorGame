class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    preload() {
        this.load.image('win', './assets/winscreen.png');
    }

    create() {
        const win = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'win').setOrigin(0,0);
        win.setScaleX(0.5);
        win.setScaleY(544/1280);
    }
}