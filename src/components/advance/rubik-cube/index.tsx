'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback, JSX } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Box } from '@react-three/drei';
import MiniCube from './components/mini-cube';

// 魔方层组
const CubeLayer = ({ 
  cubes, 
  rotation, 
  layerIndex,
  axis 
}: { 
  cubes: JSX.Element[], 
  rotation: number, 
  layerIndex: number,
  axis: 'x' | 'y' | 'z' 
}) => {
  const layerRef = useRef<THREE.Group>(null);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  const rotationSpeed = 0.1;

  useEffect(() => {
    targetRotation.current = rotation;
  }, [rotation]);

  useFrame(() => {
    if (layerRef.current) {
      if (Math.abs(currentRotation.current - targetRotation.current) > 0.01) {
        const dir = targetRotation.current > currentRotation.current ? 1 : -1;
        const delta = Math.min(
          Math.abs(targetRotation.current - currentRotation.current), 
          rotationSpeed
        ) * dir;
        currentRotation.current += delta;
        
        if (axis === 'x') {
          layerRef.current.rotation.x = currentRotation.current;
        } else if (axis === 'y') {
          layerRef.current.rotation.y = currentRotation.current;
        } else {
          layerRef.current.rotation.z = currentRotation.current;
        }
      }
    }
  });

  return (
    <group ref={layerRef} name={`layer-${axis}-${layerIndex}`}>
      {cubes}
    </group>
  );
};

interface Props { 
  colors?: {
    front: string;
    back: string;
    right: string;
    left: string;
    up: string;
    down: string;
  }
}

// 主魔方组件
const RubikCube = (
  {
    colors = {
      front: '#0000ff',
      back: '#00ff00',
      right: '#ff0000',
      left: '#ff8800',
      up: '#ffffff',
      down: '#ffff00'
    }
  }: Props) => {
  const { camera, gl } = useThree();
  const cubeRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);
  const [layers, setLayers] = useState<Record<string, number>>({});
  const [rotationQueue, setRotationQueue] = useState<Array<{axis: 'x' | 'y' | 'z', layer: number, dir: 1 | -1}>>([]);
  const [isRotating, setIsRotating] = useState(false);
  const cubeSize = 3;

  // 生成所有小方块
  const generateCubes = useCallback(() => {
    const cubes: JSX.Element[] = [];
    const offset = (cubeSize - 1) / 2;
    
    for (let x = 0; x < cubeSize; x++) {
      for (let y = 0; y < cubeSize; y++) {
        for (let z = 0; z < cubeSize; z++) {
          // 跳过中心方块（如果显示内部的话）
          if (cubeSize === 3 && x === 1 && y === 1 && z === 1) {
            continue;
          }
          
          const posX = (x - offset) * 1.1;
          const posY = (y - offset) * 1.1;
          const posZ = (z - offset) * 1.1;
          
          const cubeColors = [];
          
          // 前面
          cubeColors.push(z === cubeSize - 1 ? colors.front : '#333333');
          // 后面
          cubeColors.push(z === 0 ? colors.back : '#333333');
          // 右面
          cubeColors.push(x === cubeSize - 1 ? colors.right : '#333333');
          // 左面
          cubeColors.push(x === 0 ? colors.left : '#333333');
          // 上面
          cubeColors.push(y === cubeSize - 1 ? colors.up : '#333333');
          // 下面
          cubeColors.push(y === 0 ? colors.down : '#333333');
          
          cubes.push(
            <MiniCube
              key={`${x}-${y}-${z}`}
              position={[posX, posY, posZ]}
              colors={cubeColors}
              size={0.9}
            />
          );
        }
      }
    }
    
    return cubes;
  }, [cubeSize]);

  // 初始化层旋转状态
  useEffect(() => {
    const initialLayers: Record<string, number> = {};
    for (let i = 0; i < cubeSize; i++) {
      initialLayers[`x-${i}`] = 0;
      initialLayers[`y-${i}`] = 0;
      initialLayers[`z-${i}`] = 0;
    }
    setLayers(initialLayers);
  }, [cubeSize]);

  // 旋转层
  const rotateLayer = useCallback((axis: 'x' | 'y' | 'z', layer: number, dir: 1 | -1 = 1) => {
    if (isRotating) {
      setRotationQueue(prev => [...prev, { axis, layer, dir }]);
      return;
    }
    
    setIsRotating(true);
    setLayers(prev => ({
      ...prev,
      [`${axis}-${layer}`]: prev[`${axis}-${layer}`] + (Math.PI / 2) * dir
    }));
    
    // 旋转完成后处理队列
    setTimeout(() => {
      setIsRotating(false);
      if (rotationQueue.length > 0) {
        const next = rotationQueue[0];
        setRotationQueue(prev => prev.slice(1));
        rotateLayer(next.axis, next.layer, next.dir);
      }
    }, 300);
  }, [isRotating, rotationQueue]);

  // 随机打乱魔方
  const scramble = useCallback(() => {
    const moves = 20;
    const axes: ('x' | 'y' | 'z')[] = ['x', 'y', 'z'];
    const dirs: (1 | -1)[] = [1, -1];
    
    for (let i = 0; i < moves; i++) {
      const axis = axes[Math.floor(Math.random() * axes.length)];
      const layer = Math.floor(Math.random() * cubeSize);
      const dir = dirs[Math.floor(Math.random() * dirs.length)];
      
      setTimeout(() => {
        rotateLayer(axis, layer, dir);
      }, i * 350);
    }
  }, [rotateLayer, cubeSize]);

  // 重置魔方
  const resetCube = useCallback(() => {
    setLayers(prev => {
      const newLayers = { ...prev };
      Object.keys(newLayers).forEach(key => {
        newLayers[key] = 0;
      });
      return newLayers;
    });
    setRotationQueue([]);
  }, []);

  const allCubes = useMemo(() => generateCubes(), [generateCubes]);

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isRotating) return;
      
      const layer = Math.floor(Math.random() * cubeSize);
      switch(e.key) {
        case 'ArrowUp':
          rotateLayer('x', layer, 1);
          break;
        case 'ArrowDown':
          rotateLayer('x', layer, -1);
          break;
        case 'ArrowLeft':
          rotateLayer('y', layer, 1);
          break;
        case 'ArrowRight':
          rotateLayer('y', layer, -1);
          break;
        case 'q':
        case 'Q':
          rotateLayer('z', layer, 1);
          break;
        case 'e':
        case 'E':
          rotateLayer('z', layer, -1);
          break;
        case 'r':
        case 'R':
          resetCube();
          break;
        case 's':
        case 'S':
          scramble();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rotateLayer, resetCube, scramble, isRotating, cubeSize]);

  return (
    <>
      <group ref={cubeRef}>
        {/* 按层分组 */}
        {Array.from({ length: cubeSize }).map((_, i) => (
          <CubeLayer
            key={`x-${i}`}
            cubes={allCubes.filter((_, index) => {
              const pos = Math.floor(index / (cubeSize * cubeSize)) % cubeSize;
              return pos === i;
            })}
            rotation={layers[`x-${i}`] || 0}
            layerIndex={i}
            axis="x"
          />
        ))}
        
        {Array.from({ length: cubeSize }).map((_, i) => (
          <CubeLayer
            key={`y-${i}`}
            cubes={allCubes.filter((_, index) => {
              const pos = Math.floor(index / cubeSize) % cubeSize;
              return pos === i;
            })}
            rotation={layers[`y-${i}`] || 0}
            layerIndex={i}
            axis="y"
          />
        ))}
        
        {Array.from({ length: cubeSize }).map((_, i) => (
          <CubeLayer
            key={`z-${i}`}
            cubes={allCubes.filter((_, index) => index % cubeSize === i)}
            rotation={layers[`z-${i}`] || 0}
            layerIndex={i}
            axis="z"
          />
        ))}
      </group>
      
      {/* 控制面板 */}
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
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
    </>
  );
};

// 包装组件
const RubikCubeScene = () => {
  return (
    <div className='h-full w-full'>
      <Canvas
        camera={{ position: [8, 8, 8], fov: 50 }}
        shadows
      >
        <RubikCube />
      </Canvas>
    </div>
  );
};

export default RubikCubeScene;