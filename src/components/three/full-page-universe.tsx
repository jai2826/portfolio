'use client';

import { useRef, useMemo, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DeviceTier } from '@/lib/device-capability';

interface FullPageUniverseProps {
  scrollProgress: number;
  tier: DeviceTier;
  reducedMotion: boolean;
  isDesktop: boolean;
  mouseRef: RefObject<{ x: number; y: number; targetX: number; targetY: number; velocity: number }>;
}

export default function FullPageUniverse({
  scrollProgress,
  tier,
  reducedMotion,
  isDesktop,
  mouseRef,
}: FullPageUniverseProps) {
  const masterGroupRef = useRef<THREE.Group>(null);

  // Section 1: Hero Quantum Prism refs
  const heroGroupRef = useRef<THREE.Group>(null);
  const heroCubeRef = useRef<THREE.Mesh>(null);
  const heroWireframeRef = useRef<THREE.Mesh>(null);
  const heroCoreRef = useRef<THREE.Mesh>(null);
  const heroRing1Ref = useRef<THREE.Mesh>(null);
  const heroRing2Ref = useRef<THREE.Mesh>(null);

  // Section 2: About Neural Lattice refs
  const aboutGroupRef = useRef<THREE.Group>(null);
  const aboutTorusRef = useRef<THREE.Mesh>(null);
  const aboutCrystalRef = useRef<THREE.Mesh>(null);

  // Section 3: Projects Dual Pillars refs
  const projectGroupRef = useRef<THREE.Group>(null);
  const pillarLeftRef = useRef<THREE.Mesh>(null);
  const pillarRightRef = useRef<THREE.Mesh>(null);

  // Section 4: Skills Cybernetic Reactor refs
  const skillsGroupRef = useRef<THREE.Group>(null);
  const skillsRing1Ref = useRef<THREE.Mesh>(null);
  const skillsRing2Ref = useRef<THREE.Mesh>(null);
  const skillsRing3Ref = useRef<THREE.Mesh>(null);
  const skillsNodesRef = useRef<THREE.Group>(null);

  // Section 5: Contact Horizon Beacon refs
  const contactGroupRef = useRef<THREE.Group>(null);
  const contactBeaconRef = useRef<THREE.Mesh>(null);
  const contactRing1Ref = useRef<THREE.Mesh>(null);
  const contactRing2Ref = useRef<THREE.Mesh>(null);
  const contactRing3Ref = useRef<THREE.Mesh>(null);

  // Global Interactive Particle Sea
  const particlesRef = useRef<THREE.Points>(null);

  // Full-viewport particle cloud with original positions for mouse repulsion physics
  const [particlePositions, originalPositions, particleColors] = useMemo(() => {
    const count = tier === 'high' ? 360 : tier === 'medium' ? 180 : 90;
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00D9FF');
    const sky = new THREE.Color('#38BDF8');
    const purple = new THREE.Color('#a855f7');
    const blue = new THREE.Color('#3B82F6');

    for (let i = 0; i < count; i++) {
      const theta = i * 0.175;
      const radius = 1.6 + (i % 32) * 0.18;
      const phi = (i / count) * Math.PI;

      const x = (Math.sin(phi) * Math.cos(theta) * radius * 1.7) + 1.2;
      const y = (Math.cos(phi) * radius) * 1.3;
      const z = (Math.sin(phi) * Math.sin(theta) * radius) - 1.2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      const c = i % 4 === 0 ? cyan : i % 4 === 1 ? sky : i % 4 === 2 ? purple : blue;
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }

    return [pos, orig, cols];
  }, [tier]);

  // 9 Skill Satellite Orbiting Nodes
  const skillNodes = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < 9; i++) {
      const angle = (i / 9) * Math.PI * 2;
      nodes.push({
        x: Math.cos(angle) * 2.2,
        y: Math.sin(angle * 2) * 0.4,
        z: Math.sin(angle) * 2.2,
      });
    }
    return nodes;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const speed = reducedMotion ? 0.2 : 1.0;

    const mouse = mouseRef.current;
    const mx = mouse.x;
    const my = mouse.y;
    const mVel = mouse.velocity;

    // --- 1. MOUSE MAGNETIC PARALLAX ---
    if (masterGroupRef.current && !reducedMotion) {
      const targetParallaxX = mx * 0.45;
      const targetParallaxY = my * 0.35;
      masterGroupRef.current.rotation.y = THREE.MathUtils.lerp(masterGroupRef.current.rotation.y, targetParallaxX, 0.08);
      masterGroupRef.current.rotation.x = THREE.MathUtils.lerp(masterGroupRef.current.rotation.x, -targetParallaxY, 0.08);
    }

    // --- 2. DYNAMIC CURSOR REPULSION ON PARTICLE SEA ---
    if (particlesRef.current && !reducedMotion) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const count = positions.length / 3;

      // Mouse position in 3D world coordinates
      const mouseVecX = mx * 5.0;
      const mouseVecY = my * 3.5;

      for (let i = 0; i < count; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        // Harmonic continuous wave
        const wave = Math.sin(ox * 1.5 + time * 1.5) * Math.cos(oz * 1.5 + time * 1.2) * 0.22;

        // Distance from cursor
        const dx = ox - mouseVecX;
        const dy = oy - mouseVecY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repulsion physics within 2.5 unit radius
        let repulseX = 0;
        let repulseY = 0;
        if (dist < 2.5) {
          const force = (2.5 - dist) * 0.45;
          repulseX = (dx / dist) * force;
          repulseY = (dy / dist) * force;
        }

        positions[i * 3] = THREE.MathUtils.lerp(positions[i * 3], ox + repulseX, 0.1);
        positions[i * 3 + 1] = THREE.MathUtils.lerp(positions[i * 3 + 1], oy + wave + repulseY, 0.1);
        positions[i * 3 + 2] = THREE.MathUtils.lerp(positions[i * 3 + 2], oz, 0.1);
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y += delta * (0.06 + mVel * 0.12) * speed;
    }

    // --- 3. SECTION TRANSITION WEIGHTS ---
    const wHero = Math.max(0, 1 - THREE.MathUtils.smoothstep(0.12, 0.28, scrollProgress) * 1.2);
    const wAbout = THREE.MathUtils.smoothstep(0.15, 0.28, scrollProgress) * (1 - THREE.MathUtils.smoothstep(0.40, 0.50, scrollProgress));
    const wProjects = THREE.MathUtils.smoothstep(0.42, 0.52, scrollProgress) * (1 - THREE.MathUtils.smoothstep(0.66, 0.75, scrollProgress));
    const wSkills = THREE.MathUtils.smoothstep(0.68, 0.76, scrollProgress) * (1 - THREE.MathUtils.smoothstep(0.85, 0.92, scrollProgress));
    const wContact = THREE.MathUtils.smoothstep(0.85, 0.94, scrollProgress);

    // --- 4. STAGE 1: HERO QUANTUM PRISM (Interactive Mouse Tilt & Position Spring) ---
    if (heroGroupRef.current) {
      const heroX = isDesktop ? 2.3 + mx * 0.45 : mx * 0.3;
      const heroY = isDesktop ? 0 + my * 0.35 : -0.4 + my * 0.25;
      heroGroupRef.current.position.x = THREE.MathUtils.lerp(heroGroupRef.current.position.x, heroX, 0.08);
      heroGroupRef.current.position.y = THREE.MathUtils.lerp(heroGroupRef.current.position.y, heroY + Math.sin(time * 1.4) * 0.06, 0.08);
      
      // Dynamic 3D tilt tracking mouse
      if (!reducedMotion) {
        heroGroupRef.current.rotation.x = THREE.MathUtils.lerp(heroGroupRef.current.rotation.x, -my * 0.8, 0.1);
        heroGroupRef.current.rotation.y = THREE.MathUtils.lerp(heroGroupRef.current.rotation.y, mx * 1.0, 0.1);
        heroGroupRef.current.rotation.z = THREE.MathUtils.lerp(heroGroupRef.current.rotation.z, -mx * 0.2, 0.1);
      }

      heroGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(heroGroupRef.current.scale.x, (isDesktop ? 1.05 : 0.8) * wHero, 0.08));
    }

    const spinBoost = 1.0 + mVel * 2.0;

    if (heroCubeRef.current) {
      heroCubeRef.current.rotation.x += delta * 0.25 * speed * spinBoost;
      heroCubeRef.current.rotation.y += delta * 0.35 * speed * spinBoost;
    }
    if (heroWireframeRef.current) {
      heroWireframeRef.current.rotation.x += delta * 0.25 * speed * spinBoost;
      heroWireframeRef.current.rotation.y += delta * 0.35 * speed * spinBoost;
    }
    if (heroCoreRef.current) {
      heroCoreRef.current.rotation.x -= delta * 0.4 * speed * spinBoost;
      heroCoreRef.current.rotation.z += delta * 0.3 * speed * spinBoost;
    }
    if (heroRing1Ref.current) {
      heroRing1Ref.current.rotation.x += delta * 0.25 * speed * spinBoost;
      heroRing1Ref.current.rotation.y -= delta * 0.3 * speed * spinBoost;
    }
    if (heroRing2Ref.current) {
      heroRing2Ref.current.rotation.z += delta * 0.22 * speed * spinBoost;
      heroRing2Ref.current.rotation.x -= delta * 0.18 * speed * spinBoost;
    }

    // --- 5. STAGE 2: ABOUT NEURAL LATTICE ---
    if (aboutGroupRef.current) {
      const targetX = isDesktop ? 2.4 + mx * 0.25 : mx * 0.2;
      const targetY = isDesktop ? -0.1 + my * 0.25 : -0.5 + my * 0.2;
      aboutGroupRef.current.position.x = THREE.MathUtils.lerp(aboutGroupRef.current.position.x, targetX, 0.08);
      aboutGroupRef.current.position.y = THREE.MathUtils.lerp(aboutGroupRef.current.position.y, targetY + Math.sin(time * 0.8) * 0.08, 0.08);
      aboutGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(aboutGroupRef.current.scale.x, wAbout * 1.1, 0.08));
    }
    if (aboutTorusRef.current) {
      aboutTorusRef.current.rotation.x += delta * 0.2 * speed;
      aboutTorusRef.current.rotation.y += delta * 0.3 * speed;
    }
    if (aboutCrystalRef.current) {
      aboutCrystalRef.current.rotation.y -= delta * 0.35 * speed;
      aboutCrystalRef.current.rotation.z += delta * 0.2 * speed;
    }

    // --- 6. STAGE 3: PROJECTS DUAL PILLARS ---
    if (projectGroupRef.current) {
      projectGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(projectGroupRef.current.scale.x, wProjects * 1.0, 0.08));
    }
    if (pillarLeftRef.current) {
      pillarLeftRef.current.position.y = Math.sin(time * 1.2) * 0.18;
      pillarLeftRef.current.rotation.y += delta * 0.25 * speed;
      pillarLeftRef.current.rotation.x = Math.sin(time * 0.7) * 0.12;
    }
    if (pillarRightRef.current) {
      pillarRightRef.current.position.y = -Math.sin(time * 1.2) * 0.18;
      pillarRightRef.current.rotation.y -= delta * 0.25 * speed;
      pillarRightRef.current.rotation.x = -Math.sin(time * 0.7) * 0.12;
    }

    // --- 7. STAGE 4: SKILLS CYBERNETIC REACTOR ---
    if (skillsGroupRef.current) {
      const targetX = isDesktop ? 2.3 + mx * 0.3 : mx * 0.2;
      const targetY = isDesktop ? 0.1 + my * 0.25 : -0.3 + my * 0.2;
      skillsGroupRef.current.position.x = THREE.MathUtils.lerp(skillsGroupRef.current.position.x, targetX, 0.08);
      skillsGroupRef.current.position.y = THREE.MathUtils.lerp(skillsGroupRef.current.position.y, targetY + Math.cos(time * 0.9) * 0.08, 0.08);
      skillsGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(skillsGroupRef.current.scale.x, wSkills * 1.05, 0.08));
    }
    if (skillsRing1Ref.current) {
      skillsRing1Ref.current.rotation.x += delta * 0.3 * speed;
      skillsRing1Ref.current.rotation.y += delta * 0.2 * speed;
    }
    if (skillsRing2Ref.current) {
      skillsRing2Ref.current.rotation.y -= delta * 0.35 * speed;
      skillsRing2Ref.current.rotation.z += delta * 0.2 * speed;
    }
    if (skillsRing3Ref.current) {
      skillsRing3Ref.current.rotation.z -= delta * 0.25 * speed;
      skillsRing3Ref.current.rotation.x += delta * 0.18 * speed;
    }
    if (skillsNodesRef.current) {
      skillsNodesRef.current.rotation.y += delta * 0.45 * speed;
    }

    // --- 8. STAGE 5: CONTACT HORIZON BEACON ---
    if (contactGroupRef.current) {
      contactGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(contactGroupRef.current.scale.x, wContact * 1.15, 0.08));
    }
    if (contactBeaconRef.current) {
      contactBeaconRef.current.rotation.y += delta * 0.5 * speed;
      contactBeaconRef.current.rotation.x = Math.sin(time * 1.5) * 0.15;
    }
    if (contactRing1Ref.current) {
      const s = 1 + ((time * 0.8) % 1.5);
      contactRing1Ref.current.scale.set(s, s, s);
      (contactRing1Ref.current.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 0.6 * (1 - (s - 1) / 1.5) * wContact);
    }
    if (contactRing2Ref.current) {
      const s = 1 + ((time * 0.8 + 0.5) % 1.5);
      contactRing2Ref.current.scale.set(s, s, s);
      (contactRing2Ref.current.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 0.6 * (1 - (s - 1) / 1.5) * wContact);
    }
    if (contactRing3Ref.current) {
      const s = 1 + ((time * 0.8 + 1.0) % 1.5);
      contactRing3Ref.current.scale.set(s, s, s);
      (contactRing3Ref.current.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 0.6 * (1 - (s - 1) / 1.5) * wContact);
    }
  });

  return (
    <group ref={masterGroupRef}>
      {/* ========================================================
          GLOBAL DYNAMIC MOUSE-REACTIVE PARTICLE SEA
          ======================================================== */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[particleColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={tier === 'high' ? 0.045 : 0.055}
          vertexColors
          transparent
          opacity={0.75}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* ========================================================
          STAGE 1: HERO HOLOGRAPHIC QUANTUM PRISM (Scroll: 0.00 - 0.22)
          ======================================================== */}
      <group ref={heroGroupRef} position={[isDesktop ? 2.3 : 0, isDesktop ? 0 : -0.4, 0]}>
        {/* Dark Glass PBR Beveled Cube */}
        <mesh ref={heroCubeRef}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <meshPhysicalMaterial
            color="#09090f"
            roughness={0.1}
            metalness={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Neon Cyan Wireframe Edges */}
        <mesh ref={heroWireframeRef}>
          <boxGeometry args={[1.36, 1.36, 1.36]} />
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={tier === 'high' ? 0.7 : 0.4}
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Glowing Inner Octahedron Core */}
        <mesh ref={heroCoreRef}>
          <octahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00D9FF"
            emissiveIntensity={tier === 'high' ? 1.0 : 0.6}
            roughness={0.15}
            metalness={0.8}
            wireframe={tier !== 'high'}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Gyroscopic Orbital Ring 1 - Cyan */}
        {tier !== 'low' && (
          <mesh ref={heroRing1Ref} rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[1.9, 0.015, 16, 64]} />
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#00D9FF"
              emissiveIntensity={0.6}
              transparent
              opacity={0.5}
            />
          </mesh>
        )}

        {/* Gyroscopic Orbital Ring 2 - Purple */}
        {tier === 'high' && (
          <mesh ref={heroRing2Ref} rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
            <torusGeometry args={[2.2, 0.012, 16, 64]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={0.5}
              transparent
              opacity={0.4}
            />
          </mesh>
        )}
      </group>

      {/* ========================================================
          STAGE 2: ABOUT NEURAL HEX LATTICE (Scroll: 0.22 - 0.45)
          ======================================================== */}
      <group ref={aboutGroupRef} position={[isDesktop ? 2.4 : 0, -0.1, -1.0]} scale={0}>
        {/* Hexagonal Neural Torus */}
        <mesh ref={aboutTorusRef}>
          <torusGeometry args={[1.8, 0.12, 16, 6]} />
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={0.5}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Floating Data Crystal Polyhedron */}
        <mesh ref={aboutCrystalRef}>
          <dodecahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* ========================================================
          STAGE 3: PROJECTS DUAL PILLARS (Scroll: 0.45 - 0.70)
          ======================================================== */}
      <group ref={projectGroupRef} position={[0, 0, -1.5]} scale={0}>
        {/* Left Holographic Prism Pillar */}
        <mesh ref={pillarLeftRef} position={[isDesktop ? -4.2 : -2.0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 3.4, 6]} />
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={0.4}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Right Holographic Prism Pillar */}
        <mesh ref={pillarRightRef} position={[isDesktop ? 4.2 : 2.0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 3.4, 6]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.4}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>

      {/* ========================================================
          STAGE 4: SKILLS CYBERNETIC REACTOR (Scroll: 0.70 - 0.88)
          ======================================================== */}
      <group ref={skillsGroupRef} position={[isDesktop ? 2.3 : 0, 0.1, -1.2]} scale={0}>
        {/* Tri-Axial Reactor Rings */}
        <mesh ref={skillsRing1Ref}>
          <torusGeometry args={[1.6, 0.015, 16, 64]} />
          <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={0.6} transparent opacity={0.45} />
        </mesh>
        <mesh ref={skillsRing2Ref} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.0, 0.013, 16, 64]} />
          <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.5} transparent opacity={0.4} />
        </mesh>
        <mesh ref={skillsRing3Ref} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.4, 0.011, 16, 64]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} transparent opacity={0.35} />
        </mesh>

        {/* 9 Skill Orbiting Beacon Nodes */}
        <group ref={skillsNodesRef}>
          {skillNodes.map((pos, idx) => (
            <mesh key={idx} position={[pos.x, pos.y, pos.z]}>
              <octahedronGeometry args={[0.08, 0]} />
              <meshStandardMaterial
                color={idx % 3 === 0 ? "#00D9FF" : idx % 3 === 1 ? "#38BDF8" : "#a855f7"}
                emissive={idx % 3 === 0 ? "#00D9FF" : idx % 3 === 1 ? "#38BDF8" : "#a855f7"}
                emissiveIntensity={0.9}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* ========================================================
          STAGE 5: CONTACT HORIZON BEACON (Scroll: 0.88 - 1.00)
          ======================================================== */}
      <group ref={contactGroupRef} position={[0, isDesktop ? -0.8 : -1.0, -0.5]} scale={0}>
        {/* Central Luminous Signal Core */}
        <mesh ref={contactBeaconRef}>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={0.9}
            wireframe
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Radiating Energy Wave Rings */}
        <mesh ref={contactRing1Ref} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 0.85, 32]} />
          <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={0.6} transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={contactRing2Ref} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 0.85, 32]} />
          <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.6} transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={contactRing3Ref} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 0.85, 32]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.6} transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
