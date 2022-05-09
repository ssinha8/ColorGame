//TODO: add basic scene functionality
class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }

  create() {

    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

  //  game.physics.startSystem(Phaser.Physics.ARCADE);
  
    // style for menu options
    let menuStyle = {
      fontFamily: 'Courier',
      fontSize: '30px',
      color: '#FFFFFF',
      align: 'center',
    }

    const play = this.add.text((game.config.width/2)-80, 230, "Play (P)", menuStyle);
    play.setInteractive();
    play.on('pointerdown', () => {this.scene.start('playScene')});
   }


  update() {
 //   this.scene.start('playScene');
  if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
    this.scene.start('playScene');
  }

  }
}