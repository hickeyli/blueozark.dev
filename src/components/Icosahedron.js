import React from "react";
import { Mesh, IcosahedronGeometry, MeshBasicMaterial } from "three";
import { extend } from "@react-three/fiber";

extend({ Mesh, IcosahedronGeometry, MeshBasicMaterial });
const Icosahedron = () => (
  <mesh rotation-x={0.35}>
    <icosahedronGeometry args={[1, 0]} />
    <meshBasicMaterial wireframe color="#fafafa" />
  </mesh>
);

export default Icosahedron;
