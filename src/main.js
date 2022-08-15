import './styles/style.css'
// import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'

export default class Sketch {
  constructor(options) {
    this.time = 0

    this.container = options.dom

    this.scene = new THREE.Scene()
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      10
    )
    this.camera.position.z = 0.5
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true})

    this.container.appendChild(this.renderer.domElement)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.resize()
    this.setupResize()
    this.addObject()
    this.render()
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  //Resize function
  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  // add object
  addObject() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  // renderer
  render() {
    this.time += 0.1
    this.mesh.rotation.x = this.time / 2000
    this.mesh.rotation.y = this.time / 2000

    this.renderer.render(this.scene, this.camera)

    window.requestAnimationFrame(this.render.bind(this))
  }
}

new Sketch({
  dom: document.getElementById('container'),
})
