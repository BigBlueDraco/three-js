import "./style.css";

import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
let animId;
let rabit;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(200);

const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(300, 500, 2000);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;

const loader = new OBJLoader();
loader.load(
  "assets/bunny.obj",
  function (object) {
    object.position.y = -80;
    object.scale.x = 1000;
    object.scale.y = 1000;
    object.scale.z = 1000;
    rabit = object;
    scene.add(rabit);
    anim();

    renderer.render(scene, camera);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.log(error);
  }
);
function stopAnimation(e) {
  cancelAnimationFrame(animId);
}
function loop() {
  requestAnimationFrame(loop);
  controls.update();
  renderer.render(scene, camera);
}
function anim() {
  cancelAnimationFrame(animId);
  animId = requestAnimationFrame(() => anim());
  rabit.rotation.y += 0.005;
  renderer.render(scene, camera);
}
loop();
renderer.domElement.addEventListener("mousedown", stopAnimation);
renderer.domElement.addEventListener("mouseup", () => {
  setTimeout(() => {
    anim();
  }, 2000);
});
