# Job Search Document Brand Standards (Template)

Version: 1.0
Applies to: All PDF and Word documents produced during a job search campaign - tailored resumes, cover letters, interview prep guides, trackers, and any other print-ready deliverables.

> **How to use this file:** Fill in the Identity section with your own details, then point your resume/cover-letter/interview-prep skills at this file as their single source of formatting truth. Everything below the Identity section is a reusable set of formatting rules - keep, loosen, or tighten them to match your own taste, but keep them *consistent* across every document you generate. Consistency, not any specific choice here, is what makes a document pass a recruiter's five-second scan.

---

## Identity

**Full name:** {{YOUR_NAME}}
**Contact line:** {{YOUR_EMAIL}} | {{YOUR_PHONE}} | {{YOUR_LINKEDIN_URL}}
**Location:** {{YOUR_CITY}}, {{YOUR_REGION}}, {{YOUR_COUNTRY}}

---

## Page Setup

**Page size:** US Letter (8.5 × 11 inches)
**Orientation:** Portrait
**Margins:** 1 inch on all four sides (top, bottom, left, right)
**Gutter:** None

For Word/docx documents only:
- Left margin: 0.65 inches
- Right margin: 0.65 inches
- Top margin: 0.75 inches
- Bottom margin: 0.75 inches
- Bullet left indent: 0.25 inches, hanging indent: 0.15 inches

PDF documents use the standard 1-inch margin above.

---

## Typography

### Primary font
**Calibri** - use for Word/docx documents (resume, cover letter).
**Helvetica** - use for PDF documents generated via reportlab. Helvetica is a built-in reportlab font and a safe, close match to Calibri.
Fallback if Helvetica is unavailable: Times-Roman (reportlab built-in).

Never use decorative, condensed, or display fonts. ATS parsers and human reviewers both reward boring, readable fonts.

### Font sizes

| Element | Size | Weight |
|---|---|---|
| Document title / Name heading | 16pt | Bold |
| Section heading (H1) | 13pt | Bold |
| Subsection heading (H2) | 11.5pt | Bold |
| Sub-subsection heading (H3) | 10.5pt | Bold |
| Body text | 10.5pt | Regular |
| Question text (interview prep) | 10.5pt | Bold |
| Priority labels (HIGH / MEDIUM / LOWER) | 9pt | Regular, inline |
| Footer text | 9pt | Regular |
| Bullet text | 10.5pt | Regular |

### Line spacing
- Body text leading: font size × 1.4 minimum (approximately 14.7pt for 10.5pt body)
- Paragraph spacing after: 6pt
- Section heading spacing before: 12pt, after: 6pt
- Do not use double line spacing anywhere

---

## Color

**Philosophy:** Black and white only. No color accents, no shading, no highlighted text. Documents must print cleanly on a standard black-and-white office or home printer, and must not rely on color to carry meaning (some ATS parsers, and plenty of recruiters, print in grayscale).

| Element | Color |
|---|---|
| All body text | Black (#000000) |
| All headings | Black (#000000) |
| Background | White (#FFFFFF) |
| Borders/rules (if used) | Black (#000000), 0.5pt weight |
| Footer text | Dark gray (#333333) acceptable; black preferred |

Never use:
- Colored text
- Colored backgrounds or shading
- Highlighted sections
- Dark or colored header/footer bars
- Watermarks

---

## Layout Rules

**Single column throughout.** No multi-column layouts, no text boxes, no sidebars - these frequently break ATS parsing order.
**Left-aligned throughout.** No centered body text (cover pages excepted). No right-aligned body text. No justified text.
**No tables in narrative documents.** Tables are permitted only in trackers and reference sheets where data comparison is the explicit purpose. Never use a table to create visual columns in a resume, cover letter, or prep guide.
**No graphics.** No logos, icons, progress bars, charts, decorative dividers, or images in any document.
**No headers or footers containing contact info.** Contact information belongs in the document body only (resume, cover letter). Footers are for page numbers and document identity only.

---

## Bullets

**Style:** Standard hyphen-based bullets in docx. In PDF (reportlab), use the built-in bullet character via ListFlowable - never insert a literal bullet character as text.
**Indent:** Consistent with margin settings above. Never manually pad with spaces.
**Length:** Maximum two rendered lines per bullet in resumes. Interview prep guide bullets may run longer where the content requires it.
**No sub-bullets** in resumes or cover letters. Sub-bullets are permitted in interview prep guides for answer deep-dives.
**Verb-first** in resume bullets. No "Responsible for", no "Duties included".
**No period** at the end of resume bullets. Periods are used in full-sentence narrative sections (summaries, cover letters, prep guide answers).

---

## Headers and Footers

### Resume and cover letter (docx)
No footer. No header. Contact information in the document body only.

### Interview prep guide and other PDFs
**Footer on every page:**
```
[Document type] | [Company] - [Role] | {{YOUR_NAME}} | Page N of M
```
Font: 9pt, dark gray, centered.
No header bar. No decorative elements.

### Page numbers
PDF documents: `Page N of M` in the footer, centered.
Word documents: page numbers in footer if document exceeds 2 pages.

---

## Section Dividers

Thin horizontal rule (0.5pt, black) permitted between major sections in PDF documents.
In docx resumes: use bold section headings only - no horizontal rules (they can confuse ATS parsers).
Never use decorative dividers, thick borders, or colored rules.

---

## Page Break Rules

- Never strand a heading alone at the bottom of a page. Use KeepWithNext in reportlab/docx.
- Never split a question from the start of its answer across a page break. Use KeepTogether where feasible.
- Each major section of a multi-company document starts on a new page.
- Avoid page breaks mid-bullet where possible.
- No blank pages. No near-blank pages (less than 3 lines of content on a page).

---

## Bold and Italic Usage

**Bold:** Section headings, subsection headings, question text in prep guides, company names, role titles, key technologies when introducing them for the first time in a section. Use sparingly in body text - only where it genuinely aids navigation.
**Italic:** Role titles in the resume experience section, tech stack lines. Avoid in cover letters and prep guide narrative answers.
**Underline:** Never. Underlines are reserved for hyperlinks.
**All caps:** Never in body text. Acceptable for document-level labels on cover pages only (e.g. INTERVIEW PREPARATION GUIDE).
**Em dashes:** Never. Replace with a comma, colon, period, semicolon, or restructure the sentence. Zero exceptions. (This single rule catches more AI-generated-sounding text than anything else on this page - worth keeping even if you drop everything else here.)
**En dashes:** Use for date ranges (Jun 2024 – Oct 2026) and numeric ranges.

---

## Document Naming Convention

All output files follow this pattern:

```
{{YOUR_LAST_NAME}}_[DocumentType]_[CompanyName]_[RoleSlug]_[Version].[ext]
```

Examples:
```
{{YOUR_LAST_NAME}}_Resume_Affirm_AnalyticsLead_v1.docx
{{YOUR_LAST_NAME}}_InterviewPrep_Affirm_AnalyticsLead.pdf
{{YOUR_LAST_NAME}}_CoverLetter_Stripe_StaffDataAnalyst_v1.docx
```

**Rules:**
- No spaces in filenames - use underscores
- Company name: no spaces, no punctuation (e.g. PetValu not Pet_Valu)
- Role slug: PascalCase, abbreviated to fit (e.g. StaffDA, AnalyticsLead, DataEngineer)
- Version suffix on resumes and cover letters (v1, v2…); omit on prep guides (one per role)
- Extension: .docx for Word documents, .pdf for PDFs

---

## Quality Control Checklist

Run before delivering any document:

### Content
- [ ] No invented metrics, employers, dates, technologies, or responsibilities
- [ ] No em dashes anywhere
- [ ] No AI-slop language (see the resume-tailor-and-build skill's humanize pass for the full list)
- [ ] All quantified claims are supported by real experience
- [ ] No first-person openers in cover letter paragraphs
- [ ] No "I am writing to express my interest"

### Formatting
- [ ] Font is Calibri (docx) or Helvetica (PDF) throughout
- [ ] Margins match this document's specifications
- [ ] No tables in narrative documents
- [ ] No graphics, icons, or decorative elements
- [ ] No colored text or backgrounds
- [ ] Single column layout throughout
- [ ] Left-aligned throughout
- [ ] Footer present and correct on every page (PDF only)
- [ ] Page numbers correct

### Print readiness (PDF)
- [ ] Rendered at ~125 DPI and visually inspected page by page
- [ ] No clipped text at margins
- [ ] No stranded headings at page bottom
- [ ] No overlapping bullets
- [ ] No blank or near-blank pages
- [ ] Logical page breaks throughout
- [ ] Fonts render correctly
- [ ] Document prints cleanly on Letter paper

---

## How skills should use this file

Every skill that produces a PDF or Word document should:

1. Locate this file at runtime (adjust the path to wherever you keep it, e.g. a project knowledge folder).
2. Read it in full before writing any formatting code.
3. Apply all relevant sections. Do not use inline formatting defaults that conflict with this file.
4. If this file cannot be found, fall back to the defaults embedded in this document.
5. Never override brand standards based on an in-the-moment request for "fancier" formatting without flagging the conflict first. Consistency across every document in your search is the actual point.
