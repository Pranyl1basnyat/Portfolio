import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";
import WebGLErrorBoundary, { isWebGLAvailable } from "@/components/WebGLErrorBoundary";

function BrainCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.22;
  });
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.15, 64, 64]}>
        <MeshDistortMaterial color="#3b82f6" distort={0.42} speed={2.5} roughness={0} metalness={0.6} transparent opacity={0.88} />
      </Sphere>
    </Float>
  );
}

function OrbitRing({ radius, color, tilt, speed }: { radius: number; color: string; tilt: [number, number, number]; speed: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => { ref.current.rotation.z += delta * speed; });
  return (
    <mesh ref={ref} rotation={tilt}>
      <Torus args={[radius, 0.015, 16, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

function OrbitDot({ radius, color, speed, offset }: { radius: number; color: string; speed: number; offset: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function NeuralNet() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.08;
    ref.current.rotation.y -= delta * 0.11;
  });
  return (
    <mesh ref={ref} scale={2.1}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.16} />
    </mesh>
  );
}

function ParticleCloud() {
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 1.4;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.2;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#06b6d4" size={0.035} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} intensity={2.5} color="#3b82f6" />
      <pointLight position={[-4, -2, -4]} intensity={2} color="#8b5cf6" />
      <pointLight position={[0, 6, 0]} intensity={1.2} color="#06b6d4" />
      <NeuralNet />
      <BrainCore />
      <ParticleCloud />
      <OrbitRing radius={1.7} color="#3b82f6" tilt={[0, 0, 0]} speed={0.6} />
      <OrbitRing radius={2.0} color="#8b5cf6" tilt={[Math.PI / 3, 0, Math.PI / 6]} speed={-0.4} />
      <OrbitRing radius={2.4} color="#06b6d4" tilt={[Math.PI / 5, Math.PI / 4, 0]} speed={0.3} />
      <OrbitDot radius={1.7} color="#60a5fa" speed={1.2} offset={0} />
      <OrbitDot radius={2.0} color="#a78bfa" speed={-0.8} offset={Math.PI} />
      <OrbitDot radius={2.4} color="#22d3ee" speed={0.6} offset={Math.PI / 2} />
    </>
  );
}

function CSSOrb() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full max-w-[320px] max-h-[320px]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 blur-3xl animate-pulse" />
        <div className="absolute inset-[10%] rounded-full border border-primary/25 animate-spin" style={{ animationDuration: "12s" }} />
        <div className="absolute inset-[20%] rounded-full border border-secondary/20 animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }} />
        <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-primary/15 to-secondary/10 blur-xl animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>
    </div>
  );
}

function NeuralCanvas({ className }: { className: string }) {
  return (
    <div className={className}>
      <WebGLErrorBoundary fallback={<CSSOrb />}>
        <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
          <Suspense fallback={null}><Scene3D /></Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}

export default function NeuralSphere3D({ className = "" }: { className?: string }) {
  if (!isWebGLAvailable()) return <CSSOrb />;
  return <NeuralCanvas className={className} />;
}
