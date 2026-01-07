"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";

interface ParticleButtonProps extends ButtonProps {
  onSuccess?: () => void;
  successDuration?: number;
}

function SuccessParticles({
  buttonRef,
}: {
  buttonRef: React.RefObject<HTMLButtonElement>;
}) {
  const rect = buttonRef.current?.getBoundingClientRect();
  if (!rect) return null;

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  return (
    <AnimatePresence>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed h-1 w-1 rounded-full bg-white"
          style={{ left: centerX, top: centerY }}
          initial={{
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            x: [0, (i % 2 ? 1 : -1) * (Math.random() * 50 + 20)],
            y: [0, -Math.random() * 50 - 20],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </AnimatePresence>
  );
}

function ParticleButton({
  children,
  onClick,
  onSuccess,
  successDuration = 1000,
  className,
  asChild = false,
  ...props
}: ParticleButtonProps) {
  const [showParticles, setShowParticles] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    setShowParticles(true);

    setTimeout(() => {
      setShowParticles(false);
      onSuccess?.();
    }, successDuration);
  };

  let resolvedAsChild = asChild;
  let resolvedChildren = children;

  if (asChild) {
    const childArray = React.Children.toArray(children);
    const onlyChild = childArray[0];
    const isSingleElement =
      childArray.length === 1 &&
      React.isValidElement(onlyChild) &&
      onlyChild.type !== React.Fragment;

    if (!isSingleElement) {
      if (process.env.NODE_ENV !== "production") {
        console.error(
          "[ParticleButton] `asChild` expects a single React element child (not a Fragment). Falling back to a button."
        );
      }
      resolvedAsChild = false;
    } else {
      resolvedChildren = onlyChild;
    }
  }

  const content = resolvedAsChild ? resolvedChildren : (
    <>
      {resolvedChildren}
      <MousePointerClick className="h-4 w-4" />
    </>
  );

  return (
    <>
      {showParticles && <SuccessParticles buttonRef={buttonRef} />}
      <Button
        ref={buttonRef}
        onClick={handleClick}
        className={cn(
          "relative",
          showParticles && "scale-95",
          "transition-transform duration-100",
          className
        )}
        asChild={resolvedAsChild}
        {...props}
      >
        {content}
      </Button>
    </>
  );
}

export { ParticleButton };
