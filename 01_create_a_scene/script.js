console.log("Hello Three js ")
import * as THREE from  "https://unpkg.com/three@0.149.0/build/three.module.js";


//scene 
const scene = new THREE.Scene();
//console.log(scene);
//Red cube 
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

//camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z=3;
camera.position.x=1;
scene.add(camera);

//renderer
const canvas= document.createElement('canvas');
document.body.appendChild(canvas);
const rendered=new THREE.WebGLRenderer({
    canvas: canvas
    
});


rendered.setSize(window.innerWidth,window.innerHeight);
rendered.render(scene,camera);