const stats = [
  { num: "6+", label: "Years Learning" },
  { num: "13", label: "Certifications" },
  { num: "13", label: "Projects" },
  { num: "2", label: "Bootcamps" },
];

const timeline = [
  {
    date: "2016",
    title: "B.Sc. in Information Systems — Decision Support Systems track",
    org: "Faculty of Computing & Information Technology, King Abdulaziz University (ABET-accredited) — GPA 4.0/5.0",
    link: "",
    icon: "",
  },
  {
    date: "2020",
    title: "Data Analysis",
    org: "Doroob",
    link: "",
    icon: "",
  },
  {
    date: "2021",
    title: "Software Development Bootcamp",
    org: "Saudi Digital Academy",
    link: "",
    icon: "",
  },
  {
    date: "2021",
    title: "SQL Training",
    org: "Ministry of Communications & IT",
    link: "",
    icon: "",
  },
  {
    date: "2022",
    title: "SAP Fundamentals",
    org: "Udemy",
    link: "",
    icon: "",
  },
  {
    date: "2024",
    title: "UX Design",
    org: "Ministry of Communications & IT",
    link: "",
    icon: "",
  },
  {
    date: "Jan 2025",
    title: "IELTS – Overall Band 6.5",
    org: "British Council",
    link: "",
    icon: "",
  },
  {
    date: "Apr – May 2025",
    title: "AI-Powered Web Development with React (120 hrs)",
    org: "Clarusway — Germany",
    link: "",
    icon: "",
  },
  {
    date: "2025",
    title: "Artificial Intelligence & Data Foundations (2 months)",
    org: "Saudi Digital Academy & MCIT",
    link: "",
    icon: "",
  },
  {
    date: "2025",
    title: "AI Concepts & Advanced Applications",
    org: "SDAIA",
    link: "",
    icon: "",
  },
  {
    date: "2025",
    title: "Certified React Developer",
    org: "W3Schools",
    link: "",
    icon: "",
  },
  {
    date: "2025",
    title: "Introduction to Robotics",
    org: "University of Leeds / Institute of Coding",
    link: "",
    icon: "",
  },
  {
    date: "2025",
    title: "AI for Mechanical Engineers",
    org: "University of Michigan (Coursera)",
    link: "",
    icon: "",
  },
  {
    date: "May 2026",
    title: "AI-900: Microsoft Azure AI Fundamentals",
    org: "ELEVATE / ICAIRE / Microsoft",
    link: "",
    icon: "",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <h2 className="section-title">Education &amp; Certifications</h2>

      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="num">{s.num}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="timeline-grid">
        {timeline.map((item) => (
          <div className="timeline-card laser-card" key={item.title}>
            {item.icon ? (
              <img src={item.icon} alt={item.org} />
            ) : (
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  background: "var(--accent-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  color: "var(--accent)",
                  flexShrink: 0,
                }}
              >
                ★
              </div>
            )}
            <div>
              <div className="date">{item.date}</div>
              <h4>{item.title}</h4>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noreferrer">{item.org}</a>
              ) : (
                <span style={{ color: "#9a9aa5", fontSize: 13 }}>{item.org}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
