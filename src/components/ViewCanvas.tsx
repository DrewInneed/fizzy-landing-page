"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import FloatingCan from "./FloatingCan";

type Props = {};

const ViewCanvas = (props: Props) => {
  return (
    <Canvas
      // styles to keep the canvas on top of everything
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
      }}
      camera={{
        // field of vision or fiield of view
        fov: 30,
      }}
      dpr={[1, 1.5]} // device pixel ratio
      gl={{ antialias: true }} // WebGL
    >
      <FloatingCan />
      <Environment files="/hdrs/lobby.hdr" environmentIntensity={1.5} />
    </Canvas>
  );
};

export default ViewCanvas;
