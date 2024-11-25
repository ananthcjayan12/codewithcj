"use client"

import { motion, HTMLMotionProps } from 'framer-motion'

export const MotionDiv = motion.div
export const MotionSpan = motion.span

// Add proper typing for the motion.a component
export const MotionA = motion.a as React.ForwardRefExoticComponent<
  HTMLMotionProps<"a"> & React.RefAttributes<HTMLAnchorElement>
> 