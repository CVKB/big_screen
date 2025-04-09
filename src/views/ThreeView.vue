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
  AmbientLight,
  PointLight,
  TextureLoader,
  PlaneGeometry,
  RepeatWrapping,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const threeContainer = ref<HTMLElement | null>(null)

let renderer: WebGLRenderer
let camera: PerspectiveCamera
let scene: Scene
let animationId = 0

onMounted(() => {
  const width = window.innerWidth
  const height = window.innerHeight

  // 创建场景
  scene = new Scene()

  // 相机
  camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(30, 30, 50)

  // 渲染器
  renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  threeContainer.value?.appendChild(renderer.domElement)

  // 控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // 地面
  const ground = new Mesh(
    new PlaneGeometry(200, 200),
    new MeshStandardMaterial({ color: 0xbbbbbb })
  )
  ground.rotation.x = -Math.PI / 2
  scene.add(ground)

  // 光源：环境光 + 点光源
  const ambientLight = new AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const pointLight = new PointLight(0xffffff, 1)
  pointLight.position.set(50, 50, 50)
  scene.add(pointLight)

  // 加载贴图
  const textureLoader = new TextureLoader()
  const wallTexture = textureLoader.load('/textures/tile-blue.jpg') // 放 public 目录
  wallTexture.wrapS = wallTexture.wrapT = RepeatWrapping
  wallTexture.repeat.set(10, 10)

  const wallMaterial = new MeshStandardMaterial({ map: wallTexture })

  // 每层高度
  const floorHeight = 2.5
  const buildingWidth = 10
  const buildingDepth = 20
  const floors = 4

  for (let i = 0; i < 6; i++) {
    const x = i * 15 - 40

    // 整体建筑
    const building = new Mesh(
      new BoxGeometry(buildingWidth, floorHeight * floors, buildingDepth),
      wallMaterial
    )
    building.position.set(x, floorHeight * floors / 2, 0)
    scene.add(building)

    // 添加装卸平台（第一层正前方，靠地面）
    const platform = new Mesh(
      new BoxGeometry(buildingWidth, 0.5, 4),
      new MeshStandardMaterial({ color: 0x888888 })
    )
    platform.position.set(x, 0.25, buildingDepth / 2 + 2)
    scene.add(platform)

    // 添加飘窗（前后顶部）
    const bayWindowMaterial = new MeshStandardMaterial({ color: 0x87ceeb })
    const bayWindowFront = new Mesh(
      new BoxGeometry(4, 2, 1),
      bayWindowMaterial
    )
    bayWindowFront.position.set(x, floorHeight * floors - 1, buildingDepth / 2 + 0.5)
    scene.add(bayWindowFront)

    const bayWindowBack = bayWindowFront.clone()
    bayWindowBack.position.z = -buildingDepth / 2 - 0.5
    scene.add(bayWindowBack)
  }

  // 渲染循环
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }

  animate()
})

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
