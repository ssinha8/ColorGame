let config = {
    type: Phaser.AUTO,
    width: 960, //TODO: finalize width/height (width: 60 tiles, height: 34)
    height: 544, // and see if we can fix the bug that doubles the size
 /*   fps: {
        target: 60, 
        forceSetTimeOut: true
        }, */
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 200},
            debug: true
        }
    },
    scene: [Menu, Pause, Play, End]
}

let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyCONFIRM, keyJUMP, keyCANCEL, keyPAUSE, keySPACE, keyDEBUG1, keyDEBUG2, keyDEBUG3, keyDEBUG4, keyDEBUG5;
let game = new Phaser.Game(config);