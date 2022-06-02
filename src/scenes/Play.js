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
    this.load.image('tileImage', './assets/tempTiles.png');
    this.load.spritesheet("kenney_sheet", "./assets/tempTiles.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.tilemapTiledJSON("platform_map", "./assets/tempMap.json");    // Tiled JSON file

  }

  // Does nothing right now
  create() {
    this.launchSpeed = -530;

    const map = this.add.tilemap("platform_map");
    // add a tileset to the map
    const tileset = map.addTilesetImage("tempTiles", "tileImage");
    const wallLayer = map.createLayer("Walls", tileset, 0, 0);
    const groundLayer = map.createLayer("Ground", tileset, 0, 0);

    wallLayer.setCollisionByProperty({ 
      collides: true 
    });
    wallLayer.setDepth(1);

    groundLayer.setCollisionByProperty({ 
      collides: true 
    });

    this.spikes = map.createFromObjects("Spike", {
      name: "spike",
      key: "kenney_sheet",
      frame: 7
    });

    this.springs = map.createFromObjects("Spring", {
      name: "spring",
      key: "kenney_sheet",
      frame: 8
    })

    this.physics.world.enable(this.spikes, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.springs, Phaser.Physics.Arcade.STATIC_BODY);

    this.spikeGroup = this.add.group(this.spikes);
    this.springGroup = this.add.group(this.springs);

    
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
    keyDEBUG4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    keyDEBUG5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
    this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);


    //Add gameplay objects
    const playerSpawn = map.findObject("PlayerSpawn", obj => obj.name === "player spawn");
    this.player = new plChr(this, playerSpawn.x, playerSpawn.y, "kenney_sheet", 4);
    this.player.body.setAllowGravity(false);
    this.player.setDepth(3);

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

    // Colliders:
    // Ground and wall colliders
    this.physics.add.collider(this.player, groundLayer);

    this.wallCollider = this.physics.add.collider(this.player, wallLayer);
    this.wallCollider.active = this.player.wallsEnable;

    // Spike collider
    this.spikeCollider = this.physics.add.collider(this.player, this.spikeGroup, () => {
      if (this.player.body.blocked.down && !this.player.body.blocked.right && !this.player.body.blocked.left) {
        console.log("hit bottom");
      }
    });
    this.spikeCollider.active = this.player.spikeEnable;
    this.spikeGroup.setAlpha(0);

    // Spring Collider
    this.springCollider = this.physics.add.collider(this.player, this.springGroup, () => {
      if (this.player.body.blocked.down && !this.player.body.blocked.right && !this.player.body.blocked.left) {
        this.player.setVelocityY(this.launchSpeed);
      }
    });
    this.springCollider.active = this.player.springEnable;
    this.springGroup.setAlpha(0);
  }

  
  update() {

    if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
      this.scene.launch('pauseScene');
      this.scene.pause();
    }

  //  console.log(this.player.body.angle);

    this.player.update();

  //  if(Phaser.Input.Keyboard.JustDown(keyDEBUG2)){
 //     this.player.wallsEnable = !this.wallsEnable;
      this.wallCollider.active = this.player.wallsEnable; 
 //   }

     if (Phaser.Input.Keyboard.JustDown(keyDEBUG4)) {
      this.player.spikeEnable = !this.player.spikeEnable;

      if (this.player.spikeEnable) {
        this.spikeGroup.setAlpha(1);
       
      } else {
        this.spikeGroup.setAlpha(0);
       }
       this.spikeCollider.active = this.player.spikeEnable;
    }

    if (Phaser.Input.Keyboard.JustDown(keyDEBUG5)) {
      this.player.springEnable = !this.player.springEnable;

      if (this.player.springEnable) {
        this.springGroup.setAlpha(1);
       
      } else {
        this.springGroup.setAlpha(0);
      }
       this.springCollider.active = this.player.springEnable;
    }
  
    if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
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
}