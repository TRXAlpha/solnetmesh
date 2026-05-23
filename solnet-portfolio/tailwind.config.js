module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  // ...rest of config


  theme: {
    extend: {
      colors: {
        cinematic: {
          900: "#03040a",
          800: "#07141a",
          accent: "#7afcff",
          accent2: "#00ffd6"
        }
      },
      fontFamily: {
        heading: ["Space Grotesk", "Inter", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        'soft-lg': '0 18px 50px rgba(2,10,24,0.55)',
      },
      borderRadius: {
        'xl2': '1rem'
      }
    }
  },
  plugins: []
}
