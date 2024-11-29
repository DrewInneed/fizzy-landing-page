import { Float } from "@react-three/drei";
import { forwardRef, ReactNode } from "react";
import { Group } from "three";
import { SodaCan, SodaCanProps } from "./SodaCan";

type FloatingCanProps = {
  flavor?: SodaCanProps["flavor"];
  floatingSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

const FloatingCan = forwardRef<Group, FloatingCanProps>(
  (
    {
      flavor = "blackCherry",
      floatingSpeed = 1.5,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <group ref={ref}>
        <Float
          speed={floatingSpeed} // Animation speed, defaults to 1
          rotationIntensity={rotationIntensity} // XYZ rotation intensity, defaults to 1
          floatIntensity={floatIntensity} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={floatingRange} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          {children}
          <SodaCan />
        </Float>
      </group>
    );
  },
);

export default FloatingCan;
