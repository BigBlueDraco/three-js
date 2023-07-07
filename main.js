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
camera.position.setZ(100);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(200, 4000, 300);
scene.add(pointLight);
pointLight.position.set(4000, 200, 300);
scene.add(pointLight);
pointLight.position.set(200, 200, 4000);
scene.add(pointLight);

const geometry = new THREE.TorusGeometry(30, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);
const loader = new OBJLoader();
loader.load(
  "./cube.obj",
  function (object) {
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.log(error);
  }
);

renderer.render(scene, camera);
