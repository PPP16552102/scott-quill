'use client';

import { useMemo, useRef } from "react"
import * as THREE from 'three';

interface Props { 
  position: [number, number, number],
  colors: string[],
  size?: number
}

const MiniCube = ({ position, colors, size }: Props) => { 
  const cubeRef = useRef<THREE.Mesh>(null)
  const materials = useMemo(() => { 
    return colors.map(color => new THREE.MeshStandardMaterial({
      color,
      roughness: 0.4,
      metalness: 0.1
    }))
  }, [colors])

  return (
    <mesh
      ref={cubeRef}
      position={position}
    >
      <boxGeometry args={[size, size, size]} />
      {materials.map((material, index) => (
        <primitive key={index} object={material} attach={`material-${index}`} />
      ))}
    </mesh>
  )
}

export default MiniCube