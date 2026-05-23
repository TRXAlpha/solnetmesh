// ================= Carousel =================
function Carousel({ projects, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden"
    >
      <div className="flex gap-12 overflow-x-auto px-12 pb-4 no-scrollbar snap-x snap-mandatory">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.title}
            whileHover={{ scale: 1.08, y: -8 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(i)}
            className="snap-center flex-shrink-0 w-[320px] h-[380px] bg-gradient-to-b from-zinc-900 to-black rounded-2xl shadow-2xl cursor-pointer overflow-hidden relative border border-white/10 hover:border-white/30 transition-all duration-500"
          >
            {proj.img && (
              <img
                src={proj.img}
                alt={proj.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
            )}
            <div className="absolute bottom-0 p-6 backdrop-blur-md bg-black/40">
              <h3 className="text-2xl font-bold">{proj.title}</h3>
              <p className="text-gray-300 text-sm mt-1">{proj.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
