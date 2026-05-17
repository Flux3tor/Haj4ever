import { useEffect } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

export function useThreeBackground(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // ── Scene & camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050d2e, 0.018);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      500,
    );
    camera.position.set(0, 0, 14);

    // ── Lighting ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x8ab4d4, 0.8));

    const keyLight = new THREE.DirectionalLight(0xadd8f0, 2.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x4a90c4, 1.5, 30);
    fillLight.position.set(-6, 2, 4);
    scene.add(fillLight);

    // ── Sky sphere ────────────────────────────────────────────────────────────
    scene.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(80, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x050d2e, side: THREE.BackSide }),
      ),
    );

    // ── Particles ─────────────────────────────────────────────────────────────
    const N = 120;
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      vel[i]         = 0.005 + Math.random() * 0.012;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    scene.add(
      new THREE.Points(
        pGeo,
        new THREE.PointsMaterial({
          color: 0x6bb8e8,
          size: 0.1,
          transparent: true,
          opacity: 0.5,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    );

    // ── Rings ─────────────────────────────────────────────────────────────────
    const ringDefs = [
      { radius: 1.8,  tube: 0.06,  x: -3.5, y: -6,  z: -2, speed: 0.008 },
      { radius: 1.1,  tube: 0.045, x:  3.2, y: -9,  z: -4, speed: 0.011 },
      { radius: 2.4,  tube: 0.07,  x:  0.5, y: -12, z: -6, speed: 0.006 },
    ];
    const rings = ringDefs.map(({ radius, tube, x, y, z, speed }) => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0x6bb8e8,
        transparent: true,
        opacity: 0.18,
        roughness: 0.1,
        metalness: 0.2,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 16, 60), mat);
      mesh.position.set(x, y, z);
      mesh.rotation.x = Math.PI / 2;
      mesh.userData = { speed, startY: y };
      scene.add(mesh);
      return mesh;
    });

    // ── Shark model ───────────────────────────────────────────────────────────
    const sharkGroup = new THREE.Group();
    scene.add(sharkGroup);

    const texLoader = new THREE.TextureLoader();
    const blueMap = texLoader.load("/textures/ikea_Blahaj_blue_diffuse.jpg");
    const bumpMap = texLoader.load("/textures/ikea_Blahaj_bump.jpg");
    blueMap.colorSpace = THREE.SRGBColorSpace;

    const mtlLoader = new MTLLoader();
    mtlLoader.setPath("/models/");
    mtlLoader.load("IKEA_Blahaj.mtl", (materials) => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath("/models/");
      objLoader.load(
        "IKEA_Blahaj.obj",
        (obj) => {
          const box    = new THREE.Box3().setFromObject(obj);
          const center = box.getCenter(new THREE.Vector3());
          const size   = box.getSize(new THREE.Vector3());
          const scale  = 7 / Math.max(size.x, size.y, size.z);

          obj.scale.setScalar(scale);
          obj.position.sub(center.multiplyScalar(scale));

          const mat = new THREE.MeshStandardMaterial({
            map:       blueMap,
            bumpMap:   bumpMap,
            bumpScale: 0.4,
            roughness: 0.85,
            metalness: 0.0,
          });
          obj.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              (child as THREE.Mesh).material = mat;
            }
          });

          sharkGroup.add(obj);
        },
        (xhr) => {
          if (xhr.total) {
            console.log(`Shark: ${Math.round((xhr.loaded / xhr.total) * 100)}%`);
          }
        },
        (err) => console.error("OBJ load error", err),
      );
    });

    sharkGroup.rotation.y = 0.25;

    // ── Mouse tracking ────────────────────────────────────────────────────────
    let mx = 0, my = 0, tRX = 0, tRY = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener("mousemove", onMove);

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Render loop ───────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      sharkGroup.position.y  = Math.sin(t * 0.7) * 0.35;
      sharkGroup.rotation.y  = Math.sin(t * 0.3) * 0.2 - 0.1;
      sharkGroup.rotation.z  = Math.sin(t * 0.5) * 0.04;

      tRX += (my * 0.12 - tRX) * 0.04;
      tRY += (mx * 0.18 - tRY) * 0.04;
      sharkGroup.rotation.x  = tRX;
      sharkGroup.rotation.y += tRY * 0.01;

      for (let i = 0; i < N; i++) {
        pos[i * 3 + 1] += vel[i];
        if (pos[i * 3 + 1] > 20) {
          pos[i * 3 + 1] = -20;
          pos[i * 3]     = (Math.random() - 0.5) * 50;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
      }
      pGeo.attributes.position.needsUpdate = true;

      fillLight.intensity = 1.5 + Math.sin(t * 1.2) * 0.25;

      rings.forEach((ring) => {
        ring.position.y += ring.userData.speed as number;
        (ring.material as THREE.MeshStandardMaterial).opacity =
          Math.max(0, 0.18 * (1 - ring.position.y / 8));
        if (ring.position.y > 8) ring.position.y = ring.userData.startY as number;
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}