import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import WebGLErrorBoundary, { isWebGLAvailable } from "@/components/WebGLErrorBoundary";

function KnotMesh() {
  const ref = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.2;
    ref.current.rotation.y = t * 0.3;
    wireRef.current.rotation.x = t * 0.2;
    wireRef.current.rotation.y = t * 0.3;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[1, 0.3, 200, 20, 2, 3]} />
        <MeshDistortMaterial color="#8b5cf6" distort={0.25} speed={2} roughness={0.05} metalness={0.85} transparent opacity={0.9} />
      </mesh>
      <mesh ref={wireRef}>
        <torusKnotGeometry args={[1, 0.3, 120, 14, 2, 3]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.12} />
      </mesh>
    </Float>
  );
}

function CSSKnot() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-secondary/40 to-primary/20 blur-xl animate-pulse" />
        <div className="absolute inset-2 rounded-full border border-secondary/40 animate-spin" style={{ animationDuration: "8s" }} />
        <div className="absolute inset-6 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: "5s", animationDirection: "reverse" }} />
      </div>
    </div>
  );
}

function TorusCanvas({ className }: { className: string }) {
  return (
    <div className={className}>
      <WebGLErrorBoundary fallback={<CSSKnot />}>
        <Canvas camera={{ position: [0, 0, 4], fov: 55 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={3} color="#3b82f6" />
          <pointLight position={[-5, -5, 5]} intensity={2} color="#8b5cf6" />
          <pointLight position={[0, 5, -5]} intensity={1.5} color="#06b6d4" />
          <Suspense fallback={null}><KnotMesh /></Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}

export default function TorusKnot3D({ className = "" }: { className?: string }) {
  if (!isWebGLAvailable()) return <CSSKnot />;
  return <TorusCanvas className={className} />;
}
