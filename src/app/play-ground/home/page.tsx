'use client';

import RubikCube from "@/components/advance/rubik-cube";
import { Bounds, Center, OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";

const Model = ({ url, scale = 1, position = [0,0,0] }) => { 
  const { scene, animations } = useGLTF(url)

  useEffect(() => { 
    console.log('ani -> ', animations);
    
  })

  return (
    <Bounds fit clip observe>
      <Center>
        <primitive
          object={scene}
          scale={1}
        />
      </Center>
    </Bounds>
  )
}

const Home = () => { 
  return (
    <div>
      <RubikCube />
      <Canvas
        camera={{ position: [8, 8, 8], fov: 50 }}
        shadows
      >
        <Model url={"/models/crew.glb"} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={1000}
        />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 10, -5]} intensity={0.5} />
      </Canvas>
    </div>
  )
}

export default Home;