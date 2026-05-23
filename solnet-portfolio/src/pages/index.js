// pages/index.js
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dummy project data
const projects = [
  { title: "Project Alpha", text: "AI & Robotics Demo", img: "/project1.gif" },
  { title: "Project Beta", text: "Autonomous System", img: "/project2.gif" },
  { title: "Project Gamma", text: "Cybersecurity Tool", img: "/project3.gif" },
  { title: "Contact Me", text: "Get in touch!", img: "/contact.png" },
];

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(null); // null = carousel
  const carouselRef = useRef(null);
  const detailRef = useRef(null);

  // Arrow key navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return; // only in detail view
      if (e.key === "ArrowRight") setSelectedIndex((i) => Math.min(i + 1, projects.length - 1));
      if (e.key === "ArrowLeft") setSelectedIndex((i) => Math.max(i - 1, 0));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  // Smooth scroll to detail view
  useEffect(() => {
    if (selectedIndex !== null) {
      detailRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      <StarBackground />

      {/* Intro Section */}
      {selectedIndex === null && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center z-10"
        >
          <h1 className="text-5xl font-bold">Chris</h1>
          <p className="mt-4 text-xl">AI · Robotics · Systems</p>
        </motion.div>
      )}

      {/* Carousel */}
      {selectedIndex === null && (
        <Carousel
          projects={projects}
          carouselRef={carouselRef}
          onSelect={(i) => setSelectedIndex(i)}
        />
      )}

      {/* Detail View */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            key="detail"
            ref={detailRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full bg-black overflow-y-scroll z-20"
          >
            <div className="min-h-screen p-16">
              <h2 className="text-4xl font-bold mb-4">{projects[selectedIndex].title}</h2>
              <p className="text-xl mb-8">{projects[selectedIndex].text}</p>
              {projects[selectedIndex].img && (
                <img
                  src={projects[selectedIndex].img}
                  alt={projects[selectedIndex].title}
                  className="rounded-lg max-w-3xl mx-auto shadow-xl"
                />
              )}

              <div className="mt-16 space-y-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  vulputate, sapien id bibendum vehicula, velit turpis lacinia
                  nibh, vitae egestas elit risus ac justo.
                </p>
                <p>
                  Add your demos, docs, papers, gifs here. Scroll to read more.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ================= Star Background =================
function StarBackground() {
  const canvasRef = useRef(null);
  const stars = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // initialize stars
      stars.current = Array.from({ length: 150 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        delta: Math.random() * 0.02,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.current.forEach((s) => {
        s.alpha += s.delta;
        if (s.alpha > 1 || s.alpha < 0) s.delta = -s.delta;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}

// ================= Carousel =================
function Carousel({ projects, carouselRef, onSelect }) {
  return (
    <div
      ref={carouselRef}
      className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 flex space-x-8 z-10 overflow-x-hidden px-8"
    >
      {projects.map((proj, i) => (
        <motion.div
          key={proj.title}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="min-w-[300px] bg-gray-900 rounded-lg p-6 cursor-pointer shadow-xl"
          onClick={() => onSelect(i)}
        >
          <h3 className="text-2xl font-bold mb-2">{proj.title}</h3>
          <p className="text-gray-300">{proj.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
