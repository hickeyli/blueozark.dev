import React, { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';


const StarryBackground = memo(() => {
  const groupRef = useRef();

  // Create stars
  const stars = new Array(1000).fill().map(() => ({
    position: [
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000,
    ],
  }));

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005; // Rotate the background slowly
    }
  });

  return (
    <group ref={groupRef}>
      {stars.map((star, index) => (
        <mesh key={index} position={star.position}>
          <sphereGeometry args={[0.5, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
});

export default StarryBackground;
