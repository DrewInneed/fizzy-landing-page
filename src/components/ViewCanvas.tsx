"use client";

import { Canvas } from "@react-three/fiber";

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
      {/* mesh is an instance of a 3d object */}
      <mesh rotation={[0.5, 0.5, 0]} position={[1, 0, 0]}>
        {/* boxGeometry is like the html of the object */}
        <boxGeometry />
        {/* meshStandardMaterial is how the object looks like */}
        <meshStandardMaterial color={"hotpink"} />
      </mesh>

      {/* this is outside of the object aka its environment */}
      {/* ambientLight brings light from all direction / sides with the same intensity */}
      <ambientLight intensity={2} />
      {/* spotLight adds more depth or definition to the object */}
      <spotLight intensity={3} position={[1, 1, 1]} />
    </Canvas>
  );
};

export default ViewCanvas;
