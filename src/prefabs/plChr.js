class plChr extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, canWallJump){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.momentumEnable = false;
        this.gravityEnable = false;
        this.wallsEnable = false;
        this.JUMP_FORCE = 800;
        this.ACCELERATION = 4500;
        this.MAX_X_VEL = 1400;
        this.leftLock = 0;
        this.rightLock = 0;
    }


    update(){
        if(this.leftLock == 0 && this.rightLock == 0){
            this.body.setVelocityX(0);
        }
        if (this.leftLock > 0){
            this.leftLock -= 1;
        }
        if (this.rightLock > 0){
            this.rightLock -= 1;
        }
        if(keyLEFT.isDown && this.leftLock == 0){
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

        }else if(keyRIGHT.isDown && this.rightLock == 0){
            if (!this.momentumEnable) {
                this.body.setVelocityX(800);

            } else {
                // TODO: add momentum physics
                if (this.body.acceleration.x < 0) {
                    this.setAccelerationX(0);
                }
            }
        }

        if (this.gravityEnable){
            this.setAccelerationY(800)
        }
        else{
            this.setAccelerationY(0);
            this.setVelocityY(0);
        }


        if (this.body.touching.down) {
            this.setVelocityY(0);
        }

        if (keyJUMP.isDown) {
            if (this.body.touching.down && this.body.onFloor()) {
                this.setVelocityY(-this.JUMP_FORCE);

            } else if (this.body.touching.right) {
                this.setVelocityX (-800);
                this.setVelocityY(-this.JUMP_FORCE);
                if(!this.momentumEnable){
                    this.rightLock = 15;
                }
            //    this.setVelocityX(-200);
           //     this.jumpedRightSide = true;
            //    this.jumpedLeftSide = false;

            } else if (this.body.touching.left) {
                this.setVelocityX (800);
                this.setVelocityY(-this.JUMP_FORCE);
                if (!this.momentumEnable){
                    this.leftLock = 15;
                }
            //    this.setVelocityX(200);
            //    this.jumpedRightSide = false;
            //    this.jumpedLeftSide = true;
            }
        
        }
    }



    reset(){

    }
}