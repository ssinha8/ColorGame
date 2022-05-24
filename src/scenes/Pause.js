//TODO: add basic scene functionality
class Pause extends Phaser.Scene {
    constructor() {
        super("pauseScene");
    }
  
    create() {

      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.selectedIndex = 0;
  
    
      // style for menu options
      let menuStyle = {
        fontFamily: 'Courier',
        fontSize: '30px',
        color: '#FFFFFF',
        align: 'center',
      }
  
      var resume = this.add.text((game.config.width/2)-80, 230, "Resume", menuStyle).setOrigin(0, 0.5);
      var checkpt = this.add.text((game.config.width/2)-80, 300, "Return to Last Checkpoint", menuStyle).setOrigin(0, 0.5);
      var main = this.add.text((game.config.width/2)-80, 370, "Return to Main Menu", menuStyle).setOrigin(0, 0.5);

      this.options = [resume, checkpt, main];

      resume.on('selected', () => {
        this.scene.resume('playScene');
        this.scene.stop();
      });
      main.on('selected', () => {this.scene.start('menuScene')});
    }
  
  
    update() {
      if (Phaser.Input.Keyboard.JustDown(keyUP)) {
        this.selectOption(-1);
        console.log("up registered");  // DEBUGGING
      } else if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
        this.selectOption(1); 
        console.log("down registered"); // DEBUGGING
      } else if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
        //confirm selection logic

        this.options[this.selectedIndex].emit('selected'); 
      }
    }

    select(index) {
      this.options[this.selectedIndex].setColor("#FFFFFF");

      this.options[index].setColor("#444444");

      this.selectedIndex = index;
    }

    selectOption(change) {
      let index = this.selectedIndex + change;

      // options.length gave type error DEBUG later and avoid hardcoding
      if (index > 2) {
        index = 0;
      } else if (index < 0) {
        index = 2;
      }

      this.select(index);
    }
  }