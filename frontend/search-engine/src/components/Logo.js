import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const Logo = () => {
  return (
    <div className="flex items-center justify-center mt-2">
      <MotionLink
        href="/"
        className="w-16 h-16 bg-[#8dc7c0] text-pink-600 text-light flex items-center justify-center
        rounded-full text-2xl font-bold border border-solid border-transparent dark:border-light
        "
        whileHover={{
          backgroundColor: [
            "rgba(141, 199, 192,1)",
            "rgba(131,58,180,1)",
            "rgba(253,29,29,1)",
            "rgba(252,176,69,1)",
            "rgba(131,58,180,1)",
            "rgba(141, 199, 192,1)",
          ],
          transition: { duration: 1, repeat: Infinity },
        }}
      >
        SE
      </MotionLink>
    </div>
  );
};

export default Logo;
