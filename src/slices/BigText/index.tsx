"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { View } from "@react-three/drei";

import Footer from "@/components/Footer";
import { Bubbles } from "../Hero/Bubbles";

/**
 * Props for `BigText`.
 */
export type BigTextProps = SliceComponentProps<Content.BigTextSlice>;

/**
 * Component for "BigText" Slices.
 */
const BigText = ({ slice }: BigTextProps): JSX.Element => {
  // render
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen w-screen overflow-hidden bg-[#FE6334] text-[#FEE832]"
    >
      <View className="pointer-events-none absolute top-0 z-50 h-full w-full md:block">
        <Bubbles speed={2} opacity={0.1} />
      </View>

      <h2 className="grid w-full gap-[3vw] py-10 text-center font-black uppercase leading-[.7]">
        <div className="text-[34vw]">Soda</div>
        <div className="grid gap-[3vw] text-[34vw] md:flex md:text-[11vw]">
          <span className="inline-block">that</span>
          <span className="inline-block max-md:text-[27vw]">makes</span>
          <span className="inline-block max-md:text-[40vw]">you</span>
        </div>
        <div className="text-[32vw]">smile</div>
      </h2>

      <Footer />
    </section>
  );
};

export default BigText;
