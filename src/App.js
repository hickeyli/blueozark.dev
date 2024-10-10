import "./styles.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";
import { degreesToRadians, progress } from "popmotion";
import Icosahedron from "./components/Icosahedron";
import Star from "./components/Star";
import Controls from "./components/Controls";
import HoverPopup from "./components/HoverPopup";
import * as THREE from "three";
import useItems from "./hooks/useItems";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import CategoryTabs from "./components/CategoryTabs";
import ProjectPage from './components/ProjectPage';
import ResourcePage from './components/ResourcePage';
import React, { Suspense } from 'react';

// const DEBUG_STAR_MULTIPLIER = 50;

const Scene = ({ onProjectClick, setHoveredStar, setStarInfo, setCamera, setRenderer, activeCategory }) => {
  const { camera, gl: renderer, scene } = useThree();
  const { scrollYProgress } = useScroll();
  // const ProjectPage = lazy(() => import('./components/ProjectPage'));
  // const ResourcePage = lazy(() => import('./components/ResourcePage'));
  
  useEffect(() => {
    setCamera(camera);
    setRenderer(renderer);

    const handleContextLost = (event) => {
      event.preventDefault();
      console.log('WebGL context lost. You should probably refresh the page.');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored.');
      // You might want to re-initialize your scene here
    };

    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [camera, renderer, setCamera, setRenderer]);

  const yAngle = useTransform(scrollYProgress, [0, 1], [0.001, degreesToRadians(180)]);
  const distance = useTransform(scrollYProgress, [0, 1], [10, 3]);

  const momentumRef = useRef(0);
  const draggingRef = useRef(false);
  const controlsRef = useRef(null);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const items = useItems();

  useFrame(() => {
    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      if (intersectedObject.userData && intersectedObject.userData.index !== undefined) {
        const projectIndex = intersectedObject.userData.index;
        const project = items[projectIndex];
        setHoveredStar(intersectedObject);
        setStarInfo(project);
      }
    } else {
      setHoveredStar(null);
      setStarInfo(null);
    }
  });

  useEffect(() => {
    const handleMouseClick = (event) => {
      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (intersectedObject.userData && intersectedObject.userData.index !== undefined) {
          const item = items[intersectedObject.userData.index];
          if (item && item.key && item.category) {
            onProjectClick(item.category, item.key);
          }
        }
      }
    };

    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  }, [camera, items, onProjectClick, scene]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    const controls = controlsRef.current;
    if (controls) {
      if (!draggingRef.current && Math.abs(momentumRef.current) > 0.0001) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = momentumRef.current * 2;
        controls.update();
        momentumRef.current *= 0.95;
      } else {
        controls.autoRotate = false;
        controls.update();
      }
    }
  });

  const stars = items.map((item, index) => (
    <Star
      key={index}
      p={progress(0, items.length, index)}
      userData={{ index, ...item }}
      category={item.category}
      visible={activeCategory === 'all' || activeCategory === item.category}
    />
  ));

  return (
    <>
      <Icosahedron />
      {stars}
      <Controls draggingRef={draggingRef} momentumRef={momentumRef} controlsRef={controlsRef} />
    </>
  );
};

export default function App() {
  const [hoveredStar, setHoveredStar] = useState(null);
  const [starInfo, setStarInfo] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToItem = (category, key) => {
    console.log(`Navigating to ${category}/${key}`);
    if (category === 'project') {
      const projectKey = key.toLowerCase().replace(/\s+/g, '-'); // Ensure key is in kebab-case
      console.log(`Redirecting to /projects/${projectKey}`);
      navigate(`/projects/${projectKey}`);
    } else if (category === 'resource') {
      const resourceKey = key.toLowerCase().replace(/\s+/g, '-'); // Ensure key is in kebab-case
      console.log(`Redirecting to /resources/${resourceKey}`);
      navigate(`/resources/${resourceKey}`);
    }
  };

  const categories = ['all', 'project', 'resource'];

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={
          <>
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <Canvas
              gl={{
                // antialias: false,
                // alpha: false,
                // powerPreference: 'high-performance',
                // failIfMajorPerformanceCaveat: true
              }}
            >
              <Scene
                onProjectClick={navigateToItem}
                setHoveredStar={setHoveredStar}
                setStarInfo={setStarInfo}
                setCamera={setCamera}
                setRenderer={setRenderer}
                activeCategory={activeCategory}
              />
            </Canvas>
            {starInfo && hoveredStar && camera && renderer && (
              <HoverPopup
                hoveredStar={hoveredStar}
                starInfo={starInfo}
                camera={camera}
                renderer={renderer}
              />
            )}
          </>
        } />
        <Route path="/projects/:projectKey" element={
          <Suspense fallback={<div>Loading project...</div>}>
            <ProjectPage />
          </Suspense>
        } />
        <Route path="/resources/:resourceKey" element={
          <Suspense fallback={<div>Loading resource...</div>}>
            <ResourcePage />
          </Suspense>
        } />
      </Routes>
    </div>
  );
}