class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  // Eventually load sprites and spritesheets (animation)
  preload() {
    this.load.image('smoke', './assets/wisp4.png');
    this.load.image('tileImage', './assets/tempTiles.png');
    this.load.spritesheet("kenney_sheet", "./assets/tempTiles.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("wall_sheet", "./assets/wallpowerup.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("spring_sheet", "./assets/Springpowerup.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("gravity_sheet", "./assets/Gravity.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("enemy_sheet", "./assets/Enemypowerup.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("mom_sheet", "./assets/MomentumPowerup.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("altars", "./assets/RespawnImgSet.png", {
      frameWidth: 449,
      frameHeight: 355
    });
    this.load.tilemapTiledJSON("platform_map", "./assets/map.json");    // Tiled JSON file

  }


  create() {

    this.cameras.main.setBounds(0, 0, 960 * 6, 544 * 5);
    this.activeRespawn = null;
    this.altars = this.add.container();

    this.launchSpeed = -800;

    const map = this.add.tilemap("platform_map");
    // add a tileset to the map
    const tileset = map.addTilesetImage("tempTiles", "tileImage");
    const wallLayer = map.createLayer("Walls", tileset, 0, 0);
    const groundLayer = map.createLayer("Ground", tileset, 0, 0);
 //   const respawnNotActive = map.createLayer("Respawn", tileset, 0, 0);
 //   const test = map.cre

    wallLayer.setCollisionByProperty({ 
      collides: true 
    });
    wallLayer.setDepth(1);

    groundLayer.setCollisionByProperty({ 
      collides: true 
    });

  /*  respawnNotActive.setCollisionByProperty({
      collides: true
    });

    respawnNotActive.setDepth(1);
*/
    this.spikes = map.createFromObjects("Spike", {
      name: "spike",
      key: "kenney_sheet",
      frame: 7
    });

    this.springs = map.createFromObjects("Spring", {
      name: "spring",
      key: "kenney_sheet",
      frame: 6
    });

    this.gravAltar = map.createFromObjects("GravAltar", {
      name: "gravAltar",
      key: "altars",
      frame: 0
    });

    this.wallAltar = map.createFromObjects("WallAltar", {
      name: "wallAltar",
      key: "altars",
      frame: 0
    });

    this.enemyAltar = map.createFromObjects("EnemyAltar", {
      name: "enemyAltar",
      key: "altars",
      frame: 0
    });

    this.momAltar = map.createFromObjects("MomAltar", {
      name: "momAltar",
      key: "altars",
      frame: 0
    });

    this.springAltar = map.createFromObjects("SpringAltar", {
      name: "springAltar",
      key: "altars",
      frame: 0
    });

    this.gravPowerup = map.createFromObjects("GravAltar", {
      name: "gravPowerup",
      key: "gravity_sheet",
      frame: 0
    });

    this.wallPowerup = map.createFromObjects("WallAltar", {
      name: "wallPowerup",
      key: "wall_sheet",
      frame: 0
    });

    this.enemyPowerup = map.createFromObjects("EnemyAltar", {
      name: "enemyPowerup",
      key: "enemy_sheet",
      frame: 0
    });

    this.momentumPowerup = map.createFromObjects("MomAltar", {
      name: "momPowerup",
      key: "mom_sheet",
      frame: 0
    });

    this.springPowerup = map.createFromObjects("SpringAltar", {
      name: "springPowerup",
      key: "spring_sheet",
      frame: 0
    });
 /*   this.respawnNotActive = map.createFromObjects("EnemyAltar", {
      name: "test",
      key: "test1",
    //  frame: 1
    });
*/
 /*   this.altars = map.getObjectLayer("Respawn");
    this.altars.objects.forEach(object => { 
      console.log(object);
    */

    this.physics.world.enable(this.spikes, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.springs, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.gravAltar, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.wallAltar, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.enemyAltar, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.momAltar, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.springAltar, Phaser.Physics.Arcade.STATIC_BODY);

    this.spikeGroup = this.add.group(this.spikes);
    this.springGroup = this.add.group(this.springs);

  /*  console.log(this.springAltar);
    console.log(this.springAltar);
    console.log(this.springAltar);
    console.log(this.springAltar);
    console.log(this.springAltar);

    this.springAltarGroup = this.group.add(this.springAltar);
    this.gravAltarGroup = this.group.add(this.gravAltar);
    this.enemyAltar = this.group.add(this.enemyAltar);
    this.wallAltar = this.group.add(this.wallAltar);
    this.momAltarGroup = this.group.add(this.momAltar);*/

 //   this.altars.add(this.gravAltar);
  //  this.altars.add(this.wallAltar);

    
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


    this.enemy1 = new enemy(this, 650, 200, 'kenney_sheet', 4, 1, 3);

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
    this.physics.add.collider(this.player, groundLayer, () => {
      if (this.player.body.onWall()) {
      //  console.log(this.player.body.onWall());
        this.player.touchGroundWall = true;
      }
    });
    
    this.physics.add.collider(this.enemy1, groundLayer, () => {

    });

    this.wallCollider = this.physics.add.collider(this.player, wallLayer, () => {
      if (this.player.body.onWall()) {
      //  console.log(this.player.body.onWall());
        this.player.touchGroundWall = false;
      }
    });
    this.wallCollider.active = this.player.wallsEnable;

    // Spike collider
    this.spikeCollider = this.physics.add.collider(this.player, this.spikeGroup, () => {
      if (this.player.body.blocked.down && !this.player.body.blocked.right && !this.player.body.blocked.left) {
        console.log("hit bottom");
        if (this.activeRespawn == null) {
          this.player.setPosition(playerSpawn.x, playerSpawn.y);

        } else {
          this.player.setPosition(this.activeRespawn.x, this.activeRespawn.y);
        }
      }
    });
    this.spikeCollider.active = this.player.spikeEnable;
    //this.spikeGroup.setAlpha(0);

    // Spring Collider
    this.springCollider = this.physics.add.collider(this.player, this.springGroup, () => {
      if (this.player.body.blocked.down && !this.player.body.blocked.right && !this.player.body.blocked.left) {
        this.player.setVelocityY(this.launchSpeed);
      }
    });
    this.springCollider.active = this.player.springEnable;
    //this.springGroup.setAlpha(0);

    // Respawn colliders
    this.physics.add.overlap(this.player, this.gravAltar, (player, respawn) => {
      this.activeRespawn = respawn;
      console.log(respawn.x, respawn.y);
    });

    this.physics.add.overlap(this.player, this.wallAltar, (player, respawn) => {
      this.activeRespawn = respawn;
      console.log(respawn.x, respawn.y);
    });

    this.physics.add.overlap(this.player, this.enemyAltar, (player, respawn) => {
      this.activeRespawn = respawn;
      console.log(respawn.x, respawn.y);
    });
    
    this.physics.add.overlap(this.player, this.momAltar, (player, respawn) => {
      this.activeRespawn = respawn;
      console.log(respawn.x, respawn.y);
    });

    this.physics.add.overlap(this.player, this.springAltar, (player, respawn) => {
      this.activeRespawn = respawn;
      console.log(respawn.x, respawn.y);
    });

    this.cameras.main.startFollow(this.player);
  }

  
  update() {

    if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
      this.scene.launch('pauseScene');
      this.scene.pause();
    }

  //  console.log(this.player.body.angle);

    this.player.update();
    this.enemy1.update();

  //  if(Phaser.Input.Keyboard.JustDown(keyDEBUG2)){
 //     this.player.wallsEnable = !this.wallsEnable;
      this.wallCollider.active = this.player.wallsEnable; 
 //   }

     if (Phaser.Input.Keyboard.JustDown(keyDEBUG4)) {
      this.player.spikeEnable = !this.player.spikeEnable;

    /*  if (this.player.spikeEnable) {
        this.spikeGroup.setAlpha(1);
       
      } else {
        this.spikeGroup.setAlpha(0);
       }
    */
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