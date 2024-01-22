import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x = 0.7
// mesh.position.y = -0.7
// mesh.position.z = 1

// mesh.rotation.reorder('YX/Z')
// mesh.rotation.x=Math.PI *0.25
// mesh.rotation.y = Math.PI/2

// // mesh.position.set(0.7, -0.7, 1)
// // console.log(mesh.position.length())
// // mesh.position.normalize() // it make the position 1 
// // console.log(mesh.position.length())


// mesh.scale.x=2
// scene.add(mesh)




const group = new THREE.Group()
scene.add(group)
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)

cube2.position.x = -1.5
cube3.position.x = 1.5
group.add(cube1)
group.add(cube2)
group.add(cube3)

group.position.y = 2
group.rotation.y = 1
const AxisHelper = new THREE.AxesHelper()
scene.add(AxisHelper)
/**
 * Sizes
 */
const sizes = {
    width: 1000,
    height: 800
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 1
camera.position.x = 1
// camera.lookAt(mesh.position)  
scene.add(camera)

// console.log(mesh.position.distanceTo(camera.position))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)