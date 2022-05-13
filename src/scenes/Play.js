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
    // Boolean checks for game mechanics
    this.playerGravity = false;

    //Set up keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


    //Add gameplay objects
    // I set all game object's gravity to false for testing
    this.player = new plChr(this, 300, 300, 'placeholder', 0);
    this.player.body.setAllowGravity(false);
    this.wallGroup = this.add.group();

    // Powerup objects
    this.powerupGravity = new Powerup(this, 500, 300, 'placeholder', 0); // Powerup for gravity
    this.powerupGravity.body.setAllowGravity(false);
    this.powerupWall = new Powerup(this, 700, 300, 'placeholder', 0); // Powerup for walls
    this.powerupWall.body.setAllowGravity(false);

    // Add each wall into the group (for now I just have one):
    this.wall = new Wall(this, 400, 300, 'placeholder', 0);
    this.wall.body.immovable = true;
    this.wallGroup.add(this.wall);

    // For testing purposes
    this.wall.body.setAllowGravity(false);

    // Physics collider
    this.wallCollider = this.physics.add.collider(this.player, this.wallGroup);
    this.wallCollider.active = this.wall.canWallCollide;

   // Line to enable/disable collision on walls. Have to press enter button or else it triggers constantly
    this.physics.add.overlap(this.player, this.powerupWall, ()=>{this.setCollision('wall', this.wallCollider)}, null, this);

    // Line to enable/disable gravity
    this.physics.add.overlap(this.player, this.powerupGravity, ()=>{this.setCollision('gravity')}, null, this);
  }

  
  update() {
    this.player.update();
  }


  setCollision(type, collider) {
    if (Phaser.Input.Keyboard.JustDown(this.keyENTER)) {

      switch (type) {
        case 'gravity':
          this.playerGravity = true;
          this.player.body.setAllowGravity(this.playerGravity);
          break;
      
        default:
          collider.active = !collider.active;
          break;
      }
    }
  }

  /*
  setCollider(collider) {
    if (Phaser.Input.Keyboard.JustDown(this.keyENTER)) {
      collider.active = !collider.active;
    }
  }

  setPlayerGravity() {
    if (Phaser.Input.Keyboard.JustDown(this.keyENTER)) {
    //  console.log('test');
      this.playerGravity = true;
      this.player.body.setAllowGravity(this.playerGravity);
    }
  }
*/
}