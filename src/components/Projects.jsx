import { useRef, useState } from "react";

const projectsData = {
  "Web Projects": [
    {
      title: "AI Housing Market Platform",
      tag: "AI / Data",
      stack: "Python · Scikit-learn · K-Means",
      desc: "AI-powered platform that segments housing markets into Economic, Gold, and Premium tiers using clustering, with charts, Folium maps, and Power BI dashboards.",
      image: "",
      link: "",
    },
    {
      title: "SmartyPants — AI Chat & Voice Agent",
      tag: "AI Integration",
      stack: "React · Firebase · OpenAI GPT-4o-mini · Whisper",
      desc: "AI assistant with chat, real-time audio transcription, and Firebase authentication — dark/light mode and a fully responsive layout.",
      image: "",
      link: "https://smartypants0aiagent.netlify.app/",
    },
    {
      title: "MovieApp",
      tag: "Web App",
      stack: "React · Firebase · Vite",
      desc: "A movie browsing app built with React and Firebase as part of a guided project.",
      image: "",
      link: "https://github.com/Dooni0harbi/MovieApp",
    },
    {
      title: "Recipe App",
      tag: "Web App",
      stack: "React · Vite",
      desc: "An app that displays a list of recipes in a clean, browsable interface.",
      image: "",
      link: "https://recipeapp0.netlify.app/",
    },
    {
      title: "Travel App",
      tag: "Recommendations",
      stack: "React",
      desc: "A travel recommendations site for exploring destinations and trip ideas.",
      image: "",
      link: "https://travelapp01.netlify.app/",
    },
    {
      title: "Shopping Cart",
      tag: "E-Commerce",
      stack: "React",
      desc: "A shopping cart web app with product browsing and cart management.",
      image: "",
      link: "https://shoppingapp0.netlify.app/",
    },
    {
      title: "GlamBridge",
      tag: "Web Platform",
      stack: "PHP · JavaScript · Bootstrap",
      desc: "Two-sided platform connecting creative talent with agencies and brands — booking management and secure commission-based payments.",
      image: "",
      link: "",
    },
  ],
  "Game Dev (Unity)": [
    {
      title: "Into the Forest",
      tag: "Unity Game",
      stack: "Unity · C#",
      desc: "An atmospheric exploration game built in Unity, playable directly in the browser.",
      image: "",
      link: "https://wejdan-alharby.itch.io/into-the-forest",
    },
    {
      title: "Spaceship",
      tag: "Unity Game",
      stack: "Unity · C#",
      desc: "A space-themed Unity game, playable directly in the browser.",
      image: "",
      link: "https://wejdan-alharby.itch.io/spaceship",
    },
  ],
  "Robotics & Engineering": [
    {
      title: "Nono — 3D Robot Dog",
      tag: "Robotics",
      stack: "Tinkercad · HTML/CSS/JS",
      desc: "A conceptual quadruped robot: 3D mechanical model, torque and stability calculations, and an interactive simulation of walking, running, and jumping.",
      image: "",
      link: "https://github.com/Dooni0harbi/3D_Robot_Dog_Task1_Mech",
    },
    {
      title: "Arduino Goal Celebration System",
      tag: "Embedded",
      stack: "Arduino · C++ · Tinkercad",
      desc: "A World Cup-inspired system where one push button triggers an LCD message, motor, buzzer tone, and NeoPixel light show.",
      image: "",
      link: "https://github.com/Dooni0harbi/Arduino-Football-Goal-Celebration-System",
    },
    {
      title: "Mortal Kombat Keychain",
      tag: "CAD Design",
      stack: "Onshape · 3D Printing",
      desc: "A 3D-printable keychain modeled in Onshape from the Mortal Kombat logo, solving spline and boolean-union challenges.",
      image: "",
      link: "https://github.com/Dooni0harbi/OnShape_KeyChain_MortalKombat_W3_Mecha",
    },
    {
      title: "Arabic Voice Assistant",
      tag: "AI / Web",
      stack: "HTML · CSS · JS · PHP · Gemini API",
      desc: "A browser-based Arabic voice assistant using speech recognition, a secure PHP backend, and the Gemini API, deployed on InfinityFree.",
      image: "",
      link: "https://github.com/Dooni0harbi/Arabic_Gemini_Voice_Assistant_W4_Task1_WebDev",
    },
  ],
};

const tabs = Object.keys(projectsData);

export default function Projects() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const trackRef = useRef(null);

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section id="projects" className="section">
      <h2 className="section-title">My Projects</h2>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="carousel-wrap">
        <button className="carousel-arrow prev" onClick={() => scroll(-1)} aria-label="previous">‹</button>

        <div className="carousel-track" ref={trackRef}>
          {projectsData[activeTab].map((p) => (
            <article className="project-card laser-card" key={p.title}>
              {p.image ? (
                <img src={p.image} alt={p.title} />
              ) : (
                <div style={{ height: 160, background: "#1e1e28" }} />
              )}
              <div className="project-body">
                <div className="row">
                  <h3>{p.title}</h3>
                  <span className="project-tag">{p.tag}</span>
                </div>
                <p>{p.desc}</p>
                <div className="project-meta">
                  <span>{p.stack}</span>
                  {p.stars !== undefined && <span>⭐ {p.stars}</span>}
                </div>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: "inline-block", marginTop: 10, color: "#2f8fff", fontSize: 13, fontWeight: 600, textDecoration: "none" }}
                  >
                    View Project ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <button className="carousel-arrow next" onClick={() => scroll(1)} aria-label="next">›</button>
      </div>
    </section>
  );
}
