import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useThree, extend } from "@react-three/fiber";

extend({ OrbitControls });

const Controls = ({ draggingRef, momentumRef }) => {
  const { camera, gl: renderer } = useThree();
  const controlsRef = useRef(null);

  useEffect(() => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.zoomSpeed = 0.5;
    controls.autoRotate = false;

    controlsRef.current = controls;

    controls.addEventListener("start", () => {
      draggingRef.current = true;
    });

    controls.addEventListener("end", () => {
      draggingRef.current = false;
      momentumRef.current = controls.getAzimuthalAngle();
    });

    const handleWheel = (event) => {
      event.preventDefault();
      const delta = event.deltaY;
      if (delta > 0) {
        camera.zoom /= 1.1;
      } else if (delta < 0) {
        camera.zoom *= 1.1;
      }
      camera.updateProjectionMatrix();
    };
    renderer.domElement.addEventListener("wheel", handleWheel);

    return () => {
      controls.dispose();
      renderer.domElement.removeEventListener("wheel", handleWheel);
    };
  }, [camera, renderer, draggingRef, momentumRef]);

  return null;
};

export default Controls;
