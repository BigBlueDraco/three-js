import "./style.css";

import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const cameraIdle = new THREE.Vector3(0, 150, 150);
const currentCamera = new THREE.Vector3(0, 150, 150);
let returnCameraId;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.setZ(cameraIdle.z);
camera.position.setY(cameraIdle.y);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(100, 1000, 0);

scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = -3;
controls.enablePan = false;

const loader = new OBJLoader();
loader.load(
  "bunny.obj",
  function (object) {
    object.position.y = -80;
    object.scale.x = 1000;
    object.scale.y = 1000;
    object.scale.z = 1000;
    scene.add(object);
    renderer.render(scene, camera);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.log(error);
  }
);

function loop() {
  requestAnimationFrame(loop);

  controls.update();
  renderer.render(scene, camera);
}
function returnCamera(frame) {
  returnCameraId = requestAnimationFrame(() => returnCamera(frame + 0.005));
  if (frame > 1) {
    // camera.position.setX(currentCamera.x);
    // camera.position.setY(cameraIdle.y);
    // camera.position.setZ(currentCamera.z);
    cancelAnimationFrame(returnCameraId);
    controls.autoRotate = true;
    return;
  }
  camera.position.lerpVectors(
    currentCamera,
    new THREE.Vector3(currentCamera.x, cameraIdle.y, currentCamera.z),
    [frame]
  );
  console.log(camera.position);
}
function onControleRelise() {
  cancelAnimationFrame(returnCameraId);
  controls.autoRotate = false;
  currentCamera.set(camera.position.x, camera.position.y, camera.position.z);
  returnCamera(0);
}

loop();
renderer.domElement.addEventListener("mouseup", onControleRelise);
renderer.domElement.addEventListener("mousedown", () => {
  cancelAnimationFrame(returnCameraId);
});
