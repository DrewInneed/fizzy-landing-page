"use client";

import { useGSAP } from "@gsap/react";
import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import FloatingCanScene from "./Scene";
import { TextSplitter } from "./TextSplitter";
import { Bubbles } from "./Bubbles";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  // hooks
  // * have to do this because for slow connection the text will be animated
  // * first then the cans will be due to the Scene is not ready
  // * so we have to check if the Scene is ready and animate all of them at the same time
  const ready = useStore(({ ready }) => ready);
  const isDesktop = useMediaQuery("(min-width:768px)", true);

  // gsap
  useGSAP(
    () => {
      // if not ready
      if (!ready && isDesktop) return;

      // timeline 1
      const introTl = gsap.timeline();
      introTl
        // * why need this ? bc opacity css will run first, then this set opacity back to 1
        // * while the animation starts running, make it smooth
        .set(".hero", { opacity: 1 })
        // the biggest text
        .from(".hero-header", {
          scale: 3,
          opacity: 0,
          ease: "power4.in",
          delay: 0.3,
          stagger: 1, // add 1 second delays to each elements from the selector
        })
        // the subheading
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
          },
          "+=.8", // wait for anim 1 done for .8 seconds
        )
        .from(".hero-body", {
          opacity: 0,
          y: 10,
        })
        .from(".hero-button", {
          opacity: 0,
          y: 10,
          duration: 0.6,
        });

      // timeline 2
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          start: "top top",
          end: "+=950", // adjust this from the tutorial because the hero text get disappeared
          scrub: 1.5,
          // markers: true,
        },
      });
      scrollTl
        // anim the whole body color
        .fromTo(
          "body",
          {
            background: "#FDE047",
          },
          {
            background: "#D9F99D",
            overwrite: "auto",
          },
          // * this is not second any more it is more like percentage, so if the whole anim is 4 seconds,
          // * 1 here is like wait until the anim to get 25% and then do it
          1,
        )
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5,
        })
        .from(".text-side-body", {
          y: 20,
          opacity: 0,
        });
    },
    { dependencies: [ready, isDesktop] },
  );

  // render
  return (
    <Bounded
      className="hero opacity-0"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
          <FloatingCanScene />
          <Bubbles speed={2} />
        </View>
      )}

      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[13rem]">
              <TextSplitter
                text={asText(slice.primary.heading)}
                wordDisplayStyle="block"
              />
            </h1>

            <div className="hero-subheading font-semibold- mt-12 text-5xl text-sky-950 lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>

            <div className="hero-body text-2xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>

            <Button
              className="hero-button mt-12"
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
            />
          </div>
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage
            className="w-full md:hidden"
            field={slice.primary.cans_image}
          />
          <div>
            <h2 className="text-side-heading text-balace text-6xl font-black uppercase text-sky-950 lg:text-8xl">
              <TextSplitter
                text={asText(slice.primary.second_heading)}
                wordDisplayStyle="inline-block"
              />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.second_body} />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
