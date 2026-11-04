---
name: interview-prep-guide
description: "Generate a comprehensive, print-ready interview preparation guide for a single job application. Triggered after a resume has been tailored and submitted. Takes the job description, the tailored resume submitted, company name, role title, and optionally the interview round type. Cross-references all materials, researches the company live, and produces a structured PDF guide covering: company cheat sheet, why this company/role, tell me about yourself, top 15 questions to master, technical questions, architecture/system design scenarios, behavioral questions, resume challenge questions, questions to ask the interviewer, a story bank drawn from real experience, gap analysis, and a final interview checklist. Use this skill whenever the user says they got a call, received an interview invite, wants to prep for an interview, or explicitly asks for an interview prep guide."
---

# Interview Prep Guide Skill

Generate one deep, print-ready interview preparation PDF for a single company and role. This skill fires **after application** - the resume has already been tailored and submitted. It is not a resume builder. It is an interview coach.

> **Adapting this skill:** Replace the candidate name, the technology-subsection list in Step 1 (Technical Questions), and the story-pool examples with your own stack and project history before using this for real. The research discipline and question-generation structure are the reusable part.

---

## Inputs required at trigger time

Collect these before starting. If any are missing, ask for them before proceeding.

1. **JD** - paste or URL. If URL, fetch it before analysis.
2. **Tailored resume submitted** - paste the exact resume sent to this company. This is not the master resume.
3. **Company name** - exact name.
4. **Role title** - exact title as posted.
5. **Round type** - recruiter screen / hiring manager / technical / panel / final. If unknown, default to hiring manager.

The master resume lives wherever you keep your profile source material. Locate it at runtime, e.g.:

```bash
ls /path/to/your/*Master_Resume*.docx 2>/dev/null
```

If multiple versions exist, use the one with the highest version number. Use it as background context for the story bank and gap analysis only; the submitted tailored resume is the primary source.

---

## Core principles

- **Never invent.** No fabricated metrics, projects, technologies, or responsibilities. If something cannot be supported by the submitted resume or master resume, say so explicitly and provide an honest bridging response instead.
- **Tailored resume is the primary source.** The interviewer sees the submitted resume - prep must mirror it exactly. The master resume is background context only.
- **Company research is mandatory.** Always run a live web search for current company intel before writing. Do not rely on training data alone for company facts.
- **Answers must sound human.** No corporate fluff, no AI-slop patterns, no memorized STAR scripts. Write as an experienced professional would speak in an actual interview.
- **One company, one guide.** This skill produces one focused document per trigger. Do not combine multiple companies.
- **PDF output only.** Print-ready on standard Letter paper.

---

## Step 1 - Ingest and cross-reference

Before writing a single question, complete this analysis silently:

### 1a. Parse the JD
Extract:
- Role track (adapt to your own target tracks, e.g. Analytics / Data Engineering / Hybrid)
- Top 8–10 keywords: exact tools, skills, and phrases most emphasized
- Seniority signals: scope, team size, stakeholder level, ownership expectations
- Must-haves vs nice-to-haves
- Domain/industry context
- Likely reason this role exists (growth, backfill, new capability, transformation)
- Business problems the hiring manager is probably trying to solve

### 1b. Parse the submitted resume
Map every major bullet and claim to:
- Which JD requirement it satisfies
- What follow-up questions it will provoke
- What metrics or specifics will be challenged
- Which stories from real experience support it

### 1c. Fit matrix (internal - do not print as a table)
Build a mental map of:
- Strong alignment areas (lead with these)
- Partial alignment areas (honest framing needed)
- Genuine gaps (prepare bridging language)

### 1d. Web research
Search for:
- What the company does, its products/services, customers, business model
- Industry and competitive position
- Recent news, announcements, funding rounds, product launches, strategic priorities
- How data, analytics, BI, or AI contributes to their business
- Why this specific role likely exists
- Engineering/data/technology blog posts if available

Use: company official website, careers page, investor relations, engineering blog, recent press releases, LinkedIn company page. Do not fill the guide with generic history facts that would not help in an interview.

Do not start generating questions until Steps 1a–1d are complete.

---

## Step 2 - Document structure

Produce the full guide in this exact order.

---

### Cover page

```
INTERVIEW PREPARATION GUIDE
[Company Name] - [Role Title]
Prepared for: [Your Name]
Round: [Round Type]
Date: [Today's date]
```

---

### How to Use This Guide

Two short paragraphs. Practical instructions: how to study it, what to prioritize, how to use the story bank, what to do the night before.

---

### Company + Role Cheat Sheet

**No tables.** Use clean headings and bullets.

```
Company: [name]
Position: [exact title]
Location: [from JD]
Role Category: [your own track labels]

Why I Am a Fit
[3–4 specific bullets connecting real experience to this JD]

My Strongest 5 Selling Points for This Role
[5 bullets - specific, not generic]

My Top 3 Potential Gaps
[Honest, with bridging language for each]

Technologies Emphasized by This JD
[List from JD parsing]

My Relevant Technologies
[Matching subset from submitted resume]

Most Important Projects to Discuss
[3–5 project names/stories most relevant to this role]

Likely Interview Focus
[What the interviewer will probe hardest based on JD + resume]

My 60–90 Second "Why This Role + Why This Company" Positioning
[Written out in full - specific enough that the company name cannot simply be swapped for another]
```

---

### Top 15 Questions to Master

List the 15 most important questions for this specific role, ordered by priority. These are the ones to absolutely prepare before the interview. Mark each:

**HIGH PRIORITY** - central to JD, likely reason for rejection if unprepared
**MEDIUM PRIORITY** - important but less likely to be a knockout
**LOWER PRIORITY** - good to have, less likely in early rounds

Include a one-line note on why each question is on this list.

---

### Opening Questions

Cover:
- Tell me about yourself / Walk me through your background
- Why are you looking for a new opportunity (frame any gap or layoff positively - factual, forward-looking)
- Why are you interested in this role
- Why this company
- How does your experience prepare you for this position
- Why are you moving from your current title into this role (if title differs)

**Answer format:**

**Short answer** (30–45 seconds) - recruiter screen
**Interview answer** (1–2 minutes) - default, hiring manager or panel
**Deep-dive notes** - additional detail if the interviewer asks follow-up questions

Only produce three versions when the question genuinely benefits from it. Don't manufacture length.

Answers must be specific to this company and role. "Why this company" must connect company + business model + role + the candidate's actual experience. The company name must not be swappable.

---

### Why This Company / Why This Role

Deeper written responses for:
- Why do you want to work here specifically
- What do you know about us
- How do you see your background contributing here
- Why is this role the right next step for you

Answers grounded in the web research from Step 1d and the real experience from the submitted resume.

---

### Job Description Deep Dive - Technical Questions

Turn the JD's specific requirements into targeted technical questions. Only ask about technologies and responsibilities actually in this JD.

For each technical question:
- Write the question in bold
- Provide an answer grounded in what the candidate has actually done
- If a gap exists: (1) acknowledge the boundary honestly, (2) connect to closest real experience, (3) demonstrate conceptual understanding, (4) explain how the candidate would approach it
- Never pretend conceptual knowledge is production experience

Group questions under the technology categories that match your own stack - adapt the subsection headers to whatever you actually work in (for example: BI/visualization tools, a data warehouse, data engineering concepts, SQL, a scripting language, AI-enabled analytics, data governance, core analytics skills). Replace the generic categories here with your real tool list before using this skill.

Mark each question HIGH / MEDIUM / LOWER PRIORITY.

---

### Architecture / System Design Questions

For senior or lead-level roles, include 3–5 realistic design scenarios customized to this company's actual domain.

For each scenario: provide a structured answer walking through the design decisions the candidate would actually make, grounded in real experience. Call out where experience is direct vs conceptual.

---

### Behavioral Questions

Cover:
- Building something from scratch / founding a practice
- Stakeholder management (difficult, executive, conflicting priorities)
- Production incidents / quality issues
- Mentoring and team building
- Influencing without authority
- Ambiguous requirements
- Tight deadlines
- Migration projects
- Driving adoption
- Mistakes and what was learned
- Cross-functional projects

For each: write a natural Situation → Challenge → Action → Result response using real experience. Do not make answers sound like memorized STAR templates. Vary sentence structure. Let the story flow.

Mark HIGH / MEDIUM / LOWER PRIORITY.

---

### Resume Challenge Questions

Act as a skeptical hiring manager. Identify every area of the submitted resume that could be challenged. Prepare fact-based, honest responses.

Common challenge areas to cover (adapt to your own resume):
- Title vs seniority
- Personal contribution vs team contribution on large projects
- Architecture vs development distinction
- Hands-on depth in any tool claimed
- Specific quantified claims: adoption numbers, user counts, migration scope, business impact
- Depth of any AI/automation tooling claimed - what is production vs experimental

For each challenge: provide a credible, factual answer. Do not hide gaps. Do not try to spin gaps into strengths - acknowledge honestly and pivot to adjacent real experience.

---

### Likely Follow-Up Questions on Resume Bullets

For every major quantified bullet in the submitted resume, prepare follow-up probes:
- What was the context
- How was it measured
- What was the candidate's personal contribution
- What was the technical implementation
- What were the challenges
- What would the candidate do differently

This section makes sure no number on the resume goes undefended.

---

### Questions I Should Ask the Interviewer

Produce 5–8 strong questions per interview type. Separate by:

**Hiring Manager Questions**
**Technical Interviewer Questions**
**Leadership / Final Round Questions**

Questions should demonstrate seniority and genuine curiosity. Cover themes like:
- Current architecture and stack maturity
- Biggest problems the team is solving right now
- Data ownership and governance model
- Roadmap for the next 12 months
- Team structure and engineering practices
- Definition of success in the first 6 months
- AI strategy and current adoption
- Technical debt and modernization priorities
- Stakeholder relationships and how the data team is perceived

Avoid questions whose answers are on the company homepage.

---

### Last-Minute Interview Review

One page. The night-before checklist:
- 5 key points to remember about this company
- 3 stories to have ready
- 2 gaps to handle honestly if raised
- 1 thing that makes the candidate's background genuinely differentiated for this role
- Logistics reminders (round type, who you're meeting if known, format)

---

### Interview Story Bank

Identify 10–15 strong stories from the candidate's real experience that can flex across multiple behavioral questions. Draw from both submitted resume and master resume.

For each story:

```
Story title: [short memorable label]
Situation: [context - company, team, problem]
Challenge: [what made it hard]
What I personally did: [specific actions - be exact about personal contribution vs team]
Technologies involved: [tools used]
Result: [outcome with numbers where real]
Questions this story answers: [list of behavioral/situational questions this covers]
```

Prioritize stories that cover multiple question types. Build your own story pool from your real project history - the goal is 10-15 stories that between them cover: building something from scratch, a migration or technical transition under deadline pressure, a differentiating technical build (your strongest market differentiator), a production incident or data-quality catch, a stakeholder or executive delivery story, and a hiring/process story if applicable.

Include only stories supported by the provided materials. Do not invent.

---

### Common Technical Topics to Review

Based on this JD, list the technical topics most likely to come up. Group by:

**Must Study** - likely to be tested, could be a rejection reason if unprepared
- Specific topics with a 3–5 point study checklist each

**Refresh** - candidate has experience but should review details before the interview
- Specific topics with a 2–3 point refresh checklist

**Conceptual Understanding Is Enough** - may come up but production depth is not expected
- Topics with a brief "what to be able to say" note

Be honest about which bucket each topic falls in based on the candidate's actual background.

---

### Areas I Need to Study Before This Interview

Final section. Be direct. Call out the real gaps for this specific role.

Format:
- Gap name
- Why it matters for this role
- What to do about it (honest - study, acknowledge and bridge, or deprioritize)
- Time estimate to reach minimum viable interview readiness

Do not list every possible gap - only the ones that could materially affect the outcome of this specific interview.

---

### Final Interview Checklist

Simple numbered list. Day-of and night-before actions. Include:
- Review the cheat sheet
- Review the top 15 questions
- Practice the 60–90 second opener out loud
- Have 3 stories ready verbally
- Prepare honest gap bridges for known weaknesses
- Know the company's core product and recent news
- Prepare smart questions for the interviewer
- Confirm round format, interviewer name/title if known
- Logistics (link, time zone, backup contact)

---

## Step 3 - Answer quality standards

Answers must sound like an experienced professional speaking naturally. Apply the same humanize standards used in the resume-tailor-and-build skill throughout:

**Never use:**
- leverage, utilize, spearhead, champion, robust, seamless, holistic, cutting-edge
- passionate, driven, results-oriented, dynamic
- delve, foster, empower, elevate, unlock
- pivotal, crucial, meticulous, testament, underscore
- "I hope this helps", "Let me know if you need anything else"
- Em dashes anywhere
- Bullet-only responses where prose would sound more human
- Memorized-sounding STAR openers ("Situation: I was working at...")

**Always use:**
- Direct language
- Concrete examples with specific technologies named
- Real project details
- Numbers where genuinely supported
- Natural transitions
- Technical depth appropriate to the seniority of the role
- Plain professional register - how the candidate would actually speak in an interview

**Never invent:**
- Technologies not in the resume
- Projects not in the resume
- Metrics not in the resume
- Management experience the candidate does not have
- Architecture ownership beyond what is honestly supported
- Production experience with tools only known conceptually

If something cannot be supported, say: *"Not directly demonstrated in the provided materials."* Then provide an honest bridging response.

---

## Step 4 - PDF generation

Use your PDF library of choice (reportlab/platypus works well for print-ready layouts).

### Brand standards - read first

Before writing any formatting code, locate and read your brand standards file:

```bash
ls /path/to/templates/brand_standards.md 2>/dev/null
```

Apply all typography, layout, color, bullet, footer, page break, and naming convention rules defined there. The brand standards file is the single source of truth - do not use inline defaults that conflict with it.

### Document-specific footer format

```
Interview Prep | [Company] - [Role] | [Your Name] | Page N of M
```
9pt, centered, on every page.

### Output filename

Follow the naming convention in your brand standards file, typically:
```
[LastName]_InterviewPrep_[CompanyName]_[RoleSlug].pdf
```

### Pre-delivery visual QA

Before presenting the PDF:
1. Render every page to an image at ~125 DPI using your environment's PDF tools
2. Visually inspect each page for:
   - No clipped text at margins
   - No stranded headings at page bottom
   - No overlapping bullets
   - No blank or near-blank pages
   - Logical page breaks
   - Consistent font rendering
   - Footer visible on every page
3. Fix any issues found before delivering

---

## Step 5 - Pre-delivery content QA

Before generating the PDF, verify silently:

- [ ] Every answer is grounded in the submitted resume or master resume
- [ ] No invented technologies, projects, metrics, or responsibilities
- [ ] Company-specific answers are genuinely specific - the company name cannot be swapped for another
- [ ] Technical questions match the actual JD, not generic interview lists
- [ ] Technical depth matches the seniority of the role
- [ ] Gaps are handled honestly with bridging language, not hidden
- [ ] Every "depth" claim (a secondary skill, a borrowed-tool claim, etc.) is honestly represented - flag which tools are genuinely production-depth vs conceptual
- [ ] Story bank entries are factual and personally attributed
- [ ] No em dashes anywhere in the document
- [ ] No AI-slop patterns (see the resume-tailor-and-build skill's humanize list)
- [ ] Answers sound natural when read aloud
- [ ] Document is easy to print, annotate, and study

---

## What this skill does NOT do

- Build or modify resumes (use resume-tailor-and-build for that)
- Cover multiple companies in one run (one company per trigger)
- Fabricate experience to fill gaps
- Replace actual interview practice - the guide is preparation material, not a script
- Guarantee interview outcomes
