// src/pages/_app.jsx
import '../../styles/globals.css'   // <---- if your globals.css is at /styles/globals.css (project root)
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
