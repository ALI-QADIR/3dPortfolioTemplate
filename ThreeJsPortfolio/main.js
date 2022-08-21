import "./style.css";

// import three js library
import * as THREE from "three";

// importing orbit controls for scene helping (see line 77)
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

// setting intial camera postion to 30 on Z axis
camera.position.setZ(30);

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
pointLight.position.set(20, 20, 20);

// adding ambient light to the scene. it lights up the whole scene
// arguments are as follows, 1st color of light and 2nd intensity
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// adding ambient light to the scene
scene.add(ambientLight, pointLight);

// adding light helper and grid helper to the scene to help better visualilse.
const lightHelper = new THREE.PointLightHelper(pointLight); // point light helper
const gridHelper = new THREE.GridHelper(200, 50); // grid helper
/* GridHelper( size : Number, divisions : Number, colorCenterLine : Color, colorGrid : Color )
size -- The size of the grid. Default is 10.
divisions -- The number of divisions across the grid. Default is 10.
colorCenterLine -- The color of the centerline. This can be a Color, a hexadecimal value and an CSS-Color name. Default is 0x444444
colorGrid -- The color of the lines of the grid. This can be a Color, a hexadecimal value and an CSS-Color name. Default is 0x888888 */
scene.add(lightHelper, gridHelper);

// adding orbit controls
const controls = new OrbitControls(camera, renderer.domElement); // listens DOM events on mouse and updates camera position
// add control.update in animate function to update UI.

// recursive function to give an infinite loop to call render method automatically
function animate() {
  requestAnimationFrame(animate); // a mechanism that tells the browser that you want to perform an animation

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // adding controls.update function
  controls.update();

  renderer.render(scene, camera); // Now when the browser repaints the screen it calls the render method and updates the UI just like Game loop in game dev
}

animate();
// 56
