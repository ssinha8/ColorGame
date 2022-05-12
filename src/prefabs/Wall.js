class Wall extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture, frame){
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);

      // Boolean to determine wether the wall has collision enabled
      this.canWallCollide = false;
  }


  update(){

  }


  reset(){

  }

}