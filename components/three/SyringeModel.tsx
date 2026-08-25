'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Group,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
} from 'three';

type Props = {
  /** 0 = fully assembled, 1 = fully exploded */
  explode?: number;
  targetRotY?: number;
  targetRotX?: number;
  /** Auto-rotate slowly on Y — useful for the hero */
  autoRotate?: boolean;
};

/**
 * Procedural single-use syringe.
 * Component layout (bottom → top along local Y):
 *   thumb rest → plunger rod → plunger tip → barrel → flange → luer hub → needle → cap
 *
 * Placeholder for a real GLB — swap primitives for <primitive object={gltf.scene} /> later.
 */
export function SyringeModel({
  explode = 0,
  targetRotY = 0,
  targetRotX = 0,
  autoRotate = false,
}: Props) {
  const group = useRef<Group>(null);

  useFrame((_, dt) => {
    if (!group.current) return;
    const g = group.current;
    if (autoRotate) {
      g.rotation.y += dt * 0.15;
    }
    g.rotation.x += (targetRotX - g.rotation.x) * Math.min(1, dt * 3.5);
    if (!autoRotate) {
      g.rotation.y += (targetRotY - g.rotation.y) * Math.min(1, dt * 3.5);
    }
  });

  const materials = useMemo(() => ({
    glass: new MeshPhysicalMaterial({
      color: '#F3F4F6',
      metalness: 0,
      roughness: 0.04,
      transmission: 0.95,
      thickness: 0.5,
      ior: 1.45,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      attenuationColor: '#EFEFEC',
      attenuationDistance: 2,
      transparent: true,
      opacity: 0.92,
    }),
    steel: new MeshStandardMaterial({
      color: '#D5D8DE',
      metalness: 0.98,
      roughness: 0.14,
    }),
    steelDark: new MeshStandardMaterial({
      color: '#8A8F96',
      metalness: 0.9,
      roughness: 0.28,
    }),
    rubber: new MeshStandardMaterial({
      color: '#111827',
      metalness: 0.05,
      roughness: 0.7,
    }),
    plasticWhite: new MeshStandardMaterial({
      color: '#F5F4F0',
      metalness: 0.08,
      roughness: 0.32,
    }),
    plasticDark: new MeshStandardMaterial({
      color: '#0A0F1A',
      metalness: 0.1,
      roughness: 0.35,
    }),
    accent: new MeshStandardMaterial({
      color: '#00A3B4',
      metalness: 0.4,
      roughness: 0.35,
    }),
    ink: new MeshStandardMaterial({
      color: '#374151',
      metalness: 0.05,
      roughness: 0.6,
    }),
  }), []);

  const capOffset = explode * 1.8;
  const needleOffset = explode * 1.0;
  const hubOffset = explode * 0.55;
  const plungerOffset = explode * -1.0;
  const thumbOffset = explode * -1.5;

  return (
    <group ref={group} rotation={[0, 0, Math.PI / 2]}>
      {/* Barrel */}
      <mesh material={materials.glass}>
        <cylinderGeometry args={[0.22, 0.22, 1.7, 64, 1, true]} />
      </mesh>
      {/* Inner barrel wall for slight refraction depth */}
      <mesh material={materials.glass} scale={[0.98, 1, 0.98]}>
        <cylinderGeometry args={[0.22, 0.22, 1.68, 64, 1, true]} />
      </mesh>

      {/* Flange (bottom) */}
      <mesh position={[0, -0.9, 0]} material={materials.plasticWhite}>
        <cylinderGeometry args={[0.34, 0.34, 0.05, 64]} />
      </mesh>
      <mesh position={[0, -0.87, 0]} material={materials.plasticWhite}>
        <torusGeometry args={[0.28, 0.02, 24, 64]} />
      </mesh>

      {/* Barrel graduation ticks — printed on the surface */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          position={[0.221, -0.72 + i * 0.13, 0]}
          rotation={[0, 0, Math.PI / 2]}
          material={materials.ink}
        >
          <boxGeometry args={[0.003, i % 3 === 0 ? 0.09 : 0.05, 0.003]} />
        </mesh>
      ))}

      {/* Plunger rod — cross-shaped for rigidity */}
      <group position={[0, plungerOffset - 1.05, 0]}>
        <mesh material={materials.plasticWhite}>
          <boxGeometry args={[0.06, 1.0, 0.06]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.plasticWhite}>
          <boxGeometry args={[0.06, 1.0, 0.06]} />
        </mesh>
        <mesh position={[0, 0.48, 0]} material={materials.rubber}>
          <cylinderGeometry args={[0.205, 0.205, 0.16, 48]} />
        </mesh>
        <mesh position={[0, 0.48, 0]} material={materials.rubber}>
          <torusGeometry args={[0.205, 0.02, 12, 48]} />
        </mesh>
      </group>

      {/* Thumb rest */}
      <mesh position={[0, thumbOffset - 1.6, 0]} material={materials.plasticWhite}>
        <cylinderGeometry args={[0.36, 0.36, 0.05, 64]} />
      </mesh>

      {/* Luer hub (colour-coded — subtle accent) */}
      <group position={[0, hubOffset + 0.95, 0]}>
        <mesh material={materials.plasticWhite}>
          <cylinderGeometry args={[0.11, 0.19, 0.15, 48]} />
        </mesh>
        <mesh position={[0, 0.09, 0]} material={materials.accent}>
          <cylinderGeometry args={[0.055, 0.075, 0.08, 32]} />
        </mesh>
      </group>

      {/* Needle */}
      <mesh position={[0, needleOffset + 1.5, 0]} material={materials.steel}>
        <cylinderGeometry args={[0.009, 0.004, 0.95, 20]} />
      </mesh>
      {/* Bevel tip */}
      <mesh position={[0, needleOffset + 1.98, 0]} rotation={[0, 0, 0]} material={materials.steel}>
        <coneGeometry args={[0.008, 0.05, 16]} />
      </mesh>

      {/* Needle cap */}
      <mesh position={[0, capOffset + 2.05, 0]} material={materials.plasticDark}>
        <cylinderGeometry args={[0.05, 0.04, 0.7, 32]} />
      </mesh>
      <mesh position={[0, capOffset + 2.35, 0]} material={materials.plasticDark}>
        <sphereGeometry args={[0.04, 24, 24]} />
      </mesh>
    </group>
  );
}
