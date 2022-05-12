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

    //Set up keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);


    //Add gameplay objects
    this.player = new plChr(this, 300, 300, 'placeholder', 0);
    this.wallGroup = this.add.group();

    // Add each wall into the group (for now I just have one):
    this.wall = new Wall(this, 400, 300, 'placeholder', 0);
    this.wall.body.immovable = true;
    this.wallGroup.add(this.wall);

    // Physics collider
  //  this.physics.add.overlap(this.player, this.wall, this.hitWall, null, this);
    this.wallCollider = this.physics.add.collider(this.player, this.wallGroup);
    this.wallCollider.active = this.wall.canWallCollide;

  }

  
  update() {
    this.player.update();
  }

  hitWall() {

  }
}