import React, { useRef } from 'react';
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

export const Stars = ({ count }) => {
  const group = useRef();

  
  const positions = new Array(count).fill().map(() => {
    const position = new THREE.Vector3();
    position.x = THREE.MathUtils.randFloatSpread(100);
    position.y = THREE.MathUtils.randFloatSpread(-5, 5);
    position.z = THREE.MathUtils.randFloatSpread(100);
    return position;
  });

  
  useFrame(() => {
    group.current.rotation.y += 0.001;
    group.current.rotation.z += 0.001;
    group.current.position.y -= 0.005;

    if (group.current.position.y < -5) {
      group.current.position.y = 5;
    }

    group.current.children.forEach((child, i) => {
      child.position.x += Math.sin(i + group.current.rotation.y);
      child.position.y += Math.sin(i + group.current.rotation.y);
      child.position.z += Math.sin(i + group.current.rotation.y);
    });
    
  });

  return (
    <group ref={group}>
      {positions.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereBufferGeometry args={[0.05, 1, 1]} />
          <meshStandardMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
};

export default Stars;