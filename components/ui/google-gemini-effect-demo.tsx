"use client";

import { animate, useMotionValue } from "framer-motion";
import React, { useEffect } from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export function GoogleGeminiEffectDemo() {
  const pathLengthFirst = useMotionValue(0.2);
  const pathLengthSecond = useMotionValue(0.15);
  const pathLengthThird = useMotionValue(0.1);
  const pathLengthFourth = useMotionValue(0.05);
  const pathLengthFifth = useMotionValue(0);

  useEffect(() => {
    const controls = [
      animate(pathLengthFirst, 1.2, {
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }),
      animate(pathLengthSecond, 1.2, {
        duration: 6.5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }),
      animate(pathLengthThird, 1.2, {
        duration: 7,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }),
      animate(pathLengthFourth, 1.2, {
        duration: 7.5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }),
      animate(pathLengthFifth, 1.2, {
        duration: 8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }),
    ];

    return () => controls.forEach((control) => control.stop());
  }, [
    pathLengthFirst,
    pathLengthSecond,
    pathLengthThird,
    pathLengthFourth,
    pathLengthFifth,
  ]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black pt-32">
      <GoogleGeminiEffect
        className="h-full pt-12"
        title="PixelPro"
        description="Road to success"
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}
