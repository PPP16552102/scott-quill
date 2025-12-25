import React, { useRef, useState } from "react";
import { ThreeElements } from '@react-three/fiber'

const Box: React.FC<any> = (props) => { 
  const meshRef = useRef(null);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  
  return (
    <mesh {...props} ref={meshRef} scale={active ? 1.5 : 1}>
      <boxGeometry args={[1,1,1]} />
    </mesh>
  )
}

export default Box;