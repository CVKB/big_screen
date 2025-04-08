<template>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  DirectionalLight,
  TextureLoader,
  PlaneGeometry,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const threeContainer = ref<HTMLElement | null>(null)

let renderer: WebGLRenderer
let camera: PerspectiveCamera
let scene: Scene
const factoryBuildings: Mesh[] = []
const windows: Mesh[] = [] // 存储窗户
let animationId = 0

onMounted(() => {
  const width = window.innerWidth
  const height = window.innerHeight

  // 创建场景
  scene = new Scene()

  // 创建相机
  camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(15, 15, 30)

  // 创建渲染器
  renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  threeContainer.value?.appendChild(renderer.domElement)

  // 创建控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // 创建厂区地面（平面）
  const planeGeometry = new PlaneGeometry(200, 200)
  const planeMaterial = new MeshStandardMaterial({ color: 0xbbbb })
  const plane = new Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -Math.PI / 2
  scene.add(plane)

  // 加载墙壁贴图
  const textureLoader = new TextureLoader()
  const wallTexture = textureLoader.load('path_to_wall_texture.jpg') // 请替换为实际的贴图路径

  // 创建厂房
  const buildingGeometry = new BoxGeometry(10, 10, 20) // 长方形厂房的几何体
  const buildingMaterial = new MeshStandardMaterial({ map: wallTexture })

  // 生成六个厂房并放置在场景中，水平排列
  for (let i = 0; i < 6; i++) {
    const building = new Mesh(buildingGeometry, buildingMaterial)
    building.position.set(i * 15 - 40, 5, 0) // 水平排列厂房
    factoryBuildings.push(building)
    scene.add(building)

    // 为每个厂房添加窗户
    const windowGeometry = new PlaneGeometry(4, 6) // 窗户的大小
    const windowMaterial = new MeshStandardMaterial({ color: 0x87ceeb }) // 窗户颜色，可以使用透明材质
    const window = new Mesh(windowGeometry, windowMaterial)

    // 将窗户放置在厂房的正面
    window.position.set(i * 15 - 40, 8, 10) // 窗户位置
    window.rotation.y = Math.PI / 2 // 旋转窗户，使其垂直于厂房
    windows.push(window)
    scene.add(window)
  }

  // 创建灯光
  const light = new DirectionalLight(0xffffff, 1)
  light.position.set(10, 10, 10)
  scene.add(light)

  // 动画函数（取消动画逻辑）
  const animate = () => {
    animationId = requestAnimationFrame(animate)

    controls.update()
    renderer.render(scene, camera)
  }

  animate()
})

// 清理
onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer.dispose()
})
</script>

<style scoped>
.three-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
