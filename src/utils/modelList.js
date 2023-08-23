import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
import Gsap from "gsap";
import { camera_controls_init } from "@/utils/personRoaming";

function CharacterControls(animationsMap, currentAction) {
  animationsMap.forEach((value, key) => {
    if (key == currentAction) {
      value.play();
    }
  });
}


// 加载人物
export const initModel = (_this) => {
  new GLTFLoader().setPath("/resources/models/").load("boxman.glb", (gltf) => {
    const textureLoader = new THREE.TextureLoader();
    console.log(gltf);
    _this.Robot = gltf.scene;
    // soldier size
    _this.Robot.scale.set(10, 10, 10);
    _this.Robot.position.set(696, 0, 16);//700, 0, 35初始位置
    _this.Robot.rotateY(Math.PI/2+Math.PI);
    _this.Robot.traverse((child) => {
      child.castShadow = true;

      if (child.isMesh) {
        textureLoader
          .setPath("/resources/models/texture/")
          .load("SimplePeople_Waitress_White.png", (texture) => {
            child.material.map = texture;
          });
      }
    });

    // 设置初始化相机和控制器位置
    camera_controls_init(_this, _this.Robot);
    _this.scene.add(_this.Robot);
    _this.mixer = new THREE.AnimationMixer(_this.Robot);
    const gltfAnimations = gltf.animations;
    _this.animationsMap = new Map();
    gltfAnimations.forEach((clip) => {
      _this.animationsMap.set(clip.name, _this.mixer.clipAction(clip));
    });
    CharacterControls(_this.animationsMap, "idle");
  });
};
// 加载场景
export const initScene = (_this) => {
  return new GLTFLoader()
    .setPath("/resources/models/")
    .load("nuist514.glb", (gltf) => {
      const motion = gltf.scene;
      // motion.position.set(0, 0, 0);
      motion.scale.set(10, 10, 10);
      _this.scene.add(motion);
      _this.newcolliders.push(motion);
      // console.log(motion);
      // _this.scene2.add(motion);
      // console.log(motion.children)
      motion.traverse((child) => {
        if (child.isMesh) {
          if (child.name == "leftdoor") {
            _this.leftdoor = child;
            //   child.rotateY(-Math.PI / 3);
            // _this.newcolliders.push(_this.leftdoor);
          }
          if (child.name == "rightdoor") {
            _this.rightdoor = child;
            //   child.rotateY(-Math.PI / 3);
            // _this.newcolliders.push(_this.rightdoor);
          }
          if (child.name == "leftdoor2") {
            _this.leftdoor2 = child;
            //   child.rotateY(-Math.PI / 3);
            // _this.newcolliders.push(child);
          }
          if (child.name == "rightdoor2") {
            _this.rightdoor2 = child;
            //   child.rotateY(-Math.PI / 3);
            // _this.newcolliders.push(child);
          }
          if (child.name == "1dongnan") {
            _this.dongnanmen = child;
            //   child.rotateY(-Math.PI / 3);
            
          }
          if (child.name == "1dongmen") {
            _this.dongmen = child;
            //   child.rotateY(-Math.PI / 3);
          }
          if (child.name == "1caochang") {
            _this.caochang = child;
            //   child.rotateY(-Math.PI / 3);
          }
          if (child.name == "1leiding") {
            _this.leiding = child;
            //   child.rotateY(-Math.PI / 3);
          }
          if (child.name == "1nanqi") {
            _this.nanqi = child;
            //   child.rotateY(-Math.PI / 3);
          }
          if (child.name == "1tiyuguan") {
            _this.tiyuguan = child;
            //   child.rotateY(-Math.PI / 3);
          }
          if (child.name == "1xingzheng") {
            _this.xingzheng = child;
            //   child.rotateY(-Math.PI / 3);
          }
        //   if (child.name === 'bigscreen' ) {
        //     const video = document.createElement('video');
        //     video.src = "./public/resources/video1.mp4";
        //     video.muted = true;
        //     video.autoplay = "autoplay";
        //     video.loop = true;
        //     video.play();

        //     const videoTexture = new THREE.VideoTexture(video);
        //     const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });

        //     child.material = videoMaterial;
        // }
          _this.carColliders.push(child);
          if (child.name.startsWith("proxy")) {
            child.visible = false;
            _this.colliders.push(child);
          } else {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        }
      });
      _this.mixerviedo = new THREE.AnimationMixer(gltf.scene);
      const clipsvideo = gltf.animations; // 播放所有动画
      clipsvideo.forEach(function (clip) {
        const action = _this.mixerviedo.clipAction(clip);
        action.loop = THREE.LoopOnce;
        // 停在最后一帧
        action.clampWhenFinished = true;
        action.play();
    });
    });
};



// 加载汽车
export const initCar = (_this) => {
  new GLTFLoader().setPath("/resources/models/").load("car.glb", (gltf) => {
    const textureLoader = new THREE.TextureLoader();
    _this.car = gltf.scene;
    // _this.car.position.set(508, 2.5, 28);
    _this.car.position.set(470, 2, 95);
    _this.car.scale.set(8, 8, 8);
    _this.car.rotateY(Math.PI/2+ Math.PI);
    _this.scene.add(_this.car);
    _this.CarPerson.position.set(0.3, 0, 0.05);
    _this.car.traverse((child) => {
      if (child.isMesh) {
        if (child.userData.data == "collision") {
          _this.colliders.push(child);
          child.visible = false;
        }
        if (child.name == "door_1") {
          _this.left_door = child;
          //   child.rotateY(-Math.PI / 3);
        }
        if (child.isMesh) {
          textureLoader
            .setPath("/resources/models/texture/")
            .load("Vehicle_Car01_b.png", (texture) => {
              child.material.map = texture;
            });
        }
      }
    });
  });
};
// 加载汽车乘客
export const initCarPerson = (_this) => {
  new GLTFLoader().setPath("/resources/models/").load("boxman.glb", (gltf) => {
    const textureLoader = new THREE.TextureLoader();
    _this.CarPerson = gltf.scene;
    // _this.CarPerson.scale.set(0.3, 0.3, 0.3);
    _this.CarPerson.traverse((child) => {
      child.castShadow = true;
      if (child.isMesh) {
        //   child.material.emissive = child.material.color;
        //   child.material.emissiveMap = child.material.map;
        textureLoader
          .setPath("/resources/models/texture/")
          .load("SimplePeople_Waitress_White.png", (texture) => {
            child.material.map = texture;
          });
      }
    });
    _this.carMixer = new THREE.AnimationMixer(_this.CarPerson);
    const gltfAnimations = gltf.animations;
    _this.carAnimationsMap = new Map();
    gltfAnimations.forEach((clip) => {
      _this.carAnimationsMap.set(clip.name, _this.carMixer.clipAction(clip));
    });
    CharacterControls(_this.carAnimationsMap, "sitting");
  });
};


// 加载箭头  操场
export const initArrow = (_this) => {
  return new GLTFLoader()
    .setPath("/resources/models/arrow_3d/")
    .load("scene.gltf", (gltf) => {
      _this.arrow = gltf.scene;
      _this.arrow.scale.set(0.5, 0.5, 0.5);
      _this.arrow.position.set(190, 6, -60);
      Gsap.to(_this.arrow.rotation, {
        y: Math.PI * 2,
        duration: 3,
        // yoyo: true,
        repeat: -1,
      });
      _this.scene.add(_this.arrow);
      //   mixer = new THREE.AnimationMixer(flyObj);
      //   const AnimationAction = mixer.clipAction(gltf.animations[0]);
      //   AnimationAction.timeScale = 2;
      //   AnimationAction.play();
    });
};
// 加载光阵
export const initTrigger = (_this) => {
  let texture = new THREE.TextureLoader().load(
    "../resources/models/texture/trigger.png"
  );
  texture.rotation = -Math.PI / 2;
  texture.offset.x = 0.5;
  texture.repeat.set(0.5, 1);
  return new GLTFLoader().load("../resources/models/trigger.glb", (gltf) => {
    _this.trigger = gltf.scene;
    // 设置基础材质
    let material = new THREE.MeshBasicMaterial({
      // color: 0x00ff00,
      map: texture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    _this.trigger.children[0].material = material;
    _this.trigger.scale.set(10, 10, 10);
    _this.trigger.position.set(190, 3, -60);
    _this.scene.add(_this.trigger);
  });
};


// 加载箭头  雷丁
export const initArrow2 = (_this) => {
  return new GLTFLoader()
    .setPath("/resources/models/arrow_3d/")
    .load("scene.gltf", (gltf) => {
      _this.arrow2 = gltf.scene;
      _this.arrow2.scale.set(0.5, 0.5, 0.5);
      _this.arrow2.position.set(-264, 0, 186);
      Gsap.to(_this.arrow2.rotation, {
        y: Math.PI * 2,
        duration: 3,
        // yoyo: true,
        repeat: -1,
      });
      _this.scene.add(_this.arrow2);
      //   mixer = new THREE.AnimationMixer(flyObj);
      //   const AnimationAction = mixer.clipAction(gltf.animations[0]);
      //   AnimationAction.timeScale = 2;
      //   AnimationAction.play();
    });
};
// 加载光阵
export const initTrigger2 = (_this) => {
  let texture = new THREE.TextureLoader().load(
    "../resources/models/texture/trigger.png"
  );
  texture.rotation = -Math.PI / 2;
  texture.offset.x = 0.5;
  texture.repeat.set(0.5, 1);
  return new GLTFLoader().load("../resources/models/trigger.glb", (gltf) => {
    _this.trigger2 = gltf.scene;
    // 设置基础材质
    let material = new THREE.MeshBasicMaterial({
      // color: 0x00ff00,
      map: texture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    _this.trigger2.children[0].material = material;
    _this.trigger2.scale.set(10, 10, 10);
    _this.trigger2.position.set(-264, 0, 186);
    _this.scene.add(_this.trigger2);
  });
};



// 加载箭头   东门
export const initArrow3 = (_this) => {
  return new GLTFLoader()
    .setPath("/resources/models/arrow_3d/")
    .load("scene.gltf", (gltf) => {
      _this.arrow3 = gltf.scene;
      _this.arrow3.scale.set(0.5, 0.5, 0.5);
      _this.arrow3.position.set(700, 0, 35);
      Gsap.to(_this.arrow3.rotation, {
        y: Math.PI * 2,
        duration: 3,
        // yoyo: true,
        repeat: -1,
      });
      _this.scene.add(_this.arrow3);
      //   mixer = new THREE.AnimationMixer(flyObj);
      //   const AnimationAction = mixer.clipAction(gltf.animations[0]);
      //   AnimationAction.timeScale = 2;
      //   AnimationAction.play();
    });
};
// 加载光阵
export const initTrigger3 = (_this) => {
  let texture = new THREE.TextureLoader().load(
    "../resources/models/texture/trigger.png"
  );
  texture.rotation = -Math.PI / 2;
  texture.offset.x = 0.5;
  texture.repeat.set(0.5, 1);
  return new GLTFLoader().load("../resources/models/trigger.glb", (gltf) => {
    _this.trigger3 = gltf.scene;
    // 设置基础材质
    let material = new THREE.MeshBasicMaterial({
      // color: 0x00ff00,
      map: texture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    _this.trigger3.children[0].material = material;
    _this.trigger3.scale.set(10, 10, 10);
    _this.trigger3.position.set(700, 0, 35);
    _this.scene.add(_this.trigger3);
  });
};



// 加载箭头 东南门
export const initArrow4 = (_this) => {
  return new GLTFLoader()
    .setPath("/resources/models/arrow_3d/")
    .load("scene.gltf", (gltf) => {
      _this.arrow4 = gltf.scene;
      _this.arrow4.scale.set(0.5, 0.5, 0.5);
      _this.arrow4.position.set(-921,0,1721);
      Gsap.to(_this.arrow4.rotation, {
        y: Math.PI * 2,
        duration: 3,
        // yoyo: true,  
        repeat: -1,
      });
      _this.scene.add(_this.arrow4);
      //   mixer = new THREE.AnimationMixer(flyObj);
      //   const AnimationAction = mixer.clipAction(gltf.animations[0]);
      //   AnimationAction.timeScale = 2;
      //   AnimationAction.play();
    });
};
// 加载光阵
export const initTrigger4 = (_this) => {
  let texture = new THREE.TextureLoader().load(
    "../resources/models/texture/trigger.png"
  );
  texture.rotation = -Math.PI / 2;
  texture.offset.x = 0.5;
  texture.repeat.set(0.5, 1);
  return new GLTFLoader().load("../resources/models/trigger.glb", (gltf) => {
    _this.trigger4 = gltf.scene;
    // 设置基础材质
    let material = new THREE.MeshBasicMaterial({
      // color: 0x00ff00,
      map: texture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    _this.trigger4.children[0].material = material;
    _this.trigger4.scale.set(10, 10, 10);
    _this.trigger4.position.set(-921,0,1721);
    _this.scene.add(_this.trigger4);
  });
};


// 加载箭头 行政楼
export const initArrow5 = (_this) => {
  return new GLTFLoader()
    .setPath("/resources/models/arrow_3d/")
    .load("scene.gltf", (gltf) => {
      _this.arrow5 = gltf.scene;
      _this.arrow5.scale.set(0.5, 0.5, 0.5);
      _this.arrow5.position.set(-792,0,601);
      Gsap.to(_this.arrow5.rotation, {
        y: Math.PI * 2,
        duration: 3,
        // yoyo: true,  
        repeat: -1,
      });
      _this.scene.add(_this.arrow5);
      //   mixer = new THREE.AnimationMixer(flyObj);
      //   const AnimationAction = mixer.clipAction(gltf.animations[0]);
      //   AnimationAction.timeScale = 2;
      //   AnimationAction.play();
    });
};
// 加载光阵
export const initTrigger5 = (_this) => {
  let texture = new THREE.TextureLoader().load(
    "../resources/models/texture/trigger.png"
  );
  texture.rotation = -Math.PI / 2;
  texture.offset.x = 0.5;
  texture.repeat.set(0.5, 1);
  return new GLTFLoader().load("../resources/models/trigger.glb", (gltf) => {
    _this.trigger5 = gltf.scene;
    // 设置基础材质
    let material = new THREE.MeshBasicMaterial({
      // color: 0x00ff00,
      map: texture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    _this.trigger5.children[0].material = material;
    _this.trigger5.scale.set(10, 10, 10);
    _this.trigger5.position.set(-792,0,601);  
    _this.scene.add(_this.trigger5);
  });
};





// 加载箭头 体育馆
export const initArrow6 = (_this) => {
  return new GLTFLoader()
    .setPath("/resources/models/arrow_3d/")
    .load("scene.gltf", (gltf) => {
      _this.arrow6 = gltf.scene;
      _this.arrow6.scale.set(0.5, 0.5, 0.5);
      _this.arrow6.position.set(-231,0,-5);
      Gsap.to(_this.arrow6.rotation, {
        y: Math.PI * 2,
        duration: 3,
        // yoyo: true,  
        repeat: -1,
      });
      _this.scene.add(_this.arrow6);
      //   mixer = new THREE.AnimationMixer(flyObj);
      //   const AnimationAction = mixer.clipAction(gltf.animations[0]);
      //   AnimationAction.timeScale = 2;
      //   AnimationAction.play();
    });
};
// 加载光阵
export const initTrigger6 = (_this) => {
  let texture = new THREE.TextureLoader().load(
    "../resources/models/texture/trigger.png"
  );
  texture.rotation = -Math.PI / 2;
  texture.offset.x = 0.5;
  texture.repeat.set(0.5, 1);
  return new GLTFLoader().load("../resources/models/trigger.glb", (gltf) => {
    _this.trigger6 = gltf.scene;
    // 设置基础材质
    let material = new THREE.MeshBasicMaterial({
      // color: 0x00ff00,
      map: texture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    _this.trigger6.children[0].material = material;
    _this.trigger6.scale.set(10, 10, 10);
    _this.trigger6.position.set(-231,0,-5);
    _this.scene.add(_this.trigger6);
  });
};



// 加载箭头 宾馆
export const initArrow7 = (_this) => {
  return new GLTFLoader()
    .setPath("/resources/models/arrow_3d/")
    .load("scene.gltf", (gltf) => {
      _this.arrow7 = gltf.scene;
      _this.arrow7.scale.set(0.5, 0.5, 0.5);
      _this.arrow7.position.set(-603,0,-939);
      Gsap.to(_this.arrow7.rotation, {
        y: Math.PI * 2,
        duration: 3,
        // yoyo: true,  
        repeat: -1,
      });
      _this.scene.add(_this.arrow7);
      //   mixer = new THREE.AnimationMixer(flyObj);
      //   const AnimationAction = mixer.clipAction(gltf.animations[0]);
      //   AnimationAction.timeScale = 2;
      //   AnimationAction.play();
    });
};
// 加载光阵
export const initTrigger7 = (_this) => {
  let texture = new THREE.TextureLoader().load(
    "../resources/models/texture/trigger.png"
  );
  texture.rotation = -Math.PI / 2;
  texture.offset.x = 0.5;
  texture.repeat.set(0.5, 1);
  return new GLTFLoader().load("../resources/models/trigger.glb", (gltf) => {
    _this.trigger7 = gltf.scene;
    // 设置基础材质
    let material = new THREE.MeshBasicMaterial({
      // color: 0x00ff00,
      map: texture,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    _this.trigger7.children[0].material = material;
    _this.trigger7.scale.set(10, 10, 10);
    _this.trigger7.position.set(-603,0,-939);
    _this.scene.add(_this.trigger7);
  });
};


//加載人物在哪
export const initArrowpeople = (_this) => {
  return new GLTFLoader()
    .setPath("/resources/models/")
    .load("wujiao.glb", (gltf) => {
      _this.arrowpeople = gltf.scene;
      _this.arrowpeople.scale.set(6,6, 6);
      _this.arrowpeople.position.set(190, 6, -60);
      Gsap.to(_this.arrowpeople.rotation, {
        y: Math.PI * 2,
        duration: 3,
        repeat: -1,
      });
      _this.scene.add(_this.arrowpeople);
      _this.scene.remove(_this.arrowpeople);
    });
};



// 加载保安
export const initModelbaoan = (_this) => {
  new GLTFLoader().setPath("/resources/models/").load("boxman.glb", (gltf) => {
    const textureLoader = new THREE.TextureLoader();
    // console.log(gltf);
    _this.Robotbaoan = gltf.scene;
    // soldier size
    _this.Robotbaoan.scale.set(10, 10, 10);
    _this.Robotbaoan.position.set(558, 0, 7);//700, 0, 35初始位置
    // _this.Robotbaoan.rotateY(Math.PI/2);
    _this.Robotbaoan.traverse((child) => {
      child.castShadow = true;

      if (child.isMesh) {
        textureLoader
          .setPath("/resources/models/texture/")
          .load("SimplePeople_BusinessMan_White.png", (texture) => {
            child.material.map = texture;
          });
      }
    });
    _this.scene.add(_this.Robotbaoan);
    _this.mixerbaoan = new THREE.AnimationMixer(_this.Robotbaoan);
    const clpis = gltf.animations;
    _this.animationsMapbaoan = new Map();
    clpis.forEach((clip) => {
      _this.animationsMapbaoan.set(clip.name, _this.mixerbaoan.clipAction(clip));
    });
    CharacterControls(_this.animationsMapbaoan, "idle");
  });
};