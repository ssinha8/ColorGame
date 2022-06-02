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
    this.add.text((game.config.width/2) - 240, 260, "Press 1 to toggle gravity", menuStyle);
    this.add.text((game.config.width/2) - 225, 290, "Press 2 to toggle walls", menuStyle);
    this.add.text((game.config.width/2) - 248, 320, "Press 3 to toggle momentum", menuStyle);
    this.add.text((game.config.width/2) - 248, 350, "Press 4 to toggle spikes", menuStyle);
    this.add.text((game.config.width/2) - 248, 380, "Press 5 to toggle springs", menuStyle);
   }


  update() {
 //   this.scene.start('playScene');
  if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
    this.scene.start('playScene');
  }

  }
}