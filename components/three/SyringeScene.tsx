'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import { SyringeModel } from './SyringeModel';

type Props = {
  explode?: number;
  interactive?: boolean;
  autoRotate?: boolean;
  className?: string;
  /** dark = clinical-black backdrop tint on the canvas' lighting */
  tone?: 'dark' | 'light';
};

export function SyringeScene({
  explode = 0,
  interactive = true,
  autoRotate = false,
  className,
  tone = 'dark',
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const onMove: React.PointerEventHandler = (e) => {
    if (!interactive || reduce) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setTarget({ x: nx * 0.35, y: ny * 0.2 });
  };
  const onLeave = () => setTarget({ x: 0, y: 0 });

  return (
    <div
      ref={wrapRef}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 30 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={tone === 'dark' ? 0.35 : 0.6} />
          <directionalLight position={[3, 4, 3]} intensity={1.2} castShadow color="#ffffff" />
          <directionalLight
            position={[-4, 1, 2]}
            intensity={0.45}
            color={tone === 'dark' ? '#5F7F8A' : '#B0BFC7'}
          />
          <directionalLight position={[0, -3, -2]} intensity={0.25} color="#7BA7B5" />
          <Environment preset={tone === 'dark' ? 'city' : 'studio'} />
          <Float
            speed={reduce || autoRotate ? 0 : 1.2}
            rotationIntensity={reduce ? 0 : 0.1}
            floatIntensity={reduce ? 0 : 0.25}
          >
            <SyringeModel
              explode={explode}
              targetRotY={target.x}
              targetRotX={-target.y}
              autoRotate={autoRotate && !reduce}
            />
          </Float>
          <ContactShadows
            position={[0, -1.3, 0]}
            opacity={tone === 'dark' ? 0.5 : 0.32}
            scale={6}
            blur={2.6}
            far={2.4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
