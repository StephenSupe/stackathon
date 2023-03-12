import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

function Sphere({ color }) {
  const sphere = useRef();
  const time = useRef(0);
  const [position, setPosition] = useState(getInitialPosition());
  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());
  const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);
  const [metalness] = useState(() => Math.random() * 0.5);
  const [roughness] = useState(() => Math.random() * 0.5);
  const [emissive] = useState(() => color.map(c => c * 0.2));

  function getInitialPosition() {
    let vector = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15); 
    if(vector.x < 0) vector.x -= 1.75;
    if(vector.x > 0) vector.x += 1.75;

    return vector;
  }

  function resetPosition() {
    let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, Math.random() * 10 + 10); 
    if(v.x < 0) v.x -= 1.75;
    if(v.x > 0) v.x += 1.75;

    setPosition(v);
  }

  useFrame(
    (state, delta) => {
      time.current += delta * 1.2;
      let newZ = position.z - (time.current);

      if(newZ < -10) {
        resetPosition();
        time.current = 0;
      }

      // Move the sphere up and down using a sine wave
      let sineWave = Math.sin(time.current * 1.5) * 0.5;
      sphere.current.position.set(
        position.x, 
        position.y + sineWave, // Add the sine wave to the y position
        newZ, 
      )
      sphere.current.rotation.x += delta * xRotSpeed;
      sphere.current.rotation.y += delta * yRotSpeed;
    },
    [xRotSpeed, yRotSpeed, position]
  );

  return (
    <mesh
      ref={sphere}
      rotation-x={Math.PI * 0.5}
      scale={scale}
      castShadow
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} emissive={emissive} envMapIntensity={0.15} />
    </mesh>
  );
}

export function Spheres() {
  const [arr] = useState(() => {
    let SphereArray = [];
    for(let i = 0; i < 20; i++) SphereArray.push(0);
    return SphereArray;
  });

  return (
    <>
      {arr.map((e, i) => (
        <Sphere key={i} color={i %  2 === 0 ? [1, 0.3, 0.3] : [0.3, 0.3, 1]} />
      ))}
    </>
  );
}