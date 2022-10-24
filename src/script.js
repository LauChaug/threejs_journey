import './style.css'
import * as THREE from 'three'
import { Mesh, MeshBasicMaterial } from 'three';

console.log(THREE);
const scene = new THREE.Scene()
// const geometry = new THREE.BoxGeometry(10, 10, 10)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const cube = new THREE.Mesh(geometry, material)
// cube.position.y = -10
// cube.position.x = 10
// cube.position.z = 10
// scene.add(cube)
// console.log(cube.position.length());
// cube.rotation.x = 1
// cube.rotation.y = 0
// cube.rotation.z = 0.5

// 创建一个group

const group = new THREE.Group()
scene.add(group)
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new MeshBasicMaterial({ color: 0xff0000 })
)
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new MeshBasicMaterial({ color: 0x00ff00 })
)
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new MeshBasicMaterial({ color: 0x0000ff })
)
cube2.position.x = 20
cube3.position.x = -20
group.add(cube1, cube2, cube3)

group.position.y = 10
group.scale.y = 2
group.rotation.y = 70

const sizes = {
  width: 800,
  height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1.0, 1000)
camera.position.set(1, 15, 60)
// camera.position.x = 40
// camera.position.y = 40
camera.lookAt(0, 0, 0)
scene.add(camera)

const axesHelper = new THREE.AxesHelper(500)
scene.add(axesHelper)

// console.log(cube.position.distanceTo(camera.position));

const canvas = document.querySelector('.webgl')
console.log(canvas);
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)