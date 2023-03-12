import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Ground } from './Ground';
import "./style.css";
import { Spheres } from './Spheres';
import {Navbar} from './Navbar';
import {Footer} from './Footer';
import { Stars } from './Stars';

function Show() {
  return (
    <>
    <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45}/>
    <PerspectiveCamera makeDefault fov ={75} position={[0, 5, 10]} />

    <color args={[0, 0, 0]} attach="background" />

      <spotLight
        color={[0.15, 0.5, 1]}
        intensity={3}
        angle={1.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
    <Ground />
    <Spheres />
    <Stars count={1000} />
    </>
  )
}

function App() {
  return (
    <div className="container">
      <Canvas shadows>
        <Show />
      </Canvas>
      <div className="text">
        <Navbar />
        <h1>Welcome to my landing page</h1>
        <p>As a software engineer, I create cutting-edge software solutions to solve complex problems.</p>
        <br></br>
        <br></br>
      <Footer />
      </div>
    </div>
  );
}

export default App;