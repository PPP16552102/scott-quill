'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface Props { 

}

function Cube() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

const PointSphere = ({ }: Props) => {

  const containerRef = useRef<HTMLDivElement | null>(null);

  function initSphere() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    let mouseX;
    let mouseY;

    const renderer = new THREE.WebGLRenderer();

    if (!containerRef.current) return;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);

    document.body.appendChild(renderer.domElement);

    const distance = Math.min(200, window.innerWidth / 4);

    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < 1600; i++) {
      const theta = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const phi = THREE.MathUtils.randFloatSpread(360);

      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);

      positions.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));

    geometry.computeBoundingSphere();

    const particles = new THREE.Points(geometry, new THREE.PointsMaterial({
      color: 0x0ae448,
      size: 2
    }));

    const renderingParent = new THREE.Group();
    renderingParent.add(particles);

    const resizeContainer = new THREE.Group();
    resizeContainer.add(renderingParent);
    scene.add(resizeContainer);

    camera.position.z = 400;

    const animate = () => { 
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    const animateProps = {
      scale: 1,
      xRot: 0,
      yRot: 0
    };

    gsap.to(animateProps, {
      duration: 10,
      scale: 1.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine',
      onUpdate: () => { 
        renderingParent.scale.set(animateProps.scale, animateProps.scale, animateProps.scale);
      }
    })

    gsap.to(animateProps, {
      duration: 120,
      xPercent: Math.PI * 2,
      yPercent: Math.PI * 4,
      repeat: -1,
      yoyo: true,
      ease: 'none',
      onUpdate: () => { 
        renderingParent.rotation.set(animateProps.xRot, animateProps.yRot, 0);
      }
    })

    function handleWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  function handleMouseMove() {
    console.log('move');
  }

  useEffect(() => {
    initSphere();
    document.addEventListener('mousemove', handleMouseMove, false);

    return () => { 
      document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [])

  return (
    <div ref={containerRef}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Cube/>
      </Canvas>
    </div>
  )
}

export default PointSphere;