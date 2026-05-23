import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function DetailView({ project, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onNext, onPrev, onClose]);

  return (
    <motion.div
      className="detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      <div className="detail-content">
        <h2>{project.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: project.long }} />
        {project.gifs.length > 0 &&
          project.gifs.map((gif, idx) => (
            <img key={idx} src={gif} alt={`${project.title}-demo`} />
          ))}
      </div>
    </motion.div>
  );
}
