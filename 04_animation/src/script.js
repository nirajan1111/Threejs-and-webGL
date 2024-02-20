import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// time 
// let time =Date.now()
// when the frame rate of the screen is low, the animation will be slow, so we need to use the time to calculate the speed of the animation

//clock
// const clock =new THREE.Clock()

//gsap 
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

// animation
const tick = () => {
    // const currTime = Date.now()
    // const deltaTime = currTime - time
    // time = currTime
    // doing this results same speed animation in all frame rate 
    // mesh.rotation.x += 0.001*deltaTime


    //  const elapsedTime = clock.getElapsedTime()
    // mesh.rotation.x = elapsedTime

    // mesh.position.x = Math.cos(elapsedTime)
    // mesh.position.y = Math.sin(elapsedTime)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()