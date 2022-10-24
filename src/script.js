import './style.css'
import * as THREE from 'three'

console.log(THREE);
const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(10, 10, 10)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)
const sizes = {
  width: 800,
  height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1.0, 1000)
camera.position.z = 40
camera.position.x = 40
camera.position.y = 40
camera.lookAt(0, 0, 0)
scene.add(camera)

const canvas = document.querySelector('.webgl')
console.log(canvas);
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)