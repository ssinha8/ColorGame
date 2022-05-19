class plChr extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.momentumEnable = false;
        this.gravityEnable = false;
        this.wallsEnable = false;
        this.FLATMOVESPEED = 400;
        this.JUMP_FORCE = 400;
        this.ACCELERATION = 1000;
        this.TURNAROUNDACCEL_GROUND = 1400;
        this.TURNAROUNDACCEL_AIR = 800;
        this.STAGE1_ACCELTHRESHOLD = 300;
        this.STAGE1_ACCELFORCE = 1000;
        this.STAGE2_ACCELTHRESHOLD = 400;
        this.STAGE2_ACCELFORCE = 200;
        this.MAXMOMENTUM = 600;
        this.STAGE3_ACCELFORCE = 125;
        this.lockoutTime = 15;
        this.leftLock = 0;
        this.rightLock = 0;
        this.body.setMaxVelocityX(this.MAXMOMENTUM);
    }


    update(){
        if(Phaser.Input.Keyboard.JustDown(keyDEBUG1)){
            this.gravityEnable = !this.gravityEnable;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDEBUG2)){
            this.wallsEnable = !this.wallsEnable;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDEBUG3)){
            this.momentumEnable = !this.momentumEnable;
        }
        if(this.leftLock == 0 && this.rightLock == 0 && !this.momentumEnable){
            this.body.setVelocityX(0);
        }
        if (this.leftLock > 0){
            this.leftLock -= 1;
        }
        if (this.rightLock > 0){
            this.rightLock -= 1;
        }
        if(keyLEFT.isDown && this.leftLock == 0 && !keyRIGHT.isDown){
            
            if (!this.momentumEnable){
                this.body.setVelocityX(-this.FLATMOVESPEED);
            
            } else {
                this.body.setAllowDrag(false);
                if(this.body.velocity.x >= 0){
                    this.body.setAccelerationX(-this.TURNAROUNDACCEL_GROUND);
                }
                else if(this.body.velocity.x >= -this.STAGE1_ACCELTHRESHOLD){
                    this.body.setAccelerationX(-this.STAGE1_ACCELFORCE);
                }
                else if (this.body.velocity.x >= -this.STAGE2_ACCELTHRESHOLD){
                    this.body.setAccelerationX(-this.STAGE2_ACCELFORCE);
                }
                else{
                    this.body.setAccelerationX(-this.STAGE3_ACCELFORCE);
                }
            }
        }else if(keyRIGHT.isDown && this.rightLock == 0 && !keyLEFT.isDown){
            if (!this.momentumEnable) {
                this.body.setVelocityX(this.FLATMOVESPEED);

            } else {
                this.body.setAllowDrag(false);
                if(this.body.velocity.x <= 0){
                    this.body.setAccelerationX(this.TURNAROUNDACCEL_GROUND);
                }
                else if(this.body.velocity.x <= this.STAGE1_ACCELTHRESHOLD){
                    this.body.setAccelerationX(this.STAGE1_ACCELFORCE);
                }
                else if (this.body.velocity.x <= -this.STAGE2_ACCELTHRESHOLD){
                    this.body.setAccelerationX(this.STAGE2_ACCELFORCE);
                }
                else{
                    this.body.setAccelerationX(this.STAGE3_ACCELFORCE);
                }
            }
        }else{
            if(this.momentumEnable){
                this.body.setDragX(800);
                this.body.setAllowDrag(true);
                this.body.setAccelerationX(0);
            }
        }



        if (!this.momentumEnable) {
            this.body.setAccelerationX(0);
            this.body.setDragX(0);
            this.body.setAllowDrag(false);
        }
        if (this.gravityEnable){
            this.setAccelerationY(800)
        }
        else{
            this.setAccelerationY(0);
            this.setVelocityY(0);
        }


        if (this.body.touching.down && this.body.onFloor()) {
            this.setVelocityY(0);
        }

        if (keyJUMP.isDown) {
            if (this.body.touching.down && this.body.onFloor()) {
                this.setVelocityY(-this.JUMP_FORCE);

            } else if (this.body.touching.right) {
                this.setVelocityX (-this.FLATMOVESPEED);
                this.setVelocityY(-this.JUMP_FORCE);
                if(!this.momentumEnable){
                    this.rightLock = this.lockoutTime;
                }
            } else if (this.body.touching.left) {
                this.setVelocityX (this.FLATMOVESPEED);
                this.setVelocityY(-this.JUMP_FORCE);
                if (!this.momentumEnable){
                    this.leftLock = this.lockoutTime;
                }
            }
        
        }
    }



    reset(){

    }
}