class plChr extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }


    update(){
        this.body.setVelocityX(0)
        if(keyLEFT.isDown){
            if(!(keyRIGHT.isDown)){
                this.body.setVelocityX(-800);
            }
        }else if(keyRIGHT.isDown){
            this.body.setVelocityX(800);
        }
    }


    reset(){

    }
}