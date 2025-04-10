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
  Raycaster,
  Vector2,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const threeContainer = ref<HTMLElement | null>(null)
let renderer: WebGLRenderer
let camera: PerspectiveCamera
let scene: Scene
let animationId = 0
let raycaster: Raycaster
let mouse: Vector2
const floorMeshes: Mesh[] = []
let hoveredMesh: Mesh | null = null

onMounted(() => {
  const width = window.innerWidth
  const height = window.innerHeight

  scene = new Scene()
  camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(100, 100, 300)

  renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  threeContainer.value?.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const ground = new Mesh(
    new PlaneGeometry(1000, 1000),
    new MeshStandardMaterial({ color: 0xbbbbbb })
  )
  ground.rotation.x = -Math.PI / 2
  scene.add(ground)

  const ambientLight = new AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)
  const pointLight = new PointLight(0xffffff, 1)
  pointLight.position.set(50, 50, 50)
  scene.add(pointLight)

  const textureLoader = new TextureLoader()
  const wallTexture = textureLoader.load('/textures/tile-blue.jpg')
  wallTexture.wrapS = wallTexture.wrapT = RepeatWrapping
  wallTexture.repeat.set(5, 5)
  const wallMaterial = new MeshStandardMaterial({ map: wallTexture })

  const floorHeight = 8
  const firstFloorHeight = floorHeight * 1.6
  const buildingWidth = 40
  const buildingDepth = 160
  const floors = 4
  const centerX = 0

  for (let j = 0; j < floors; j++) {
    const currentHeight = j === 0 ? firstFloorHeight : floorHeight
    const y = j === 0
      ? currentHeight / 2
      : firstFloorHeight + floorHeight / 2 + (j - 1) * floorHeight
    const floor = new Mesh(
      new BoxGeometry(buildingWidth, currentHeight, buildingDepth),
      wallMaterial.clone()
    )
    floor.position.set(centerX, y, 0)
    floor.userData = {
      originColor: wallMaterial.color.getHex(),
    }
    floorMeshes.push(floor)
    scene.add(floor)

    const windowMaterial = new MeshStandardMaterial({ color: 0x87ceeb })
    for (let wx = -buildingWidth / 2 + 6; wx <= buildingWidth / 2 - 6; wx += 12) {
      const frontWindow = new Mesh(new BoxGeometry(4, 4, 1), windowMaterial)
      frontWindow.position.set(centerX + wx, y, buildingDepth / 2 + 0.51)
      scene.add(frontWindow)
      const backWindow = frontWindow.clone()
      backWindow.position.z = -buildingDepth / 2 - 0.51
      scene.add(backWindow)
    }
    for (let wz = -buildingDepth / 2 + 8; wz <= buildingDepth / 2 - 8; wz += 24) {
      const sideWindowL = new Mesh(new BoxGeometry(1, 4, 4), windowMaterial)
      sideWindowL.position.set(centerX - buildingWidth / 2 - 0.51, y, wz)
      scene.add(sideWindowL)
      const sideWindowR = sideWindowL.clone()
      sideWindowR.position.x = buildingWidth / 2 + 0.51
      scene.add(sideWindowR)
    }
  }

  const platformDepth = 30
  const platformHeight = 3
  const elevatorThickness = 2

  for (const z of [buildingDepth / 2 + platformDepth / 2, -buildingDepth / 2 - platformDepth / 2]) {
    const fullPlatform = new Mesh(
      new BoxGeometry(buildingWidth + 12, platformHeight, platformDepth),
      new MeshStandardMaterial({ color: 0x666666 })
    )
    fullPlatform.position.set(centerX, platformHeight / 2, z)
    scene.add(fullPlatform)

    const elevatorMat = new MeshStandardMaterial({ color: 0x222222 })
    for (const offsetX of [-10, 10]) {
      const elevator = new Mesh(
        new BoxGeometry(4, firstFloorHeight, elevatorThickness),
        elevatorMat
      )
      const elevatorZ = z > 0
        ? buildingDepth / 2 + elevatorThickness / 2
        : -buildingDepth / 2 - elevatorThickness / 2
      elevator.position.set(centerX + offsetX, firstFloorHeight / 2, elevatorZ)
      scene.add(elevator)
    }
  }

  raycaster = new Raycaster()
  mouse = new Vector2()
  window.addEventListener('mousemove', onMouseMove)

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(floorMeshes)

    if (hoveredMesh && !intersects.find(i => i.object === hoveredMesh)) {
      const originalColor = hoveredMesh.userData.originColor
      if (originalColor) {
        (hoveredMesh.material as MeshStandardMaterial).color.setHex(originalColor)
      }
      hoveredMesh = null
    }

    if (intersects.length > 0) {
      const target = intersects[0].object as Mesh
      if (hoveredMesh !== target) {
        if (hoveredMesh) {
          const originalColor = hoveredMesh.userData.originColor
          if (originalColor) {
            (hoveredMesh.material as MeshStandardMaterial).color.setHex(originalColor)
          }
        }
        hoveredMesh = target
          ; (hoveredMesh.material as MeshStandardMaterial).color.set(0xffa500)
      }
    }

    controls.update()
    renderer.render(scene, camera)
  }
  animate()
})

function onMouseMove(event: MouseEvent) {
  const bounds = renderer.domElement.getBoundingClientRect()
  mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
  mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
}

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer.dispose()
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<style scoped>
.three-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
