let container;
let camera;
let controls;
let renderer;
let scene;

function init() {
  container = document.querySelector("#scene-container");

  // background color
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  createCamera();
  createControls();
  createLights();
  createMeshes();
  createRenderer();

  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(-5, 5, 7);
}

function createControls() {
  controls = new THREE.OrbitControls(camera, container);
}

function createLights() {
  // hourglass color
  const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 5);

  const mainLight = new THREE.DirectionalLight(0xffffff, 5);
  mainLight.position.set(10, 10, 10);

  scene.add(ambientLight, mainLight);
}

function createMaterials() {
  const hourglass = new THREE.MeshStandardMaterial({
    color: 0xffffff, 
    flatShading: false
  });

  hourglass.color.convertSRGBToLinear();

  const detail = new THREE.MeshStandardMaterial({
    color: 0xd3bea5, 
    flatShading: false
  });

  detail.color.convertSRGBToLinear();

  return {
    hourglass,
    detail
  };
}

function createGeometries() {

  const top = new THREE.CylinderBufferGeometry(0.9, 0.3, 1.5);

  const bottom = new THREE.CylinderBufferGeometry(0.9, 0.3, 1.5);

  bottom.applyMatrix(new THREE.Matrix4().makeScale(-1, -1, 1));

  return {
    
    top,
    bottom
  };
}


function rotateHourglass() {
  var SPEED = 0.01;
    hourglass.rotation.x -= SPEED * 2;
    hourglass.rotation.y -= SPEED;
    hourglass.rotation.z -= SPEED * 3;
} 

function render() {
    requestAnimationFrame(render);
    rotateHourglass();
    renderer.render(scene, camera);
}

function createMeshes() {
  const hourglass = new THREE.Group();
  scene.add(hourglass);

  const materials = createMaterials();
  const geometries = createGeometries();

  const top = new THREE.Mesh(geometries.top, materials.detail);
  top.position.set(0, 0.7, 0);

  const bottom = new THREE.Mesh(geometries.bottom, materials.detail);
  bottom.position.set(0, -0.7, 0);

  hourglass.add(
    top,
    bottom
  );
}

function createRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;

  container.appendChild(renderer.domElement);
}

function update() {}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

init();
