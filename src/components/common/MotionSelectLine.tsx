"use client";

import { memo, PropsWithChildren } from "react";
import { motion } from "framer-motion";

interface MotionSelectLineProps {
  state: "previous" | "active" | "next";
}

function MotionSelectLine({ state, children }: PropsWithChildren<MotionSelectLineProps>) {
  const variants = {
    previous: { y: -60, opacity: 1, scale: 0.95 },
    active: { y: 0, opacity: 1, scale: 1 },
    next: { y: 50, opacity: 0, scale: 0.95 },
  };

  const animateTo = state;

  return (
    <motion.div
      animate={animateTo}
      initial="next"
      variants={variants}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full flex justify-center items-center py-6"
    >
      {children}
    </motion.div>
  );
}

export default memo(MotionSelectLine);
