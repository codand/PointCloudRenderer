import React, { useState, useEffect, useRef } from "react";
import PointCloudRenderer from "./rendering/PointCloudRenderer.js";

const Canvas = (props) => {
  const div = useRef(null);
  const pcl = useRef(null);

  useEffect(() => {
    // Initialize three and attach to dom
    console.log("Int");
    pcl.current = new PointCloudRenderer(div.current);
  }, []);

  useEffect(() => {
    pcl.current.setPoints(props.points);
  }, [props.points]);

  return <div ref={div} style={{backgroundColor: 'black'}}></div>;
};

export default Canvas;

// function InitThree(ref) {
//   // const animate = () => {
//   //   mesh.rotation.x += 0.01;
//   //   mesh.rotation.y += 0.02;

//   //   renderer.render(scene, camera);

//   //   requestAnimationFrame(animate);
//   // };
//   // animate();

//   ref.current.appendChild(renderer.domElement);
//   //return { camera, scene, geometry, mesh, renderer };
// }
