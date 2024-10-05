import React, { useRef, useLayoutEffect } from "react";
import { mix, degreesToRadians } from "popmotion";

const Star = ({ p, userData }) => {
  const ref = useRef(null);

  // Set the position of the star using spherical coordinates
  useLayoutEffect(() => {
    const distance = mix(2, 3.5, Math.random());
    const yAngle = mix(degreesToRadians(60), degreesToRadians(120), Math.random());
    const xAngle = degreesToRadians(360) * p;
    ref.current.position.setFromSphericalCoords(distance, yAngle, xAngle);
  }, [p]);

  return (
    <mesh ref={ref} userData={userData}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial color="#fafafa" />
    </mesh>
  );
};

export default Star;
