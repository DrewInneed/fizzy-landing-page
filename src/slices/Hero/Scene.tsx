import { useGSAP } from "@gsap/react";
import { Environment, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { useRef } from "react";
import { Group } from "three";

import FloatingCan from "@/components/FloatingCan";

gsap.registerPlugin(useGSAP);

type Props = {};

const Scene = (props: Props) => {
  // refs
  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const can5Ref = useRef<Group>(null);
  const can1GroupRef = useRef<Group>(null);
  const can2GroupRef = useRef<Group>(null);
  const mainGroupRef = useRef<Group>(null);

  // hooks
  useGSAP(() => {
    // if none ref exists
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !mainGroupRef.current
    )
      return;

    // ! set the cans positions
    gsap.set(can1Ref.current.position, { x: -1.5 });
    gsap.set(can1Ref.current.rotation, { z: -0.3 });

    gsap.set(can2Ref.current.position, { x: 1.5 });
    gsap.set(can2Ref.current.rotation, { z: 0.3 });

    gsap.set(can3Ref.current.position, { y: 5, z: 2 });
    gsap.set(can4Ref.current.position, { x: 2, y: 4, z: 2 });
    gsap.set(can5Ref.current.position, { y: -5 });

    // start anim timeline
    if (window.scrollY < 20) {
      const introTl = gsap.timeline({
        defaults: {
          duration: 3,
          ease: "back.out(1.4)",
        },
      });
      introTl
        .from(can1GroupRef.current.position, { y: -5, x: 1 }, 0)
        .from(can1GroupRef.current.rotation, { z: 3 }, 0)
        .from(can2GroupRef.current.position, { y: 5, x: 1 }, 0)
        .from(can2GroupRef.current.rotation, { z: 3 }, 0);
    }

    // scroll anim timeline
    const scrollTl = gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top ",
        end: "bottom bottom ",
        scrub: 1.5,
      },
    });
    scrollTl
      // rorate can group
      .to(mainGroupRef.current.rotation, { y: Math.PI * 2 })
      // can 1
      .to(can1Ref.current?.position, { x: -0.2, y: -0.3, z: -2 }, 0)
      .to(can1Ref.current?.rotation, { z: 0.4 }, 0)
      // can 2
      .to(can2Ref.current?.position, { x: 1.5, y: -0.2, z: -1 }, 0)
      .to(can2Ref.current?.rotation, { z: -0.3 }, 0)
      // can 3
      .to(can3Ref.current?.position, { x: 0.2, y: 0.5, z: -1 }, 0)
      .to(can3Ref.current?.rotation, { z: 0.2 }, 0)
      // can 4
      .to(can4Ref.current?.position, { x: 0.375, y: -0.25, z: 0.2 }, 0)
      .to(can4Ref.current?.rotation, { z: 0 }, 0)
      // can 5
      .to(can5Ref.current?.position, { x: 0.9, y: 0.5, z: -0.5 }, 0)
      .to(can5Ref.current?.rotation, { z: -0.2 }, 0)
      // all cans group
      .to(
        mainGroupRef.current?.position,
        {
          x: 0.5,
          duration: 3,
          ease: "sine.inOut",
        },
        1.3,
      );
  });

  // vars
  const FLOAT_SPEED = 2;

  // render
  return (
    <group ref={mainGroupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan
          ref={can1Ref}
          floatingSpeed={FLOAT_SPEED}
          flavor="blackCherry"
        />
      </group>
      <group ref={can2GroupRef}>
        <FloatingCan
          ref={can2Ref}
          floatingSpeed={FLOAT_SPEED}
          flavor="lemonLime"
        />
      </group>

      <FloatingCan ref={can3Ref} floatingSpeed={FLOAT_SPEED} flavor="grape" />
      <FloatingCan
        ref={can4Ref}
        floatingSpeed={FLOAT_SPEED}
        flavor="strawberryLemonade"
      />
      <FloatingCan
        ref={can5Ref}
        floatingSpeed={FLOAT_SPEED}
        flavor="watermelon"
      />

      {/* tools to check where is the cans after being set the positions */}
      {/* open pointer events none to use */}
      <OrbitControls />
      <Environment files="/hdrs/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
};

export default Scene;
