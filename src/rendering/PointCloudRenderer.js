import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class PointCloudRenderer {
  constructor(domContainer) {
    console.log("Initializing PointCloudRenderer");
    this.renderer = this._initRenderer(domContainer);
    this.camera = this._initCamera();
    this.controls = new OrbitControls(this.camera, domContainer);
    this._startAnimation();

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

  }

  _initRenderer(container) {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
    container.appendChild(renderer.domElement);

    return renderer;
  }

  _initCamera() {
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    camera.position.z = 10;
    return camera;
  }

  _startAnimation() {
    const animate = () => {
      if (this.scene) {
        this.renderer.render(this.scene, this.camera);
      }
  
      requestAnimationFrame(animate);
    };
    animate();
  }

  setPoints(points) {
    const scene = new THREE.Scene();

    const pointsGeometry = new THREE.Geometry();
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      pointsGeometry.vertices.push(
        new THREE.Vector3(point[0], point[2], point[1])
      );
    }
    pointsGeometry.computeBoundingSphere();

    const pointsMaterial = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: false,
    });
    const pointsObject = new THREE.Points(pointsGeometry, pointsMaterial);

    scene.add(pointsObject);

    this.scene = scene;
  }
}

export default PointCloudRenderer;
