class enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction, enmType){
        super(scene, x, y, texture, frame);
        this.direction = direction;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setAccelerationY(1750);
        this.body.setMaxVelocityY(1000);
        this.speedConst = 200;
        this.accelconst = 150;
        this.behavior = enmType;
        switch(this.behavior){
            case 1: //Back and forth flying
                this.body.setAccelerationX(this.accelconst * this.direction);
            case 2: //Indefinite flying
                this.speedConst = 200;
                this.body.setAccelerationY(0);
                this.body.setMaxVelocityY(0);
                this.setVelocityY(0);
                break;
            case 3: //Vertical Flying
                this.speedConst = 50;
                this.accelconst = 100;
                this.body.setAccelerationY(this.accelconst * this.direction);
                this.body.setVelocityX(0);
                break;
            default:
                this.speedConst = 200;
                this.body.setAccelerationY(1750);
                this.body.setMaxVelocityY(1000);
                break;
        }
    }

    update(){
        if((this.behavior % 2) == 0){
            this.body.setVelocityX(this.speedConst * this.direction);
            if(this.body.blocked.right){
                this.direction = -1;
            }
            else if (this.body.blocked.left){
                this.direction = 1;
            }
        }
        if (this.behavior == 1){
            if(this.body.velocity.x * this.direction >= this.speedConst){
                this.direction = this.direction * -1;
                this.body.setAccelerationX(this.accelconst * this.direction)
            }
        }
        if (this.behavior == 3){
            if(this.body.velocity.y * this.direction >= this.speedConst){
                this.direction = this.direction * -1;
                this.body.setAccelerationY(this.accelconst * this.direction)
            }
        }
    }

    reset(){
        //TODO
    }
}