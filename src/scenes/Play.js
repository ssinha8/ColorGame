class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  // Eventually load sprites and spritesheets (animation)
  preload() {
    this.load.image('placeholder', './assets/placeholder.png');
    this.load.image('gravity', './assets/gravity.png');
    this.load.image('wallPowerup', './assets/wallPowerup.png');
    this.load.image('wall', './assets/wall.png');
    this.load.image('smoke', './assets/wisp4.png');

  }

  // Does nothing right now
  create() {
    // Boolean checks for game mechanics
    this.playerGravity = false;
    this.particleOn = false;

    //Set up keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDEBUG1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    keyDEBUG2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    keyDEBUG3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);


    //Add gameplay objects
    // I set all game object's gravity to false for testing
    this.player = new plChr(this, 300, 300, 'placeholder', 0);
    //this.player.body.setAllowGravity(false);
    this.wallGroup = this.add.group();
    this.floorGroup = this.add.group();
    this.player.body.setAllowGravity(false);

    // Floor at bottom
    for (let i = 0; i < game.config.width; i+= 30) {
      let groundTile = this.physics.add.sprite(i, game.config.height - 30, 'placeholder').setOrigin(0);
      groundTile.body.setAllowGravity(false);
      groundTile.body.immovable = true;
      this.floorGroup.add(groundTile);
    }

    // Powerup objects
    /*this.powerupGravity = new Powerup(this, 500, 300, 'gravity', 0); // Powerup for gravity
    this.powerupGravity.body.setAllowGravity(false);
    this.powerupWall = new Powerup(this, 700, 300, 'wallPowerup', 0); // Powerup for walls
    this.powerupWall.body.setAllowGravity(false);*/

    // Add each wall into the group (for now I just have one):
    this.wall = new Wall(this, 400, 300, 'wall', 0);
   // console.log(this.wall.body.checkCollision);
    this.wall.body.immovable = true;
    this.wallGroup.add(this.wall);

    // Walls on floor to test wall jumping
    for (let i = 490; i > 380; i -= 30) {
      let wall = new Wall(this, 460, i, 'wall');
      let wall2 = new Wall(this, 600, i, 'wall');
      
      wall.body.immovable = true;
      wall2.body.immovable = true;

      if (i == 400) {
        wall.body.checkCollision.up = true;
      
      } else {
        wall.body.checkCollision.up = false;
        wall.body.checkCollision.down = false;
        wall2.body.checkCollision.up = false;
        wall2.body.checkCollision.down = false;
      }

      wall.body.setAllowGravity(false);
      wall2.body.setAllowGravity(false);
      this.wallGroup.add(wall);
      this.wallGroup.add(wall2);
    }

    this.particles = this.add.particles('smoke');
    console.log(this.particles);

    this.emitter = this.particles.createEmitter({
      speed: 50,
      gravity: {x: 200, y: 200},
      alpha: 0.1,
   //   angle: this.player.body.angle,,
  // scaleY: .12,
      scale: {start: .09, end: .05},
    //  scaleX: .08,
      lifespan: 300,
      on: false,
      follow: this.player
    });

    console.log(this.emitter.width);
   // this.emitter.flow(1000);

    // For testing purposes
    this.wall.body.setAllowGravity(false);

    // Physics collider
    this.physics.add.collider(this.player, this.floorGroup);
    this.wallCollider = this.physics.add.collider(this.player, this.wallGroup);
    this.wallCollider.active = this.player.wallsEnable;

   // Line to enable/disable collision on walls. Have to press enter button or else it triggers constantly
    this.physics.add.overlap(this.player, this.powerupWall, ()=>{this.setCollision('wall', this.wallCollider)}, null, this);

    // Line to enable/disable gravity
    this.physics.add.overlap(this.player, this.powerupGravity, ()=>{this.setCollision('gravity')}, null, this);
  }

  
  update() {

    if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
      this.scene.launch('pauseScene');
      this.scene.pause();
    }

  //  console.log(this.player.body.angle);

    this.player.update();
    this.wallCollider.active = this.player.wallsEnable;
  
    if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
   //   this.emitter.start();
      if (!this.particleOn) {
        this.particleOn = true;
        this.emitter.flow(70, 3);
      }

      if (this.particleOn) {
        this.emitter.setAngle(180);
      }

    } else {
      this.emitter.stop();
      this.particleOn = false;
    }
  }


  setCollision(type, collider) {
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