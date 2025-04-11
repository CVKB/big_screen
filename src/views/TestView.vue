<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted, ref } from 'vue'

const container = ref<HTMLDivElement | null>(null)

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer
let raycaster: THREE.Raycaster
let mouse: THREE.Vector2

const highlightMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc00 })
const originalMaterials = new Map<string, THREE.Material[]>()

onMounted(() => {
  initThree()
  animate()
})

function initThree() {
  // 场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color('#e5e5e5')

  // 相机
  camera = new THREE.PerspectiveCamera(60, container.value!.clientWidth / container.value!.clientHeight, 0.1, 1000)
  camera.position.set(10, 10, 20)

  // 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value!.clientWidth, container.value!.clientHeight)
  container.value!.appendChild(renderer.domElement)

  // 灯光
  const light = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(light)

  const dirLight = new THREE.DirectionalLight(0xffffff, 1)
  dirLight.position.set(10, 10, 10)
  scene.add(dirLight)

  // 控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // 射线检测
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()

  // 监听事件
  renderer.domElement.addEventListener('mousemove', onMouseMove)
  renderer.domElement.addEventListener('click', onClick)

  // 加载模型
  const loader = new GLTFLoader()
  loader.load('/models/factory.glb', (gltf: { scene: THREE.Object3D<THREE.Object3DEventMap> }) => {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.userData.originalMaterial = child.material
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        child.name && originalMaterials.set(child.name, [child.material])
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    scene.add(gltf.scene)
  })
  controls.update()

}

function onMouseMove(event: MouseEvent) {
  const rect = renderer.domElement.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
}

let currentIntersected: THREE.Object3D | null = null

function handleHighlight() {
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(scene.children, true)

  if (intersects.length > 0) {
    const object = intersects[0].object
    if (currentIntersected !== object) {
      // 恢复上一个高亮
      if (currentIntersected && currentIntersected instanceof THREE.Mesh) {
        currentIntersected.material = currentIntersected.userData.originalMaterial
      }

      // 设置新高亮
      if (object instanceof THREE.Mesh) {
        object.material = highlightMaterial
        currentIntersected = object
      }
    }
  } else {
    // 没有选中任何物体，恢复
    if (currentIntersected && currentIntersected instanceof THREE.Mesh) {
      currentIntersected.material = currentIntersected.userData.originalMaterial
    }
    currentIntersected = null
  }
}

function onClick() {
  if (currentIntersected) {
    alert(`点击了：${currentIntersected.name}`)
  }
}

function animate() {
  requestAnimationFrame(animate)
  handleHighlight()
  renderer.render(scene, camera)
}
</script>

<template>
  <div ref="container" style="width: 100%; height: 100vh"></div>
</template>

<style scoped>
canvas {
  display: block;
}
</style>
