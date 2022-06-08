class enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction){
        super(scene, x, y, texture, frame);
        this.direction = direction;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setAccelerationY(1750);
        this.body.setMaxVelocityY(1000);
        this.speedConst = 400;
    }

    update(){
        this.body.setVelocityX(speedConst * direction);
    }

    reset(){
        //TODO
    }
}