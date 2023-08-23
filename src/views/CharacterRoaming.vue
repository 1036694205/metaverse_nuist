<template>
<div>

    <div class="flex-center" v-show="boxshow">
      <div class="loading cube-box">
        <div class="outer-box">
          <div class="large-box">
            <div class="small-box">
            </div>
          </div>
        </div>
      </div>
  </div>

  <div style="left:40%;position:absolute;top: 60%;font-size:40px" v-show="numshow">
      <div class="box" id="div_box">
          <div class="load" id="load"></div>
          </div>
      <span id='result' style=""></span>
  </div>

  <div class="wow fadeIn" data-wow-duration="5s">
      <div id="container" v-show="convesshow"></div>
      <div id="smallscreen" v-show="convessmallshow"><p id="smallscreenlabel"></p></div>
  </div>
</div>
    
  
</template>

<script>

import WOW from "wow.js";
import * as THREE from "three";
import { clickPick } from "../../public/static/js/clickPick";
import * as dat from "dat.gui";
import {
  initBaseScene,
  initBaseRenderer,
  // initBasesmallRenderer,
  initBaseControls,
  initBaseCamera,
  // initBasesmallCamera,
  initGui,
  initbox,
} from "@/utils/baseElement";
import {
  initArrow,
  initTrigger,
  initArrow2,
  initTrigger2,
  initArrow3,
  initTrigger3,
  initArrow4,
  initTrigger4,
  initArrow5,
  initTrigger5,
  initArrow6,
  initTrigger6,
  initArrow7,
  initTrigger7,
  initArrowpeople,
  initModel,
  initScene,
  initCar,
  initCarPerson,
  initModelbaoan,
} from "@/utils/modelList.js";
import { initLight, initRGB } from "@/utils/enviromentInit";
import { updateTrigger,
  updateTrigger2,
  updateTrigger3,
  updateTrigger4,
  updateTrigger5,
  updateTrigger6,
  updateTrigger7,
} from "@/utils/interactRole";
import { listenKeyEvent, Update, 
  DriveUpdate,baoanUpdate,mixerviedoupdate } from "@/utils/personRoaming";
export default {
  data() {
    return {
      issmallshow:false,
      ismusic:false,
      convessmallshow:false,
      numshow:true,
      boxshow:true,
      convesshow:false,
      mixer: null,
      mixerviedo: null,
      mixerbaoan: null,
      carMixer: null,
      clock: new THREE.Clock(),
      caryaoshi:0,
      actions: {},
      keyPress: {
        KeyW: false,
        KeyA: false,
        KeyD: false,
        KeyS: false,
        KeyF: false,
        KeyE: false,
        Space: false,
        ShiftLeft: false,
        ShiftRight: false,
        isDown: false,
      },
      carKeyPress: {
        KeyW: false,
        KeyA: false,
        KeyD: false,
        KeyS: false,
        isDown: false,
      },
      walkDirection: new THREE.Vector3(0, 0, 0),
      rotateAngle: new THREE.Vector3(0, 1, 0),
      rotateQuarternion: new THREE.Quaternion(),
      cameraTarget: new THREE.Vector3(),
      fadeDuration: 0.4,
      fadeInDuration: 0.2,
      runVeloctiy: 35,
      walkVelocity: 15,
      carVelocity: 55,
      directionOffset: 0,
      player: {
        gravity: -9.8,
        // 玩家的速度
        playerVelocity: new THREE.Vector3(0, 0, 0),
        // 方向向量
        playerDirection: new THREE.Vector3(0, 0, 0),
      },
      characterControls: {
        toggleRun: true,
      },
      currentAction: "idle",
      isFocus: true,
      oldX: 696,
      oldZ: 16,
      effectController: {
        A: "",
      },
      colliders: [],
      carColliders: [],
      newcolliders: [],
      playerHalfHeight: new THREE.Vector3(0, 8, 0),
      isDrive: false,
      isInner: false,
      isInner2: false,
      isInner3: false,
      isInner4: false,
      isInner5: false,
      isInner6: false,
      isInner7: false,
    };
    
  },
  mounted() {



    var n=0;
    var load=document.getElementById('load');
    var result=document.getElementById('result');
    var i=0;
    var timer=setInterval(function(){
            // for(i=0;i<=100;i++){
                // i+=1;
                if(i<100){
                    i+=2;
                  	load.style.width=i*3+'px';
                    result.innerText=i+'%';
                }
                if(i>=100){
                    clearInterval(timer);
                }
              //  console.log(i)
        // }
    },90);

    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
      callback: function (box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null, // optional scroll container selector, otherwise use window,
      resetAnimation: true, // reset animation on end (default is true)
    });
    // wow.init();



    this.container = document.querySelector("#container");
    // this.smallscreen = document.querySelector("#smallscreen");
    this.initThree();
    this.initEnviroment();
    this.initSceneElement();
    this.animate();


    var smallcamera;
    smallcamera= new THREE.PerspectiveCamera(120, 1, 0.1, 100000);
    smallcamera.position.set(0, 1050, 0);
    // smallcamera.rotateX = Math.PI/4;
    smallcamera.lookAt(new THREE.Vector3(0, 0, 0));
    smallcamera.rotateZ(0); 
    var smallrender;
    smallrender = new THREE.WebGLRenderer({ antialias: false, alpha: false, logarithmicDepthBuffer: false });
    smallrender.setSize(1000,650);
    // smallrender.setSize(window.innerWidth / window.innerHeight);
    smallrender.autoClear=false;
    document.getElementById("smallscreen").appendChild(smallrender.domElement);
    // 渲染函数
    const rendersmallscreen = () => {
    // 更新控制器
    // controls.update();
    // 渲染场景
    // renderer.render(scene, camera);
    smallrender.render(this.scene, smallcamera);
    // 循环渲染
    requestAnimationFrame(rendersmallscreen);
  };
  rendersmallscreen();


    // const gui = new dat.GUI();
    // gui
    // .add(smallcamera.position, "y")
    // .min(0)
    // .max(2000)
    // .step(10)
    // .name("移动y轴")
    // gui
    // .add(smallcamera.position, "x")
    // .min(-500)
    // .max(500)
    // .step(1)
    // .name("移动x轴")
    // gui
    // .add(smallcamera.position, "z")
    // .min(-500)
    // .max(500)
    // .step(1)
    // .name("移动z轴")

    window.onfocus = () => {
      this.isFocus = true;
    };
    window.onblur = () => {
      this.isFocus = false;
    };

    
     
  },


  
  methods: {
    
    
    initThree() {
      // Camera
      initBaseCamera(this);
      // initBasesmallCamera(this);
      // Scene
      initBaseScene(this);
      // Renderer
      initBaseRenderer(this);
      // initBasesmallRenderer(this);
      //   controls
      initBaseControls(this);
      initbox(this);
      //   gui
      // initGui(this);
      //   click
      //   clickPick(this);
    },
    initEnviroment() {
      initLight(this);
      initRGB(this);
    },
    initSceneElement() {
      listenKeyEvent(this);
      // 加载箭头
      initArrow(this);
      initArrow2(this);
      initArrow3(this);
      initArrow4(this);
      initArrow5(this);
      initArrow6(this);
      initArrow7(this);
      //   加载光阵
      initTrigger(this);
      initTrigger2(this);
      initTrigger3(this);
      initTrigger4(this);
      initTrigger5(this);
      initTrigger6(this);
      initTrigger7(this);
      initArrowpeople(this);
      //   加载人物
      initModel(this);
      initModelbaoan(this);
      //   加载场景
      initScene(this);
      //   加载汽车
      initCar(this);
      initCarPerson(this);
    },
    animate() {
      // setTimeout(tishi,5000) ;
      const delta = this.clock.getDelta();
      requestAnimationFrame(this.animate);
      this.controls.update();
      if (this.mixer && !this.isDrive) {
        Update(this, delta);
      }
      if (this.carMixer && this.isDrive) {
        this.carMixer.update(delta);
        DriveUpdate(this, delta);
      }
      if (this.mixerbaoan && this.Robotbaoan) {
        baoanUpdate(this, delta);
      }
      // if (this.mixerviedo ) {
      //   mixerviedoupdate(this, delta);
      // }
      
      // this.mixerbaoan.update(delta);
      // this.mixerviedo.update();
      if (this.trigger && this.Robot) {
        updateTrigger(this);
      }
      if (this.trigger2 && this.Robot) {
        updateTrigger2(this);
      }
      if (this.trigger3 && this.Robot) {
        updateTrigger3(this);
      }
      if (this.trigger4 && this.Robot) {
        updateTrigger4(this);
      }
      if (this.trigger5 && this.Robot) {
        updateTrigger5(this);
      }
      if (this.trigger6 && this.Robot) {
        updateTrigger6(this);
      }
      if (this.trigger7 && this.Robot) {
        updateTrigger7(this);
      }
      this.renderer.render(this.scene, this.camera);
    },
  },
};


</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}
.flex-center {
  position: relative;
            width: 1500px;
            height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}
body {
  height: 100vh;
  /* background: #8d09bf; */
}
/* grid宫格 */
.loading-grid {
  display: grid;
  /* background: green; */
  grid-template-columns: repeat(3, 240px);
  grid-template-rows: repeat(3, 240px);
}

.loading-grid > div:hover {
  transition: transform 0.2s ease;
  border: 1px solid #eee;
  transform: scale(1.1);
  cursor: pointer;
}

/* two-balls loading START */
.two-balls {
  position: relative;
  width: 44px;
}

.two-balls div {
  position: absolute;
  top: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  animation: two-balls-pink 1.05s ease-in-out infinite;
}

.two-balls .pink {
  background-color: #ff4a69;
  left: -2px;
}
.two-balls .blue {
  animation-name: two-balls-blue;
  background-color: #1342ed;
  right: -2px;
}

@keyframes two-balls-pink {
  from {
    z-index: 1;
  }
  50% {
    transform: translateX(calc(20px + 3 * 2px));
  }
}

@keyframes two-balls-blue {
  50% {
    transform: translateX(calc(-20px - 3 * 2px));
  }
}
/* two-balls loading END */
.three-balls-bounce {
  position: relative;
  width: 200px;
  height: 62px;
}
/* three-ball-bounce loading START */
.three-balls-bounce .circle {
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 50%;
  background-color: #ff4a69;
  left: 15%;
  transform-origin: 50%;
  animation: balls-circle 0.5s alternate-reverse infinite ease;
}

.three-balls-bounce .shadow {
  width: 20px;
  height: 4px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 62px;
  transform-origin: 50%;
  z-index: -1;
  left: 15%;
  filter: blur(1px);
  animation: balls-shadow 0.5s alternate-reverse infinite ease;
}
.three-balls-bounce .shadow:nth-child(4),
.three-balls-bounce .circle:nth-child(2) {
  left: 45%;
  animation-delay: 0.2s;
}
.three-balls-bounce .shadow:nth-child(5),
.three-balls-bounce .circle:nth-child(3) {
  left: auto;
  right: 15%;
  animation-delay: 0.3s;
}

@keyframes balls-circle {
  0% {
    top: 60px;
    height: 5px;
    border-radius: 50px 50px 25px 25px;
    transform: scaleX(1.7);
  }
  40% {
    height: 20px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0%;
  }
}
@keyframes balls-shadow {
  0% {
    transform: scaleX(1.5);
  }
  40% {
    transform: scaleX(1);
    opacity: 0.7;
  }
  100% {
    transform: scaleX(0.2);
    opacity: 0.4;
  }
}

/* three-ball-bounce loading END */

/* four-balls laoding START */
.four-balls {
  height: 50px;
  width: 50px;
  animation: four-balls-rotate 1s infinite;
}

.four-balls:before,
.four-balls:after {
  border-radius: 50%;
  content: '';
  display: block;
  height: 20px;
  width: 20px;
}
.four-balls:before {
  animation: ball1 1s infinite;
  background-color: #cb2025;
  box-shadow: 30px 0 0 #f8b334;
  margin-bottom: 10px;
}
.four-balls:after {
  animation: ball2 1s infinite;
  background-color: #00a096;
  box-shadow: 30px 0 0 #97bf0d;
}

@keyframes four-balls-rotate {
  0% {
    transform: rotate(0deg) scale(0.8);
  }
  50% {
    transform: rotate(360deg) scale(1.2);
  }
  100% {
    transform: rotate(720deg) scale(0.8);
  }
}

@keyframes ball1 {
  0% {
    box-shadow: 30px 0 0 #f8b334;
  }
  50% {
    box-shadow: 0 0 0 #f8b334;
    margin-bottom: 0;
    transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #f8b334;
    margin-bottom: 10px;
  }
}

@keyframes ball2 {
  0% {
    box-shadow: 30px 0 0 #97bf0d;
  }
  50% {
    box-shadow: 0 0 0 #97bf0d;
    margin-top: -20px;
    transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #97bf0d;
    margin-top: 0;
  }
}
/* four-balls laoding END */

/* cube-box loading START */
.outer-box {
  width: 3em;
  height: 3em;
  animation: cube-box-ani 1s infinite ease-in-out;
  outline: 1px solid transparent;
}

.large-box {
  height: 3em;
  width: 3em;
  background-color: #ff4a69;
  outline: 1px solid transparent;
}

.small-box {
  height: 3em;
  width: 3em;
  background-color: white;
  z-index: 1;
  outline: 1px solid transparent;
  animation: small-box-ani 1s alternate infinite ease-in-out;
}

@keyframes small-box-ani {
  0% {
    transform: scale(0.2);
  }
  100% {
    transform: scale(0.75);
  }
}

@keyframes cube-box-ani {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
}

/* cube-box loading END */

/* circle loading START */
.ring {
  width: 48px;
  height: 48px;
  border: 6px rgb(255 74 105 / 25%) solid;
  border-top: 6px #ff4a69 solid;
  border-radius: 50%;
  animation: spin 0.6s infinite linear;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
/* circle loading END */

/* slices loading START */
.slices {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border-top: 24px rgb(255 74 105 / 75%) solid;
  border-left: 24px rgb(255 74 105 / 25%) solid;
  border-bottom: 24px rgb(255 74 105 / 25%) solid;
  border-right: 24px rgb(255 74 105 / 25%) solid;
  animation: slices 1s infinite linear;
}

@keyframes slices {
  0% {
    border-top: 24px rgb(255 74 105 / 75%) solid;
    border-right: 24px rgb(255 74 105 / 25%) solid;
    border-bottom: 24px rgb(255 74 105 / 25%) solid;
    border-left: 24px rgb(255 74 105 / 25%) solid;
  }
  25% {
    border-top: 24px rgb(255 74 105 / 25%) solid;
    border-right: 24px rgb(255 74 105 / 75%) solid;
    border-bottom: 24px rgb(255 74 105 / 25%) solid;
    border-left: 24px rgb(255 74 105 / 25%) solid;
  }
  50% {
    border-top: 24px rgb(255 74 105 / 25%) solid;
    border-right: 24px rgb(255 74 105 / 25%) solid;
    border-bottom: 24px rgb(255 74 105 / 75%) solid;
    border-left: 24px rgb(255 74 105 / 25%) solid;
  }
  75% {
    border-top: 24px rgb(255 74 105 / 25%) solid;
    border-right: 24px rgb(255 74 105 / 25%) solid;
    border-bottom: 24px rgb(255 74 105 / 25%) solid;
    border-left: 24px rgb(255 74 105 / 75%) solid;
  }
  100% {
    border-top: 24px rgb(255 74 105 / 75%) solid;
    border-right: 24px rgb(255 74 105 / 25%) solid;
    border-bottom: 24px rgb(255 74 105 / 25%) solid;
    border-left: 24px rgb(255 74 105 / 25%) solid;
  }
}
/* slices loading END */

/* hydrogen loading START */
.hydrogen {
  width: 48px;
  height: 48px;
  position: relative;
  border: 1px #000 dotted;
  border-radius: 50%;
  animation: spin 1s infinite linear;
}
.hydrogen::after,
.hydrogen::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #000;
  border-radius: 50%;
  top: calc(50% - 8px);
  left: calc(50% - 8px);
}
.hydrogen::after {
  top: 2px;
  left: 2px;
  width: 10px;
  height: 10px;
}
/* hydrogen loading END */

/* recting loading START */
.recting .polygon {
  fill: none;
  stroke-width: 8px;
  stroke: black;
  stroke-dasharray: 40;
  stroke-dashoffset: 50%;
  animation: recting 1.5s forwards infinite;
}

@keyframes recting {
  to {
    stroke-dashoffset: 250%;
  }
}
/* recting loading END */

/* switch-box loading START */
.switch-box {
  position: relative;
  height: 80px;
  animation: spin 2s infinite linear;
}

.switch-box .switch {
  position: absolute;
  top: 50%;
  margin-top: -10px;
  width: 20px;
  height: 20px;
  background: #000;
  border-radius: 20px;
  animation: cross 2s infinite linear;
}

.switch-box .switch:nth-of-type(2) {
  animation-delay: -1s;
}

@keyframes cross {
  50% {
    margin-left: 60px;
  }
}
/* switch-box loading END */



.box{
width: 300px;
height:10px;
border:1px solid #9e9e9e;
}
.load{
  
width:0px;
height:10px;
background:#325976;
}
#smallscreenlabel
        {
            position:absolute;
            top:0px;
            left: 0px;
            background-color:transparent;
            z-index: 0; 
            padding: 0px;
            margin: 0px;
            color: green;
            
        }
        #smallscreen{
            position:absolute;
            top:calc(100% - 700px);
            left: 300px;
            width: 1000px;
            height: 650px;
           
            background-color:transparent;
            z-index: 0;
            border-style:solid;
            border-width: 1px;
            border-color: #76b9fd;
            color: green;
            
        }

</style>


