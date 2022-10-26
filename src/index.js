import './style.css'
import * as THREE from 'three'
import { MeshBasicMaterial } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols'

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(50, 50, 50)
camera.lookAt(0, 0, 0)

// 监听window的resize事件
window.addEventListener('resize', () => {
  // 设置宽高
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  // 设置相机的aspect属性(宽高比)
  camera.aspect = sizes.width / sizes.height
  // 更新相机的投影矩阵
  camera.updateProjectionMatrix()
  // 重新设置渲染器的大小
  renderer.setSize(sizes.width, sizes.height)
  // 当窗口发生变化时，重新设置renderer的像素比
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// 设置双击切换全屏（兼容safari）
window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.WebkiRrequestFullscreen) {
      canvas.WebkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

// 轨道控制器
const orbitcontrols = new OrbitControls(camera, canvas)
orbitcontrols.mouseButtons = {
  LEFT: null,
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT: THREE.MOUSE.ROTATE
}
// 设置轨道控制器阻尼
orbitcontrols.enableDamping = true

const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const box = new THREE.BoxGeometry(20, 20, 20)
const cube = new THREE.Mesh(box, material)

scene.add(cube)


renderer.render(scene, camera)

const clock = new THREE.Clock()
// 设置动画
const tick = () => {
  // update objects
  const elapsedTime = clock.getElapsedTime()
  cube.rotation.y = elapsedTime

  // orbitcontrols
  orbitcontrols.update()

  // render
  renderer.render(scene, camera)

  requestAnimationFrame(tick)
}
tick()