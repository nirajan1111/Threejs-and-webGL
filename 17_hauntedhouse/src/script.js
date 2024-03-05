import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')
//Fog


// Scene
const scene = new THREE.Scene()

const fog=new THREE.Fog('#262837',1,16)
scene.fog=fog
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture=textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture=textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture=textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture=textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture=textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture=textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture=textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture=textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture=textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture=textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture=textureLoader.load('/textures/bricks/roughness.jpg')


const grassColorTexture=textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture=textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture=textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture=textureLoader.load('/textures/grass/roughness.jpg')


grassColorTexture.repeat.set(8,8)
grassAmbientOcclusionTexture.repeat.set(8,8)
grassNormalTexture.repeat.set(8,8)
grassRoughnessTexture.repeat.set(8,8)

grassColorTexture.wrapS=THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS=THREE.RepeatWrapping
grassNormalTexture.wrapS=THREE.RepeatWrapping
grassRoughnessTexture.wrapS=THREE.RepeatWrapping

grassColorTexture.wrapT=THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT=THREE.RepeatWrapping
grassNormalTexture.wrapT=THREE.RepeatWrapping
grassRoughnessTexture.wrapT=THREE.RepeatWrapping

/**
 * House
 */
//group 
const house =new THREE.Group()
scene.add(house)

const wallgeometry =new THREE.BoxGeometry(4,2.5,4)
const wallmaterial =new THREE.MeshStandardMaterial({
    map:bricksColorTexture,
    aoMap:bricksAmbientOcclusionTexture,
    normalMap:bricksNormalTexture,
    roughnessMap:bricksRoughnessTexture
})
const wall= new THREE.Mesh(wallgeometry,wallmaterial)
wall.position.y=1.25
wall.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(wall.geometry.attributes.uv.array,2)
)
house.add(wall);

const roof=new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5, 1, 4),
    new THREE.MeshBasicMaterial( {color: "#b35f45"} )
)
roof.position.y=3
roof.rotation.y=Math.PI*0.25
house.add(roof)

const door=new THREE.Mesh(
    new THREE.PlaneGeometry(2,2,10,10),
    new THREE.MeshStandardMaterial({
        map:doorColorTexture,
        transparent:true,
        alphaMap:doorAlphaTexture,
        aoMap:doorAmbientOcclusionTexture,
        displacementMap:doorHeightTexture,
        displacementScale:0.1,
        normalMap:doorNormalTexture,
        metalnessMap:doorMetalnessTexture,
        roughnessMap:doorRoughnessTexture

    })
)
door.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2)
)
door.position.z=2+0.001
door.position.y=1.00001
house.add(door)

//Bush
const bushgeometry=new THREE.SphereGeometry(1,16,16)
const bushmaterial=new THREE.MeshBasicMaterial({
    color:'#89c854'
})

const bush1=new THREE.Mesh(bushgeometry,bushmaterial)
const bush2=new THREE.Mesh(bushgeometry,bushmaterial)
const bush3=new THREE.Mesh(bushgeometry,bushmaterial)
const bush4=new THREE.Mesh(bushgeometry,bushmaterial)

bush1.position.set(1.3,0,3)
bush2.position.set(0.5,0,3)
bush3.position.set(0.5,0,3)
bush4.position.set(0.5,0,4)

bush1.scale.set(0.5,0.5,0.5)
bush2.scale.set(0.3,0.2,0.2)
bush3.scale.set(0.5,0.5,0.5)
bush4.scale.set(0.3,0.2,0.2)

house.add(bush1,bush2,bush3,bush4)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial(
        {
            map:grassColorTexture,
            aoMap:grassAmbientOcclusionTexture,
            normalMap:grassNormalTexture,
            roughnessMap:grassRoughnessTexture

        }
    )
)
floor.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array,2)
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0


const ghost1=new THREE.PointLight('#ff00ff',2,3)
scene.add(ghost1)

const ghost2=new THREE.PointLight('#00ffff',2,3)
scene.add(ghost2)
const ghost3=new THREE.PointLight('#ffff00',2,3)
scene.add(ghost3)

ghost1.castShadow=true;
ghost2.castShadow=true;
ghost3.castShadow=true;
wall.castShadow=true
bush1.castShadow=true
bush2.castShadow=true
bush3.castShadow=true

floor.receiveShadow=true


scene.add(floor)


//graves
const graves=new THREE.Group()
scene.add(graves)
const gravegeometry= new THREE.BoxBufferGeometry(0.6,0.8,0.2)
const gravematerial= new THREE.MeshBasicMaterial({color:"#b2b6b1"})

for(let i=0;i<50;i++){
    const choices=[-1,1]
    let val=choices[Math.floor(Math.random() * choices.length)];
    const angle1=Math.random()*Math.PI*2
    let x=val*4+val*Math.sin(angle1)*1
     val=choices[Math.floor(Math.random() * choices.length)];
    const angle2=Math.random()*Math.PI*2
    let z= val*6+val*Math.cos(angle2)*3
    const grave=new THREE.Mesh(gravegeometry,gravematerial);
    grave.position.set(x,0.4-Math.random()*0.5,z)
    grave.rotation.y=Math.random()-0.5
    graves.castShadow=true
    graves.add(grave)
} 

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
ambientLight.castShadow=true
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)

moonLight.castShadow=true

scene.add(moonLight)

//Door light
const doorLight=new THREE.PointLight('#ff7d46',1,7)
doorLight.position.set(0,2.2,2.7)
doorLight.castShadow=true
house.add(doorLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled=true
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    let elapsedTime = clock.getElapsedTime()

    const ghost1Angle =elapsedTime
    ghost1.position.x=Math.cos(ghost1Angle)*4
    ghost1.position.z=Math.sin(ghost1Angle)*4
    ghost1.position.y=Math.sin(ghost1Angle*3)

    const ghost2Angle =elapsedTime
    ghost2.position.x=Math.cos(ghost2Angle)*5
    ghost2.position.z=Math.sin(ghost2Angle)*5
    ghost2.position.y=Math.sin(ghost2Angle*4)

    const ghost3Angle =elapsedTime
    ghost3.position.x=Math.cos(ghost3Angle)*4
    ghost3.position.z=Math.sin(ghost3Angle)*4
    ghost3.position.y=Math.sin(ghost3Angle*3)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
    

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()