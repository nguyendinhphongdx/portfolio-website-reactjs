"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode, ElementType } from "react";

export type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "zoom-in"
  | "zoom-out"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "flip-up"
  | "flip-down";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  className?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  as?: ElementType;
}

const animationStyles: Record<AnimationType, { initial: CSSProperties; animate: CSSProperties }> = {
  "fade-up": {
    initial: { opacity: 0, transform: "translateY(40px)" },
    animate: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-down": {
    initial: { opacity: 0, transform: "translateY(-40px)" },
    animate: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-left": {
    initial: { opacity: 0, transform: "translateX(40px)" },
    animate: { opacity: 1, transform: "translateX(0)" },
  },
  "fade-right": {
    initial: { opacity: 0, transform: "translateX(-40px)" },
    animate: { opacity: 1, transform: "translateX(0)" },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  "zoom-in": {
    initial: { opacity: 0, transform: "scale(0.8)" },
    animate: { opacity: 1, transform: "scale(1)" },
  },
  "zoom-out": {
    initial: { opacity: 0, transform: "scale(1.2)" },
    animate: { opacity: 1, transform: "scale(1)" },
  },
  "slide-up": {
    initial: { transform: "translateY(100%)" },
    animate: { transform: "translateY(0)" },
  },
  "slide-down": {
    initial: { transform: "translateY(-100%)" },
    animate: { transform: "translateY(0)" },
  },
  "slide-left": {
    initial: { transform: "translateX(100%)" },
    animate: { transform: "translateX(0)" },
  },
  "slide-right": {
    initial: { transform: "translateX(-100%)" },
    animate: { transform: "translateX(0)" },
  },
  "flip-up": {
    initial: { opacity: 0, transform: "perspective(1000px) rotateX(45deg)" },
    animate: { opacity: 1, transform: "perspective(1000px) rotateX(0)" },
  },
  "flip-down": {
    initial: { opacity: 0, transform: "perspective(1000px) rotateX(-45deg)" },
    animate: { opacity: 1, transform: "perspective(1000px) rotateX(0)" },
  },
};

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className,
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
  as: Component = "div",
}: AnimateOnScrollProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const { initial, animate } = animationStyles[animation];

  const style: CSSProperties = {
    ...(isInView ? animate : initial),
    transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "transform, opacity",
  };

  return (
    <Component ref={ref} className={cn(className)} style={style}>
      {children}
    </Component>
  );
}

// Staggered children animation wrapper
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number; // delay between each child in ms
  animation?: AnimationType;
  duration?: number;
  threshold?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 100,
  animation = "fade-up",
  duration = 600,
  threshold = 0.1,
}: StaggerContainerProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold,
    triggerOnce: true,
  });

  const { initial, animate } = animationStyles[animation];

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              style={{
                ...(isInView ? animate : initial),
                transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}ms`,
                willChange: "transform, opacity",
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
