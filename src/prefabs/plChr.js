class plChr extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, canWallJump){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.momentumEnable = false;
        this.gravityEnable = false;
        this.wallsEnable = false;
        this.JUMP_FORCE = 100;
        this.JUMP_X = 100;
        this.ACCELERATION = 4500;
        this.MAX_X_VEL = 1400;
        this.MAX_Y_VEL = 500;
    }


    update(){
        this.body.setVelocityX(0);

        if(keyLEFT.isDown){
            if(!keyRIGHT.isDown){
                if (!this.momentumEnable){
                    this.body.setVelocityX(-800);
                
                } else {
                 // TODO: add momentum physics
                 //   console.log(this.body.acceleration.x);

                    if (this.body.acceleration.x > 0) {
                        this.setAccelerationX(0);
                    }
                }
            }

        }else if(keyRIGHT.isDown){
            if (!this.momentumEnable) {
                this.body.setVelocityX(800);

            } else {
                // TODO: add momentum physics
                if (this.body.acceleration.x < 0) {
                    this.setAccelerationX(0);
                }
            }
        }

        if (keyJUMP.isDown) {
            if (this.body.touching.down && this.body.onFloor()) {
                this.setVelocityY(-800);

            } else if (this.body.touching.right) {
                this.setAccelerationX(-this.ACCELERATION);
                this.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
                this.setVelocityY(-this.JUMP_FORCE);
            //    this.setVelocityX(-200);
           //     this.jumpedRightSide = true;
            //    this.jumpedLeftSide = false;

            } else if (this.body.touching.left) {
                this.setAccelerationX(this.ACCELERATION);
                this.setVelocityY(-this.JUMP_FORCE);
                this.setVelocityY(-this.JUMP_FORCE);
            //    this.setVelocityX(200);
            //    this.jumpedRightSide = false;
            //    this.jumpedLeftSide = true;
            }
        
        }

        if (this.body.touching.down) {
            this.setAccelerationX(0);
            this.jumpedLeftSide = false;
            this.jumpedRightSide = false;
        }
    }



    reset(){

    }
}