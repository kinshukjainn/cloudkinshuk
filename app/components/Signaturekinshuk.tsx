"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Text3D,
  Center,
  Environment,
  Float,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";

function ResponsiveText() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  // Google-style Responsive Logic:
  // We calculate a scale factor based on the aspect ratio.
  // The text "cloudkinshuk.in" is approx 10-12 units wide in 3D space.
  // We want it to occupy about 90% of the screen width on mobile.
  const maxWidth = viewport.width * 0.9;
  // Base scale calculation: If screen is wide, max at 1. If narrow, shrink proportional to width.
  const responsiveScale = Math.min(1, maxWidth / 11);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth, damped physics for the "look at mouse" effect
    // Reduced intensity on mobile (viewport.width check) to prevent dizziness
    const dampSpeed = 4;
    const rotateIntensity = viewport.width < 5 ? 0.5 : 1;

    const targetX = ((mouse.y * viewport.height) / 100) * rotateIntensity;
    const targetY = ((mouse.x * viewport.width) / 100) * rotateIntensity;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -targetX,
      delta * dampSpeed,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      delta * dampSpeed,
    );
  });

  return (
    <group ref={groupRef} scale={responsiveScale}>
      <Float
        speed={2}
        rotationIntensity={0.2} // Subtle floating
        floatIntensity={0.5}
        floatingRange={[-0.1, 0.1]}
      >
        <Center top>
          <Text3D
            font="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json"
            size={1.5} // Base size
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            cloudkinshuk.in
            <meshStandardMaterial
              color="#a5bced"
              roughness={0.1}
              metalness={0.8}
            />
          </Text3D>
        </Center>
      </Float>
    </group>
  );
}

function Lighting() {
  return (
    <Environment preset="city">
      {/* Strategic lighting to make the metal pop without heavy computation */}
      <Lightformer
        intensity={2}
        position={[10, 5, 0]}
        scale={[10, 50, 1]}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
      <Lightformer
        intensity={1}
        position={[-10, 5, 0]}
        scale={[10, 50, 1]}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
      <Lightformer
        intensity={1}
        position={[0, 10, 0]}
        scale={[50, 10, 1]}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
    </Environment>
  );
}

export default function Signaturekinshuk() {
  return (
    // Height uses responsive classes: shorter on mobile to save vertical real estate
    <div className="relative w-full h-[200px] md:h-[260px] cursor-grab active:cursor-grabbing touch-none select-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }} // Moved camera back for better FOV on mobile
        dpr={[1, 2]} // Performance optimization: cap pixel ratio at 2x
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.5} />
        <Lighting />
        <Suspense fallback={null}>
          <ResponsiveText />
        </Suspense>
      </Canvas>
    </div>
  );
}
