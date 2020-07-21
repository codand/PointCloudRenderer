import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class PointCloudUtil {
  static floodfill(points) {}
}

class PointCloudRenderer {
  constructor(domContainer) {
    console.log("Initializing PointCloudRenderer");
    this.renderer = this._initRenderer(domContainer);
    this.camera = this._initCamera();
    this.controls = new OrbitControls(this.camera, domContainer);
    //this.raycaster = new THREE.Raycaster();
    this._startAnimation();

    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // domContainer.addEventListener("mousedown", (e) => {
    //   const mouse = new THREE.Vector2(
    //     (e.clientX / window.innerWidth) * 2 - 1,
    //     -(e.clientY / window.innerHeight) * 2 + 1
    //   );
    //   this.sphereCast(mouse, 0.1);
    // });
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

  _createPointCloudGeometry(points) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(points.length * 3);
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      positions[3 * i + 0] = p[0];
      positions[3 * i + 1] = p[2];
      positions[3 * i + 2] = p[1];
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.computeBoundingBox();
    return geometry;
  }

  _createPointCloud(points) {
    const geometry = this._createPointCloudGeometry(points);
    const material = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: false,
    });
    const object = new THREE.Points(geometry, material);
    return object;
  }

  setPoints(points) {
    const scene = new THREE.Scene();
    const pointCloud = this._createPointCloud(points);
    scene.add(pointCloud);
    //this.pointCloud = pointsObject;

    this.scene = scene;
  }

  // sphereCast(mouse, radius) {
  //   this.raycaster.params.Points.threshold = radius;
  //   this.raycaster.setFromCamera(mouse, this.camera);
  //   const intersections = this.raycaster.intersectObjects([this.pointCloud]);
  // }
}

export default PointCloudRenderer;
