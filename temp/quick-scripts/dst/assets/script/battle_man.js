
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/battle_man.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0a690eqTH9JkbGGdX00Deas', 'battle_man');
// script/battle_man.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var man_1 = require("./man");
var GlobalData_1 = require("./GlobalData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = 'hello';
        _this.battleBgm = null;
        _this.winSound = null;
        _this.loseSound = null;
        _this.mainCamera = null;
        _this.enemy1 = null;
        _this.enemy2 = null;
        _this.myHP = null;
        _this.enemyHP = null;
        _this.man = null;
        _this.sprite = [];
        _this.bag = GlobalData_1.default.pokewoman;
        _this.mylife = GlobalData_1.default.mylife;
        _this.myLife = 100;
        _this.enemyLife = 100;
        _this.isWin = false;
        _this.myTurn = true;
        _this.enemyTurn = false;
        _this.isLose = false;
        _this.enemynum = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        // this.enemynum = cc.director.getScene()["enemyNum"];
        // console.log("enemyNum:", this.enemynum);
        // if(this.enemynum !== undefined){
        //     console.log("Number passed from previous scene:", this.enemynum);
        //     //this.enemynum = enemyNum;
        // }
        cc.find('Canvas/skills/bag2').on('click', function () {
            // cc.director.loadScene('bag_battle');
            cc.find('Canvas/skills').active = false;
            cc.find('Canvas/bags2').active = true;
        });
    };
    NewClass.prototype.start = function () {
        this.enemynum = cc.director.getScene()["enemyNum"];
        // this.node.getComponent(cc.Sprite).spriteFrame = this.sprite[this.bag[GlobalData.myelf]];
        //console.log("enemyNum:", this.enemynum);
        if (this.enemynum !== undefined) {
            //console.log("Number passed from previous scene:", this.enemynum);
        }
        if (this.enemynum == 4) {
            if (cc.find("Canvas/enemy").getComponent(cc.Sprite).spriteFrame == null) {
                cc.find("Canvas/enemy").getComponent(cc.Sprite).spriteFrame = this.enemy1;
            }
        }
        else if (this.enemynum == 5) {
            if (cc.find("Canvas/enemy").getComponent(cc.Sprite).spriteFrame == null) {
                cc.find("Canvas/enemy").getComponent(cc.Sprite).spriteFrame = this.enemy2;
            }
        }
        cc.audioEngine.playMusic(this.battleBgm, true);
        this.initSkill1();
        this.initSkill2();
        this.initSkill3();
        this.initSkill4();
        var enemyParticleEffect2 = cc.find("Canvas/enemy/onLoad").getComponent(cc.ParticleSystem);
        if (this.enemynum == 4) {
            console.log("this.enemynum == 4");
            enemyParticleEffect2.playOnLoad = true;
            enemyParticleEffect2.resetSystem();
        }
    };
    NewClass.prototype.update = function (dt) {
        this.node.getComponent(cc.Sprite).spriteFrame = this.sprite[this.bag[GlobalData_1.default.myelf]];
        this.updateUI(dt);
        if (this.enemyLife <= 0 && !this.isWin) {
            // var uid = GlobalData.uid;
            // const database = firebase.database();
            // firebase.database().ref('user').child(GlobalData.uid).update({
            //     myArray: [this.enemynum],
            // });
            GlobalData_1.default.pokewoman.push(this.enemynum);
            console.log("GlobalData.pokewoman:", GlobalData_1.default.pokewoman);
            this.enemyLife = 0;
            this.isWin = true;
            this.enemyHP.progress = 0;
            cc.audioEngine.pauseMusic();
            cc.audioEngine.playEffect(this.winSound, false);
            GlobalData_1.default.exp += 100;
            this.scheduleOnce(function () {
                var _this = this;
                cc.director.loadScene("map2", function () {
                    // const nextScene = cc.director.getScene();
                    var enemyNumString = cc.js.formatStr("%d", _this.enemynum);
                    GlobalData_1.default.nodeToDestroy.push(enemyNumString);
                    // nextScene["nodeToDestroy"] = enemyNumString;
                    // //console.log("nextScene[nodeToDestroy]", enemyNumString);
                    // console.log("nextScene[nodeToDestroy]", nextScene["nodeToDestroy"]);
                });
            }, 4);
        }
        if (this.myLife <= 0 && !this.isLose) {
            this.myLife = 0;
            this.isLose = true;
            this.myTurn = false;
            this.enemyTurn = false;
            this.myHP.progress = 0;
            cc.audioEngine.pauseMusic();
            cc.audioEngine.playEffect(this.loseSound, false);
            this.scheduleOnce(function () {
                cc.director.loadScene("map2");
            }, 4);
        }
        if (this.enemyTurn && !this.myTurn && this.enemyLife > 0) {
            this.enemyTurn = false;
            this.myTurn = true;
            this.enemyTurnAction();
            //this.scheduleOnce(function() {
            //cc.find("Canvas/skill1").getComponent(cc.Button).interactable = this.myTurn;
            // }, 2);
        }
        if (!this.enemyTurn && this.myTurn && this.myLife > 0) {
            //cc.find("Canvas/skill1").getComponent(cc.Button).interactable = this.myTurn;
        }
        cc.find("Canvas/skills/skill1").getComponent(cc.Button).interactable = this.myTurn;
        cc.find("Canvas/skills/skill2").getComponent(cc.Button).interactable = this.myTurn;
        cc.find("Canvas/skills/skill3").getComponent(cc.Button).interactable = this.myTurn;
        cc.find("Canvas/skills/skill4").getComponent(cc.Button).interactable = this.myTurn;
        //}
        cc.audioEngine.setMusicVolume(GlobalData_1.default.volume);
        cc.audioEngine.setEffectsVolume(GlobalData_1.default.volume);
    };
    NewClass.prototype.updateUI = function (dt) {
        this.myHP.progress = this.myLife / 100;
        this.enemyHP.progress = this.enemyLife / 100;
        var myLifeLabel = cc.find("Canvas/myLife").getComponent(cc.Label);
        var enemyLifeLabel = cc.find("Canvas/enemyLife").getComponent(cc.Label);
        myLifeLabel.string = ((Array(7).join("0") + this.myLife.toString()).slice(-3)) + ('/100');
        enemyLifeLabel.string = ((Array(7).join("0") + this.enemyLife.toString()).slice(-3)) + ('/100');
    };
    NewClass.prototype.initSkill1 = function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "battle_man";
        clickEventHandler.handler = "skill1";
        cc.find("Canvas/skills/skill1").getComponent(cc.Button).clickEvents.push(clickEventHandler);
    };
    NewClass.prototype.initSkill2 = function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "battle_man";
        clickEventHandler.handler = "skill2";
        cc.find("Canvas/skills/skill2").getComponent(cc.Button).clickEvents.push(clickEventHandler);
    };
    NewClass.prototype.initSkill3 = function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "battle_man";
        clickEventHandler.handler = "skill3";
        cc.find("Canvas/skills/skill3").getComponent(cc.Button).clickEvents.push(clickEventHandler);
    };
    NewClass.prototype.initSkill4 = function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "battle_man";
        clickEventHandler.handler = "skill4";
        cc.find("Canvas/skills/skill4").getComponent(cc.Button).clickEvents.push(clickEventHandler);
    };
    NewClass.prototype.skill1 = function () {
        //cc.log("skill1");
        var enemyLifeDeduct = cc.callFunc(function (target) {
            this.enemyLife -= 50;
        }, this);
        var turnSwitch1 = cc.callFunc(function (target) {
            this.myTurn = false;
        }, this);
        var turnSwitch2 = cc.callFunc(function (target) {
            this.enemyTurn = true;
        }, this);
        this.node.runAction(cc.sequence(turnSwitch1, cc.moveBy(1, cc.v2(520, 0)), cc.moveBy(1, cc.v2(-520, 0)), enemyLifeDeduct, turnSwitch2));
    };
    NewClass.prototype.skill2 = function () {
        //cc.log("skill2");
        var enemyLifeDeduct = cc.callFunc(function (target) {
            this.enemyLife -= 20;
        }, this);
        var turnSwitch1 = cc.callFunc(function (target) {
            this.myTurn = false;
        }, this);
        var turnSwitch2 = cc.callFunc(function (target) {
            this.enemyTurn = true;
        }, this);
        this.node.runAction(cc.sequence(turnSwitch1, cc.moveBy(1, cc.v2(520, 0)), cc.moveBy(1, cc.v2(-520, 0)), enemyLifeDeduct, turnSwitch2));
    };
    NewClass.prototype.skill3 = function () {
        //cc.log("skill3");
        var enemyLifeDeduct = cc.callFunc(function (target) {
            this.enemyLife -= 20;
        }, this);
        var turnSwitch1 = cc.callFunc(function (target) {
            this.myTurn = false;
        }, this);
        var turnSwitch2 = cc.callFunc(function (target) {
            this.enemyTurn = true;
        }, this);
        this.node.runAction(cc.sequence(turnSwitch1, cc.moveBy(1, cc.v2(520, 0)), cc.moveBy(1, cc.v2(-520, 0)), enemyLifeDeduct, turnSwitch2));
    };
    NewClass.prototype.skill4 = function () {
        //cc.log("skill4");
        var enemyLifeDeduct = cc.callFunc(function (target) {
            this.enemyLife -= 100;
        }, this);
        var turnSwitch1 = cc.callFunc(function (target) {
            this.myTurn = false;
        }, this);
        var turnSwitch2 = cc.callFunc(function (target) {
            this.enemyTurn = true;
        }, this);
        this.node.runAction(cc.sequence(turnSwitch1, cc.moveBy(1, cc.v2(520, 0)), cc.moveBy(1, cc.v2(-520, 0)), enemyLifeDeduct, turnSwitch2));
    };
    NewClass.prototype.enemyTurnAction = function () {
        var enemyAnimation = cc.find("Canvas/enemy").getComponent(cc.Animation);
        var enemyParticleEffect = cc.find("Canvas/enemy/magic").getComponent(cc.ParticleSystem);
        var shakeCamera = cc.callFunc(function (target) {
            var mainCamera = cc.Camera.main;
            this.originalPosition = mainCamera.node.position.clone();
            var shakeSequence = cc.sequence(cc.moveTo(0.05, cc.v2(this.originalPosition.x, this.originalPosition.y + 8)), cc.moveTo(0.05, cc.v2(this.originalPosition.x, this.originalPosition.y - 8)), cc.moveTo(0.05, this.originalPosition));
            // Run the shake sequence on the camera
            cc.find("Canvas/Main Camera").getComponent(cc.Camera).node.runAction(shakeSequence);
            //this.camera.node.runAction(shakeSequence);
        });
        if (this.enemynum == 4) {
            enemyAnimation.play("dong_move");
        }
        else if (this.enemynum == 5) {
        }
        else if (this.enemynum == 6) {
        }
        var myLifeDeduct = cc.callFunc(function (target) {
            //console.log("enemyNum in mylife deduct:", this.enemynum);
            if (this.enemynum == 4)
                this.myLife -= 10;
            else if (this.enemynum == 5)
                this.myLife -= 20;
            else if (this.enemynum == 6)
                this.myLife -= 40;
        }, this);
        var turnSwitch1 = cc.callFunc(function (target) {
            this.myTurn = false;
            this.enemyTurn = false;
        }, this);
        var turnSwitch2 = cc.callFunc(function (target) {
            this.myTurn = true;
            this.enemyTurn = false;
        }, this);
        var particleAction = cc.callFunc(function (target) {
            enemyParticleEffect.resetSystem();
        }, this);
        // let particleAction = cc.callFunc(function(target) {
        //     enemyParticleEffect.stopSystem();
        // }, this);
        var moveAction = cc.callFunc(function (target) {
            if (this.enemynum == 4)
                enemy.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, 50)), cc.moveBy(0.2, cc.v2(0, -50)), particleAction, shakeCamera));
            else if (this.enemynum == 5)
                enemy.runAction(cc.sequence(cc.moveBy(1, cc.v2(-520, 0)), cc.moveBy(1, cc.v2(520, 0))));
            else if (this.enemynum == 6)
                enemy.runAction(cc.sequence(cc.moveBy(1, cc.v2(-520, 0)), cc.moveBy(1, cc.v2(520, 0))));
        }, this);
        var enemy = cc.find("Canvas/enemy");
        enemy.runAction(cc.sequence(turnSwitch1, moveAction, myLifeDeduct, turnSwitch2));
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label", void 0);
    __decorate([
        property
    ], NewClass.prototype, "text", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "battleBgm", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "winSound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "loseSound", void 0);
    __decorate([
        property({ type: cc.Node })
    ], NewClass.prototype, "mainCamera", void 0);
    __decorate([
        property({ type: cc.SpriteFrame })
    ], NewClass.prototype, "enemy1", void 0);
    __decorate([
        property({ type: cc.SpriteFrame })
    ], NewClass.prototype, "enemy2", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], NewClass.prototype, "myHP", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], NewClass.prototype, "enemyHP", void 0);
    __decorate([
        property(man_1.default)
    ], NewClass.prototype, "man", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], NewClass.prototype, "sprite", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxiYXR0bGVfbWFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUF3QjtBQUN4QiwyQ0FBc0M7QUFFaEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUErVkM7UUE1VkcsV0FBSyxHQUFhLElBQUksQ0FBQztRQUd2QixVQUFJLEdBQVcsT0FBTyxDQUFDO1FBR3ZCLGVBQVMsR0FBaUIsSUFBSSxDQUFDO1FBRy9CLGNBQVEsR0FBaUIsSUFBSSxDQUFDO1FBRzlCLGVBQVMsR0FBaUIsSUFBSSxDQUFDO1FBRy9CLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLFlBQU0sR0FBbUIsSUFBSSxDQUFDO1FBRzlCLFlBQU0sR0FBbUIsSUFBSSxDQUFDO1FBRzlCLFVBQUksR0FBbUIsSUFBSSxDQUFDO1FBRzVCLGFBQU8sR0FBbUIsSUFBSSxDQUFDO1FBRy9CLFNBQUcsR0FBUSxJQUFJLENBQUM7UUFHaEIsWUFBTSxHQUFxQixFQUFFLENBQUM7UUFFOUIsU0FBRyxHQUFZLG9CQUFVLENBQUMsU0FBUyxDQUFDO1FBRXBDLFlBQU0sR0FBVSxvQkFBVSxDQUFDLE1BQU0sQ0FBQztRQUUxQixZQUFNLEdBQVcsR0FBRyxDQUFDO1FBQ3JCLGVBQVMsR0FBVyxHQUFHLENBQUM7UUFDeEIsV0FBSyxHQUFZLEtBQUssQ0FBQztRQUN2QixZQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixjQUFRLEdBQUcsQ0FBQyxDQUFDOztJQStTekIsQ0FBQztJQTdTRyx3QkFBd0I7SUFFeEIseUJBQU0sR0FBTjtRQUNJLHNEQUFzRDtRQUN0RCwyQ0FBMkM7UUFDM0MsbUNB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QUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUE7SUFDekksQ0FBQztJQUVELHlCQUFNLEdBQU47UUFDSSxtQkFBbUI7UUFDbkIsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFTLE1BQU07WUFDN0MsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFTLE1BQU07WUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFTLE1BQU07WUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUE7SUFDekksQ0FBQztJQUVELHlCQUFNLEdBQU47UUFDSSxtQkFBbUI7UUFDbkIsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFTLE1BQU07WUFDN0MsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFTLE1BQU07WUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFTLE1BQU07WUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUE7SUFDekksQ0FBQztJQUVELHlCQUFNLEdBQU47UUFDSSxtQkFBbUI7UUFDbkIsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFTLE1BQU07WUFDN0MsSUFBSSxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUM7UUFDMUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFTLE1BQU07WUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIs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RUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxDQUFDO2dEQUNFO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUMsQ0FBQzs0Q0FDRjtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsV0FBVyxFQUFDLENBQUM7NENBQ0Y7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzswQ0FDRztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzZDQUNNO0lBRy9CO1FBREMsUUFBUSxDQUFDLGFBQUcsQ0FBQzt5Q0FDRTtJQUdoQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzs0Q0FDRztJQXBDYixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBK1Y1QjtJQUFELGVBQUM7Q0EvVkQsQUErVkMsQ0EvVnFDLEVBQUUsQ0FBQyxTQUFTLEdBK1ZqRDtrQkEvVm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFuIGZyb20gXCIuL21hblwiO1xyXG5pbXBvcnQgR2xvYmFsRGF0YSBmcm9tIFwiLi9HbG9iYWxEYXRhXCI7XHJcbmRlY2xhcmUgY29uc3QgZmlyZWJhc2U6IGFueTtcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHRleHQ6IHN0cmluZyA9ICdoZWxsbyc7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkF1ZGlvQ2xpcH0pXHJcbiAgICBiYXR0bGVCZ206IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkF1ZGlvQ2xpcH0pXHJcbiAgICB3aW5Tb3VuZDogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuQXVkaW9DbGlwfSlcclxuICAgIGxvc2VTb3VuZDogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZX0pXHJcbiAgICBtYWluQ2FtZXJhOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuU3ByaXRlRnJhbWV9KVxyXG4gICAgZW5lbXkxOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlNwcml0ZUZyYW1lfSlcclxuICAgIGVuZW15MjogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcclxuICAgIG15SFA6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBlbmVteUhQOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KE1hbilcclxuICAgIG1hbjogTWFuID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHNwcml0ZTogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIGJhZzogbnVtYmVyW10gPUdsb2JhbERhdGEucG9rZXdvbWFuO1xyXG5cclxuICAgIG15bGlmZTogbnVtYmVyID1HbG9iYWxEYXRhLm15bGlmZTtcclxuXHJcbiAgICBwcml2YXRlIG15TGlmZTogbnVtYmVyID0gMTAwO1xyXG4gICAgcHJpdmF0ZSBlbmVteUxpZmU6IG51bWJlciA9IDEwMDtcclxuICAgIHByaXZhdGUgaXNXaW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgbXlUdXJuOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgZW5lbXlUdXJuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGlzTG9zZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBlbmVteW51bSA9IDA7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICAvLyB0aGlzLmVuZW15bnVtID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKVtcImVuZW15TnVtXCJdO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZW5lbXlOdW06XCIsIHRoaXMuZW5lbXludW0pO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuZW5lbXludW0gIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiTnVtYmVyIHBhc3NlZCBmcm9tIHByZXZpb3VzIHNjZW5lOlwiLCB0aGlzLmVuZW15bnVtKTtcclxuICAgICAgICAvLyAgICAgLy90aGlzLmVuZW15bnVtID0gZW5lbXlOdW07XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9za2lsbHMvYmFnMicpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdiYWdfYmF0dGxlJyk7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9za2lsbHMnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL2JhZ3MyJykuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLmVuZW15bnVtID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKVtcImVuZW15TnVtXCJdO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlW3RoaXMuYmFnW0dsb2JhbERhdGEubXllbGZdXTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiZW5lbXlOdW06XCIsIHRoaXMuZW5lbXludW0pO1xyXG5cclxuICAgICAgICBpZih0aGlzLmVuZW15bnVtICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiTnVtYmVyIHBhc3NlZCBmcm9tIHByZXZpb3VzIHNjZW5lOlwiLCB0aGlzLmVuZW15bnVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZW5lbXludW0gPT0gNCl7XHJcbiAgICAgICAgICAgIGlmKGNjLmZpbmQoXCJDYW52YXMvZW5lbXlcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL2VuZW15XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5lbmVteTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5lbmVteW51bSA9PSA1KXtcclxuICAgICAgICAgICAgaWYoY2MuZmluZChcIkNhbnZhcy9lbmVteVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvZW5lbXlcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmVuZW15MjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5iYXR0bGVCZ20sIHRydWUpO1xyXG4gICAgICAgIHRoaXMuaW5pdFNraWxsMSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFNraWxsMigpO1xyXG4gICAgICAgIHRoaXMuaW5pdFNraWxsMygpO1xyXG4gICAgICAgIHRoaXMuaW5pdFNraWxsNCgpO1xyXG5cclxuICAgICAgICBsZXQgZW5lbXlQYXJ0aWNsZUVmZmVjdDIgPSBjYy5maW5kKFwiQ2FudmFzL2VuZW15L29uTG9hZFwiKS5nZXRDb21wb25lbnQoY2MuUGFydGljbGVTeXN0ZW0pO1xyXG4gICAgICAgIGlmKHRoaXMuZW5lbXludW0gPT0gNCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5lbmVteW51bSA9PSA0XCIpO1xyXG4gICAgICAgICAgICBlbmVteVBhcnRpY2xlRWZmZWN0Mi5wbGF5T25Mb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZW5lbXlQYXJ0aWNsZUVmZmVjdDIucmVzZXRTeXN0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KXtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZVt0aGlzLmJhZ1tHbG9iYWxEYXRhLm15ZWxmXV07XHJcbiAgICAgICAgdGhpcy51cGRhdGVVSShkdCk7XHJcbiAgICAgICAgaWYodGhpcy5lbmVteUxpZmUgPD0gMCAmJiAhdGhpcy5pc1dpbil7XHJcbiAgICAgICAgICAgIC8vIHZhciB1aWQgPSBHbG9iYWxEYXRhLnVpZDtcclxuICAgICAgICAgICAgLy8gY29uc3QgZGF0YWJhc2UgPSBmaXJlYmFzZS5kYXRhYmFzZSgpO1xyXG4gICAgICAgICAgICAvLyBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigndXNlcicpLmNoaWxkKEdsb2JhbERhdGEudWlkKS51cGRhdGUoe1xyXG4gICAgICAgICAgICAvLyAgICAgbXlBcnJheTogW3RoaXMuZW5lbXludW1dLFxyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgR2xvYmFsRGF0YS5wb2tld29tYW4ucHVzaCh0aGlzLmVuZW15bnVtKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHbG9iYWxEYXRhLnBva2V3b21hbjpcIiwgR2xvYmFsRGF0YS5wb2tld29tYW4pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlMaWZlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5pc1dpbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlIUC5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlTXVzaWMoKTtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLndpblNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIEdsb2JhbERhdGEuZXhwICs9IDEwMDtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJtYXAyXCIsICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgbmV4dFNjZW5lID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZW5lbXlOdW1TdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCIlZFwiLCB0aGlzLmVuZW15bnVtKTtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWxEYXRhLm5vZGVUb0Rlc3Ryb3kucHVzaChlbmVteU51bVN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmV4dFNjZW5lW1wibm9kZVRvRGVzdHJveVwiXSA9IGVuZW15TnVtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIC8vY29uc29sZS5sb2coXCJuZXh0U2NlbmVbbm9kZVRvRGVzdHJveV1cIiwgZW5lbXlOdW1TdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwibmV4dFNjZW5lW25vZGVUb0Rlc3Ryb3ldXCIsIG5leHRTY2VuZVtcIm5vZGVUb0Rlc3Ryb3lcIl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSwgNCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm15TGlmZTw9MCAmJiAhdGhpcy5pc0xvc2Upe1xyXG4gICAgICAgICAgICB0aGlzLm15TGlmZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb3NlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5teVR1cm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lbmVteVR1cm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5teUhQLnByb2dyZXNzID0gMDtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VNdXNpYygpO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMubG9zZVNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwibWFwMlwiKTtcclxuICAgICAgICAgICAgfSwgNCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmVuZW15VHVybiAmJiAhdGhpcy5teVR1cm4gJiYgdGhpcy5lbmVteUxpZmUgPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5lbmVteVR1cm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5teVR1cm4gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15VHVybkFjdGlvbigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy90aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIC8vY2MuZmluZChcIkNhbnZhcy9za2lsbDFcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdGhpcy5teVR1cm47XHJcbiAgICAgICAgICAgIC8vIH0sIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXRoaXMuZW5lbXlUdXJuICYmIHRoaXMubXlUdXJuICYmIHRoaXMubXlMaWZlID4gMCl7XHJcblxyXG4gICAgICAgICAgICAvL2NjLmZpbmQoXCJDYW52YXMvc2tpbGwxXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRoaXMubXlUdXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL3NraWxscy9za2lsbDFcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdGhpcy5teVR1cm47XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9za2lsbHMvc2tpbGwyXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRoaXMubXlUdXJuO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvc2tpbGxzL3NraWxsM1wiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0aGlzLm15VHVybjtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL3NraWxscy9za2lsbDRcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdGhpcy5teVR1cm47XHJcbiAgICAvL31cclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRNdXNpY1ZvbHVtZShHbG9iYWxEYXRhLnZvbHVtZSk7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0RWZmZWN0c1ZvbHVtZShHbG9iYWxEYXRhLnZvbHVtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVUkoZHQpe1xyXG4gICAgICAgIHRoaXMubXlIUC5wcm9ncmVzcyA9IHRoaXMubXlMaWZlIC8gMTAwO1xyXG4gICAgICAgIHRoaXMuZW5lbXlIUC5wcm9ncmVzcyA9IHRoaXMuZW5lbXlMaWZlIC8gMTAwO1xyXG4gICAgICAgIGNvbnN0IG15TGlmZUxhYmVsID0gY2MuZmluZChcIkNhbnZhcy9teUxpZmVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBjb25zdCBlbmVteUxpZmVMYWJlbCA9IGNjLmZpbmQoXCJDYW52YXMvZW5lbXlMaWZlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgIFxyXG4gICAgICAgIG15TGlmZUxhYmVsLnN0cmluZyA9ICgoQXJyYXkoNykuam9pbihcIjBcIikgKyB0aGlzLm15TGlmZS50b1N0cmluZygpKS5zbGljZSgtMykpICsgKCcvMTAwJyk7XHJcbiAgICAgICAgZW5lbXlMaWZlTGFiZWwuc3RyaW5nID0gKChBcnJheSg3KS5qb2luKFwiMFwiKSArIHRoaXMuZW5lbXlMaWZlLnRvU3RyaW5nKCkpLnNsaWNlKC0zKSkgKyAoJy8xMDAnKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0U2tpbGwxKCl7XHJcbiAgICAgICAgbGV0IGNsaWNrRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci50YXJnZXQgPSB0aGlzLm5vZGU7IFxyXG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmNvbXBvbmVudCA9IFwiYmF0dGxlX21hblwiO1xyXG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmhhbmRsZXIgPSBcInNraWxsMVwiO1xyXG5cclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL3NraWxscy9za2lsbDFcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChjbGlja0V2ZW50SGFuZGxlcik7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXRTa2lsbDIoKXtcclxuICAgICAgICBsZXQgY2xpY2tFdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLnRhcmdldCA9IHRoaXMubm9kZTsgXHJcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIuY29tcG9uZW50ID0gXCJiYXR0bGVfbWFuXCI7XHJcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIuaGFuZGxlciA9IFwic2tpbGwyXCI7XHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvc2tpbGxzL3NraWxsMlwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50cy5wdXNoKGNsaWNrRXZlbnRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0U2tpbGwzKCl7XHJcbiAgICAgICAgbGV0IGNsaWNrRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci50YXJnZXQgPSB0aGlzLm5vZGU7IFxyXG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmNvbXBvbmVudCA9IFwiYmF0dGxlX21hblwiO1xyXG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmhhbmRsZXIgPSBcInNraWxsM1wiO1xyXG5cclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL3NraWxscy9za2lsbDNcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChjbGlja0V2ZW50SGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFNraWxsNCgpe1xyXG4gICAgICAgIGxldCBjbGlja0V2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIudGFyZ2V0ID0gdGhpcy5ub2RlOyBcclxuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci5jb21wb25lbnQgPSBcImJhdHRsZV9tYW5cIjtcclxuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci5oYW5kbGVyID0gXCJza2lsbDRcIjtcclxuXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9za2lsbHMvc2tpbGw0XCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goY2xpY2tFdmVudEhhbmRsZXIpO1xyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBza2lsbDEoKXtcclxuICAgICAgICAvL2NjLmxvZyhcInNraWxsMVwiKTtcclxuICAgICAgICBsZXQgZW5lbXlMaWZlRGVkdWN0ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlMaWZlIC09IDUwO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICBsZXQgdHVyblN3aXRjaDEgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5teVR1cm4gPSBmYWxzZTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgbGV0IHR1cm5Td2l0Y2gyID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlUdXJuID0gdHJ1ZTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZSh0dXJuU3dpdGNoMSwgY2MubW92ZUJ5KDEsIGNjLnYyKDUyMCwgMCkpLCBjYy5tb3ZlQnkoMSwgY2MudjIoLTUyMCwgMCkpLGVuZW15TGlmZURlZHVjdCwgdHVyblN3aXRjaDIpKVxyXG4gICAgfVxyXG5cclxuICAgIHNraWxsMigpe1xyXG4gICAgICAgIC8vY2MubG9nKFwic2tpbGwyXCIpO1xyXG4gICAgICAgIGxldCBlbmVteUxpZmVEZWR1Y3QgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVteUxpZmUgLT0gMjA7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIGxldCB0dXJuU3dpdGNoMSA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLm15VHVybiA9IGZhbHNlO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICBsZXQgdHVyblN3aXRjaDIgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVteVR1cm4gPSB0cnVlO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKHR1cm5Td2l0Y2gxLCBjYy5tb3ZlQnkoMSwgY2MudjIoNTIwLCAwKSksIGNjLm1vdmVCeSgxLCBjYy52MigtNTIwLCAwKSksZW5lbXlMaWZlRGVkdWN0LCB0dXJuU3dpdGNoMikpXHJcbiAgICB9XHJcblxyXG4gICAgc2tpbGwzKCl7XHJcbiAgICAgICAgLy9jYy5sb2coXCJza2lsbDNcIik7XHJcbiAgICAgICAgbGV0IGVuZW15TGlmZURlZHVjdCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15TGlmZSAtPSAyMDtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgbGV0IHR1cm5Td2l0Y2gxID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubXlUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIGxldCB0dXJuU3dpdGNoMiA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15VHVybiA9IHRydWU7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UodHVyblN3aXRjaDEsIGNjLm1vdmVCeSgxLCBjYy52Mig1MjAsIDApKSwgY2MubW92ZUJ5KDEsIGNjLnYyKC01MjAsIDApKSxlbmVteUxpZmVEZWR1Y3QsIHR1cm5Td2l0Y2gyKSlcclxuICAgIH1cclxuXHJcbiAgICBza2lsbDQoKXtcclxuICAgICAgICAvL2NjLmxvZyhcInNraWxsNFwiKTtcclxuICAgICAgICBsZXQgZW5lbXlMaWZlRGVkdWN0ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlMaWZlIC09IDEwMDtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgbGV0IHR1cm5Td2l0Y2gxID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubXlUdXJuID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIGxldCB0dXJuU3dpdGNoMiA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15VHVybiA9IHRydWU7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UodHVyblN3aXRjaDEsIGNjLm1vdmVCeSgxLCBjYy52Mig1MjAsIDApKSwgY2MubW92ZUJ5KDEsIGNjLnYyKC01MjAsIDApKSxlbmVteUxpZmVEZWR1Y3QsIHR1cm5Td2l0Y2gyKSlcclxuICAgIH1cclxuICAgIGVuZW15VHVybkFjdGlvbigpe1xyXG4gICAgICAgIGxldCBlbmVteUFuaW1hdGlvbiA9IGNjLmZpbmQoXCJDYW52YXMvZW5lbXlcIikuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgbGV0IGVuZW15UGFydGljbGVFZmZlY3QgPSBjYy5maW5kKFwiQ2FudmFzL2VuZW15L21hZ2ljXCIpLmdldENvbXBvbmVudChjYy5QYXJ0aWNsZVN5c3RlbSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNoYWtlQ2FtZXJhID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1haW5DYW1lcmEgPSBjYy5DYW1lcmEubWFpbjtcclxuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFBvc2l0aW9uID0gbWFpbkNhbWVyYS5ub2RlLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoYWtlU2VxdWVuY2UgPSBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjA1LCBjYy52Mih0aGlzLm9yaWdpbmFsUG9zaXRpb24ueCAsIHRoaXMub3JpZ2luYWxQb3NpdGlvbi55ICsgOCkpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuMDUsIGNjLnYyKHRoaXMub3JpZ2luYWxQb3NpdGlvbi54LCB0aGlzLm9yaWdpbmFsUG9zaXRpb24ueSAtIDgpKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjA1LCB0aGlzLm9yaWdpbmFsUG9zaXRpb24pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gUnVuIHRoZSBzaGFrZSBzZXF1ZW5jZSBvbiB0aGUgY2FtZXJhXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvTWFpbiBDYW1lcmFcIikuZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSkubm9kZS5ydW5BY3Rpb24oc2hha2VTZXF1ZW5jZSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5jYW1lcmEubm9kZS5ydW5BY3Rpb24oc2hha2VTZXF1ZW5jZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZW5lbXludW0gPT0gNCl7XHJcbiAgICAgICAgICAgIGVuZW15QW5pbWF0aW9uLnBsYXkoXCJkb25nX21vdmVcIik7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5lbmVteW51bSA9PSA1KXtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmVuZW15bnVtID09IDYpe1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbXlMaWZlRGVkdWN0ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJlbmVteU51bSBpbiBteWxpZmUgZGVkdWN0OlwiLCB0aGlzLmVuZW15bnVtKTtcclxuICAgICAgICAgICAgaWYodGhpcy5lbmVteW51bSA9PSA0KSB0aGlzLm15TGlmZSAtPSAxMDtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmVuZW15bnVtID09IDUpIHRoaXMubXlMaWZlIC09IDIwO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuZW5lbXludW0gPT0gNikgdGhpcy5teUxpZmUgLT0gNDA7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIGxldCB0dXJuU3dpdGNoMSA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLm15VHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15VHVybiA9IGZhbHNlO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICBsZXQgdHVyblN3aXRjaDIgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5teVR1cm4gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15VHVybiA9IGZhbHNlO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICBsZXQgcGFydGljbGVBY3Rpb24gPSBjYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpIHtcclxuICAgICAgICAgICAgZW5lbXlQYXJ0aWNsZUVmZmVjdC5yZXNldFN5c3RlbSgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICAvLyBsZXQgcGFydGljbGVBY3Rpb24gPSBjYy5jYWxsRnVuYyhmdW5jdGlvbih0YXJnZXQpIHtcclxuICAgICAgICAvLyAgICAgZW5lbXlQYXJ0aWNsZUVmZmVjdC5zdG9wU3lzdGVtKCk7XHJcbiAgICAgICAgLy8gfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBtb3ZlQWN0aW9uID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZW5lbXludW0gPT0gNClcclxuICAgICAgICAgICAgICAgIGVuZW15LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC42LCBjYy52MigwLCA1MCkpLCBjYy5tb3ZlQnkoMC4yLCBjYy52MigwLCAtNTApKSwgcGFydGljbGVBY3Rpb24sIHNoYWtlQ2FtZXJhKSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5lbmVteW51bSA9PSA1KVxyXG4gICAgICAgICAgICAgICAgZW5lbXkucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgxLCBjYy52MigtNTIwLCAwKSksIGNjLm1vdmVCeSgxLCBjYy52Mig1MjAsIDApKSkpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuZW5lbXludW0gPT0gNilcclxuICAgICAgICAgICAgICAgIGVuZW15LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMSwgY2MudjIoLTUyMCwgMCkpLCBjYy5tb3ZlQnkoMSwgY2MudjIoNTIwLCAwKSkpKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgXHJcblxyXG5cclxuICAgICAgICBsZXQgZW5lbXkgPSBjYy5maW5kKFwiQ2FudmFzL2VuZW15XCIpO1xyXG4gICAgICAgIGVuZW15LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZSh0dXJuU3dpdGNoMSwgbW92ZUFjdGlvbiwgbXlMaWZlRGVkdWN0LCB0dXJuU3dpdGNoMikpXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbn1cclxuIl19