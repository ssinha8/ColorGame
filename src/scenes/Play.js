class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  // Eventually load sprites and spritesheets (animation)
  preload() {
    this.load.image('placeholder', './assets/placeholder.png');

  }

  // Does nothing right now
  create() {
    this.player = new plChr(this, 300, 300, 'placeholder', 0);
  }

  
  update() {
  }
}