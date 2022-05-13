let config = {
    type: Phaser.AUTO,
    width: 960, //TODO: finalize width/height
    height: 540, // and see if we can fix the bug that doubles the size
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 200},
            debug: true
        }
    },
    scene: [Menu, Play] // Shop scene has been scrapped due to lack of time.
}

let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyCONFIRM, keyJUMP, keyCANCEL, keyPAUSE;
let game = new Phaser.Game(config);