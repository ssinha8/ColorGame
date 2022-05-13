class Powerup extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture, frame){
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);
  }

  create() {
    this.keyENTER = Phaser.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  update(){

  }


  reset(){

  }

/*  setCollider(collider) {
    console.log('test');
    console.log(Phaser.Input.Keyboard.JustDown(this.keyENTER));

    if (Phaser.Input.Keyboard.JustDown(this.keyENTER)) {
      collider.active = !collider.active;
    }
  }
*/
}