import { useState } from "react";
import Lottie from "lottie-react";
import robotAnimation from "../assets/robot-warmup.json";

export default function Contact({
  bio = "I'm a Software Engineer exploring the intersection of AI, web development, and creative technology — always excited to bring new ideas to life.",
  email = "creative.wejdan@gmail.com",
  linkedin = "https://linkedin.com/in/wejdan-alharbi-0111",
  github = "https://github.com/Dooni0harbi",
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ subject: "", message: "", phone: "", senderEmail: "" });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSend = (e) => {
    e.preventDefault();
    const body =
      `${form.message}\n\nPhone: ${form.phone}` +
      (form.senderEmail ? `\nReply to: ${form.senderEmail}` : "");
    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      form.subject || "New message from your portfolio"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setOpen(false);
  };

  return (
    <section id="contactme" className="section">
      <h2 className="section-title">Let's Build Something Together</h2>

      {/* روبوت الإحماء — أنيميشن Lottie اللي رفعتيه */}
      <div className="robot-scene">
        <Lottie animationData={robotAnimation} loop={true} className="robot-lottie" />
      </div>

      <p className="contact-desc">{bio}</p>

      <div className="contact-grid">
        <a className="contact-card laser-card" href={`mailto:${email}`} style={{ textDecoration: "none", color: "inherit" }}>
          <div className="icon">
            <img src="https://cdn.simpleicons.org/gmail/EA4335" alt="Email" style={{ width: 26, height: 26 }} />
          </div>
          <h4>Email</h4>
          <span>{email}</span>
        </a>

        <a className="contact-card laser-card" href={linkedin} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="icon">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" style={{ width: 26, height: 26 }} />
          </div>
          <h4>LinkedIn</h4>
          <span>Let's connect professionally</span>
        </a>

        <a className="contact-card laser-card" href={github} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="icon">
            <img src="https://cdn.simpleicons.org/github/e6ecf5" alt="GitHub" style={{ width: 26, height: 26 }} />
          </div>
          <h4>GitHub</h4>
          <span>Explore my repositories</span>
        </a>
      </div>

      <button className="btn btn-primary" onClick={() => setOpen(true)}>Send a Message</button>

      {open && (
        <div className="message-modal-overlay" onClick={() => setOpen(false)}>
          <form
            className="message-modal-card"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSend}
          >
            <button type="button" className="message-modal-close" onClick={() => setOpen(false)} aria-label="close">✕</button>
            <h3>Send a Message</h3>

            <label>Subject</label>
            <input required value={form.subject} onChange={update("subject")} placeholder="What's this about?" />

            <label>Message</label>
            <textarea required rows={4} value={form.message} onChange={update("message")} placeholder="Your message" />

            <label>Phone Number</label>
            <input required type="tel" value={form.phone} onChange={update("phone")} placeholder="+966 5xx xxx xxx" />

            <label>Your Email (so I can reply)</label>
            <input type="email" value={form.senderEmail} onChange={update("senderEmail")} placeholder="you@example.com" />

            <button type="submit" className="btn btn-primary" style={{ marginTop: 12, width: "100%" }}>
              Send
            </button>
          </form>
        </div>
      )}
    </section>
  );
}