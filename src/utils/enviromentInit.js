import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
export const initLight = (_this) => {
  // 点光源(灯泡)
  const PointLight = new THREE.PointLight(0xffffff, 0.6);
  _this.scene.add(PointLight);
  // 环境光
  _this.ambient = new THREE.AmbientLightProbe(0xffffff, 1);
  _this.scene.add(_this.ambient);
  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  _this.scene.add(ambientLight);
  const spotlight = new THREE.SpotLight(0xffffff, 0.9, 0, Math.PI / 4, 1);
  spotlight.position.set(10, 30, 20);
  spotlight.target.position.set(0, 0, 0);
  spotlight.castShadow = true;
  spotlight.shadow.camera.near = 10;
  spotlight.shadow.camera.far = 100;
  spotlight.shadow.camera.fov = 30;
  // spotlight.shadow.bias = -0.0001
  spotlight.shadow.mapSize.width = 2048;
  spotlight.shadow.mapSize.height = 2048;
  _this.scene.add(spotlight);
};
export const initRGB = (_this) => {
  new RGBELoader().load("../resources/sky.hdr", (texture) => {
    _this.scene.background = texture;
    texture.mapping = THREE.EquirectangularReflectionMapping;
    _this.scene.environment = texture;
  });
};
