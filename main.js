import "./style.css";

// import three js library
// import * as THREE from "three";
import * as THREE from "https://unpkg.com/three@0.143.0/build/three.js";

// importing orbit controls for scene helping (see line 77)
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Create a scene using three js
const scene = new THREE.Scene();

// add a perspective camera, 1st argument is the view angle, second is the aspect ratio, last 2 argument s are3 for the view frustrum, i.e, field of vision of perspective camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Creating renderer. Canvas is provided as a DOM element to use for renderer
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

// Setting pixel ratio and size for renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// setting intial camera postion
camera.position.setZ(30);
camera.position.setX(-10);

renderer.render(scene, camera);

// creating a geometry(3D shape)
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// adding material to the shape. You can make a custom shader using webGL. Learn it from Youtube if needed.
// MeshBasicMaterial, unlike other shaders, does not require light to bounce off of it.
/*const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  wireframe: true,
});*/
// MeshStandardMaterial reacts to light bouncicng off of it
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});

// create mesh by combining geometry and material
const torus = new THREE.Mesh(geometry, material);

// adding torus to the scene
scene.add(torus);

// adding point light to the scene
// arguments are as follows, 1st color of light, 2nd intensity, 3rd distance (to which light will go) and decay
const pointLight = new THREE.PointLight(0xffffff, 1, 1000, 1);
// setting initial postion of the light
pointLight.position.set(5, 5, 5);

// adding ambient light to the scene. it lights up the whole scene
// arguments are as follows, 1st color of light and 2nd intensity
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// adding ambient light to the scene
scene.add(ambientLight, pointLight);

// adding light helper and grid helper to the scene to help better visualilse.

// const lightHelper = new THREE.PointLightHelper(pointLight); // point light helper
// const gridHelper = new THREE.GridHelper(200, 50); // grid helper
/* GridHelper( size : Number, divisions : Number, colorCenterLine : Color, colorGrid : Color )
size -- The size of the grid. Default is 10.
divisions -- The number of divisions across the grid. Default is 10.
colorCenterLine -- The color of the centerline. This can be a Color, a hexadecimal value and an CSS-Color name. Default is 0x444444
colorGrid -- The color of the lines of the grid. This can be a Color, a hexadecimal value and an CSS-Color name. Default is 0x888888 */
// scene.add(lightHelper, gridHelper);

// adding orbit controls
// const controls = new OrbitControls(camera, renderer.domElement); // listens DOM events on mouse and updates camera position
// add control.update in animate function to update UI.

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24); // arguments, 1st radius, 2nd width segments, 2nd height segments
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  // generating random numbers for star position
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// adding space texture
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// adding avatar cube
const avatarTexture = new THREE.TextureLoader().load("avatar.jpg");
const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: avatarTexture })
);
scene.add(avatar);

// adding moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

avatar.position.z = -5;
avatar.position.x = 2;

// adding camera movement on scroll
function moveCamera() {
  // gets the hegiht from the top to which the page is scrolled
  const t = document.body.getBoundingClientRect().top;

  // set moon rotation on scroll
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  avatar.rotation.y += 0.01;
  avatar.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// recursive function to give an infinite loop to call render method automatically
function animate() {
  requestAnimationFrame(animate); // a mechanism that tells the browser that you want to perform an animation

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // adding controls.update function
  // controls.update();

  renderer.render(scene, camera); // Now when the browser repaints the screen it calls the render method and updates the UI just like Game loop in game dev
}

animate();
