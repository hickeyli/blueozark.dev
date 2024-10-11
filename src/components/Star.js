import React, { useRef, useLayoutEffect } from "react";
import { mix, degreesToRadians } from "popmotion";
import HolographicMaterial from './HolographicMaterial'
import { useFrame } from "@react-three/fiber";
import { extend } from "@react-three/fiber";

extend({ HolographicMaterial });

const Star = ({ p, userData, category, visible }) => {
  const ref = useRef(null);
  const materialRef = useRef(null);

  // Set the position of the star using spherical coordinates
  useLayoutEffect(() => {
    const distance = mix(2, 3.5, Math.random());
    const yAngle = mix(degreesToRadians(60), degreesToRadians(120), Math.random());
    const xAngle = degreesToRadians(360) * p;
    ref.current.position.setFromSphericalCoords(distance, yAngle, xAngle);
  }, [p]);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.update();
    }
  });

  const color = category === 'project' ? '#fafafa' : '#ffbb00';

  return (
    <mesh ref={ref} userData={userData} visible={visible}>
      <sphereGeometry args={[0.05, 12.0, 8]} />
      <holographicMaterial 
        ref={materialRef} 
        color={color}
        fresnelOpacity={1.0}
        fresnelAmount={2.0}
        scanlineSize={100.0}
        hologramBrightness={1.0}
        signalSpeed={0.5}
        enableBlinking={true}
        blinkFresnelOnly={false}
        hologramOpacity={1.0}
      />
    </mesh>
  );
};

export default Star;