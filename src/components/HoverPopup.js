import React from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

const HoverPopup = ({ hoveredStar, starInfo, camera, renderer }) => {
    if (!hoveredStar || !starInfo) return null;
    
    const vector = new THREE.Vector3();
    hoveredStar.getWorldPosition(vector);
    vector.project(camera);
  
    const widthHalf = renderer.domElement.clientWidth / 2;
    const heightHalf = renderer.domElement.clientHeight / 2.1;
  
    const screenPosition = {
      x: vector.x * widthHalf + widthHalf,
      y: -vector.y * heightHalf + heightHalf,
    };
  
    return ReactDOM.createPortal(
        <div
            className="popup"
            style={{
                position: "absolute",
                left: `${screenPosition.x}px`,
                top: `${screenPosition.y}px`,
                transform: "translate(-50%, -100%)", // Move the popup above the star
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                zIndex: 1000,
                pointerEvents: "none", // Allow click events to pass through
            }}
        >
            <h3>{starInfo.title}</h3>
            <p>{starInfo.category}</p>
            <p>{starInfo.description}</p>
        </div>,
        document.getElementById('popup-root')
    );
};

export default HoverPopup;
