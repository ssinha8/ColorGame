class enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction, enmType){
        super(scene, x, y, texture, frame);
        this.direction = direction;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setAccelerationY(1750);
        this.body.setMaxVelocityY(1000);
        this.speedConst = 400;
        this.accelconst = 600;
        this.behavior = enmType;
        switch(this.behavior){
            case 1: //Back and forth flying
                this.body.setAccelerationX(this.accelconst * this.direction);
            case 2: //Indefinite flying
                this.speedConst = 400;
                this.body.setAccelerationY(0);
                this.body.setMaxVelocityY(0);
                this.setVelocityY(0);
                break;
            case 3: //Vertical Flying
                this.speedConst = 400;
                this.accelconst = 400
                this.body.setAccelerationY(this.accelconst);
                this.setVelocityX(0);
                this.body.setMaxVelocityX(0);
                break;
            default:
                this.speedConst = 400;
                this.body.setAccelerationY(1750);
                this.body.setMaxVelocityY(1000);
                break;
        }
    }

    update(){
        if(this.behavior % 2 == 0){
            this.setVelocityX(speedConst * direction);
            if(this.body.blocked.left || this.body.blocked.right){
                this.direction = this.direction * -1;
            }
        }
        if (this.behavior == 1){
            if(this.body.velocity.x * this.direction >= this.speedconst){
                this.direction = this.direction * -1;
                this.body.setAccelerationX(this.accelconst * this.direction)
            }
        }
        if (this.behavior == 3){
            if(this.body.velocity.y * this.direction >= this.speedconst){
                this.direction = this.direction * -1;
                this.body.setAccelerationY(this.accelconst * this.direction)
            }
        }
    }

    reset(){
        //TODO
    }
}