class Stage1 extends Phaser.Scene {
  constructor () {
    super('Stage1');
  }

  preload() {
    // this.load.spritesheet('alien','assets/player1.png',{frameWidth:100,frameHeight:100});
    // this.load.image('background', 'assets/background.png');
    this.load.image('trader','assets/ValescanTrader.png');
    this.load.image('farmhouse','assets/FarmHouse.png');
    this.load.image('farm','assets/farm.png');
    this.load.image('tree','assets/tree.png');
    this.load.image('addButton','assets/AddButton.png');
    this.load.image('hunterhouse','assets/HuntersHut.png');
    this.load.image('ground','assets/groundSpriteSheet.png');
    this.load.image('mine','assets/Mine.png');
    this.load.image('UI','assets/UITemplate.png');
    this.load.image('mineUI','assets/UIMines.png');
    this.load.image('xbutton','assets/xButton.png');
    this.load.image('traderUI','assets/UITrader.png');
    this.load.image('placeholder',"assets/personPlacerholder.png");
    this.load.image('placeholderGrey','assets/personPlacerholderGrey.png');
    this.load.image('farmUI',"assets/FarmUI.png");
    this.load.image('hunterUI',"assets/HunterUI.png");
    this.load.image('reilaPopup',"assets/reilaPopup.png");
    this.load.image('daltisPopup',"assets/daltisPopup.png");
    this.load.image('larrisPopup',"assets/larrisPopup.png");
    this.load.image('lucindaPopup',"assets/lucindaPopup.png");
    this.load.image('cebanPopup',"assets/cebanPopup.png");
    this.load.image('kainaPopup',"assets/kainaPopup.png");
    this.load.image('jarackPopup',"assets/jarackPopup.png");
    this.load.image('verdaanisPopup',"assets/verdaanisPopup.png");
    this.load.image('alvorPopup',"assets/alvorPopup.png");
    this.load.image('marstonPopup',"assets/marstonPopup.png");
    this.load.image('corlissPopup',"assets/corlissPopup.png");
    this.load.image('maecyPopup',"assets/maecyPopup.png");
    this.load.image('ventureButton',"assets/ventureButton.png");
    this.load.image('moneyUIcon',"assets/moneyUIcon.png");
    this.load.image('stoneUIcon',"assets/stoneUIcon.png");
    this.load.image('woodUIcon',"assets/woodUIcon.png");
    this.load.image('metalUIcon',"assets/metalUIcon.png");
    this.load.image('foodUIcon',"assets/foodUIcon.png");
    this.load.image('moreWorkerBack',"assets/moreWorkerBack.png");
    this.load.image('moreWorker',"assets/moreWorker.png");
    this.load.image('lucasPopup',"assets/lucasPopup.png");
    this.load.image('saedePopup',"assets/saedePopup.png");
    this.load.image('kesliPopup',"assets/kesliPopup.png");
    this.load.image('rydenPopup',"assets/rydenPopup.png");
    this.load.image('melinaPopup',"assets/melinaPopup.png");
    this.load.image('jeylaPopup',"assets/jeylaPopup.png");
    this.load.image('statusUIContent',"assets/statusUIContent.png");
    this.load.image('statusUIHungry',"assets/statusUIHungry.png");
    this.load.image('statusUIFamished',"assets/statusUIFamished.png");
    this.load.image('statusUIStarved',"assets/statusUIStarved.png");
    this.load.image('statusUITired',"assets/statusUITired.png");
    this.load.image('statusUIExhausted',"assets/statusUIExhausted.png");
    this.load.image('statusUITETW',"assets/statusUITETW.png");
    this.load.image('notEnoughFoodUI',"assets/notEnoughFoodUI.png")
    this.load.image('carbon',"assets/carbon.jpg");
    this.load.image('lumberUI',"assets/UILumber.png");
    this.load.image('lumber','assets/lumber.png')
  }

  create() {
    //\/\//\///-BASIC SETUP AREA -//\\/\//\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/
    let townmembers = []
    let townmembersWIPList = []
    let worksites = []
    let uiState = 'none'
    this.cursors = this.input.keyboard.createCursorKeys();
    this.map = this.make.tilemap({data: maps[0], tileWidth: 25, tileHeight: 25});
    this.tiles = this.map.addTilesetImage("ground", null, 25,25,0,0);
    this.layer = this.map.createDynamicLayer(0, this.tiles,0,0);
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // CAMERA SETUP                                                        /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    this.camera = this.cameras.main
    this.camera.setViewport(0, 0, 1445, 822);
    this.camera.setBounds(0, 0, 1600, 900);
    this.worldView = this.camera.worldView;
    this.scrollX = 0;
    this.scrollY = 0;
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // INSTANTIATION FOR GRAPHIC ELEMENTS ASSOCIATED WITH FARM             /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    this.farm1 = this.physics.add.sprite(1050,675,'farm');
    this.farm2 = this.physics.add.sprite(1050,825,'farm');
    this.farm1.body.setAllowGravity(false);
    this.farm2.body.setAllowGravity(false);
    this.farm1.setScale(0.75);
    this.farm2.setScale(0.75);
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // CREATION AND INITIALIZATION OF WORKSITE CLASS                       /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    class Worksite {
      constructor(name,id,workSprite,worksiteButton,worksiteUI,worksiteX,worksiteOracle,townmemberOffset,tireAmount,output,built) {
        this.name = name;
        this.id = id;
        this.workSprite = workSprite;
        this.worksiteButton = worksiteButton;
        this.worksiteUI = worksiteUI;
        this.worksiteX = worksiteX;
        this.worksiteOracle = worksiteOracle;
        this.townmemberOffset = townmemberOffset;
        this.tireAmount = tireAmount;
        this.output = output
        this.multiplier = 0
        this.built = built;
      }
      init() {
        this.worksiteUI.body.setAllowGravity(false);
        this.worksiteUI.visible = false;
        this.worksiteX.setInteractive();
        this.worksiteX.body.setAllowGravity(false);
        this.worksiteX.visible = false;
        this.worksiteOracle.visible = false;
        this.worksiteButton.setInteractive();
        this.worksiteButton.setScale(1.5);
        this.worksiteButton.body.setAllowGravity(false);
        this.workSprite.body.setAllowGravity(false);
        worksites.push(this);
        console.log(this.output)
      }
      resolveX() {
        uiState = 'none'
        this.worksiteUI.visible = false;
        this.worksiteX.visible = false;
        this.worksiteOracle.visible = false;
        gameManager.town.worksites.ui.moreWorkerButton.visible = false;
        gameManager.town.worksites.ui.moreWorkerBackButton.visible = false;
        for (let i=0;i<townmembersWIPList.length;i++) {
          townmembersWIPList[i].hide()
        }
      }
      startUI() {
        uiState = this.name
        this.worksiteUI.visible = true;
        this.worksiteX.visible = true;
        this.worksiteOracle.visible = true;
        gameManager.town.worksites.ui.moreWorkerButton.visible = true;
        gameManager.town.worksites.ui.moreWorkerButtonMoveTo(this.townmemberOffset[0]+231,this.townmemberOffset[1]+175)
        for (let i=0;i<townmembersWIPList.length;i++) {
          townmembersWIPList[i].moveTo(this.townmemberOffset[0],this.townmemberOffset[1])
          if (townmembersWIPList[i].working == this.id && townmembersWIPList[i].weakTag == false) {
            townmembersWIPList[i].on();
          } else if (townmembersWIPList[i].weakTag == false) {
            townmembersWIPList[i].renderGrey();
          } else {
            townmembersWIPList[i].hide();
          }
        }
      }
      resolveButton() {
        if (uiState == 'none') {
         this.startUI()
        } else {
          gameManager.clearUI()
          this.startUI()
        }
      }
    }

    let farm = new Worksite("farm",1,this.physics.add.sprite(1255,685,'farmhouse'),this.physics.add.sprite(1290,675,'addButton'),this.physics.add.sprite(750,675,'farmUI'), this.physics.add.sprite(1100,500,'xbutton'),this.add.text(790,585,"0",{ fontFamily: '"Roboto Condensed"'}),[434,650],1/2,[5,"food"],true);
    let mine = new Worksite("mine",2,this.physics.add.sprite(1454,355,'mine'),this.physics.add.sprite(1495,367,'addButton'),this.physics.add.sprite(900,355,'mineUI'),this.physics.add.sprite(1250,185,'xbutton'),this.add.text(930,265,"0" ,{ fontFamily: '"Roboto Condensed"'}),[584,340],1,[],true);
    let trader = new Worksite("trader",3,this.physics.add.sprite(255,300,'trader'),this.physics.add.sprite(310,290,'addButton'),this.physics.add.sprite(800,300,'traderUI'),this.physics.add.sprite(1150,130,'xbutton'),this.add.text(835,215,"0" ,{ fontFamily: '"Roboto Condensed"'}),[484,275],1/3,[25,"money"],true);
    let hunter = new Worksite("hunter",4,this.physics.add.sprite(200,75,'hunterhouse'),this.physics.add.sprite(240,65,'addButton'),this.physics.add.sprite(700,300,'hunterUI'),this.physics.add.sprite(1050,120,'xbutton'),this.add.text(735,215,"0" ,{ fontFamily: '"Roboto Condensed"'}),[384,275],1/2,[3,"food"],true);
    let lumber = new Worksite("lumber",5,this.physics.add.sprite(400,85,'lumber'),this.physics.add.sprite(440,75,'addButton'),this.physics.add.sprite(800,300,'lumberUI'),this.physics.add.sprite(1150,120,'xbutton'),this.add.text(835,215,"0" ,{ fontFamily: '"Roboto Condensed"'}),[484,275],1/2,[20,"wood"],true);

    farm.init()
    mine.init()
    trader.init()
    hunter.init()
    lumber.init()
    trader.workSprite.setScale(1.5)

    farm.worksiteButton.on('pointerdown',function() {farm.resolveButton()});
    farm.worksiteX.on('pointerdown',function() {farm.resolveX()});
    mine.worksiteButton.on('pointerdown',function() {mine.resolveButton()});
    mine.worksiteX.on('pointerdown',function() {mine.resolveX()});
    trader.worksiteButton.on('pointerdown',function() {trader.resolveButton()});
    trader.worksiteX.on('pointerdown',function() {trader.resolveX()});
    hunter.worksiteButton.on('pointerdown',function() {hunter.resolveButton()});
    hunter.worksiteX.on('pointerdown',function() {hunter.resolveX()});
    lumber.worksiteButton.on('pointerdown',function() {lumber.resolveButton()});
    lumber.worksiteX.on('pointerdown',function() {lumber.resolveX()});
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // CREATION AND INITIALIZATION OF TOWNMEMBER CLASS                     /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    class Townmember {
      constructor(name,age,thoughts,needs,bonuses,layoutModifier,sprite,greysprite,popup,weakTag,foodSprites) {
        this.name = name
        this.age = age
        this.thoughts = thoughts
        this.hunger = 0;
        this.tire = 0;
        this.feedingTag = true
        this.needs = needs
        this.bonuses = bonuses
        this.working = 0
        this.layoutModifier = layoutModifier
        this.sprite = sprite
        this.greysprite = greysprite
        this.popup = popup
        this.weakTag = weakTag
        this.exhaustTag = false;
        this.foodSprites = foodSprites
      }
      init() {
        this.sprite.setInteractive();
        this.greysprite.setInteractive();
        this.sprite.body.setAllowGravity(false);
        this.greysprite.body.setAllowGravity(false);
        this.sprite.visible = false;
        this.greysprite.visible = false;
        this.foodSprites[0].setInteractive();
        this.foodSprites[1].setInteractive();
        this.foodSprites[0].body.setAllowGravity(false);
        this.foodSprites[1].body.setAllowGravity(false);
        this.foodSprites[0].visible = false;
        this.foodSprites[1].visible = false;
        this.popup.body.setAllowGravity(false);
        this.popup.visible = false;
        townmembersWIPList.push(this)
      }

      on(uiState) {
        if (this.tire > 0.99) {
          console.log(this.name + " cannot work because they are too exhausted! Those who are  " + this.age + " years old cannot work as hard as adults. . .")
          this.working = 0
          this.exhaustTag = true;
        }
        this.sprite.visible = true;
        this.greysprite.visible = false;
        if (uiState == 'farm') {
          this.working = 1
        } else if (uiState == 'mine') {
          this.working = 2
        } else if (uiState == 'trader') {
          this.working = 3
        } else if (uiState == 'hunter') {
          this.working = 4
        } else if (uiState == 'lumber') {
          this.working = 5
        }
        gameManager.calculateMultipliers()
        gameManager.setResourceUI();
      }

      off() {
        this.sprite.visible = false;
        this.greysprite.visible = true;
        this.working = 0
        gameManager.calculateMultipliers()
        gameManager.setResourceUI();
      }

      renderGrey() {
        this.sprite.visible = false;
        this.greysprite.visible = true;
      }

      hide() {
        this.sprite.visible = false;
        this.greysprite.visible = false;
      }

      moveTo(x,y) {
        this.sprite.x = x + this.layoutModifier[0];
        this.sprite.y = y + this.layoutModifier[1];
        this.greysprite.x = x + this.layoutModifier[0];
        this.greysprite.y = y + this.layoutModifier[1];
      }

      moveToFood(x,y) {
        this.sprite.x = x
        this.sprite.y = y
        this.greysprite.x = x
        this.greysprite.y = y
        this.foodSprites[0].x = x
        this.foodSprites[0].y = y
        this.foodSprites[1].x = x
        this.foodSprites[1].y = y
      }

      evaluateStatus() {
        console.log(this.name + ": " + this.tire)
        this.needs = []
        if (this.tire < 0.34 && this.tire > 0) {
          this.needs.push("tired")
        } else if (this.tire < 1 &&this.tire > 0) {
          this.needs.push("exhausted")
        } else if (this.tire >= 1 && this.tire > 0) {
          this.needs.push("TETW")
          this.renderGrey()
          this.working = 0
        }
        if (this.hunger == 1) {
          this.needs.push("hungry")
        } else if (this.hunger == 2) {
          this.needs.push("famished")
        } else if (this.hunger == 3) {
          this.needs.push("starved")
        }
        if (this.needs.length == 0) {
          this.needs.push("content")
        }
      }

      showStatusMessage() {
        this.evaluateStatus()
        for (let i=0;i < this.needs.length;i++) {
          if (this.needs[i] == "tired") {
            tiredSUI.moveTo(this.sprite.x - 140,this.sprite.y - 60 - (i * 60))
            tiredSUI.show()
          }
          if (this.needs[i] == "exhausted") {
            exhaustedSUI.moveTo(this.sprite.x - 140,this.sprite.y - 60 - (i * 60))
            exhaustedSUI.show()
          }
          if (this.needs[i] == "TETW") {
            tetwSUI.moveTo(this.sprite.x - 140,this.sprite.y - 60 - (i * 60))
            tetwSUI.show()
          }
          if (this.needs[i] == "hungry") {
            hungrySUI.moveTo(this.layoutModifier[0] - 150,this.layoutModifier[1] - 45 - (i * 60))
            hungrySUI.show()
          }
          if (this.needs[i] == "famished") {
            famishedSUI.moveTo(this.layoutModifier[0] - 150,this.layoutModifier[1] - 45 - (i * 60))
            famishedSUI.show()
          }
          if (this.needs[i] == "starved") {
            starvedSUI.moveTo(this.layoutModifier[0] - 150,this.layoutModifier[1] - 45 - (i * 60))
            starvedSUI.show()
          }
          if (this.needs[i] == "content") {
            contentSUI.moveTo(this.sprite.x - 140,this.sprite.y - 60 - (i * 60))
            contentSUI.show()
          }
        }
      }

      popMouse() {
        this.popup.visible = true;
        this.popup.x = this.sprite.x + 125
        this.popup.y = this.sprite.y - 125
        this.showStatusMessage()
      }

      hideStatusMessage() {
        hungrySUI.hide()
        famishedSUI.hide()
        starvedSUI.hide()
        tiredSUI.hide()
        exhaustedSUI.hide()
        tetwSUI.hide()
        contentSUI.hide()
      }

      popHide() {
        this.popup.visible = false;
        this.hideStatusMessage()
      }

      increaseHunger() {
        this.hunger = this.hunger + 1
      }

      increaseTire(exhaustion) {
        this.tire = this.tire + exhaustion
      }
    }
    let reilaCatell = new Townmember("Reila Catell", 34, "I am happy",[],["carpenter","lumber","mine"],[0,0],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"reilaPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let daltisNaalor = new Townmember("Daltis Naalor", 43, "I am happy",[],["hunter","hunter","hunter"],[63,0],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"daltisPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let larrisParge = new Townmember("Larris Parge", 37, "I am happy",[],["farm","lumber","mine"],[126,0],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"larrisPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let lucindaParge = new Townmember("Lucinda Parge", 32, "I am happy",[],["farm"],[189,0],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"lucindaPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let cebanVepren = new Townmember("Ceban Vepren", 26, "I am happy",[],["trader"],[0,74],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"cebanPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let kainaVepren = new Townmember("Kaina Vepren", 22, "I am happy",[],[],[63,74],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"kainaPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let jarackRhysling = new Townmember("Jarack Rhysling", 74, "I am happy",[],["prayer","monk","lumber","mine"],[126,74],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"jarackPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let verdaanisPadra = new Townmember("Verdaanis Padra", 52, "I am happy",[],["prayer","monk"],[189,74],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"verdaanisPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let alvorRiverwood = new Townmember("Alvor Riverwood", 39, "I am happy",[],["smith","smith","smith"],[0,148],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"alvorPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let marstonSinch = new Townmember("Marston Sinch", 45, "I am happy",[],["lumber","mine"],[63,148],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"marstonPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let corlissSinch = new Townmember("Corliss Sinch", 43, "I am happy",[],[],[126,148],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"corlissPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let maecyCorbray = new Townmember("Maecy Corbray", 33, "I am happy",[],[],[189,148],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"maecyPopup"),false,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let lucasParge = new Townmember("Lucas Parge", 8, "I am happy",[],[],[252,74],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"lucasPopup"),true,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let saedeVepren = new Townmember("Saede Vepren", 10, "I am happy",[],[],[313,74],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"saedePopup"),true,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let kesliSinch = new Townmember("Kesli Sinch", 13, "I am happy",[],[],[377,74],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"kesliPopup"),true,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let rydenCorbray = new Townmember("Ryden Corbray", 11, "I am happy",[],[],[252,148],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"rydenPopup"),true,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let jeylaCovan = new Townmember("Jeyla Covan", 84, "I am happy",[],["prayer"],[313,148],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"jeylaPopup"),true,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    let melinaPyle = new Townmember("Melina Pyle", 68, "I am happy",[],["prayer"],[377,148],this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey"),this.physics.add.sprite(0,0,"melinaPopup"),true,[this.physics.add.sprite(50,50,"placeholder"),this.physics.add.sprite(0,0,"placeholderGrey")])
    reilaCatell.init()
    daltisNaalor.init()
    larrisParge.init()
    lucindaParge.init()
    cebanVepren.init()
    kainaVepren.init()
    jarackRhysling.init()
    verdaanisPadra.init()
    alvorRiverwood.init()
    marstonSinch.init()
    corlissSinch.init()
    maecyCorbray.init();
    lucasParge.init()
    saedeVepren.init()
    kesliSinch.init()
    rydenCorbray.init()
    jeylaCovan.init()
    melinaPyle.init()
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // CREATION OF STATUS UI MESSAGE CLASS                                 /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    class StatusUI {
      constructor(image) {
        this.image = image
      }
      show() {
        this.image.visible = true;
      }
      hide() {
        this.image.visible = false;
      }
      moveTo(x,y) {
        this.image.x = x
        this.image.y = y
      }
    }
    let hungrySUI = new StatusUI(this.add.image(0,0,'statusUIHungry'))
    let famishedSUI = new StatusUI(this.add.image(0,0,'statusUIFamished'))
    let starvedSUI = new StatusUI(this.add.image(0,0,'statusUIStarved'))
    let tiredSUI = new StatusUI(this.add.image(0,0,'statusUITired'))
    let exhaustedSUI = new StatusUI(this.add.image(0,0,'statusUIExhausted'))
    let tetwSUI = new StatusUI(this.add.image(0,0,'statusUITETW'))
    let contentSUI = new StatusUI(this.add.image(0,0,'statusUIContent'))
    hungrySUI.hide()
    famishedSUI.hide()
    starvedSUI.hide()
    tiredSUI.hide()
    exhaustedSUI.hide()
    tetwSUI.hide()
    contentSUI.hide()
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // BUTTON AND MOUSEOVER BEHAVIOR FOR TOWNMEMBER UI ELEMENTS            /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    reilaCatell.sprite.on('pointerdown', function() {reilaCatell.off()})
    reilaCatell.greysprite.on('pointerdown', function() {reilaCatell.on(uiState)})
    reilaCatell.sprite.on('pointerover', function() {reilaCatell.popMouse()})
    reilaCatell.greysprite.on('pointerover', function() {reilaCatell.popMouse()})
    reilaCatell.sprite.on('pointerout', function() {reilaCatell.popHide()})
    reilaCatell.greysprite.on('pointerout', function() {reilaCatell.popHide()})
    daltisNaalor.sprite.on('pointerdown', function() {daltisNaalor.off()})
    daltisNaalor.greysprite.on('pointerdown', function() {daltisNaalor.on(uiState)})
    daltisNaalor.sprite.on('pointerover', function() {daltisNaalor.popMouse()})
    daltisNaalor.greysprite.on('pointerover', function() {daltisNaalor.popMouse()})
    daltisNaalor.sprite.on('pointerout', function() {daltisNaalor.popHide()})
    daltisNaalor.greysprite.on('pointerout', function() {daltisNaalor.popHide()})
    larrisParge.sprite.on('pointerdown', function() {larrisParge.off()})
    larrisParge.greysprite.on('pointerdown', function() {larrisParge.on(uiState)})
    larrisParge.sprite.on('pointerover', function() {larrisParge.popMouse()})
    larrisParge.greysprite.on('pointerover', function() {larrisParge.popMouse()})
    larrisParge.sprite.on('pointerout', function() {larrisParge.popHide()})
    larrisParge.greysprite.on('pointerout', function() {larrisParge.popHide()})
    lucindaParge.sprite.on('pointerdown', function() {lucindaParge.off()})
    lucindaParge.greysprite.on('pointerdown', function() {lucindaParge.on(uiState)})
    lucindaParge.sprite.on('pointerover', function() {lucindaParge.popMouse()})
    lucindaParge.greysprite.on('pointerover', function() {lucindaParge.popMouse()})
    lucindaParge.sprite.on('pointerout', function() {lucindaParge.popHide()})
    lucindaParge.greysprite.on('pointerout', function() {lucindaParge.popHide()})
    cebanVepren.sprite.on('pointerdown', function() {cebanVepren.off()})
    cebanVepren.greysprite.on('pointerdown', function() {cebanVepren.on(uiState)})
    cebanVepren.sprite.on('pointerover', function() {cebanVepren.popMouse()})
    cebanVepren.greysprite.on('pointerover', function() {cebanVepren.popMouse()})
    cebanVepren.sprite.on('pointerout', function() {cebanVepren.popHide()})
    cebanVepren.greysprite.on('pointerout', function() {cebanVepren.popHide()})
    kainaVepren.sprite.on('pointerdown', function() {kainaVepren.off()})
    kainaVepren.greysprite.on('pointerdown', function() {kainaVepren.on(uiState)})
    kainaVepren.sprite.on('pointerover', function() {kainaVepren.popMouse()})
    kainaVepren.greysprite.on('pointerover', function() {kainaVepren.popMouse()})
    kainaVepren.sprite.on('pointerout', function() {kainaVepren.popHide()})
    kainaVepren.greysprite.on('pointerout', function() {kainaVepren.popHide()})
    jarackRhysling.sprite.on('pointerdown', function() {jarackRhysling.off()})
    jarackRhysling.greysprite.on('pointerdown', function() {jarackRhysling.on(uiState)})
    jarackRhysling.sprite.on('pointerover', function() {jarackRhysling.popMouse()})
    jarackRhysling.greysprite.on('pointerover', function() {jarackRhysling.popMouse()})
    jarackRhysling.sprite.on('pointerout', function() {jarackRhysling.popHide()})
    jarackRhysling.greysprite.on('pointerout', function() {jarackRhysling.popHide()})
    verdaanisPadra.sprite.on('pointerdown', function() {verdaanisPadra.off()})
    verdaanisPadra.greysprite.on('pointerdown', function() {verdaanisPadra.on(uiState)})
    verdaanisPadra.sprite.on('pointerover', function() {verdaanisPadra.popMouse()})
    verdaanisPadra.greysprite.on('pointerover', function() {verdaanisPadra.popMouse()})
    verdaanisPadra.sprite.on('pointerout', function() {verdaanisPadra.popHide()})
    verdaanisPadra.greysprite.on('pointerout', function() {verdaanisPadra.popHide()})
    alvorRiverwood.sprite.on('pointerdown', function() {alvorRiverwood.off()})
    alvorRiverwood.greysprite.on('pointerdown', function() {alvorRiverwood.on(uiState)})
    alvorRiverwood.sprite.on('pointerover', function() {alvorRiverwood.popMouse()})
    alvorRiverwood.greysprite.on('pointerover', function() {alvorRiverwood.popMouse()})
    alvorRiverwood.sprite.on('pointerout', function() {alvorRiverwood.popHide()})
    alvorRiverwood.greysprite.on('pointerout', function() {alvorRiverwood.popHide()})
    marstonSinch.sprite.on('pointerdown', function() {marstonSinch.off()})
    marstonSinch.greysprite.on('pointerdown', function() {marstonSinch.on(uiState)})
    marstonSinch.sprite.on('pointerover', function() {marstonSinch.popMouse()})
    marstonSinch.greysprite.on('pointerover', function() {marstonSinch.popMouse()})
    marstonSinch.sprite.on('pointerout', function() {marstonSinch.popHide()})
    marstonSinch.greysprite.on('pointerout', function() {marstonSinch.popHide()})
    corlissSinch.sprite.on('pointerdown', function() {corlissSinch.off()})
    corlissSinch.greysprite.on('pointerdown', function() {corlissSinch.on(uiState)})
    corlissSinch.sprite.on('pointerover', function() {corlissSinch.popMouse()})
    corlissSinch.greysprite.on('pointerover', function() {corlissSinch.popMouse()})
    corlissSinch.sprite.on('pointerout', function() {corlissSinch.popHide()})
    corlissSinch.greysprite.on('pointerout', function() {corlissSinch.popHide()})
    maecyCorbray.sprite.on('pointerdown', function() {maecyCorbray.off()})
    maecyCorbray.greysprite.on('pointerdown', function() {maecyCorbray.on(uiState)})
    maecyCorbray.sprite.on('pointerover', function() {maecyCorbray.popMouse()})
    maecyCorbray.greysprite.on('pointerover', function() {maecyCorbray.popMouse()})
    maecyCorbray.sprite.on('pointerout', function() {maecyCorbray.popHide()})
    maecyCorbray.greysprite.on('pointerout', function() {maecyCorbray.popHide()})
    lucasParge.sprite.on('pointerdown', function() {lucasParge.off()})
    lucasParge.greysprite.on('pointerdown', function() {lucasParge.on(uiState)})
    lucasParge.sprite.on('pointerover', function() {lucasParge.popMouse()})
    lucasParge.greysprite.on('pointerover', function() {lucasParge.popMouse()})
    lucasParge.sprite.on('pointerout', function() {lucasParge.popHide()})
    lucasParge.greysprite.on('pointerout', function() {lucasParge.popHide()})
    saedeVepren.sprite.on('pointerdown', function() {saedeVepren.off()})
    saedeVepren.greysprite.on('pointerdown', function() {saedeVepren.on(uiState)})
    saedeVepren.sprite.on('pointerover', function() {saedeVepren.popMouse()})
    saedeVepren.greysprite.on('pointerover', function() {saedeVepren.popMouse()})
    saedeVepren.sprite.on('pointerout', function() {saedeVepren.popHide()})
    saedeVepren.greysprite.on('pointerout', function() {saedeVepren.popHide()})
    kesliSinch.sprite.on('pointerdown', function() {kesliSinch.off()})
    kesliSinch.greysprite.on('pointerdown', function() {kesliSinch.on(uiState)})
    kesliSinch.sprite.on('pointerover', function() {kesliSinch.popMouse()})
    kesliSinch.greysprite.on('pointerover', function() {kesliSinch.popMouse()})
    kesliSinch.sprite.on('pointerout', function() {kesliSinch.popHide()})
    kesliSinch.greysprite.on('pointerout', function() {kesliSinch.popHide()})
    rydenCorbray.sprite.on('pointerdown', function() {rydenCorbray.off()})
    rydenCorbray.greysprite.on('pointerdown', function() {rydenCorbray.on(uiState)})
    rydenCorbray.sprite.on('pointerover', function() {rydenCorbray.popMouse()})
    rydenCorbray.greysprite.on('pointerover', function() {rydenCorbray.popMouse()})
    rydenCorbray.sprite.on('pointerout', function() {rydenCorbray.popHide()})
    rydenCorbray.greysprite.on('pointerout', function() {rydenCorbray.popHide()})
    jeylaCovan.sprite.on('pointerdown', function() {jeylaCovan.off()})
    jeylaCovan.greysprite.on('pointerdown', function() {jeylaCovan.on(uiState)})
    jeylaCovan.sprite.on('pointerover', function() {jeylaCovan.popMouse()})
    jeylaCovan.greysprite.on('pointerover', function() {jeylaCovan.popMouse()})
    jeylaCovan.sprite.on('pointerout', function() {jeylaCovan.popHide()})
    jeylaCovan.greysprite.on('pointerout', function() {jeylaCovan.popHide()})
    melinaPyle.sprite.on('pointerdown', function() {melinaPyle.off()})
    melinaPyle.greysprite.on('pointerdown', function() {melinaPyle.on(uiState)})
    melinaPyle.sprite.on('pointerover', function() {melinaPyle.popMouse()})
    melinaPyle.greysprite.on('pointerover', function() {melinaPyle.popMouse()})
    melinaPyle.sprite.on('pointerout', function() {melinaPyle.popHide()})
    melinaPyle.greysprite.on('pointerout', function() {melinaPyle.popHide()})
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // INSTANTIATION FOR GRAPHIC AND UI ELEMENTS RELATED TO GAME MANAGER   /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    let notEnoughFoodUI = this.add.image(this.worldView.centerX,this.worldView.centerY,'notEnoughFoodUI').setScrollFactor(0)
    notEnoughFoodUI.visible = false;
    this.ventureButton = this.add.image(1315,765,'ventureButton').setScrollFactor(0);
    this.ventureButton.setInteractive();
    let foodUIcon = this.add.image(75,28,'foodUIcon').setScrollFactor(0);
    let woodUIcon = this.add.image(75,65,'woodUIcon').setScrollFactor(0);
    let stoneUIcon = this.add.image(75,95,'stoneUIcon').setScrollFactor(0);
    let metalUIcon = this.add.image(75,125,'metalUIcon').setScrollFactor(0);
    let moneyUIcon = this.add.image(75,165,'moneyUIcon').setScrollFactor(0);
    let foodNumber = this.add.text(30,28,"0",{ fontFamily: '"Roboto Condensed"' }).setScrollFactor(0);
    let woodNumber = this.add.text(30,65,"0",{ fontFamily: '"Roboto Condensed"' }).setScrollFactor(0);
    let stoneNumber = this.add.text(30,95,"0",{ fontFamily: '"Roboto Condensed"' }).setScrollFactor(0);
    let metalNumber = this.add.text(30,125,"0",{ fontFamily: '"Roboto Condensed"' }).setScrollFactor(0);
    let moneyNumber = this.add.text(30,165,"0",{ fontFamily: '"Roboto Condensed"' }).setScrollFactor(0);
    let mwb = this.physics.add.sprite(0,0,"moreWorker");
    mwb.setInteractive()
    mwb.body.setAllowGravity(false);
    mwb.visible = false;
    let mwbb = this.physics.add.sprite(0,0,"moreWorkerBack");
    mwbb.setInteractive()
    mwbb.body.setAllowGravity(false);
    mwbb.visible = false;
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // BUTTON BEHAVIOR FOR BUTTONS RELATED TO GAME MANAGER                 /\
    mwb.on('pointerdown', function() {gameManager.town.worksites.ui.moreWorkerButtonOnClick(uiState)});
    mwbb.on('pointerdown', function() {gameManager.town.worksites.ui.moreWorkerBackButtonOnClick()});
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // VENTURE BUTTON BEHAVIOR                                             /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    this.ventureButton.on('pointerdown', function() {
      gameManager.calculateMultipliers()
      gameManager.calculateGainedResources()
      gameManager.feedTown();
      gameManager.setResourceUI();
      gameManager.resetTire();
      gameManager.calculateTire();
    })
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    // CREATION OF GAME MANAGER                                            /\
    //\/\//\/\//\///\\/\/\/\/\/\\\/\/\/\/\/\/\/\\\/\\/\\/\/\//\/\//\\/\//\\/\
    let gameManager = {
      town: {
        resources: {
          money: 0,
          wood: 0,
          stone: 0,
          metal: 0,
          magic: 0,
          faith: 0,
          food: 0,
          water: 0,
          ui: {
            money: moneyUIcon,
            wood: woodUIcon,
            stone: stoneUIcon,
            metal: metalUIcon,
            food: foodUIcon,
            text: {
              food: foodNumber,
              money: moneyNumber,
              wood: woodNumber,
              stone: stoneNumber,
              metal: metalNumber,
            },
            oracle: {
              farm: farm.worksiteOracle,
              mine: mine.worksiteOracle,
              trader: trader.worksiteOracle,
              hunter: hunter.worksiteOracle,
              lumber: lumber.worksiteOracle,
            },
            foodScreen: notEnoughFoodUI,
          }
        },
        worksites: {
          ui: {
            moreWorkerButton: mwb,
            moreWorkerBackButton: mwbb,
            moreWorkerButtonMoveTo: function(x,y) {
              gameManager.town.worksites.ui.moreWorkerButton.x = x;
              gameManager.town.worksites.ui.moreWorkerButton.y = y;
              gameManager.town.worksites.ui.moreWorkerBackButton.x = x;
              gameManager.town.worksites.ui.moreWorkerBackButton.y = y;
            },
            moreWorkerButtonOnClick: function(uiState) {
              gameManager.town.worksites.ui.moreWorkerBackButton.visible = true;
              gameManager.town.worksites.ui.moreWorkerButton.visible = false;
              for (let i=0;i<gameManager.townmembersWIP.length;i++) {
                for (let k=0;k<gameManager.worksites.length;k++) {
                  if (gameManager.townmembersWIP[i].weakTag == true && gameManager.townmembersWIP[i].working == gameManager.worksites[k].id && gameManager.worksites[k].name == uiState) {
                    gameManager.townmembersWIP[i].on()
                    break;
                  } else if (gameManager.townmembersWIP[i].weakTag == true) {
                    gameManager.townmembersWIP[i].renderGrey();
                  }
                }
              }
            },
            moreWorkerBackButtonOnClick: function() {
              gameManager.town.worksites.ui.moreWorkerBackButton.visible = false;
              gameManager.town.worksites.ui.moreWorkerButton.visible = true;
              for (let i=0;i<gameManager.townmembersWIP.length;i++) {
                if (gameManager.townmembersWIP[i].weakTag == true) {
                  gameManager.townmembersWIP[i].hide();
                }
              }
            }
          }
          },
          mine: {
            outputGenerator: function() {
              let mineRNG = (Math.floor(Math.random() * 100))/100
              if (0 < mineRNG && mineRNG < 0.011) {
                //event manager ==> 'found an emerald in the mine'
                console.log("emerald found!")
                mine.output = [35,"stone",5,"metal"]
              } else if (0.01 < mineRNG && mineRNG < 0.06) {
                mine.output = [35,"stone",10,"metal"]
              } else if (0.05 < mineRNG && mineRNG < 0.11) {
                mine.output = [40,"stone",5,"metal"]
              } else if (0.10 < mineRNG && mineRNG < 0.41) {
                mine.output = [30,"stone",5,"metal"]
              } else {
                mine.output = [35,"stone",5,"metal"]
              }
            }
        }
      },
      townmembers: townmembers,
      townmembersWIP: townmembersWIPList,
      worksites: worksites,
      clearUI: function() {
        uiState = 'none'
        for (let i=0;i<this.worksites.length;i++) {
          this.worksites[i].worksiteUI.visible = false;
          this.worksites[i].worksiteX.visible = false;
          this.worksites[i].worksiteOracle.visible = false;
        }
        gameManager.town.worksites.ui.moreWorkerButton.visible = false;
        gameManager.town.worksites.ui.moreWorkerBackButton.visible = false;
        reilaCatell.hide();
        daltisNaalor.hide();
        larrisParge.hide();
        lucindaParge.hide();
        cebanVepren.hide();
        kainaVepren.hide();
        jarackRhysling.hide();
        verdaanisPadra.hide();
        alvorRiverwood.hide();
        marstonSinch.hide();
        corlissSinch.hide();
        maecyCorbray.hide();
      },
      calculateTire: function() {
        for (let i=0;i<this.townmembersWIP.length;i++) {
          if (this.townmembersWIP[i].weakTag == true) {
            for (let k=0;k<this.worksites.length;k++) {
              if (this.worksites[k].id == this.townmembersWIP[i].working) {
                this.townmembersWIP[i].increaseTire(this.worksites[k].tireAmount);
              }
            }
          }
        }
      },
      calculateMultipliers: function() {
        for (let i=0;i<this.worksites.length;i++) {
          this.worksites[i].multiplier = 0
        }
        for (let i=0;i<this.townmembersWIP.length;i++) {
          for (let k=0;k<this.worksites.length;k++) {
            if (this.townmembersWIP[i].working == this.worksites[k].id) {
              let bonus = 0
              for (let m=0;m<this.townmembersWIP[i].bonuses.length;m++) {
                  if (this.townmembersWIP[i].bonuses[m] == this.worksites[k].name) {
                    bonus++
                  }
              }
              this.worksites[k].multiplier = this.worksites[k].multiplier + 1 + bonus
            }
          }
        }
      },
      calculateGainedResources: function() {
        this.town.mine.outputGenerator();
        for (let i=0;i<this.worksites.length;i++) {
          for (let k=0;k<this.worksites[i].output.length;k+=2) {
            let newResource = (this.worksites[i].output[k] * this.worksites[i].multiplier)
            if (this.worksites[i].output[k+1] == "food") {
              this.town.resources.food = this.town.resources.food + newResource
            } else if (this.worksites[i].output[k+1] == "stone") {
              this.town.resources.stone = this.town.resources.stone + newResource
            } else if (this.worksites[i].output[k+1] == "metal") {
              this.town.resources.metal = this.town.resources.metal + newResource
            } else if (this.worksites[i].output[k+1] == "money") {
              this.town.resources.money = this.town.resources.money + newResource
            } else if (this.worksites[i].output[k+1] == "wood") {
              this.town.resources.wood = this.town.resources.wood + newResource
            }
          }
        }
      },
      feedTown: function() {
        if (this.town.resources.food > 19) {
          this.town.resources.food = this.town.resources.food - 20
        } else {
          gameManager.town.resources.ui.foodScreen.visible = true
          console.log("insert choose who doesn't get to eat screen")
          this.town.resources.food = this.town.resources.food - this.town.resources.food
        }
      },
      resetTire: function() {
        for (let i = 0;i<gameManager.townmembersWIP.length;i++) {
          if (gameManager.townmembersWIP[i].exhaustTag == true) {
            console.log(gameManager.townmembersWIP[i].name + " was exhausted but their tire value has now been set to 0")
            gameManager.townmembersWIP[i].exhaustTag = false;
            gameManager.townmembersWIP[i].tire = 0
          }
        }
      },
      setResourceUI: function() {
        this.town.resources.ui.text.food.setText(this.town.resources.food)
        this.town.resources.ui.text.wood.setText(this.town.resources.wood)
        this.town.resources.ui.text.stone.setText(this.town.resources.stone)
        this.town.resources.ui.text.metal.setText(this.town.resources.metal)
        this.town.resources.ui.text.money.setText(this.town.resources.money)
        this.setOracleText()
      },
      setOracleText: function() {
        this.town.resources.ui.oracle.farm.setText((gameManager.worksites[0].output[0] * gameManager.worksites[0].multiplier) + " Food");
        this.town.resources.ui.oracle.mine.setText((30 * gameManager.worksites[1].multiplier)+"-"+ (40 * gameManager.worksites[1].multiplier) + " Stone + " + (5 * gameManager.worksites[1].multiplier)+"-"+(10 * gameManager.worksites[1].multiplier) + " Metal")
        this.town.resources.ui.oracle.trader.setText((gameManager.worksites[2].output[0] * gameManager.worksites[2].multiplier) + " Money")
        this.town.resources.ui.oracle.hunter.setText((gameManager.worksites[3].output[0] * gameManager.worksites[3].multiplier) + " Food")
        this.town.resources.ui.oracle.lumber.setText((gameManager.worksites[4].output[0] * gameManager.worksites[4].multiplier) + " Wood")
      }
    }
  }

  update() {
    if (this.worldView.right - 100 < this.input.x) {
      this.scrollX += 5
      this.camera.scrollX = this.scrollX
    }
    if (this.worldView.left + 100 > this.input.x) {
      this.scrollX -= 5
      this.camera.scrollX = this.scrollX
    }
    if (this.worldView.top + 50 > this.input.y) {
      this.scrollY -= 5
      this.camera.scrollY = this.scrollY
    }
    if (this.worldView.bottom - 75 < this.input.y) {
      this.scrollY += 5
      this.camera.scrollY = this.scrollY
    }
  }
};

