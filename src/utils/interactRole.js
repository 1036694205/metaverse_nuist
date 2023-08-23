import * as THREE from "three";
import Swal from "sweetalert2";
import Gsap from "gsap";
import { camera_controls_init } from "@/utils/personRoaming";

export const openDoor = (_this, isShow, isShowLeave = true) => {
  if (isShow) {
    Gsap.to(_this.left_door.rotation, {
      y: -Math.PI / 3,
      duration: 0.3,
      onComplete: (e) => {
        isShow = !isShow;
        if (isShowLeave) {
          Swal.fire({
            title: "您想要驾驶这辆车吗?",
            text: "享受您的旅程!",
            
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "是的!",
            cancelButtonText: "不要!",
          }).then((res) => {
            // console.log(res);
            if (res.isConfirmed) {
              camera_controls_init(_this, _this.car);
              _this.car.add(_this.CarPerson);
              _this.scene.remove(_this.Robot);
              resetDoor(_this, true);
              _this.isDrive = true;
            }
          });
        }
      },
    });
  }
};
export const resetDoor = (_this, isShow) => {
  if (isShow) {
    Gsap.to(_this.left_door.rotation, {
      y: 0,
      duration: 0.3,
      onComplete: (e) => {
        isShow = !isShow;
      },
    });
  }
};
export const colliderCheck = (_this, moveX, moveZ) => {
  // console.log(_this.scene.children);
  // 射线碰撞
  const curPos = _this.Robot.position.clone();
  _this.Robot.translateZ(1);
  const frontPos = _this.Robot.position.clone();
  _this.Robot.translateZ(-1);

  const frontVector3 = frontPos.sub(curPos).normalize();

  const raycasterFront = new THREE.Raycaster(
    _this.Robot.position.clone().add(new THREE.Vector3(0, 1, 0)),
    frontVector3
  );
  const collisionResultsFrontObjs = raycasterFront.intersectObjects(
    _this.newcolliders
  );
  console.log(collisionResultsFrontObjs.length);
  console.log(collisionResultsFrontObjs[0].distance);
  if (
    collisionResultsFrontObjs &&
    collisionResultsFrontObjs[0] &&
    collisionResultsFrontObjs[0].distance > 2
   
  ) {
    // _this.Robot.translateZ(moveZ);
    _this.Robot.position.x += moveX;
    _this.Robot.position.z += moveZ;
  }
};





//操场
export const updateTrigger = (_this) => {
  let length = _this.Robot.position.distanceTo(_this.trigger.position);
  if (length < 5 && _this.isInner == false) {
    _this.isInner = true;
    _this.trigger.visible = false;
    _this.arrow.visible = false;
    Swal.fire({
      title: '东苑田径场',
      text: '枫木地，草坪上奔跑的身影与微风擦肩，谱写出青春最美的模样！',
      imageUrl: require("../../public/resources/caochang.jpg"),
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: '操场',
    })
  }
  if (length > 5  && _this.isInner == true) {
    _this.isInner = false;
    _this.trigger.visible = true;
    _this.arrow.visible = true;
  }
};
//雷丁
export const updateTrigger2 = (_this) => {
  let length = _this.Robot.position.distanceTo(_this.trigger2.position);
  if (length < 5 && _this.isInner2 == false) {
    _this.isInner2 = true;
    _this.trigger2.visible = false;
    _this.arrow2.visible = false;
    Swal.fire({
      title: '雷丁学院',
      text: '南京信息工程大学高端人才工作站！',
      imageUrl: require("../../public/resources/leiding.jpg"),
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
  if (length > 5 && _this.isInner2 == true) {
    _this.isInner2 = false;
    _this.trigger2.visible = true;
    _this.arrow2.visible = true;
  }
};
//东门
export const updateTrigger3 = (_this) => {
  let length = _this.Robot.position.distanceTo(_this.trigger3.position);
  if (length < 5 && _this.isInner3 == false) {
    _this.isInner3 = true;
    _this.trigger3.visible = false;
    _this.arrow3.visible = false;
    Swal.fire({
      title: '南信大东门',
      text: '东大门是许多人入校时会选择进入的门，此处距离硕园1-6栋较近，进门不远就设有校园小公交站点。',
      imageUrl: require("../../public/resources/dongmen.jpg"),
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
  if (length > 5 && _this.isInner3 == true) {
    _this.isInner3 = false;
    _this.trigger3.visible = true;
    _this.arrow3.visible = true;
  }
};
//东南门
export const updateTrigger4 = (_this) => {
  let length = _this.Robot.position.distanceTo(_this.trigger4.position);
  if (length < 5 && _this.isInner4 == false) {
    _this.isInner4 = true;
    _this.trigger4.visible = false;
    _this.arrow4.visible = false;
    Swal.fire({
      title: '东南校门口',
      text: '这里与地铁口很近，很多大学生都会通过这里出发去校外，下了信息工程大学站地铁顺着小路一直走，就可以看的大门！',
      imageUrl: require("../../public/resources/dongnanmen.jpg"),
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
  if (length > 5 && _this.isInner4 == true) {
    _this.isInner4 = false;
    _this.trigger4.visible = true;
    _this.arrow4.visible = true;
  }
};
//行政楼
export const updateTrigger5 = (_this) => {
  let length = _this.Robot.position.distanceTo(_this.trigger5.position);
  if (length < 5 && _this.isInner5 == false) {
    _this.isInner5 = true;
    _this.trigger5.visible = false;
    _this.arrow5.visible = false;
    Swal.fire({
      title: '行政楼',
      text: '学校校领导办公地点',
      imageUrl: require("../../public/resources/xingzhenglou.jpg"),
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
  if (length > 5 && _this.isInner5 == true) {
    _this.isInner5 = false;
    _this.trigger5.visible = true;
    _this.arrow5.visible = true;
  }
};
//体育馆
export const updateTrigger6 = (_this) => {
  let length = _this.Robot.position.distanceTo(_this.trigger6.position);
  if (length < 5 && _this.isInner6 == false) {
    _this.isInner6 = true;
    _this.trigger6.visible = false;
    _this.arrow6.visible = false;
    Swal.fire({
      title: '东苑体育馆',
      text: '这里不仅有篮球场、排球场、羽毛球场等各种运动场地，更有机械设施完善的健身房、整洁明亮的形体房等待萌新们前来体验！',
      imageUrl: require("../../public/resources/tiyuguan.jpg"),
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
  if (length > 5 && _this.isInner6 == true) {
    _this.isInner6 = false;
    _this.trigger6.visible = true;
    _this.arrow6.visible = true;
  }
};
//宾馆
export const updateTrigger7 = (_this) => {
  let length = _this.Robot.position.distanceTo(_this.trigger7.position);
  if (length < 5 && _this.isInner7 == false) {
    _this.isInner7 = true;
    _this.trigger7.visible = false;
    _this.arrow7.visible = false;
    Swal.fire({
      title: '南气宾馆',
      text: '南气宾馆位于东苑，靠近体育馆，连接校内与校外，位置便利，住宿方便，为南信大师生提供住宿便利。',
      imageUrl: require("../../public/resources/binguan.jpg"),
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: '宾馆',
    })
  }
  if (length > 5 && _this.isInner7 == true) {
    _this.isInner7 = false;
    _this.trigger7.visible = true;
    _this.arrow7.visible = true;
  }
};




export const openDooreast = (_this) => {
  Swal.fire({
    title: "您想要进入校园吗?",
    text: "使用校园卡刷卡进入!",
    
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "刷卡!",
    cancelButtonText: "不要!",
  }).then((res) => {
    // console.log(res);
    if (res.isConfirmed) {
      Gsap.to(_this.leftdoor.rotation, {
        y: -Math.PI / 2,
        duration: 0.3,
        onComplete: (e) => {
  
        },
      });
      Gsap.to(_this.rightdoor.rotation, {
        y: -Math.PI / 2,
        duration: 0.3,
        onComplete: (e) => {
  
        },
      });
    }
  });

    
  }

export const resetDooreast = (_this) => {
    Gsap.to(_this.leftdoor.rotation, {
      y: 0,
      duration: 0.3,
      onComplete: (e) => {
        // isShow = !isShow;
      },
    });
    Gsap.to(_this.rightdoor.rotation, {
      y: 0,
      duration: 0.3,
      onComplete: (e) => {
        // isShow = !isShow;
      },
    });
  }


  export const openDooreast2 = (_this) => {
    Gsap.to(_this.leftdoor2.rotation, {
      y: -Math.PI / 2,
      duration: 0.3,
      onComplete: (e) => {

      },
    });
    Gsap.to(_this.rightdoor2.rotation, {
      y: Math.PI / 2,
      duration: 0.3,
      onComplete: (e) => {

      },
    });
  }

export const resetDooreast2 = (_this) => {
    Gsap.to(_this.leftdoor2.rotation, {
      y: 0,
      duration: 0.3,
      onComplete: (e) => {
        // isShow = !isShow;
      },
    });
    Gsap.to(_this.rightdoor2.rotation, {
      y: 0,
      duration: 0.3,
      onComplete: (e) => {
        // isShow = !isShow;
      },
    });
  }


  //chuansong
export const flash = (_this) => {
    Swal.fire({
      title: "选择您想去的地点?",
      input: 'select',
      inputOptions: {
        'dongmen': '东门',
        'dongnanmen': '东南门',
        'caochang': '操场',
        'leiding': '雷丁学院',
        'tiyuguan': '体育馆',
        'nanqi': '南气宾馆',
        'xingzheng': '行政楼',
      },
      inputPlaceholder: '选择地点',
      showCancelButton: true,
      inputValidator: function(value) {
        return new Promise(function(resolve, reject) {
          if (value === 'dongmen') {
            _this.Robot.position.set(474,0,-21);
            // camera_controls_init(_this, _this.Robot);
            // _this.camera.lookAt(new THREE.Vector3(0, 2, 0));
            resolve();
          } else if(value === 'dongnanmen'){
            _this.Robot.position.set(-996,0,1450);
            // camera_controls_init(_this, _this.Robot);
            resolve();
          }else if(value === 'caochang'){
            _this.Robot.position.set(227,0,-195);
            // camera_controls_init(_this, _this.Robot);
            resolve();
          }else if(value === 'leiding'){
            _this.Robot.position.set(-479,0,391);
            // camera_controls_init(_this, _this.Robot);
            resolve();
          }else if(value === 'nanqi'){
            _this.Robot.position.set(-471,0,-942);
            // camera_controls_init(_this, _this.Robot);
            resolve();
          }else if(value === 'xingzheng'){
            _this.Robot.position.set(-904,0,562);
            // camera_controls_init(_this, _this.Robot);
            resolve();
          }
          else if(value === 'tiyuguan'){
            _this.Robot.position.set(-427,0,-40);
            // camera_controls_init(_this, _this.Robot);
            resolve();
          }
          else{
            reject();
          }
        });
      }
      }).then(function(result) {
        if (result.isConfirmed) {
          Swal.fire({
            type: 'success',
            html: '成功到达'
          });
        }
        
      })
};


export const welcomebaoan = (_this) => {
  Swal.fire({
    title: "欢迎你来到南京信息工程大学?",
    text: "您可以驾驶车辆进行观光校园，您拿着车钥匙吗",
    
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "可以!",
    cancelButtonText: "不用!",
  }).then((res) => {
    // console.log(res);
    if (res.isConfirmed) {
        _this.caryaoshi=1;
        Swal.fire({
          type: 'ok',
          html: '获得车钥匙'
        });
      };
      
    })
  };

    
