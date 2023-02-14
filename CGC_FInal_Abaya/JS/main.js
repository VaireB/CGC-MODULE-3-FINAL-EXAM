



const scene = new THREE.Scene();
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 120;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 120);
camera.lookAt(0, 0, 0);
const initialFOV = 75;



// Update the camera's field of view based on the zoom level
function updateZoom(zoomLevel) {
  camera.fov = initialFOV / zoomLevel;
  camera.updateProjectionMatrix();
}

// Call the updateZoom function with a zoom level of 2 to zoom in by a factor of 2
updateZoom(1.5);

const textureLoader = new THREE.TextureLoader();
const renderer = new THREE.WebGLRenderer();
const ambientLight = new THREE.AmbientLight(0x191970, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, .5);
directionalLight.position.set(120, 90, 120);
scene.add(directionalLight); 

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Creating the wall and adding the wall texture
function createWall(){
	const wallTexture = new THREE.TextureLoader().load("assets/textures/Wall.jpg");
	const wallGeometry = new THREE.BoxGeometry(50, 27, 2.7);
	const wallMaterial = new THREE.MeshPhysicalMaterial({map: wallTexture});
	const wall = new THREE.Mesh(wallGeometry, wallMaterial);
		
	return wall;

}

//Creating the Room
function createRoom(){

	const room = new THREE.Group();

	const rightWall = createWall();
	rightWall.position.set(0, 2.9, -24)
	room.add(rightWall);

	const leftWall = createWall();
	leftWall.rotation.y = 17.28;
	leftWall.position.set(-25, 3);
	room.add(leftWall);

	const botWall = createWall();
	botWall.rotation.y = 1.6;
	botWall.position.set(25,3);
	room.add(botWall);
	
	//Floor Texture
	const floorTexture = new THREE.TextureLoader().load("assets/textures/Floor3.jpg");
	const floor = new THREE.Mesh( 
		new THREE.PlaneGeometry( 50, 50, 1, 1 ), 
		new THREE.MeshLambertMaterial( {map: floorTexture} ) 
	);
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = 11;
	floor.position.y = -10;

	room.add(floor);

	//const floor2Texture = new THREE.TextureLoader().load("assets/textures/galaxy.jpg");
	//const floor2 = new THREE.Mesh( 
	//	new THREE.PlaneGeometry( 100, 100, 1, 1 ), 
	//	new THREE.MeshLambertMaterial( {map: floor2Texture} ) 
	//);
	//floor2.material.side = THREE.DoubleSide;
	//floor2.rotation.x = 11;
	//floor2.position.y = -13;

	//room.add(floor2);


	return room;

}
const room = createRoom();
scene.add(room); 






//Creating the Table
function createTable() {
	
	const Table = new THREE.Group();
	const TableTexture = new THREE.TextureLoader().load("assets/textures/wood.jpg");
  
	const desk = new THREE.Mesh(
	  new THREE.BoxBufferGeometry(42, 16, 8),
	  new THREE.MeshLambertMaterial({ map: TableTexture})
	);
	Table.add(desk);
	desk.position.y = 2;
	

	const deskSideLeft = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 8, 8),
		new THREE.MeshLambertMaterial({map: TableTexture})
	);

	const deskSideRight = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 8, 8),
		new THREE.MeshLambertMaterial({map: TableTexture})
	);
	
	Table.add(deskSideRight);
	deskSideRight.position.set(15, -2);

	Table.add(deskSideLeft);
	deskSideLeft.position.set(-15, -2);


	
	return Table;
}
  
const Table = createTable();
Table.scale.x = 0.5;
Table.scale.y = 0.5;
Table.rotation.y = -14.15;
Table.position.set(-19, -6.0, 13);
scene.add(Table);

const Table2 = createTable();
Table2.position.set(18, -6 ,4 );
scene.add(Table2);
Table2.scale.x = 0.3;
Table2.scale.y = 0.5;


const Table3 = createTable();
Table3.position.set(0, -6 ,2.5 );
scene.add(Table3);
Table3.scale.x = 0.3;
Table3.scale.y = 0.5;







//Creating a couch
function createCouch(){

	
	const couch = new THREE.Group();
	const couchTexture = new THREE.TextureLoader().load('assets/textures/chair2.jpg');



	const BackRest = new THREE.Mesh(
		new THREE.BoxBufferGeometry(50, 12, 4),
		new THREE.MeshPhongMaterial({ map: couchTexture })
	);
	BackRest.position.set(-4.4, 1.8, 0);
	BackRest.rotation.y=1.58
	couch.add(BackRest);

	const CouchCushion = new THREE.Mesh(
		new THREE.BoxBufferGeometry(9, 4, 50),
		new THREE.MeshPhongMaterial({ map: couchTexture })
	);
	CouchCushion.position.set(1 , -2, 0	);
	couch.add(CouchCushion);

	
	return couch;
}
const couch = createCouch();
couch.scale.x = 1;
couch.rotation.y = -7.87;
couch.position.set(0, -5, -17);
scene.add(couch);

const couch2 = createCouch();
couch2.scale.x= 1;
couch2.rotation.y = 9.44;
couch2.position.set(18.5, -5, 0)
scene.add(couch2)



// Create animated particles
const particleCount = 200;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const particleColors = new Float32Array(particleCount * 3);
const particleTexture = textureLoader.load('assets/particles/rain2.png');

for (let i = 0; i < particleCount; i++) {
  particlePositions[i * 3] = Math.random() * 100 - 50;
  particlePositions[i * 3 + 1] = Math.random() * 50 + 50;
  particlePositions[i * 3 + 2] = Math.random() * 100 - 50;

  particleColors[i * 3] = 1;
  particleColors[i * 3 + 1] = 1;
  particleColors[i * 3 + 2] = 1;
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

const particleMaterial = new THREE.PointsMaterial({
  size: 1,
  map: particleTexture,
  blending: THREE.AdditiveBlending,
  transparent: true,
  alphaTest: 0.5
});

const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleSystem);

// Animate the particles
function animateParticles() {
  const positions = particleGeometry.attributes.position.array;

  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] -= 0.1; // Move the particle down by 0.1 units every frame

    if (positions[i + 1] < -50) { // Reset the particle's position if it falls below -50 units
      positions[i] = Math.random() * 100 - 50;
      positions[i + 1] = Math.random() * 50 + 50;
      positions[i + 2] = Math.random() * 100 - 50;
    }
  }

  particleGeometry.attributes.position.needsUpdate = true;

  requestAnimationFrame(animateParticles);
  renderer.render(scene, camera);
}

animateParticles();

//Render Scene
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
  }