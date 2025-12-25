'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Box from '@/components/three/box';

interface MiniCubeProps { 
  position?: any;
  colors?: any;
}

const MiniCube: React.FC<MiniCubeProps> = ({ position, colors }) => {
  const meshRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.8, 1.8, 1.8]} />
    </mesh>
  )
}

const RubikCube = () => {
  const cubeRef = useRef<HTMLDivElement | null>(null);

  function initScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    console.log('scene -> ', scene);

    const cameraWidth = cubeRef.current!.clientWidth;
    const cameraHeight = cubeRef.current!.clientHeight;
    
    const camera = new THREE.PerspectiveCamera(75, cameraWidth / cameraHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);

    console.log('camera -> ', camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(cameraWidth, cameraHeight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const cubeSize = 2;
    const gap = 0.05;
    const faceColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
    
    for (let x = 0; x < 3; x++) { 
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) { 
          if (x === 1 && y === 1 && z === 1) continue;
          
          const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
          const materials = faceColors.map(color => 
            new THREE.MeshBasicMaterial({ color: color })
          );
          const cube = new THREE.Mesh(geometry, materials);
          
          cube.position.set(
            (x - 1) * (cubeSize + gap),
            (y - 1) * (cubeSize + gap),
            (z - 1) * (cubeSize + gap)
          );
          
          scene.add(cube);
        }
      }
    }

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera)
    };

    animate();

    if (cubeRef.current) { 
      cubeRef.current.appendChild(renderer.domElement);
    }
  }

  useEffect(() => { 
    // initScene();
  }, [])

  return (
    <Canvas>
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}

export default RubikCube;