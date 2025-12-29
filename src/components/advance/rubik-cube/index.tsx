'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Box from '@/components/three/box';

const RubikCube = () => {
  const scene = new THREE.Scene();

  const cubeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { 
    
  }, [])

  return (
    <Canvas scene={scene}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.8} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box boxSizes={[1,1,1]} position={[-1.2, 0, 0]} />
      <Box boxSizes={[2,2,2]} position={[1.2, 0, 0]} />
    </Canvas>
  )
}

export default RubikCube;