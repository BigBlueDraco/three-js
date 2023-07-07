import "./style.css";

import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

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
// camera.lookAt({ x: 10, y: 10, z: 10 });

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(200, 4000, 300);
scene.add(pointLight);
pointLight.position.set(4000, 200, 300);
scene.add(pointLight);
pointLight.position.set(200, 200, 4000);
scene.add(pointLight);

const geometry = new THREE.TorusGeometry(30, 3, 29, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);
torus.position.y = 50;
scene.add(torus);
const loader = new OBJLoader();
loader.load(
  "public/cube.obj",
  function (object) {
    object.scale.x = 3;
    object.scale.y = 3;
    object.scale.z = 3;
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

console.log(scene);
// renderer.render(scene, camera);
