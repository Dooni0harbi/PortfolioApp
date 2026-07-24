import { useEffect, useState } from "react";
import { generateResumePDF } from "./utils/generateResume";

const techStack = [
  { label: "JavaScript", color: "#F7DF1E", abbr: "JS", devicon: "javascript-plain" },
  { label: "Python", color: "#3776AB", abbr: "Py", devicon: "python-plain" },
  { label: "HTML5", color: "#E34F26", abbr: "H5", devicon: "html5-plain" },
  { label: "CSS3", color: "#1572B6", abbr: "C3", devicon: "css3-plain" },
  { label: "SQL", color: "#00758F", abbr: "SQL" },
  { label: "R", color: "#276DC3", abbr: "R", devicon: "r-original" },
  { label: "C#", color: "#9B4F96", abbr: "C#", devicon: "csharp-plain" },
  { label: "Java", color: "#E76F00", abbr: "J", devicon: "java-plain" },
  { label: "PHP", color: "#777BB4", abbr: "PHP", devicon: "php-plain" },
  { label: "React", color: "#61DAFB", abbr: "R", devicon: "react-original" },
  { label: "Tailwind CSS", color: "#38BDF8", abbr: "TW", img: "https://cdn.simpleicons.org/tailwindcss/38BDF8" },
  { label: "ASP.NET", color: "#512BD4", abbr: ".NET", img: "https://cdn.simpleicons.org/dotnet/512BD4" },
  { label: "Bootstrap", color: "#7952B3", abbr: "BS", img: "https://cdn.simpleicons.org/bootstrap/7952B3" },
  { label: "jQuery", color: "#0769AD", abbr: "jQ", devicon: "jquery-plain" },
  { label: "NumPy", color: "#4DABCF", abbr: "Np", devicon: "numpy-plain" },
  { label: "Pandas", color: "#150458", abbr: "Pd", devicon: "pandas-original" },
  { label: "TensorFlow", color: "#FF6F00", abbr: "TF", devicon: "tensorflow-original" },
  { label: "PyTorch", color: "#EE4C2C", abbr: "PT", devicon: "pytorch-original" },
  { label: "Unity", color: "#cccccc", abbr: "U", devicon: "unity-original" },
  { label: "Git", color: "#F05032", abbr: "Git", devicon: "git-plain" },
  { label: "GitHub", color: "#e6ecf5", abbr: "GH", devicon: "github-original" },
  { label: "Postman", color: "#FF6C37", abbr: "Pm", devicon: "postman-plain" },
  { label: "REST APIs", color: "#2f8fff", abbr: "API" },
  { label: "Figma", color: "#A259FF", abbr: "Fg", img: "https://cdn.simpleicons.org/figma/A259FF" },
  { label: "Odoo", color: "#714B67", abbr: "Odoo" },
  { label: "Power BI", color: "#F2C811", abbr: "BI" },
];

const languages = [
  { label: "English", level: "Fluent" },
  { label: "German", level: "Beginner" },
];

const introQuote = "\"Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.\" — Thomas Edison";

const NAME_SPEED = 90; // ms لكل حرف بالاسم
const QUOTE_SPEED = 35; // ms لكل حرف بالاقتباس
const QUOTE_HOLD = 1400; // كم يجلس الاقتباس ظاهر بعد ما يخلص
const FADE_MS = 500;

export default function Hero({
  name = "WEJDAN ALHARBY",
  role = "Information Systems Specialist | Software Engineer | AI & Digital Transformation",
  description = "A creative software engineer who blends code with design — building AI-powered web apps, ERP systems, and Unity games. I love turning imaginative ideas into interactive, polished experiences.",
  avatarUrl = "/avatar.png",
}) {
  const [nameTyped, setNameTyped] = useState("");
  const [quoteTyped, setQuoteTyped] = useState("");
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [showBio, setShowBio] = useState(false);

  // كتابة الاسم كامل حرف حرف، ثم كتابة الاقتباس، ثم اختفاؤه وظهور التخصص والنبذة
  useEffect(() => {
    let nameIndex = 0;
    const nameTimer = setInterval(() => {
      nameIndex++;
      setNameTyped(name.slice(0, nameIndex));
      if (nameIndex >= name.length) {
        clearInterval(nameTimer);
        setTimeout(startQuote, 300);
      }
    }, NAME_SPEED);

    function startQuote() {
      let quoteIndex = 0;
      const quoteTimer = setInterval(() => {
        quoteIndex++;
        setQuoteTyped(introQuote.slice(0, quoteIndex));
        if (quoteIndex >= introQuote.length) {
          clearInterval(quoteTimer);
          setTimeout(() => {
            setQuoteVisible(false);
            setTimeout(() => setShowBio(true), FADE_MS);
          }, QUOTE_HOLD);
        }
      }, QUOTE_SPEED);
    }

    return () => clearInterval(nameTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <section id="home">
      <div className="hero">
        <div>
          <span className="hero-badge">Available for Opportunities</span>

          <h1>
            <span className="typewriter-js">
              {nameTyped}
              <span className="type-cursor" />
            </span>
          </h1>

          {quoteTyped && (
            <div className={`intro-quote-wrap ${quoteVisible ? "" : "is-hidden"}`}>
              <p className="intro-quote">{quoteTyped}</p>
            </div>
          )}

          <p className={`hero-role fade-item ${showBio ? "is-visible" : ""}`}>{role}</p>

          <p className={`hero-desc fade-item ${showBio ? "is-visible" : ""}`}>{description}</p>

          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            {languages.map((l) => (
              <span key={l.label} className="project-tag">{l.label} · {l.level}</span>
            ))}
          </div>

          <div className="hero-actions">
            <button className="btn btn-primary resume-btn" onClick={generateResumePDF}>
              Resume<span className="dl-icon">⬇</span>
            </button>
            <a className="btn btn-outline" href="#projects">View Projects</a>
          </div>
        </div>

        <div className="hero-avatar-wrap">
          <img src={avatarUrl} alt={name} className="hero-avatar" />
        </div>
      </div>

      {/* شريط التقنيات المتحرك بلا توقف — يشتغل على أي حجم شاشة */}
      <div className="tech-marquee">
        <div className="container">
          <div className="tech-track">
            {[...techStack, ...techStack].map((tech, i) => (
              <div className="tech-item" key={i}>
                <span
                  className="icon"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `${tech.color}22`,
                    border: `1.5px solid ${tech.color}`,
                    color: tech.color,
                    fontSize: tech.img || tech.devicon ? 18 : 12,
                    fontWeight: 700,
                  }}
                >
                  {tech.img || tech.devicon ? (
                    <img
                      src={
                        tech.img ||
                        `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.devicon.split("-")[0]}/${tech.devicon}.svg`
                      }
                      alt={tech.label}
                      style={{ width: 22, height: 22 }}
                    />
                  ) : (
                    tech.abbr
                  )}
                </span>
                <span>{tech.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}