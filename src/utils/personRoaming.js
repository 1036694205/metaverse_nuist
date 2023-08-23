import { openDoor, resetDoor, colliderCheck,openDooreast,resetDooreast 
,openDooreast2,resetDooreast2,flash,welcomebaoan
} from "@/utils/interactRole";
import * as THREE from "three";
import Swal from "sweetalert2";
export const updateCameraTarget = (_this, diffX, diffZ, object) => {
  _this.camera.position.x += diffX;
  _this.camera.position.z += diffZ;
  _this.cameraTarget.x = object.position.x;
  _this.cameraTarget.y = object.position.y + 3;
  _this.cameraTarget.z = object.position.z;
  _this.controls.target = _this.cameraTarget.clone();
};
// 计算人物转向
export const DirectionOffset = (_this, keyPress) => {
  if (keyPress.w) {
    _this.directionOffset = 0;
    if (keyPress.a) {
      _this.directionOffset = Math.PI / 4;
    } else if (keyPress.d) {
      _this.directionOffset = -Math.PI / 4;
    }
  } else if (keyPress.s) {
    if (keyPress.a) {
      _this.directionOffset = Math.PI / 4 + Math.PI / 2;
    } else if (keyPress.d) {
      _this.directionOffset = -Math.PI / 4 - Math.PI / 2;
    } else {
      _this.directionOffset = Math.PI;
    }
  } else if (keyPress.a) {
    _this.directionOffset = Math.PI / 2;
  } else if (keyPress.d) {
    _this.directionOffset = -Math.PI / 2;
  }
};
export const camera_controls_init = (_this, Robot) => {
  _this.camera.position.set(
    Robot.position.x+20,
    Robot.position.y + 20,
    Robot.position.z 
  );
  _this.controls.target.set(
    Robot.position.x,
    Robot.position.y+15,
    Robot.position.z 
  );
};
export const listenKeyEvent = (_this) => {
  if (_this.isFocus) {
    addEventListener(
      "keydown",
      (e) => {
        _this.keyPress[e.key.toLowerCase()] = true;
        _this.keyPress.isDown = true;
        _this.carKeyPress[e.key.toLowerCase()] = true;
        _this.carKeyPress.isDown = true;
        if (e.code == "Space") {
          _this.keyPress.isDown = true;
          _this.keyPress["Space"] = true;
        }
      },
      false
    );
    addEventListener(
      "keyup",
      (e) => {
        _this.keyPress[e.key.toLowerCase()] = false;
        _this.keyPress.isDown = false;
        _this.carKeyPress[e.key.toLowerCase()] = false;
        _this.carKeyPress.isDown = false;
        if (e.code == "Space") {
          _this.keyPress["Space"] = false;
        }
      },
      false
    );
  }
};

export const Update = (_this, delta) => {
  // console.log(_this.car.position);
  let lengthcar = _this.Robot.position.distanceTo(_this.car.position);
  let lengthdoor = _this.Robot.position.distanceTo(new THREE.Vector3(591, 0, 27));
  let lengthdoor2 = _this.Robot.position.distanceTo(new THREE.Vector3(592, 0, 149));
  let lengthdongmen = _this.Robot.position.distanceTo(new THREE.Vector3(486, 0, -20));
  let Ldnmen = _this.Robot.position.distanceTo(new THREE.Vector3(-996, 0, 1471));
  let lengthleiding = _this.Robot.position.distanceTo(new THREE.Vector3(-479, 0, 410));
  let lengthtiyuguan = _this.Robot.position.distanceTo(new THREE.Vector3(-426, 0, -65));
  let lengthnanqi = _this.Robot.position.distanceTo(new THREE.Vector3(-470, 0, -924));
  let Lxingzheng = _this.Robot.position.distanceTo(new THREE.Vector3(-905, 0, 581));
  let lengthcaochang = _this.Robot.position.distanceTo(new THREE.Vector3(226, 0, -220));
  let lengthbaoan = _this.Robot.position.distanceTo(new THREE.Vector3(558, 0, 7));
  _this.play = "";
  if (
    (_this.keyPress.isDown &&
      // _this.keyPress.Space
      _this.keyPress.w &&
      _this.keyPress.Space &&
      _this.keyPress.shift) ||
    (_this.keyPress.isDown && _this.keyPress.w && _this.keyPress.Space)
  ) {
    _this.play = "jump_running";
  } else if (
    (_this.keyPress.w && _this.keyPress.shift && _this.keyPress.isDown) ||
    (_this.keyPress.s && _this.keyPress.shift && _this.keyPress.isDown) ||
    (_this.keyPress.a && _this.keyPress.shift && _this.keyPress.isDown) ||
    (_this.keyPress.d && _this.keyPress.shift && _this.keyPress.isDown)
  ) {
    _this.play = "sprint";
  } else if (
    (_this.keyPress.isDown && _this.keyPress.w) ||
    (_this.keyPress.isDown && _this.keyPress.s) ||
    (_this.keyPress.isDown && _this.keyPress.a) ||
    (_this.keyPress.isDown && _this.keyPress.d)
  ) {
    _this.play = "run";
  } else if (_this.keyPress.isDown && _this.keyPress.Space) {
    _this.play = "jump_idle";
  } else if (_this.keyPress.isDown && _this.keyPress.f &&lengthcar<16 ) {
    _this.play = "open_door_standing_left";
    // console.log(_this.left_door);
    if(_this.caryaoshi==1){
      openDoor(_this, true);
    }
    else{
      Swal.fire({
        type: '失败',
        html: '您没有车钥匙,请前往门口保安处获取'
      });
    }
  } else if (_this.keyPress.isDown && _this.keyPress.q && lengthcar<16) {
    _this.play = "close_door_standing_left";
    resetDoor(_this, true);
  } else {
    _this.play = "idle";
  }


  if(_this.keyPress.isDown && _this.keyPress.m ){
    // _this.convesshow=false;
    _this.scene.add(_this.arrowpeople);
    // console.log(_this.Robot.position);
    _this.arrowpeople.position = _this.Robot.position.clone();
    _this.arrowpeople.position.y +=50;
    // console.log(_this.arrowpeople.position);
    _this.scene.remove(_this.Robot);
    
    _this.convessmallshow=true;
  }else if(_this.keyPress.isDown && _this.keyPress.x ){
    // _this.convesshow=true;
    _this.convessmallshow=false;
    _this.scene.add(_this.Robot);
    _this.Robot.position = _this.arrowpeople.position.clone();
    _this.Robot.position.y -=50;
    _this.scene.remove(_this.arrowpeople);
    
  }


  if(_this.keyPress.isDown && _this.keyPress.f &&lengthdoor<15 ){
    openDooreast(_this);
  }else if(_this.keyPress.isDown && _this.keyPress.q &&lengthdoor<15){
    resetDooreast(_this);
  }
  if(_this.keyPress.isDown && _this.keyPress.f &&lengthdoor2<15){
    openDooreast2(_this);
  }else if(_this.keyPress.isDown && _this.keyPress.q &&lengthdoor2<15){
    resetDooreast2(_this);
  }


  if(_this.keyPress.isDown && _this.keyPress.f &&lengthcaochang<15){
    flash(_this);
  }
  else if(_this.keyPress.isDown && _this.keyPress.f &&lengthdongmen<15){
    flash(_this);
  }
  else if(_this.keyPress.isDown && _this.keyPress.f && Ldnmen<15){
    flash(_this);
  }
  else if(_this.keyPress.isDown && _this.keyPress.f &&lengthleiding<15){
    flash(_this);
  }
  else if(_this.keyPress.isDown && _this.keyPress.f &&lengthnanqi<15){
    flash(_this);
  }
  else if(_this.keyPress.isDown && _this.keyPress.f &&lengthtiyuguan<15){
    flash(_this);
  }
  else if(_this.keyPress.isDown && _this.keyPress.f &&Lxingzheng<15){
    flash(_this);
  }
  if(_this.keyPress.isDown && _this.keyPress.z){
    flash(_this);
  }

  if(_this.keyPress.isDown && _this.keyPress.f &&lengthbaoan<15){
    welcomebaoan(_this);
  }



  if(_this.keyPress.isDown && _this.keyPress.p ){
    console.log(_this.Robot.position);
    // console.log(Lxingzheng);
    // console.log(Ldnmen);
  }
 




  if (_this.currentAction != _this.play) {
    const toPlay = _this.animationsMap.get(_this.play);
    const current = _this.animationsMap.get(_this.currentAction);
    current.fadeOut(_this.fadeDuration);
    toPlay.reset().fadeIn(_this.fadeInDuration).play();
    _this.currentAction = _this.play;
  }
  _this.mixer.update(delta);
  if (
    _this.currentAction == "sprint" ||
    _this.currentAction == "run" ||
    _this.currentAction == "jump_running"
  ) {
    // 永远面朝前
    let angleYCameraDirection = Math.atan2(
      _this.Robot.position.x - _this.camera.position.x,
      _this.Robot.position.z - _this.camera.position.z
    );
    DirectionOffset(_this, _this.keyPress);
    _this.rotateQuarternion.setFromAxisAngle(
      _this.rotateAngle,
      _this.directionOffset + angleYCameraDirection
    );
    _this.Robot.quaternion.rotateTowards(_this.rotateQuarternion, 1);
    _this.camera.getWorldDirection(_this.walkDirection);

    _this.walkDirection.y = 0;
    _this.walkDirection.normalize();
    _this.walkDirection.applyAxisAngle(
      _this.rotateAngle,
      _this.directionOffset
    );
    const velocity =
      _this.currentAction == "sprint" ? _this.runVeloctiy : _this.walkVelocity;

    const moveX = _this.walkDirection.x * velocity * delta;
    const moveZ = _this.walkDirection.z * velocity * delta;

    // 射线碰撞
    colliderCheck(_this, moveX, moveZ);
    // 摄像机跟随与转向
    let diffX, diffZ;
    diffX = _this.Robot.position.x - _this.oldX;
    diffZ = _this.Robot.position.z - _this.oldZ;
    updateCameraTarget(_this, diffX, diffZ, _this.Robot);

    _this.oldX = _this.Robot.position.x;
    _this.oldZ = _this.Robot.position.z;
  }
};
export const baoanUpdate = (_this, delta) => {
  _this.mixerbaoan.update(delta);
};

export const mixerviedoupdate = (_this, delta) => {
  _this.mixerviedo.update(delta);
};
export const DriveUpdate = (_this, delta) => {
  if (
    (_this.carKeyPress.isDown && _this.carKeyPress.w) ||
    (_this.carKeyPress.isDown && _this.carKeyPress.s) ||
    (_this.carKeyPress.isDown && _this.carKeyPress.a) ||
    (_this.carKeyPress.isDown && _this.carKeyPress.d)
  ) {
    // 永远面朝前
    let angleYCameraDirection = Math.atan2(
      _this.car.position.x - _this.camera.position.x,
      _this.car.position.z - _this.camera.position.z
    );

    DirectionOffset(_this, _this.carKeyPress);
    _this.rotateQuarternion.setFromAxisAngle(
      _this.rotateAngle,
      angleYCameraDirection + _this.directionOffset
    );
    _this.car.quaternion.rotateTowards(_this.rotateQuarternion, 1);
    _this.camera.getWorldDirection(_this.walkDirection);

    _this.walkDirection.y = 0;
    _this.walkDirection.normalize();
    _this.walkDirection.applyAxisAngle(
      _this.rotateAngle,
      _this.directionOffset
    );
    const velocity = _this.carVelocity;

    const moveX = _this.walkDirection.x * velocity * delta;
    const moveZ = _this.walkDirection.z * velocity * delta;
    
    
    // if (
    //   collisionResultsFrontObjs.length > 0 &&
    //   collisionResultsFrontObjs[0].distance > 12
    // ) {
      
    // } else {
      _this.car.position.x += moveX;
      _this.car.position.z += moveZ;
    // }

    let diffX, diffZ;
    diffX = _this.car.position.x - _this.oldX;
    diffZ = _this.car.position.z - _this.oldZ;
    updateCameraTarget(_this, diffX, diffZ, _this.car);

    _this.oldX = _this.car.position.x;
    _this.oldZ = _this.car.position.z;
  } else if (_this.carKeyPress.isDown && _this.carKeyPress.e) {
    Swal.fire({
      title: "您想要离开这辆车吗?",
      text: "您将步行!",
      
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "是的!",
      cancelButtonText:"取消!",
    }).then((res) => {
      if (res.isConfirmed) {
        _this.Robot.position = _this.car.position.clone();
        _this.Robot.position.x -= 6;
        _this.Robot.position.z -= 10;
        _this.Robot.position.y -= 2.5;
        // _this.Robot.position.z -= 8;
        _this.Robot.rotateY(Math.PI);
        camera_controls_init(_this, _this.Robot);
        _this.car.remove(_this.CarPerson);
        _this.scene.add(_this.Robot);
        openDoor(_this, true, false);
        _this.isDrive = false;
      }
    });
  }
};
