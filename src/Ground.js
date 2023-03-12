import { MeshReflectorMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Ground() {
    const [roughness, normal] = useLoader(TextureLoader, [
      process.env.PUBLIC_URL + "textures/roughness.jpg",
      process.env.PUBLIC_URL + "textures/normal.jpg",
    ]);
    //set some properties for the textures for the ground (normal/roughness)
    //textures will repeat 5 times in both directions Horizontally and Vertically
    //ensure textures properties are set correctly everytime textures are updated
    useEffect(() => {
      [normal, roughness].forEach((t) => {
        t.wrapS = RepeatWrapping;
        t.wrapT = RepeatWrapping;
        t.repeat.set(5, 5);
        t.offset.set(0, 0);
      });
    //encoding to the normal texture to make it look more realistic in a linear color space
      normal.encoding = LinearEncoding;
    }, [normal, roughness]);
  
    useFrame((state, delta) => {
      let t = -state.clock.getElapsedTime() * 0.128;
      roughness.offset.set(0, t % 1);
      normal.offset.set(0, t % 1);
    });
  
    return (
      <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
        <planeGeometry args={[30, 30]} />
        <MeshReflectorMaterial
          envMapIntensity={0}
          normalMap={normal}
          normalScale={[0.15, 0.15]}
          roughnessMap={roughness}
          dithering={true}
          color={[0.025, 0.025, 0.025]}
          roughness={0.7}
          blur={[1000, 400]}
          mixBlur={30}
          mixStrength={80}
          mixContrast={1}
          resolution={1024}
          mirror={0}
          depthScale={0.01}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          debug={0}
          reflectorOffset={0.2}
        />
      </mesh>
    );
  }