// global variables
var renderer;
var scene;
var camera;

// create a scene, that will hold all our elements such as objects, cameras and lights.
scene = new THREE.Scene();

var maze = new Maze(scene,17, 100, 100);
maze.generate();
maze.draw();

// create a camera, which defines where we're looking at.
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a render, sets the background color and the size


// create the ground plane
var planeGeometry = new THREE.PlaneGeometry(100, 100);
var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

// rotate and position the plane
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = 0;

// add the plane to the scene
scene.add(plane);

// position and point the camera to the center of the scene
camera.position.x = 80;
camera.position.y = 120;
camera.position.z = 100;
camera.lookAt(scene.position);

// add spotlight for the shadows
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(40, 100, 80);
spotLight.shadowCameraNear = 20;
spotLight.shadowCameraFar = 50;
spotLight.castShadow = true;

var ambientLight = new THREE.AmbientLight(0x080808);
scene.add(ambientLight);

scene.add(spotLight);


//Rendering

renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000000, 1.0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
document.body.appendChild(renderer.domElement);
var controls = new THREE.OrbitControls(camera, renderer.domElement);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();

/**
 * Function handles the resize event. This make sure the camera and the renderer
 * are updated at the correct moment.
 */
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// calls the handleResize function when the window is resized
window.addEventListener('resize', handleResize, false);