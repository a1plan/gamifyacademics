
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJSHero = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create educational-themed objects
    const geometries = [
      new THREE.TorusGeometry(1, 0.4, 16, 50), // Circular object (like a ring/donut)
      new THREE.TetrahedronGeometry(1.2), // Triangular pyramid
      new THREE.DodecahedronGeometry(1), // 12-sided shape
      new THREE.SphereGeometry(0.8, 32, 32), // Sphere (like a globe)
      new THREE.BoxGeometry(1, 1, 1), // Cube (like a building block)
    ];
    
    const createMaterial = (color: number) => {
      return new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.1,
        roughness: 0.3,
        transparent: true,
        opacity: 0.8,
      });
    };
    
    // MindsMaidaan color palette
    const colors = [
      0x211C6A, // Navy
      0x59B4C3, // Teal
      0x74E291, // Green
      0x8A4FFF, // Purple accent
      0xFFD166, // Yellow accent
    ];
    
    const objects: THREE.Mesh[] = [];
    
    geometries.forEach((geometry, i) => {
      const material = createMaterial(colors[i % colors.length]);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 5;
      mesh.position.y = (Math.random() - 0.5) * 5;
      mesh.position.z = (Math.random() - 0.5) * 2 - 2;
      scene.add(mesh);
      objects.push(mesh);
    });
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      objects.forEach((obj, i) => {
        obj.rotation.x += 0.003;
        obj.rotation.y += 0.005;
        
        // Gentle floating motion
        obj.position.y += Math.sin(Date.now() * 0.001 + i) * 0.003;
      });
      
      // Slight camera movement for parallax effect
      camera.position.x = Math.sin(Date.now() * 0.0005) * 0.5;
      camera.position.y = Math.cos(Date.now() * 0.0005) * 0.3;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default ThreeJSHero;
