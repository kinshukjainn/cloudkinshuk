"use client";
import { motion } from "framer-motion";

export default function Signaturekinshuk() {
  return (
    <div className="relative group flex items-center justify-center py-2">
      <div
        className="relative perspective-[2000px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 1. ATMOSPHERIC BACK GLOW (The Aura) 
            Deep blue/purple blur that pulses slowly behind the text. 
        */}
        <motion.span
          aria-hidden="true"
          className="
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-[120%] h-[120%]
            bg-red-500/30
            blur-[60px] rounded-full
            pointer-events-none
          "
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 2. MAIN 3D TEXT CONTAINER */}
        <motion.h1
          className="
            relative m-0 p-0
            font-bold tracking-tight
            text-[clamp(2rem,4vw,4rem)] leading-none
            cursor-default
            z-10
          "
          initial={{ rotateX: 0, rotateY: 0, z: 0 }}
          animate={{
            rotateX: [0, 5, 0, -5, 0], // Subtle nodding
            rotateY: [0, 8, 0, -8, 0], // Subtle panning
            y: [0, -6, 0], // Levitation effect
          }}
          transition={{
            duration: 10, // Very slow, majestic movement
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* 3. THE TEXT CONTENT (Gradient Fill + Drop Shadow) */}
          <span
            className="
              block
              bg-clip-text text-transparent
              bg-gradient-to-b from-white via-red-100 to-red-300/80
              drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]
            "
          >
            cloudkinshuk.in
          </span>

          {/* 4. THE SHIMMER (The "Premium" Google/Apple sheen) 
              A white gradient that sweeps across the text.
          */}
          <motion.span
            aria-hidden="true"
            className="
              absolute inset-0
              bg-gradient-to-r from-transparent via-red-500/100 to-transparent
              bg-clip-text text-transparent
              pointer-events-none
            "
            animate={{
              backgroundPosition: ["200% center", "-200% center"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1,
            }}
            style={{
              backgroundSize: "200% auto",
            }}
          >
            cloudkinshuk.in
          </motion.span>
        </motion.h1>
      </div>
    </div>
  );
}
