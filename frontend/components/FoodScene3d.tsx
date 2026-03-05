import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function IceCreamScoop({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#f9c5d1" roughness={0.3} metalness={0.1} />
      </mesh>
    </Float>
  );
}

function DonutShape({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.5, 0.22, 16, 100]} />
        <meshStandardMaterial color="#d4a017" roughness={0.4} metalness={0.2} />
      </mesh>
    </Float>
  );
}

function ShakeCup({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
    }
  });
  return (
    <Float speed={2.5} rotationIntensity={0.3} floatIntensity={1.8}>
      <mesh ref={meshRef} position={position}>
        <cylinderGeometry args={[0.3, 0.4, 0.9, 32]} />
        <meshStandardMaterial color="#6b3a2a" roughness={0.5} metalness={0.1} />
      </mesh>
    </Float>
  );
}

function PizzaBox({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.35;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.0}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.15, 0.8]} />
        <meshStandardMaterial color="#e05c1a" roughness={0.6} metalness={0.05} />
      </mesh>
    </Float>
  );
}

function SpiceStar({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.8;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });
  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#2d7a3a" roughness={0.3} metalness={0.4} />
      </mesh>
    </Float>
  );
}

function BowlShape({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.3}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.45, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c8860a" roughness={0.4} metalness={0.2} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

export default function FoodScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ff9933" />
      <pointLight position={[-5, -3, 3]} intensity={0.8} color="#138808" />
      <pointLight position={[0, 5, -2]} intensity={0.5} color="#ffffff" />

      <IceCreamScoop position={[-3.2, 1.5, 0]} />
      <DonutShape position={[3.0, 1.2, -0.5]} />
      <ShakeCup position={[-2.5, -1.2, 0.5]} />
      <PizzaBox position={[2.8, -1.0, 0]} />
      <SpiceStar position={[0.5, 2.2, -1]} />
      <BowlShape position={[-0.8, -2.0, 0.5]} />
    </Canvas>
  );
}
