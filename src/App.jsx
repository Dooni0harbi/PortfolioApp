import "./components/sections.css";
import StarsBackground from "./components/StarsBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <StarsBackground glowStrength={0.1} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar active="Home" />
        <Hero />
        <Projects />
        <Certifications />
        <Contact />
      </div>
    </>
  );
}
