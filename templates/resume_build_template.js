// ============================================================================
// RESUME BUILD TEMPLATE (generic / data-driven version)
// ============================================================================
// All formatting is locked in and correct. DO NOT modify the formatting
// functions below - they implement the rules in brand_standards.md.
//
// To build a tailored resume:
//   1. Fill in your own profile.json (copy profile.example.json and replace
//      every field with your real, truthful data).
//   2. Fill in the CONTENT SECTION below for this specific job application:
//      summary, skills, and tailored bullets per role. Pull facts only from
//      your real master resume - never invent a metric, employer, or date.
//   3. Run the em dash check: grep must return 0 before proceeding.
//   4. Run: node build_resume.js
//   5. Convert to PDF, rasterize, visually QA every page, then deliver.
//
// RULES BAKED INTO THIS TEMPLATE:
//   - No subheading function exists. Flat bullets only within roles.
//   - EDUCATION and CERTIFICATIONS are two separate sections. Never merge.
//   - Calibri, 9.5pt body, 18pt name, 11pt headers, brand margins, US Letter.
//     (Match these to your own brand_standards.md if you've customized it.)
//   - If over 2 pages: trim lowest-JD-relevance bullets first,
//     then use age as the tie-breaker. Preserve recent experience
//     when relevance is comparable.
// ============================================================================

const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, LevelFormat, convertInchesToTwip } = require('docx');
const fs = require('fs');

// ── LOAD PROFILE DATA ────────────────────────────────────────────────────
// Point this at your own filled-in profile file. profile.example.json is a
// fictional placeholder - do not ship a resume built from it.
const PROFILE_PATH = process.env.PROFILE_PATH || './profile.json';
const profile = JSON.parse(fs.readFileSync(PROFILE_PATH, 'utf8'));

// ── FORMATTING CONSTANTS (do not change) ────────────────────────────────────
const FONT = 'Calibri';
const LEFT_MARGIN = convertInchesToTwip(0.65);
const RIGHT_MARGIN = convertInchesToTwip(0.65);
const TOP_MARGIN = convertInchesToTwip(0.75);
const BOTTOM_MARGIN = convertInchesToTwip(0.75);
const BODY_SIZE = 19;      // 9.5pt in half-points
const NAME_SIZE = 36;      // 18pt
const SECTION_SIZE = 22;   // 11pt

// ── FORMATTING FUNCTIONS (do not change) ─────────────────────────────────
// Spacing values in twips (1pt = 20 twips).
function namePara(name) {
  return new Paragraph({ children: [new TextRun({ text: name, bold: true, size: NAME_SIZE, font: FONT })], spacing: { after: 40 } });
}
function contactPara(text) {
  return new Paragraph({ children: [new TextRun({ text, size: BODY_SIZE, font: FONT })], spacing: { after: 80 } });
}
function sectionHeader(text, before = 100) {
  return new Paragraph({ children: [new TextRun({ text, bold: true, size: SECTION_SIZE, font: FONT })], spacing: { before, after: 50 }, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '000000' } } });
}
function companyLine(company, dates, location) {
  return new Paragraph({ children: [new TextRun({ text: company, bold: true, size: BODY_SIZE, font: FONT }), new TextRun({ text: `  |  ${dates}  |  ${location}`, size: BODY_SIZE, font: FONT })], spacing: { before: 90, after: 20 } });
}
function roleLine(role) {
  return new Paragraph({ children: [new TextRun({ text: role, italics: true, size: BODY_SIZE, font: FONT })], spacing: { after: 30 } });
}
function techLine(text) {
  return new Paragraph({ children: [new TextRun({ text, italics: true, size: BODY_SIZE, font: FONT })], spacing: { before: 0, after: 60 } });
}
function bullet(text) {
  return new Paragraph({ children: [new TextRun({ text, size: BODY_SIZE, font: FONT })], bullet: { level: 0 }, indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.15) }, spacing: { after: 28 } });
}
function skillLine(label, value) {
  return new Paragraph({ children: [new TextRun({ text: `${label}: `, bold: true, size: BODY_SIZE, font: FONT }), new TextRun({ text: value, size: BODY_SIZE, font: FONT })], spacing: { after: 24 } });
}
function bodyPara(text, after = 60) {
  return new Paragraph({ children: [new TextRun({ text, size: BODY_SIZE, font: FONT })], spacing: { after } });
}
function buildDoc(children) {
  return new Document({
    numbering: { config: [{ reference: 'bullet-numbering', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.15) } }, run: { font: 'Symbol', size: BODY_SIZE } } }] }] },
    sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: TOP_MARGIN, bottom: BOTTOM_MARGIN, left: LEFT_MARGIN, right: RIGHT_MARGIN } } }, children }],
  });
}

// ── DATA-DRIVEN SECTIONS (built from profile.json, not hardcoded) ───────────
function headerBlock() {
  const id = profile.identity;
  return [
    namePara(id.fullName.toUpperCase()),
    contactPara(`${id.positioningTitle}  |  ${id.location}`),
    contactPara(`${id.email}  |  ${id.phone}  |  ${id.linkedinUrl}`),
  ];
}
function eduSection() {
  const lines = profile.education.map((e, i) =>
    bodyPara(`${e.degree}  |  ${e.institution}  |  ${e.date}`, i === profile.education.length - 1 ? 60 : 30)
  );
  return [sectionHeader('EDUCATION'), ...lines];
}
function certSection() {
  const lines = profile.certifications.map((c, i) =>
    bodyPara(`${c.name}  |  ${c.issuer}  |  ${c.date}`, 30)
  );
  return [sectionHeader('CERTIFICATIONS'), ...lines];
}
function experienceBlock(role) {
  const lines = [
    companyLine(role.company, role.dates, role.location),
    roleLine(role.role),
    ...role.bullets.map(bullet),
  ];
  if (role.techStack) lines.push(techLine(`Tech Stack: ${role.techStack}`));
  return lines;
}

// ============================================================================
// CONTENT SECTION - fill in per job application
// ============================================================================
// Employment history itself comes from profile.json (employmentHistory array,
// in the fixed order you set there). Edit the SUMMARY, SKILLS, and each
// role's `bullets` / `techStack` in profile.json (or a per-application copy
// of it) to tailor this build to a specific JD. Do not reorder, rename, or
// drop an employer here - that happens once, in your profile, not per build.
//
// No em dashes in any string. En dashes (–) in date ranges only.
// ============================================================================

const SUMMARY = 'REPLACE: 3 to 4 sentence tailored summary. Open with title and years. Name 2 to 3 strengths matching the JD. No em dashes, no first person openers, no buzzwords.';

const SKILLS = [
  { label: 'REPLACE Category 1', value: 'REPLACE skills, JD priority tools first' },
  { label: 'REPLACE Category 2', value: 'REPLACE skills' },
  { label: 'REPLACE Category 3', value: 'REPLACE skills' },
  { label: 'REPLACE Category 4', value: 'REPLACE skills' },
];

const resume = buildDoc([
  ...headerBlock(),

  sectionHeader('PROFESSIONAL SUMMARY'),
  bodyPara(SUMMARY),

  sectionHeader('CORE SKILLS'),
  ...SKILLS.map(s => skillLine(s.label, s.value)),

  sectionHeader('PROFESSIONAL EXPERIENCE'),
  ...profile.employmentHistory.flatMap(experienceBlock),

  ...eduSection(),
  ...certSection(),
]);

// ── OUTPUT (update filename per role) ───────────────────────────────────────
const OUTPUT_FILE = process.env.OUTPUT_FILE || './Resume_COMPANY_ROLESLUG_v1.docx';
Packer.toBuffer(resume).then(buf => {
  fs.writeFileSync(OUTPUT_FILE, buf);
  console.log('Built: ' + OUTPUT_FILE);
});
