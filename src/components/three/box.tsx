import { ThreeElements, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from 'three';

type Props = ThreeElements['mesh'] & {
  boxSizes?: [number?, number?, number?, number?, number?, number?] | Readonly<[number?, number?, number?, number?, number?, number?]>
}

const Box = (props: Props) => {
  const { boxSizes = [1,1,1] } = props

  const meshRef = useRef<THREE.Mesh | null>(null);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => { 
    if (meshRef.current) { 
      return meshRef.current.rotation.x += delta;
    }
  })
  
  return (
    <mesh {...props} ref={meshRef} scale={active ? 1.5 : 1} onClick={() => setActive(!active)} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <boxGeometry args={boxSizes} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default Box;