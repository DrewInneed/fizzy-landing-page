"use client";

import { Canvas } from "@react-three/fiber";

import { View } from "@react-three/drei";
import { Suspense } from "react";
import dynamic from "next/dynamic";
// import { Perf } from "r3f-perf";

const Loader = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Loader),
  { ssr: false },
);

type Props = {};

const ViewCanvas = (props: Props) => {
  return (
    <>
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
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
        {/* <Perf /> */}
      </Canvas>
      <Loader />
    </>
  );
};

export default ViewCanvas;
