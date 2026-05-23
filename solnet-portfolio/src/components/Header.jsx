// components/Header.jsx (updated)
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Header({ onOpenReflective }) {
  const ref = useRef(null)

  useEffect(() => {
    function setHeaderVar() {
      if (!ref.current) return
      const h = ref.current.getBoundingClientRect().height
      document.documentElement.style.setProperty('--header-height', `${Math.ceil(h)}px`)
    }
    setHeaderVar()
    window.addEventListener('resize', setHeaderVar)
    return () => window.removeEventListener('resize', setHeaderVar)
  }, [])

  return (
    <header ref={ref} className="header container-narrow glass px-4">
      <div className="brand">
        <div className="logo">C</div>
        <div>
          <div className="text-sm font-semibold">Chris</div>
          <div className="text-xs subtle">AI · Robotics · Systems</div>
        </div>
      </div>

      <nav className="flex items-center gap-3 text-sm">
        <a href="#projects" className="subtle hover:text-white transition">Projects</a>
        <a href="#architecture" className="subtle hover:text-white transition">Architecture</a>
        <a href="#contact" className="subtle hover:text-white transition">Contact</a>
        <motion.button
          onClick={onOpenReflective}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary"
        >
          Reflective
        </motion.button>
      </nav>
    </header>
  )
}
