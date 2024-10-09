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
import { Routes, Route } from "react-router-dom";
import ProjectPage from "./components/ProjectPage";
import CategoryTabs from "./components/CategoryTabs";

const DEBUG_STAR_MULTIPLIER = 50;

const Scene = ({ onProjectClick, setHoveredStar, setStarInfo, setCamera, setRenderer, activeCategory }) => {
  const { camera, gl: renderer, scene } = useThree();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setCamera(camera);
    setRenderer(renderer);
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
          const projectIndex = intersectedObject.userData.index;
          const project = items[projectIndex];

          if (project) {
            onProjectClick(project.key);
          }
        }
      }
    };

    renderer.domElement.addEventListener("click", handleMouseClick);
    return () => {
      renderer.domElement.removeEventListener("click", handleMouseClick);
    };
  }, [camera, renderer, items, scene, onProjectClick]);

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

  const navigateToProject = (projectKey) => {
    window.location.href = `${projectKey}`;
  };

  const categories = ['all', 'project', 'resource'];

  return (
    <div className="container">
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <Canvas gl={{ antialias: false }}>
        <Scene
          onProjectClick={navigateToProject}
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
      <Routes>
        <Route path="/" element={<div>Welcome to the Scene!</div>} />
        <Route path="/projects/:projectKey" element={<ProjectPage />} />
      </Routes>
    </div>
  );
}