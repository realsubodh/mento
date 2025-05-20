"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Menu = ({ children }) => {
  // State to track if navbar is shrunk or not
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down → shrink navbar
        setIsShrunk(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up → shrink navbar immediately
        setIsShrunk(true);
      }

      // If near top of page, expand navbar
      if (currentScrollY < 50) {
        setIsShrunk(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      animate={{
        width: isShrunk ? "50%" : "75%",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      initial={{ width: "90%" }}
      className="fixed top-8 left-1/2 -translate-x-1/2 rounded-full dark:border-white/[0.2] shadow-input flex justify-between items-center space-x-4 px-8 py-6 h-25 z-50
       bg-transparent
        border border-white border-opacity-20
        shadow-lg"
        style={{
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)", // Safari support
          backgroundColor: "rgba(255, 255, 255, 0.1)", 
        }}
    >
      {children}
    </motion.nav>
  );
};

