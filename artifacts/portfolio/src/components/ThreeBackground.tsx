import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import WebGLErrorBoundary, { isWebGLAvailable } from "@/components/WebGLErrorBoundary";
import ParticleBackground from "@/components/ParticleBackground";

function WireframeIcosahedron() {
  const ref = useRef<THREE.Mesh>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.04 + mouse.current.y * 0.0004;
    ref.current.rotation.y += delta * 0.06 + mouse.current.x * 0.0004;
  });
  return (
    <mesh ref={ref} scale={3.8}>
      <icosahedronGeometry args={[1, 2]} />
      <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.07} />
    </mesh>
  );
}

function RotatingTorus({ radius, tube, color, speed, opacity, tilt }: {
  radius: number; tube: number; color: string; speed: number; opacity: number; tilt?: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * speed * 0.6;
    ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt ?? [0, 0, 0]}>
      <torusGeometry args={[radius, tube, 16, 80]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  );
}

function FloatingShapes() {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const shapes = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      x: (Math.random() - 0.5) * 22, y: (Math.random() - 0.5) * 14, z: (Math.random() - 0.5) * 8 - 2,
      phase: Math.random() * Math.PI * 2, scale: Math.random() * 0.18 + 0.06,
      rxSpeed: (Math.random() - 0.5) * 0.015, rySpeed: (Math.random() - 0.5) * 0.012,
      isOct: i % 3 !== 2,
      color: i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#8b5cf6" : "#06b6d4",
    })), []
  );
  useFrame((state) => {
    meshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.x += shapes[i].rxSpeed;
      mesh.rotation.y += shapes[i].rySpeed;
      mesh.position.y = shapes[i].y + Math.sin(state.clock.elapsedTime * 0.35 + shapes[i].phase) * 0.3;
    });
  });
  return (
    <>
      {shapes.map((s, i) => (
        <mesh key={i} ref={el => { meshes.current[i] = el; }} position={[s.x, s.y, s.z]} scale={s.scale}>
          {s.isOct ? <octahedronGeometry args={[1, 0]} /> : <tetrahedronGeometry args={[1, 0]} />}
          <meshBasicMaterial color={s.color} wireframe transparent opacity={0.45} />
        </mesh>
      ))}
    </>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 1.2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.8;
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  useFrame(() => {
    smooth.current.x += (mouse.current.x - smooth.current.x) * 0.04;
    smooth.current.y += (mouse.current.y - smooth.current.y) * 0.04;
    camera.position.x = smooth.current.x * 0.6;
    camera.position.y = smooth.current.y * 0.4;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  return (
    <>
      <CameraRig />
      <Stars radius={80} depth={50} count={2500} factor={3} saturation={0.3} fade speed={0.4} />
      <WireframeIcosahedron />
      <RotatingTorus radius={5.5} tube={0.012} color="#3b82f6" speed={0.04} opacity={0.22} />
      <RotatingTorus radius={7.0} tube={0.008} color="#8b5cf6" speed={-0.025} opacity={0.14} tilt={[Math.PI / 4, 0, 0]} />
      <RotatingTorus radius={8.5} tube={0.006} color="#06b6d4" speed={0.02} opacity={0.10} tilt={[0, Math.PI / 3, 0]} />
      <FloatingShapes />
    </>
  );
}

function ThreeCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <WebGLErrorBoundary fallback={<ParticleBackground />}>
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
          <Suspense fallback={null}><Scene /></Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}

export default function ThreeBackground() {
  if (!isWebGLAvailable()) return <ParticleBackground />;
  return <ThreeCanvas />;
}
