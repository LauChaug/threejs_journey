import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { BufferAttribute, Mesh, MeshBasicMaterial } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


// Cursor
// const cursor = {
//   x: 0,
//   y: 0
// }
// window.addEventListener('mousemove', (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5
//   cursor.y = - (event.clientY / sizes.height - 0.5)
//   console.log(cursor.x, cursor.y);
// })

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
// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(10, 10, 10, 2),
//   new MeshBasicMaterial({ color: 0xff0000, wireframe: true })
// )
// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(10, 10, 10),
//   new MeshBasicMaterial({ color: 0x00ff00 })
// )
// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(10, 10, 10),
//   new MeshBasicMaterial({ color: 0x0000ff })
// )
// cube2.position.x = 20
// cube3.position.x = -20
// group.add(cube1, cube2, cube3)

// group.position.y = 5
// group.scale.y = 2
// group.rotation.y = 70
const geometry = new THREE.BufferGeometry()

const count = 50
const positionArray = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 4
}
const positionAttribute = new BufferAttribute(positionArray, 3)
geometry.setAttribute('position', positionAttribute)
const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const cube = new THREE.Mesh(geometry, material)
group.add(cube)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// resizewindow
window.addEventListener('resize', () => {
  // 重新获取视口尺寸
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // 重新设置camera的aspect属性
  camera.aspect = sizes.width / sizes.height
  // 更新camera的投影矩阵
  camera.updateProjectionMatrix()
  // 重新设置渲染器的尺寸
  renderer.setSize(sizes.width, sizes.height)
  // 在窗口尺寸发生变化或换屏的时候也需要重新设置设备像素比
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// 设置双击切换到全屏 fullscreen 兼容safari
window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  }
  else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1.0, 100)
camera.position.set(1, 5, 30)
// camera.position.x = 40
// camera.position.y = 40
camera.lookAt(group.position)
scene.add(camera)

const canvas = document.querySelector('.webgl')
console.log(canvas);
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
// 设置设备像素比,最高为2
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// OrbientControls
// console.log(OrbitControls);
const orbitControls = new OrbitControls(camera, canvas)
// orbitControls.enabled = false
orbitControls.mouseButtons = {
  LEFT: null,
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT: THREE.MOUSE.ROTATE
}
orbitControls.enableDamping = true

// 添加辅助标线
// const axesHelper = new THREE.AxesHelper(500)
// scene.add(axesHelper)

// console.log(cube.position.distanceTo(camera.position));

renderer.render(scene, camera)

// let time = Date.now()
// const clock = new THREE.Clock()
console.log(gsap);
// gsap.to(group.position, { duration: 1, delay: 1, x: 40 })
// gsap.to(group.position, { duration: 1, delay: 3, x: 0 })

const tick = () => {
  // const currentTime = Date.now()
  // const deltaTime = currentTime - time
  // time = currentTime
  // group.rotation.x -= 0.01
  // group.rotation.y += 0.001 * deltaTime
  // const elapsedTime = clock.getElapsedTime()
  // update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 30
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 30
  // camera.position.y = cursor.y * 40
  // camera.lookAt(group.position)
  // console.log(elapsedTime);
  // group.rotation.y = Math.cos(elapsedTime * 2)
  orbitControls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()