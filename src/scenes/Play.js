class Play extends Phaser.Scene {
  constructor() {
      super("playScene");
  }

  // Eventually load sprites and spritesheets (animation)
  preload() {
    this.load.image('smoke', './assets/wisp4.png');
    this.load.image('tileImage', './assets/tempTiles.png');
    this.load.image('groundTile', './assets/48x48box.png');
    this.load.image('smallTile', './assets/48x48.png');
    this.load.image('springTile', './assets/SpringFrames.png');
    this.load.image('playerTiles', './assets/TurnArounds.png');

    // Audio
    this.load.audio('bgMusic', './assets/sound1.wav');
  //  this.load.image('background', './assets/bg.jpg');

    this.load.spritesheet("Bg", "./assets/bg.jpg", {
      frameWidth: 1920,
      frameHeight: 1280
    });

    this.load.spritesheet("spikes", "./assets/spikes.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("playerAnims", "./assets/TurnArounds.png", {
      frameWidth: 48,
      frameHeight: 64
    });

    this.load.spritesheet("kenney_sheet", "./assets/tempTiles.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("kenney_sheet2", "./assets/48x48box.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("kenney_sheet3", "./assets/SpringFrames.png", {
      frameWidth: 48,
      frameHeight: 48
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
    this.bgMusic = this.sound.add('bgMusic', {loop: true});
    this.bgMusic.play();

    this.launchSpeed = -800;

    const map = this.add.tilemap("platform_map");
    // add a tileset to the map
  //  const tileset = map.addTilesetImage("tempTiles", "tileImage");
    const groundTileset = map.addTilesetImage("48x48box", "groundTile");
    const smallTileset = map.addTilesetImage("48x48", "smallTile");
 //   const bg = map.addTilesetImage("bg", "background");
    const wallLayer = map.createLayer("Walls", smallTileset, 0, 0);
    const groundLayer = map.createLayer("Ground", [groundTileset, smallTileset], 0, 0);

    wallLayer.setCollisionByProperty({ 
      collides: true 
    });
    wallLayer.setDepth(2);

    groundLayer.setCollisionByProperty({ 
      collides: true 
    });
    groundLayer.setDepth(1);

    const bg = map.createFromObjects("bg", {
      name: "background",
      key: "Bg",
      frame: 0
    });

    this.spikes = map.createFromObjects("Spike", {
      name: "spike",
      key: "spikes",
      frame: 0
    });

    this.springs = map.createFromObjects("Spring", {
      name: "spring",
      key: "kenney_sheet3",
      frame: 0
    });

    this.gravAltar = map.createFromObjects("GravAltar", {
      name: "gravAltar",
      key: "altars",
      frame: 0
    });

    this.gravAltarOn = map.createFromObjects("GravOn", {
      name: "gravOn",
      key: "altars",
      frame: 1
    });

    this.wallAltar = map.createFromObjects("WallAltar", {
      name: "wallAltar",
      key: "altars",
      frame: 0
    });

    this.wallAltarOn = map.createFromObjects("WallOn", {
      name: "wallOn",
      key: "altars",
      frame: 1
    });

    this.enemyAltar = map.createFromObjects("EnemyAltar", {
      name: "enemyAltar",
      key: "altars",
      frame: 0
    });

    this.enemyAltarOn = map.createFromObjects("EnemyOn", {
      name: "enemyOn",
      key: "altars",
      frame: 1
    });

    this.momAltar = map.createFromObjects("MomAltar", {
      name: "momAltar",
      key: "altars",
      frame: 0
    });

    this.momAltarOn = map.createFromObjects("MomOn", {
      name: "momOn",
      key: "altars",
      frame: 1
    });

    this.springAltar = map.createFromObjects("SpringAltar", {
      name: "springAltar",
      key: "altars",
      frame: 0
    });

    this.springAltarOn = map.createFromObjects("SpringOn", {
      name: "springOn",
      key: "altars",
      frame: 1
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

    this.physics.world.enable(this.spikes, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.springs, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.gravAltarOn, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.wallAltarOn, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.enemyAltarOn, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.momAltarOn, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.springAltarOn, Phaser.Physics.Arcade.STATIC_BODY);

    this.physics.world.enable(this.gravAltar, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.wallAltar, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.enemyAltar, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.momAltar, Phaser.Physics.Arcade.STATIC_BODY);
    this.physics.world.enable(this.springAltar, Phaser.Physics.Arcade.STATIC_BODY);

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
    this.player = new plChr(this, playerSpawn.x, playerSpawn.y, "playerAnims", 2);
    this.player.body.setAllowGravity(false);
    this.player.setDepth(3);


    this.enemy1 = new enemy(this, 650, 200, 'kenney_sheet', 4, 1, 2);

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


    // Animations

    // Player Animations
    this.anims.create({
      key: 'jump_idle',
      defaultTextureKey: 'playerAnims',
      frames: [
        {frame: 2},
      ],
      repeat: -1
    });

    this.anims.create({
      key: 'walk_left',
      defaultTextureKey: 'playerAnims',
      frames: [
        {frame: 0},
        {frame: 1},
      ],
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walk_right',
      defaultTextureKey: 'playerAnims',
      frames: [
        {frame: 3},
        {frame: 4},
      ],
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'jump_up',
      defaultTextureKey: 'playerAnims',
      frames: [
        {frame: 5},
      ],
    //  frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'jump_down',
      defaultTextureKey: 'playerAnims',
      frames: [
        {frame: 6},
      ],
      repeat: -1
    });

    this.anims.create({
      key: 'turn_left',
      defaultTextureKey: 'playerAnims',
      frames: [
        {frame: 4},
        {frame: 3},
        {frame: 2},
        {frame: 1},
        {frame: 0},
      ],
    });

    this.anims.create({
      key: 'turn_right',
      defaultTextureKey: 'playerAnims',
      frames: [
        {frame: 0},
        {frame: 1},
        {frame: 2},
        {frame: 3},
        {frame: 4},
      ],
    });

    this.player.anims.play('jump_idle');

    // Spring Animation
    this.anims.create({
      key: 'bounce',
      defaultTextureKey: 'kenney_sheet3',
      frames: [
        {frame: 0},
        {frame: 1},
        {frame: 2},
        {frame: 3},
      ],
    });

    // Colliders:
    // Ground and wall colliders
    this.physics.add.collider(this.player, groundLayer, () => {
      if (this.player.body.onWall()) {
        this.player.touchGroundWall = true;
      }
    });

    // Enemy collisions
    this.enemyCollider = this.physics.add.collider(this.player, this.enemy1, () => {
      if (this.activeRespawn == null) {
        this.player.setPosition(playerSpawn.x, playerSpawn.y);

      } else {
        this.player.setPosition(this.activeRespawn.x, this.activeRespawn.y);
      }
    });
    this.enemyCollider.active = false;

    this.physics.add.collider(this.enemy1, wallLayer); 
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
        if (this.activeRespawn == null) {
          this.player.setPosition(playerSpawn.x, playerSpawn.y);

        } else {
          this.player.setPosition(this.activeRespawn.x, this.activeRespawn.y);
        }
      }
    });

    // Spring Collider
    this.springCollider = this.physics.add.collider(this.player, this.springGroup, (player, spring) => {
      
      if (this.player.body.blocked.down && !this.player.body.blocked.right && !this.player.body.blocked.left) {
        spring.anims.play('bounce');
        this.player.setVelocityY(this.launchSpeed);
      }
    });
    this.springCollider.active = this.player.springEnable;

    // Respawn colliders
    this.physics.add.overlap(this.player, this.gravAltarOn, (player, respawn) => {
      this.activeRespawn = respawn;

      if (this.gravAltar[0].active) {
        this.player.gravityEnable = true;
        this.gravAltar[0].destroy();
        this.gravPowerup[0].destroy();
      }
    });

    this.physics.add.overlap(this.player, this.wallAltarOn, (player, respawn) => {
      this.activeRespawn = respawn;

      if (this.wallAltar[0].active) {
        this.player.gravityEnable = true;
        this.player.wallsEnable = true;
        this.wallCollider.active = true;
        this.wallAltar[0].destroy();
        this.wallPowerup[0].destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemyAltarOn, (player, respawn) => {
      this.activeRespawn = respawn;

      if (this.enemyAltar[0].active) {
        this.enemyCollider.active = true;
        this.player.enemyEnable = true;
        this.enemyAltar[0].destroy();
        this.enemyPowerup[0].destroy();
      }
    });
    
    this.physics.add.overlap(this.player, this.momAltarOn, (player, respawn) => {
      this.activeRespawn = respawn;

      if (this.momAltar[0].active) {
        this.player.momentumEnable = true;
        this.momAltar[0].destroy();
        this.momentumPowerup[0].destroy();
      }
    });

    this.physics.add.overlap(this.player, this.springAltarOn, (player, respawn) => {
      this.activeRespawn = respawn;

      if (this.springAltar[0].active) {
        this.player.springEnable = true;
        this.springCollider.active = true;
        this.springAltar[0].destroy();
        this.springPowerup[0].destroy();
      }
    });

    this.cameras.main.startFollow(this.player);
  }

  
  update() {

    if (this.player.momentumEnable && this.player.gravityEnable &&
        this.player.wallsEnable && this.player.enemyEnable && this.player.springEnable) {
          this.scene.start('endScene');
        }

    if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
      this.scene.launch('pauseScene');
      this.scene.pause();
    }

  //  console.log(this.player.body.angle);

    this.player.update();

    // PLayer movement animations
    if (keyLEFT.isDown) {
      if (this.player.body.velocity.x > 0) {
        this.player.play('turn_left', true);

      }
      this.player.play('walk_left', true);
    
    } else if (keyRIGHT.isDown) {
    //  console.log(this.player.body.velocity);
      if (this.player.body.velocity.x < 0) {
        this.player.play('turn_right', true);

      }
      this.player.play('walk_right', true);
    
    }

    if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0) {
      this.player.play('jump_idle', true);
    
    } else if (this.player.body.velocity.x == 0) {
      if (this.player.body.velocity.y > 0) {
        this.player.play('jump_down', true);

      } else {
        this.player.play('jump_up', true);
      }
    }

    this.enemy1.update();
  
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