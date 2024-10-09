import React from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

const HoverPopup = ({ hoveredStar, starInfo, camera, renderer }) => {
    if (!hoveredStar || !starInfo) return null;
    
    // console.log("Rendering HoverPopup with:", starInfo);

    const vector = new THREE.Vector3();
    hoveredStar.getWorldPosition(vector);
    vector.project(camera);
  
    const widthHalf = renderer.domElement.clientWidth / 2;
    const heightHalf = renderer.domElement.clientHeight / 2;
  
    const screenPosition = {
      x: vector.x * widthHalf + widthHalf,
      y: -vector.y * heightHalf + heightHalf,
    };
  
    // Use ReactDOM.createPortal to render the popup outside the canvas
    return ReactDOM.createPortal(
        <div
            className="popup"
            style={{
                position: "absolute",
                left: `${screenPosition.x}px`,
                top: `${screenPosition.y}px`,
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                zIndex: 1000, // Ensure it's above other elements
            }}
        >
            <h3>{starInfo.name}</h3>
            <p>{starInfo.category}</p>
            <p>{starInfo.description}</p>
        </div>,
        document.getElementById('popup-root') // Render the popup into the dedicated DOM node
    );
};

export default HoverPopup;
