import puppeteer from "puppeteer-core";
import { readFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR  = join(__dirname, "..", "public", "downloads");
const PUB_DIR  = join(__dirname, "..", "public");
mkdirSync(OUT_DIR, { recursive: true });

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

// ─── Logo: the combined green banner at its natural 300×78 size ──────────────
const LOGO_DATA = `data:image/png;base64,${readFileSync(join(PUB_DIR, "su-banner-logo.png")).toString("base64")}`;

// ─── Shared styles ────────────────────────────────────────────────────────────
const BASE_CSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    font-family: 'Segoe UI', Calibri, Arial, sans-serif;
    color: #1a2332;
    background: #fff;
    font-size: 11.5px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* ══════════════════════════════════════════
     HEADER — logo left at natural size, text right
     ══════════════════════════════════════════ */
  .header {
    page-break-inside: avoid;
    display: flex;
    align-items: stretch;
    border-bottom: 5px solid #1a4d2e;
    background: #0d2353;
  }

  /* Logo column — exact natural size, no scaling */
  .header-logo-col {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    background: #fff;           /* white bg so logo colours read correctly */
    padding: 8px 12px;
    border-right: 4px solid #1a4d2e;
  }
  .header-logo {
    display: block;
    width: 300px;               /* exact natural width of su-banner-logo.png */
    height: 78px;               /* exact natural height — zero upsampling     */
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }

  /* Text column — fills remaining space */
  .header-text-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 20px;
    background: #0d2353;
  }
  .header-school {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 15px;
    font-weight: 700;
    color: #fdd835;
    letter-spacing: 0.6px;
    line-height: 1.2;
    margin-bottom: 4px;
  }
  .header-dept {
    font-size: 11px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: 0.3px;
    margin-bottom: 3px;
  }
  .header-addr {
    font-size: 9.5px;
    color: rgba(255,255,255,0.70);
    font-style: italic;
  }

  /* ── Document title banner ── */
  .doc-title-bar {
    background: linear-gradient(135deg, #0ea5e9, #14b8a6);
    color: white;
    text-align: center;
    padding: 12px 30px;
    border-bottom: 3px solid #0369a1;
  }
  .doc-title-bar h1 { font-size: 18px; font-weight: 800; letter-spacing: 1px; }
  .doc-title-bar p { font-size: 10px; opacity: 0.9; margin-top: 3px; }

  /* ── Workshop badge strip ── */
  .workshop-strip {
    background: #f0f9ff;
    border-bottom: 1px solid #bae6fd;
    padding: 8px 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 10px;
    color: #0369a1;
    font-weight: 600;
  }
  .workshop-strip span { display: flex; align-items: center; gap: 5px; }

  /* ── Content area ── */
  .content { padding: 18px 28px 24px; }

  /* ── Section headings ── */
  .section-title {
    font-size: 13px; font-weight: 700;
    color: #0d2353;
    border-left: 4px solid #0ea5e9;
    padding-left: 10px;
    margin: 18px 0 10px;
  }

  /* ── Day card ── */
  .day-card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 14px;
    page-break-inside: avoid;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  }
  .day-header {
    padding: 9px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    font-weight: 700;
    font-size: 12px;
  }
  .day-number { font-size: 16px; font-weight: 900; min-width: 24px; }
  .day-title { font-size: 12px; font-weight: 700; }
  .day-subtitle { font-size: 9.5px; font-weight: 400; opacity: 0.88; margin-top: 1px; }

  .schedule-table { width: 100%; border-collapse: collapse; }
  .schedule-table th {
    background: #f8fafc; color: #475569;
    font-size: 9px; font-weight: 700; text-transform: uppercase;
    padding: 6px 10px; border-bottom: 1px solid #e2e8f0;
    text-align: left; letter-spacing: 0.5px;
  }
  .schedule-table td {
    padding: 7px 10px;
    border-bottom: 1px solid #f1f5f9;
    font-size: 10px; vertical-align: top;
  }
  .schedule-table tr:last-child td { border-bottom: none; }
  .schedule-table tr:nth-child(even) td { background: #fafbfc; }

  .time-cell { font-weight: 700; color: #0369a1; white-space: nowrap; min-width: 90px; }
  .activity-cell { font-weight: 600; color: #1e293b; }
  .type-badge {
    display: inline-block; padding: 2px 7px; border-radius: 10px;
    font-size: 8.5px; font-weight: 700; letter-spacing: 0.3px;
  }
  .badge-lab { background: #dcfce7; color: #166534; }
  .badge-lecture { background: #dbeafe; color: #1e40af; }
  .badge-break { background: #fef9c3; color: #854d0e; }
  .badge-demo { background: #f3e8ff; color: #6b21a8; }
  .badge-activity { background: #ffedd5; color: #9a3412; }
  .badge-ceremony { background: #fce7f3; color: #9d174d; }

  .outcome-bar {
    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
    border: 1px solid #86efac;
    border-radius: 6px;
    padding: 7px 12px;
    margin: 6px 10px 10px;
    font-size: 10px; color: #166534;
    display: flex; align-items: center; gap: 8px;
  }
  .outcome-icon { font-size: 14px; }

  /* ── Notes box ── */
  .note-box {
    background: #fffbeb;
    border: 1px solid #fcd34d;
    border-radius: 6px;
    padding: 10px 14px;
    margin: 8px 0;
    font-size: 10px;
  }
  .note-box strong { color: #92400e; }

  /* ── Info grid ── */
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 10px 0;
  }
  .info-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 10px;
    font-size: 10px;
  }
  .info-card-label { font-size: 8.5px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .info-card-value { font-weight: 600; color: #0f172a; font-size: 11px; }

  /* ── Footer ── */
  .pdf-footer {
    background: #0d2353;
    color: #94a3b8;
    font-size: 9px;
    text-align: center;
    padding: 8px 30px;
    border-top: 3px solid #c8a535;
    margin-top: 20px;
  }
  .pdf-footer strong { color: #c8a535; }

  /* ── Page break ── */
  .page-break { page-break-before: always; }
`;

// ─── Shared header HTML ───────────────────────────────────────────────────────
function universityHeader(docTitle, docSubtitle) {
  return `
    <div class="header">
      <!-- Logo: original 300×78, white background, left aligned -->
      <div class="header-logo-col">
        <img class="header-logo" src="${LOGO_DATA}" alt="Shobhit University"/>
      </div>
      <!-- Text: fills remaining width -->
      <div class="header-text-col">
        <div class="header-school">Shobhit Institute of Engineering &amp; Technology (Deemed-to-be University)</div>
        <div class="header-dept">School of Biomedical Engineering &amp; Health Sciences</div>
        <div class="header-addr">NH-58, Modipuram, Meerut – 250110, Uttar Pradesh, India</div>
      </div>
    </div>
    <div class="doc-title-bar">
      <h1>${docTitle}</h1>
      <p>${docSubtitle}</p>
    </div>
    <div class="workshop-strip">
      <span>📅 Workshop: <b>7–11 July 2026</b></span>
      <span>⏰ Daily: <b>10:00 AM – 1:00 PM</b></span>
      <span>📍 Venue: <b>Shobhit University Campus, Meerut</b></span>
      <span>🎓 <b>Class XII Science Students</b></span>
    </div>
  `;
}

// ─── Schedule PDF content ─────────────────────────────────────────────────────
function scheduleHTML() {
  const days = [
    {
      num: "01",
      title: "The Living Blueprint",
      subtitle: "Cell Biology & Microscopy",
      color: "linear-gradient(135deg, #0ea5e9, #0284c7)",
      sessions: [
        { time: "10:00 – 10:30 AM", activity: "Welcome Address & Workshop Overview", type: "activity", detail: "Orientation, introduction to faculty & safety briefing" },
        { time: "10:30 – 11:00 AM", activity: "Lecture: Introduction to Biomedical Engineering", type: "lecture", detail: "History, scope & career pathways in BME" },
        { time: "11:00 – 11:50 AM", activity: "Lab: Microscopy & Cell Observation", type: "lab", detail: "Prepare slides of human cheek cells; observe under compound microscope; identify organelles" },
        { time: "11:50 AM – 12:00 PM", activity: "Refreshment Break", type: "break", detail: "Tea & light snacks" },
        { time: "12:00 – 12:45 PM", activity: "Lab: Blood Grouping (ABO System)", type: "lab", detail: "Use antisera to identify ABO blood group; understand agglutination reaction" },
        { time: "12:45 – 1:00 PM", activity: "Day Debrief & Q&A", type: "activity", detail: "Reflection, doubt clearing, distribute Day 2 preparation notes" },
      ],
      outcome: "Students will have prepared microscopy slides, identified blood groups, and understood the fundamental unit of life — the cell.",
    },
    {
      num: "02",
      title: "Signals of Life",
      subtitle: "Biosignals — ECG, EMG & Sensors",
      color: "linear-gradient(135deg, #ec4899, #be185d)",
      sessions: [
        { time: "10:00 – 10:20 AM", activity: "Quick Recap & Concept Check", type: "activity", detail: "5-minute quiz on Day 1 content; discuss observations" },
        { time: "10:20 – 11:00 AM", activity: "Lecture: Bioelectrical Signals in the Human Body", type: "lecture", detail: "ECG, EEG, EMG fundamentals; how the heart generates electrical signals" },
        { time: "11:00 – 11:50 AM", activity: "Lab: ECG Recording & Analysis", type: "lab", detail: "Attach electrodes; record 12-lead ECG on volunteers; measure heart rate; identify P, QRS, T waves" },
        { time: "11:50 AM – 12:00 PM", activity: "Refreshment Break", type: "break", detail: "Tea & light snacks" },
        { time: "12:00 – 12:45 PM", activity: "Demo: Biosensor Technology", type: "demo", detail: "SpO₂ sensor, temperature sensor, skin conductance demo; understand transducer principles" },
        { time: "12:45 – 1:00 PM", activity: "Day Debrief & Q&A", type: "activity", detail: "Journal entry; group discussion on clinical significance of ECG" },
      ],
      outcome: "Students record real ECG traces, identify cardiac waveforms, and understand how biological signals are captured by sensors.",
    },
    {
      num: "03",
      title: "From Signal to Circuit",
      subtitle: "Electronics & Amplifier Design",
      color: "linear-gradient(135deg, #f59e0b, #b45309)",
      sessions: [
        { time: "10:00 – 10:20 AM", activity: "Recap: Biosignals Review", type: "activity", detail: "Peer teaching — students explain ECG concepts to each other" },
        { time: "10:20 – 11:00 AM", activity: "Lecture: Biomedical Circuit Design", type: "lecture", detail: "Op-amp basics, instrumentation amplifier, noise filtering in medical devices" },
        { time: "11:00 – 11:50 AM", activity: "Lab: Build an Instrumentation Amplifier", type: "lab", detail: "Breadboard wiring; connect INA128 chip; test with low-voltage signal; measure gain on oscilloscope" },
        { time: "11:50 AM – 12:00 PM", activity: "Refreshment Break", type: "break", detail: "Tea & light snacks" },
        { time: "12:00 – 12:45 PM", activity: "Lab: Connect Sensor to Amplifier", type: "lab", detail: "Interface ECG electrodes with amplifier circuit; observe signal on oscilloscope; adjust gain" },
        { time: "12:45 – 1:00 PM", activity: "Day Debrief & Q&A", type: "activity", detail: "Circuit troubleshooting discussion; journal entry on today's build" },
      ],
      outcome: "Students wire a functional instrumentation amplifier and connect it to biological sensors — bridging biology and electronics.",
    },
    {
      num: "04",
      title: "Code Meets Biology",
      subtitle: "Arduino, MATLAB & Signal Visualization",
      color: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
      sessions: [
        { time: "10:00 – 10:20 AM", activity: "Recap: Circuit Review", type: "activity", detail: "Live debugging session; students fix each other's circuits" },
        { time: "10:20 – 11:00 AM", activity: "Lecture: Embedded Systems for Healthcare", type: "lecture", detail: "Arduino platform, IoT in medicine, real-time data acquisition" },
        { time: "11:00 – 11:50 AM", activity: "Lab: Arduino Programming", type: "lab", detail: "Write sketch to read analog sensor; display on serial monitor; control LED with biosignal threshold" },
        { time: "11:50 AM – 12:00 PM", activity: "Refreshment Break", type: "break", detail: "Tea & light snacks" },
        { time: "12:00 – 12:45 PM", activity: "Lab: MATLAB Signal Visualization", type: "lab", detail: "Import ECG data; plot waveforms; apply digital filter; compute heart rate variability metrics" },
        { time: "12:45 – 1:00 PM", activity: "Day Debrief & Project Briefing", type: "activity", detail: "Introduce Day 5 Innovation Challenge; form teams" },
      ],
      outcome: "Students program an Arduino to acquire sensor data and use MATLAB to visualize and analyze biological signals.",
    },
    {
      num: "05",
      title: "Innovation & Celebration",
      subtitle: "AI in Healthcare + Certificate Ceremony",
      color: "linear-gradient(135deg, #10b981, #059669)",
      sessions: [
        { time: "10:00 – 10:30 AM", activity: "AI in Healthcare — Demo & Discussion", type: "demo", detail: "AI-based ECG diagnosis demo; ML model for disease prediction; discuss ethical AI in medicine" },
        { time: "10:30 – 11:45 AM", activity: "Innovation Challenge Presentations", type: "activity", detail: "Teams present a 5-minute solution to a real-world biomedical problem using workshop concepts" },
        { time: "11:45 AM – 12:00 PM", activity: "Refreshment Break", type: "break", detail: "Tea & light snacks" },
        { time: "12:00 – 12:30 PM", activity: "Faculty Feedback & Career Guidance", type: "lecture", detail: "B.Tech BME programs, research opportunities, GATE, international pathways" },
        { time: "12:30 – 1:00 PM", activity: "Certificate Distribution Ceremony", type: "ceremony", detail: "Certificates awarded to all participants by faculty; group photograph; feedback forms" },
      ],
      outcome: "Students showcase their innovation, receive certificates, and leave with a clear understanding of careers in biomedical engineering.",
    },
  ];

  const badgeClass = { lab: "badge-lab", lecture: "badge-lecture", break: "badge-break", demo: "badge-demo", activity: "badge-activity", ceremony: "badge-ceremony" };

  let html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
  <title>Detailed Schedule – From Cells to Circuits 2026</title>
  <style>${BASE_CSS}</style></head><body>
  ${universityHeader("Detailed Workshop Schedule", "From Cells to Circuits | 5-Day Biomedical Engineering Workshop | July 7–11, 2026")}
  <div class="content">
    <div class="note-box">
      <strong>📌 Important Note:</strong> All sessions are held daily from <strong>10:00 AM to 1:00 PM</strong>.
      Participants are requested to arrive by 9:50 AM. Lab coats and ID cards must be worn in all laboratory sessions.
      All materials, lab consumables, and refreshments are provided. Please carry a notebook and pen each day.
    </div>
    <div class="info-grid">
      <div class="info-card">
        <div class="info-card-label">Workshop Duration</div>
        <div class="info-card-value">7 – 11 July 2026 (5 Days)</div>
      </div>
      <div class="info-card">
        <div class="info-card-label">Daily Timings</div>
        <div class="info-card-value">10:00 AM – 1:00 PM</div>
      </div>
      <div class="info-card">
        <div class="info-card-label">Venue</div>
        <div class="info-card-value">BME Labs, Block — 5, Shobhit University</div>
      </div>
      <div class="info-card">
        <div class="info-card-label">Eligibility</div>
        <div class="info-card-value">Class XII Science Students (PCB / PCM)</div>
      </div>
    </div>`;

  days.forEach((day, idx) => {
    if (idx === 3) html += `<div class="page-break"></div>`;
    html += `
    <div class="day-card">
      <div class="day-header" style="background: ${day.color}">
        <div class="day-number">Day ${day.num}</div>
        <div>
          <div class="day-title">${day.title}</div>
          <div class="day-subtitle">${day.subtitle}</div>
        </div>
        <div style="margin-left: auto; font-size: 9px; opacity: 0.85;">📅 ${["Tue, 7 Jul","Wed, 8 Jul","Thu, 9 Jul","Fri, 10 Jul","Sat, 11 Jul"][idx]} 2026</div>
      </div>
      <table class="schedule-table">
        <thead><tr><th style="width:110px">Time</th><th style="width:160px">Activity</th><th>Details</th><th style="width:70px">Type</th></tr></thead>
        <tbody>
          ${day.sessions.map(s => `
          <tr>
            <td class="time-cell">${s.time}</td>
            <td class="activity-cell">${s.activity}</td>
            <td style="color:#475569">${s.detail}</td>
            <td><span class="type-badge ${badgeClass[s.type]}">${s.type.charAt(0).toUpperCase()+s.type.slice(1)}</span></td>
          </tr>`).join("")}
        </tbody>
      </table>
      <div class="outcome-bar">
        <span class="outcome-icon">🎯</span>
        <span><strong>Day Outcome:</strong> ${day.outcome}</span>
      </div>
    </div>`;
  });

  html += `
    <div class="note-box" style="margin-top:16px">
      <strong>📋 What to Bring Each Day:</strong> College/school ID card · Lab coat (available at campus if needed) ·
      Notebook &amp; pen · Water bottle · Comfortable footwear<br/>
      <strong>✅ What Is Provided:</strong> Lab consumables · Reference materials · Refreshments · Lab coat (if needed)
    </div>
  </div>
  <div class="pdf-footer">
    <strong>School of Biomedical Engineering &amp; Health Sciences</strong> · Shobhit Institute of Engineering &amp; Technology (Deemed-to-be University)<br/>
    NH-58, Modipuram, Meerut – 250110, UP · 📧 biomedical@shobhituniversity.ac.in · 📞 +91-121-2575091
  </div>
  </body></html>`;
  return html;
}

// ─── Preparation Guide PDF content ───────────────────────────────────────────
function prepGuideHTML() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
  <title>Preparation Guide – From Cells to Circuits 2026</title>
  <style>
    ${BASE_CSS}
    .topic-card {
      border: 1px solid #e2e8f0; border-radius: 8px;
      overflow: hidden; margin-bottom: 14px;
      page-break-inside: avoid;
      box-shadow: 0 1px 4px rgba(0,0,0,0.07);
    }
    .topic-header {
      padding: 9px 14px; color: white;
      display: flex; align-items: center; gap: 10px;
      font-weight: 700; font-size: 12px;
    }
    .topic-body { padding: 12px 14px; }
    .concept-list { list-style: none; padding: 0; }
    .concept-list li {
      padding: 5px 0; border-bottom: 1px solid #f1f5f9;
      font-size: 10px; color: #334155;
      display: flex; gap: 8px; align-items: flex-start;
    }
    .concept-list li:last-child { border-bottom: none; }
    .concept-check { color: #0ea5e9; font-size: 12px; margin-top: -1px; flex-shrink: 0; }
    .sub-label {
      font-size: 8.5px; font-weight: 700; color: #64748b;
      text-transform: uppercase; letter-spacing: 0.5px;
      margin: 8px 0 4px; border-top: 1px solid #f1f5f9; padding-top: 6px;
    }
    .resource-pill {
      display: inline-block; background: #f0f9ff; border: 1px solid #bae6fd;
      color: #0369a1; border-radius: 12px; padding: 3px 9px;
      font-size: 9px; font-weight: 600; margin: 2px;
    }
    .tip-box {
      background: #f0fdf4; border: 1px solid #86efac;
      border-radius: 6px; padding: 10px 14px; margin: 8px 0;
      font-size: 10px; color: #166534;
    }
    .warn-box {
      background: #fff7ed; border: 1px solid #fed7aa;
      border-radius: 6px; padding: 10px 14px; margin: 8px 0;
      font-size: 10px; color: #9a3412;
    }
    .checklist-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 8px 0;
    }
    .checklist-item {
      display: flex; align-items: flex-start; gap: 6px;
      font-size: 10px; padding: 6px 10px;
      background: #f8fafc; border-radius: 5px;
      border: 1px solid #e2e8f0;
    }
    .check-box {
      width: 14px; height: 14px; border: 1.5px solid #0ea5e9;
      border-radius: 3px; flex-shrink: 0; margin-top: 1px;
    }
  </style></head><body>
  ${universityHeader("Student Preparation Guide", "From Cells to Circuits | Biomedical Engineering Workshop | July 7–11, 2026")}
  <div class="content">

    <div class="note-box">
      <strong>📌 Dear Participant,</strong> Welcome to the <strong>From Cells to Circuits</strong> workshop!
      This guide will help you prepare for 5 days of exciting hands-on learning.
      You do <strong>NOT</strong> need any prior knowledge — everything will be taught from scratch.
      However, reviewing these basics will make your experience richer and more enjoyable.
    </div>

    <!-- ── Day-wise prep ── -->
    <div class="section-title">What to Review — Day by Day</div>

    <!-- Day 1 -->
    <div class="topic-card">
      <div class="topic-header" style="background: linear-gradient(135deg, #0ea5e9, #0284c7)">
        <span style="font-size:18px">🧫</span>
        <div>
          <div>Day 1 Prep: Cell Biology &amp; Microscopy</div>
          <div style="font-size:9.5px;font-weight:400;opacity:0.88">Estimated prep time: 30–40 minutes</div>
        </div>
      </div>
      <div class="topic-body">
        <ul class="concept-list">
          <li><span class="concept-check">▸</span><span><strong>Cell structure:</strong> Know the difference between animal and plant cells. Review the functions of nucleus, mitochondria, cell membrane, and cytoplasm.</span></li>
          <li><span class="concept-check">▸</span><span><strong>Microscopy basics:</strong> Understand what a compound microscope is. Know the terms: objective lens, eyepiece, magnification, focal length.</span></li>
          <li><span class="concept-check">▸</span><span><strong>Blood composition:</strong> Review what blood is made of — plasma, RBC, WBC, platelets. Know what blood groups are (ABO system).</span></li>
          <li><span class="concept-check">▸</span><span><strong>Antisera &amp; agglutination:</strong> Understand why mixing wrong blood groups causes clumping (agglutination). This is the basis of the blood grouping experiment.</span></li>
        </ul>
        <div class="sub-label">Helpful search topics:</div>
        <span class="resource-pill">Cell organelles class 11</span>
        <span class="resource-pill">How to use a microscope</span>
        <span class="resource-pill">ABO blood group system</span>
        <span class="resource-pill">What is agglutination</span>
      </div>
    </div>

    <!-- Day 2 -->
    <div class="topic-card">
      <div class="topic-header" style="background: linear-gradient(135deg, #ec4899, #be185d)">
        <span style="font-size:18px">❤️</span>
        <div>
          <div>Day 2 Prep: Biosignals &amp; ECG</div>
          <div style="font-size:9.5px;font-weight:400;opacity:0.88">Estimated prep time: 30–40 minutes</div>
        </div>
      </div>
      <div class="topic-body">
        <ul class="concept-list">
          <li><span class="concept-check">▸</span><span><strong>The heart's electrical system:</strong> The heart generates electrical pulses with each beat. The sinoatrial (SA) node is the natural pacemaker. This signal travels through the AV node and Purkinje fibres.</span></li>
          <li><span class="concept-check">▸</span><span><strong>What is an ECG?</strong> An electrocardiogram (ECG/EKG) records the electrical activity of the heart over time, captured using electrodes placed on the skin.</span></li>
          <li><span class="concept-check">▸</span><span><strong>P-QRS-T wave:</strong> Each heartbeat produces a specific waveform. The P wave = atrial contraction; QRS complex = ventricular contraction; T wave = ventricular relaxation.</span></li>
          <li><span class="concept-check">▸</span><span><strong>Electrodes &amp; leads:</strong> Standard 12-lead ECG placement — understand that leads are different viewpoints of the same electrical signal, not separate sensors.</span></li>
        </ul>
        <div class="sub-label">Helpful search topics:</div>
        <span class="resource-pill">How does ECG work</span>
        <span class="resource-pill">ECG P QRS T wave explained</span>
        <span class="resource-pill">Cardiac electrical conduction system</span>
      </div>
    </div>

    <!-- Day 3 -->
    <div class="topic-card page-break">
      <div class="topic-header" style="background: linear-gradient(135deg, #f59e0b, #b45309)">
        <span style="font-size:18px">⚡</span>
        <div>
          <div>Day 3 Prep: Electronics &amp; Circuits</div>
          <div style="font-size:9.5px;font-weight:400;opacity:0.88">Estimated prep time: 30–40 minutes</div>
        </div>
      </div>
      <div class="topic-body">
        <ul class="concept-list">
          <li><span class="concept-check">▸</span><span><strong>Basic electronics:</strong> Understand Ohm's Law (V = IR). Know what resistors, capacitors, and op-amps do in a circuit. Understand voltage and current.</span></li>
          <li><span class="concept-check">▸</span><span><strong>Breadboard:</strong> A breadboard is a reusable circuit assembly tool. Understand the layout — horizontal power rails and vertical component rows.</span></li>
          <li><span class="concept-check">▸</span><span><strong>Amplification:</strong> Biological signals are very weak (microvolts). An amplifier increases signal strength. An instrumentation amplifier has high input impedance and rejects noise.</span></li>
          <li><span class="concept-check">▸</span><span><strong>Signal noise:</strong> EMI (electromagnetic interference) can corrupt biosignals. Filters remove unwanted frequencies. Know low-pass vs high-pass filters conceptually.</span></li>
        </ul>
        <div class="sub-label">Helpful search topics:</div>
        <span class="resource-pill">Ohm's Law explained</span>
        <span class="resource-pill">What is an op-amp amplifier</span>
        <span class="resource-pill">How to use a breadboard</span>
        <span class="resource-pill">Instrumentation amplifier basics</span>
      </div>
    </div>

    <!-- Day 4 -->
    <div class="topic-card">
      <div class="topic-header" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9)">
        <span style="font-size:18px">💻</span>
        <div>
          <div>Day 4 Prep: Arduino &amp; MATLAB</div>
          <div style="font-size:9.5px;font-weight:400;opacity:0.88">Estimated prep time: 30–40 minutes</div>
        </div>
      </div>
      <div class="topic-body">
        <ul class="concept-list">
          <li><span class="concept-check">▸</span><span><strong>What is Arduino?</strong> A microcontroller board that can read sensor data and control outputs. It uses a simplified version of C++. No prior coding experience needed.</span></li>
          <li><span class="concept-check">▸</span><span><strong>Analog vs Digital signals:</strong> Biological signals are analog (continuous). Arduino reads analog values (0–1023) via its ADC pins. Digital = on/off only.</span></li>
          <li><span class="concept-check">▸</span><span><strong>What is MATLAB?</strong> A mathematical computing software. We'll use it to plot ECG data and apply digital filters. Think of it as a powerful scientific calculator with graphs.</span></li>
          <li><span class="concept-check">▸</span><span><strong>Data visualization:</strong> How graphs help doctors — a waveform on a computer screen replaces a paper strip. Real-time plotting of biosignals is the foundation of patient monitoring.</span></li>
        </ul>
        <div class="sub-label">Helpful search topics:</div>
        <span class="resource-pill">Arduino for beginners</span>
        <span class="resource-pill">What is MATLAB used for</span>
        <span class="resource-pill">Analog vs digital signals</span>
      </div>
    </div>

    <!-- Day 5 -->
    <div class="topic-card">
      <div class="topic-header" style="background: linear-gradient(135deg, #10b981, #059669)">
        <span style="font-size:18px">🤖</span>
        <div>
          <div>Day 5 Prep: AI in Healthcare</div>
          <div style="font-size:9.5px;font-weight:400;opacity:0.88">Estimated prep time: 20–30 minutes</div>
        </div>
      </div>
      <div class="topic-body">
        <ul class="concept-list">
          <li><span class="concept-check">▸</span><span><strong>AI &amp; Machine Learning basics:</strong> Understand that AI learns patterns from data. In medicine, AI can detect diseases from images, sounds, and signals faster than humans in some cases.</span></li>
          <li><span class="concept-check">▸</span><span><strong>AI in ECG analysis:</strong> Modern AI can detect arrhythmias, heart attacks, and other cardiac conditions from ECG waveforms. These tools assist (not replace) doctors.</span></li>
          <li><span class="concept-check">▸</span><span><strong>Think of a problem:</strong> For the Day 5 Innovation Challenge, think about a real-world health problem you'd like to solve using technology. Prepare a brief idea to discuss with your team.</span></li>
        </ul>
        <div class="sub-label">Helpful search topics:</div>
        <span class="resource-pill">AI in healthcare examples</span>
        <span class="resource-pill">Machine learning for beginners</span>
        <span class="resource-pill">Wearable health devices</span>
      </div>
    </div>

    <!-- ── General tips ── -->
    <div class="section-title">General Tips for the Workshop</div>

    <div class="tip-box">
      <strong>✅ Do:</strong> Come with an open mind. Ask questions — faculty encourage curiosity.
      Take notes. Work in teams and help classmates. Document your lab observations.
    </div>
    <div class="warn-box">
      <strong>⚠️ Lab Safety Rules:</strong> No food or drinks inside the lab. Always wear your lab coat.
      Handle glass slides and sharp instruments with care. Report any spillage immediately to the instructor.
      Do not touch electrical circuits while the power is on.
    </div>

    <!-- ── Pre-workshop checklist ── -->
    <div class="section-title">Pre-Workshop Checklist</div>
    <div class="checklist-grid">
      ${[
        "Registration form submitted",
        "College ID card / Aadhar copy ready",
        "Lab coat arranged (or request at venue)",
        "Notebook &amp; pen packed",
        "Read Day 1 &amp; Day 2 prep topics",
        "Comfortable closed-toe footwear",
        "Water bottle",
        "WhatsApp group joined for updates",
      ].map(item => `
        <div class="checklist-item">
          <div class="check-box"></div>
          <span>${item}</span>
        </div>`).join("")}
    </div>

    <!-- ── Contact ── -->
    <div class="note-box" style="margin-top:14px">
      <strong>📞 Queries?</strong> WhatsApp our coordinator or email us — we respond within 24 hours.<br/>
      📧 biomedical@shobhituniversity.ac.in &nbsp;|&nbsp; 📱 Join our WhatsApp group for instant updates
    </div>

  </div>
  <div class="pdf-footer">
    <strong>School of Biomedical Engineering &amp; Health Sciences</strong> · Shobhit Institute of Engineering &amp; Technology (Deemed-to-be University)<br/>
    NH-58, Modipuram, Meerut – 250110, UP · 📧 biomedical@shobhituniversity.ac.in · 📞 +91-121-2575091<br/>
    <em>From Cells to Circuits Workshop — July 2026</em>
  </div>
  </body></html>`;
}

// ─── Main: generate both PDFs ─────────────────────────────────────────────────
async function main() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--font-render-hinting=none",   // sharper font rendering
    ],
  });

  const page = await browser.newPage();

  // High-DPI viewport: A4 at ~150 DPI → 1240 × 1754 px, scale ×2 for crisp images
  await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 2 });

  const PDF_OPTIONS = {
    format: "A4",
    printBackground: true,
    margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
    // Page content already has internal padding; header/footer are full-bleed
  };

  // ── Schedule PDF ──
  console.log("Generating Detailed Schedule PDF…");
  await page.setContent(scheduleHTML(), { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.pdf({ ...PDF_OPTIONS, path: join(OUT_DIR, "schedule.pdf") });
  console.log("✓  schedule.pdf saved");

  // ── Preparation Guide PDF ──
  console.log("Generating Preparation Guide PDF…");
  await page.setContent(prepGuideHTML(), { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.pdf({ ...PDF_OPTIONS, path: join(OUT_DIR, "preparation-guide.pdf") });
  console.log("✓  preparation-guide.pdf saved");

  await browser.close();
  console.log("\nDone! Both PDFs are in public/downloads/");
}

main().catch(err => { console.error(err); process.exit(1); });
