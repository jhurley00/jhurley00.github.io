// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100000); // Match aspect ratio to container

let object; // Store the loaded 3D object

// Define the path to the model
const modelPath = "models/cat/scene.gltf";
console.log("Attempting to load model from:", modelPath);

// Instantiate the loader for the GLTF model
const loader = new GLTFLoader();

// Reference the container
const container = document.getElementById("container3D");
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;

// Renderer setup with transparent background
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x000000, 0); // Transparent background
renderer.setSize(containerWidth, containerHeight);
container.appendChild(renderer.domElement);

// Adjust camera aspect ratio
camera.aspect = containerWidth / containerHeight;
camera.updateProjectionMatrix();

// Load the model
loader.load(
  modelPath,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);

    // Compute bounding box for scaling and centering
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Calculate scale to make the model fit perfectly
    const scaleFactor = 3000 / Math.max(size.x, size.y, size.z); // Adjusted scale to fit container
    object.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // Center the model
    object.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor);

    // Adjust camera to frame the model properly
    camera.position.set(0, 0, 4000); // Pull camera back to fit model nicely
    camera.lookAt(0, 0, 0); // Focus on center of the model
  },
  undefined,
  function (error) {
    console.error("Error loading model:", error);
  }
);

// Add lighting
const ambientLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(10, 20, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the model smoothly
  if (object) {
    object.rotation.y += 0.001;
  }

  renderer.render(scene, camera);
}

animate();

// Adjust renderer on window resize
window.addEventListener("resize", () => {
  const newWidth = container.offsetWidth;
  const newHeight = container.offsetHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
});


function hideModelOnMobile() {
    const container3D = document.getElementById('container3D');

    if (window.innerWidth <= 768) {
        if (container3D) {
            container3D.style.display = 'none';
        }
    } else {
        if (container3D) {
            container3D.style.display = '';
        }
    }
}

// Run the function on page load and window resize
window.addEventListener('DOMContentLoaded', hideModelOnMobile);
window.addEventListener('resize', hideModelOnMobile);