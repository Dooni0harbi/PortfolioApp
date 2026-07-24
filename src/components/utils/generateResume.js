import { jsPDF } from "jspdf";
import { resumeData } from "../resumeData";

const MARGIN = 15;
const PAGE_WIDTH = 210; // A4 mm
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const ACCENT = [47, 143, 255]; // #2f8fff

export function generateResumePDF() {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  const ensureSpace = (needed) => {
    if (y + needed > PAGE_HEIGHT - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const sectionTitle = (text) => {
    ensureSpace(12);
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...ACCENT);
    doc.text(text.toUpperCase(), MARGIN, y);
    y += 1.5;
    doc.setDrawColor(...ACCENT);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
    y += 6;
    doc.setTextColor(20, 20, 20);
  };

  const paragraph = (text, size = 10) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH);
    lines.forEach((line) => {
      ensureSpace(5.5);
      doc.text(line, MARGIN, y);
      y += 5.2;
    });
  };

  // ===== Header =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...ACCENT);
  doc.text(resumeData.name, MARGIN, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const roleLines = doc.splitTextToSize(resumeData.role, CONTENT_WIDTH);
  roleLines.forEach((line) => {
    doc.text(line, MARGIN, y);
    y += 5.5;
  });

  doc.setFontSize(9.5);
  doc.setTextColor(90, 90, 90);
  doc.text(
    `${resumeData.email}   |   ${resumeData.linkedin}   |   ${resumeData.github}`,
    MARGIN,
    y
  );
  y += 4;
  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 8;
  doc.setTextColor(20, 20, 20);

  // ===== Summary =====
  sectionTitle("Summary");
  paragraph(resumeData.summary);
  y += 2;

  // ===== Skills =====
  sectionTitle("Skills");
  paragraph(resumeData.skills.join("  ·  "));
  y += 2;

  // ===== Languages =====
  sectionTitle("Languages");
  paragraph(resumeData.languages.join("  ·  "));
  y += 2;

  // ===== Education =====
  sectionTitle("Education");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  ensureSpace(6);
  doc.text(`${resumeData.education.degree}`, MARGIN, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(90, 90, 90);
  paragraph(
    `${resumeData.education.org} — ${resumeData.education.date} — ${resumeData.education.extra}`,
    9.5
  );
  doc.setTextColor(20, 20, 20);
  y += 2;

  // ===== Certifications =====
  sectionTitle("Certifications & Professional Development");
  resumeData.certifications.forEach((c) => {
    ensureSpace(9);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(c.title, MARGIN, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    const dateWidth = doc.getTextWidth(c.date);
    doc.text(c.date, PAGE_WIDTH - MARGIN - dateWidth, y);
    y += 4.5;
    doc.setTextColor(90, 90, 90);
    doc.setFontSize(9);
    doc.text(c.org, MARGIN, y);
    doc.setTextColor(20, 20, 20);
    y += 5.5;
  });
  y += 2;

  // ===== Projects =====
  sectionTitle("Projects");
  resumeData.projects.forEach((p) => {
    ensureSpace(11);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(p.title, MARGIN, y);
    y += 4.5;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(47, 143, 255);
    doc.text(p.stack, MARGIN, y);
    y += 4.3;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(70, 70, 70);
    const descLines = doc.splitTextToSize(p.desc, CONTENT_WIDTH);
    descLines.forEach((line) => {
      ensureSpace(4.5);
      doc.text(line, MARGIN, y);
      y += 4.3;
    });
    doc.setTextColor(20, 20, 20);
    y += 2.5;
  });

  doc.save(`${resumeData.name.replace(/\s+/g, "_")}_Resume.pdf`);
}
