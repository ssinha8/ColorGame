//TODO: add basic scene functionality
class Pause extends Phaser.Scene {
    constructor() {
        super("pauseScene");
    }
  
    create() {

      keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      const options = [];
      this.selectedIndex = 0;
  
    
      // style for menu options
      let menuStyle = {
        fontFamily: 'Courier',
        fontSize: '30px',
        color: '#FFFFFF',
        align: 'center',
      }
  
      const resume = this.add.text((game.config.width/2)-80, 230, "Resume", menuStyle);
      const checkpt = this.add.text((game.config.width/2)-80, 300, "Return to Last Checkpoint", menuStyle);
      const main = this.add.text((game.config.width/2)-80, 370, "Return to Main Menu", menuStyle);

      resume.setInteractive();
      checkpt.setInteractive();
      main.setInteractive();

      options[0] = resume;
      options[1] = checkpt;
      options[2] = main;

      resume.on('selected', () => {this.scene.start('playScene')});
      main.on('selected', () => {this.scene.start('menuScene')});
    }
  
  
    update() {
      if (Phaser.Input.Keyboard.JustDown(keyUP)) {
        this.selectOption(-1);
      } else if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
        this.selectOption(1); 
      } else if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
        //confirm selection logic

        this.options[this.selectedIndex].emit("selected"); 
      }
    }

    select(index) {
      this.options[this.selectIndex].setColor("#FFFFFF");

      this.options[index].setColor("#444444");

      this.selectedIndex = index;
    }

    selectOption(change) {
      let index = this.selectedIndex + change;

      if (index > this.options.length) {
        index = 0;
      } else if (index < 0) {
        index = this.options.length - 1;
      }

      this.select(index);
    }
  }