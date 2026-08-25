'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import { Group, MeshStandardMaterial } from 'three';

function NeedleTip() {
  const g = useRef<Group>(null);
  const reduce = useReducedMotion();
  useFrame((_, dt) => {
    if (g.current && !reduce) g.current.rotation.z += dt * 0.08;
  });

  const steel = useMemo(() => new MeshStandardMaterial({
    color: '#DDE0E6',
    metalness: 0.98,
    roughness: 0.12,
  }), []);
  const hub = useMemo(() => new MeshStandardMaterial({
    color: '#F5F4F0',
    metalness: 0.15,
    roughness: 0.32,
  }), []);
  const accent = useMemo(() => new MeshStandardMaterial({
    color: '#00A3B4',
    metalness: 0.35,
    roughness: 0.35,
  }), []);

  return (
    <group ref={g} rotation={[0, 0, Math.PI / 2]}>
      {/* Luer hub */}
      <mesh position={[0, -0.9, 0]} material={hub}>
        <cylinderGeometry args={[0.35, 0.55, 0.4, 48]} />
      </mesh>
      <mesh position={[0, -0.7, 0]} material={accent}>
        <cylinderGeometry args={[0.24, 0.32, 0.2, 40]} />
      </mesh>
      {/* Needle body */}
      <mesh position={[0, 0.4, 0]} material={steel}>
        <cylinderGeometry args={[0.03, 0.02, 2.2, 24]} />
      </mesh>
      {/* Bevel tip */}
      <group position={[0, 1.55, 0]}>
        <mesh material={steel}>
          <coneGeometry args={[0.025, 0.18, 16]} />
        </mesh>
        <mesh position={[0.015, 0, 0]} rotation={[0, 0, Math.PI * 0.15]} material={steel}>
          <boxGeometry args={[0.02, 0.15, 0.06]} />
        </mesh>
      </group>
    </group>
  );
}

export function NeedleTipScene({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 3], fov: 28 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 4, 3]} intensity={1.3} color="#ffffff" />
          <directionalLight position={[-3, 1, 2]} intensity={0.4} color="#7BA7B5" />
          <Environment preset="city" />
          <NeedleTip />
          <ContactShadows position={[0, -1.6, 0]} opacity={0.4} scale={4} blur={2.4} far={2} />
        </Suspense>
      </Canvas>
    </div>
  );
}
