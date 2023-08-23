import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import Swal from "sweetalert2";
// 场景加载
export const initBaseScene = (_this) => {
  _this.scene = new THREE.Scene();
  // _this.scene2 = new THREE.Scene();
  // this.scene.fog = new THREE.Fog(0xeeeeee, 0, 500);

  // //获取鼠标坐标
  // var mouse=new THREE.Vector2();
  // var raycaster=new THREE.Raycaster();


  // //点击模型
  // window.addEventListener('click',(event)=>{
  //   mouse.x=(event.clientX/window.innerWidth)*2-1;
  //   mouse.y=-(event.clientY/window.innerHeight)*2+1;
  //   raycaster.setFromCamera(mouse, _this.camera);
  //   const intersects = raycaster.intersectObjects(_this.scene.children);
  //   // console.log(_this.scene.children);
  //   // const intersect = intersects.filter(intersect => intersect.object.name !== '平面')[0];
  //   // console.log(intersects);
  //   if( object.name=="平面"){
  //     console.log(1);
  //   }
  // }); 
};


// 渲染器加载
export const initBaseRenderer = (_this) => {
  _this.renderer = new THREE.WebGLRenderer({ antialias: true });
  _this.renderer.setSize(window.innerWidth, window.innerHeight);
  _this.renderer.autoClear = true;
  _this.renderer.shadowMap.enabled = true;
  _this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  _this.renderer.outputEncoding = THREE.sRGBEncoding;
  _this.renderer.render(_this.scene, _this.camera);
  _this.container.appendChild(_this.renderer.domElement);
};

// 加载控制器
export const initBaseControls = (_this) => {
  //   controls
  _this.controls = new OrbitControls(_this.camera, _this.renderer.domElement);
  _this.controls.enableDamping = true;
  _this.controls.enablePan = false;
};
// 加载摄像机
export const initBaseCamera = (_this) => {
  _this.camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  // _this.camera.position.set(0, 150, 150);
  // _this.camera.lookAt(new THREE.Vector3(0, 0, 0));
};
// 加载GUI
// export const initGui = (_this) => {
//   _this.gui = new GUI();
//   _this.gui.domElement.classList.add();
//   _this.gui.domElement.style.cssText = "position:absolute;top:0;right:0px;";
//   _this.gui.add(_this.effectController, "A").name("Selected:").listen();
// };


//开局延迟动画
export const initbox = (_this) => {
  setTimeout(function() {
    selectOk(_this)    //要执行的函数
 
    Swal.fire({
      title: "告示",
      text: "亲爱的用户：\n我们一直倡导并践行建设绿色健康的游戏环境，在此提示您合理安排游戏时间，平衡娱乐与生活。\n您需要新手提示吗？",
      
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "是的，我需要",
      cancelButtonText: "不用!",
    }).then((res) => {
      // console.log(res);
      // 非位置音频可用于不考虑位置的背景音乐
      // 创建一个监听者
      var listener = new THREE.AudioListener();
      _this.camera.add( listener );
      // 创建一个非位置音频对象  用来控制播放
      var audio = new THREE.Audio(listener);
      // 创建一个音频加载器对象
      var audioLoader = new THREE.AudioLoader();
      // 加载音频文件，返回一个音频缓冲区对象作为回调函数参数
      audioLoader.load('./resources/backmuisic.mp3', function(AudioBuffer) {
        console.log(AudioBuffer)
        // 音频缓冲区对象关联到音频对象audio
        audio.setBuffer(AudioBuffer);
        audio.setLoop(true); //是否循环
        audio.setVolume(1); //音量
        // 播放缓冲区中的音频数据
        audio.play(); //play播放、stop停止、pause暂停
      });
      if (res.isConfirmed) {
        Swal.fire({
          type: '我明白了',
          html: 'm打开地图\nx关闭地图\n按下f互动\n按住shift加速\nq关门\ne下车'
        });
      }
      })
  }, 8000)  //1000ms后执行
};


function selectOk(_this){
  _this.boxshow=false;
  _this.convesshow=true;
  _this.numshow=false;
}


// // 加载小摄像机
// export const initBasesmallCamera = (_this) => {
//   _this.smallcamera = new THREE.PerspectiveCamera(
//     120, 1, 0.1, 100000
//   );
//   _this.smallcamera.position.set(20, 1100, -20);
//   _this.smallcamera.lookAt(new THREE.Vector3(0, 0, 0));
// };
// // 小渲染器加载
// export const initBasesmallRenderer = (_this) => {
//   _this.smallrenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: false });
//   _this.smallrenderer.setSize(220,220);
//   _this.smallrenderer.autoClear=false;
//   _this.smallrenderer.render(_this.scene, _this.smallcamera);
//   // console.log(_this.smallscreen);
//   // _this.smallscreen.appendChild(_this.smallrenderer.domElement);
//   _this.document.getElementById("smallscreen").appendChild(_this.smallrender.domElement);
// };

