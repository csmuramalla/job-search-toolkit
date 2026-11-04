---
name: resume-tailor-and-build
description: "End-to-end resume tailoring and DOCX build. JD is always pasted by the user. Covers JD requirement mapping, content tailoring, humanize pass, truth check, DOCX build via template, pre-build checks, visual QA, and delivery."
---

# Resume Tailor and Build

One skill. Full workflow. No iterating mid-build.

The primary mistake that burns session context is writing content first and checking rules afterward. This skill reverses that: rules are confirmed before content is written, and the build runs once.

> **Adapting this skill:** This version is genericized from a working personal setup. Fill in `profile.example.json` with your own work history, then point the steps below at your own master resume and brand standards file instead of the placeholder paths. The structure, the humanize pass, and the truth-check discipline are the reusable part - your facts are not in this file.

---

## Source-of-truth hierarchy

1. **Master Resume** controls all factual claims: experience, metrics, technologies, dates, education, certifications. Nothing factual is invented or imported from any other source.
2. **User corrections in the current conversation** override the Master Resume when explicitly stated.
3. **The JD** controls relevance and terminology only, never facts.
4. **This skill** controls selection, rewriting, formatting, and delivery.
5. **Previous tailored resumes** are examples only and are never factual authorities. Do not copy content from old tailored resumes because it sounded relevant.

---

## Before anything else

Read these files before starting:

```bash
# Resolve to the highest version of your master resume dynamically
cat $(ls /path/to/your/*Master_Resume*.docx | sort -V | tail -1)
cat /path/to/your/brand_standards.md
```

If your master resume is stored as a plain-text file with a `.docx` extension, read it with `cat`, not a binary parser.

---

## Step 1: JD requirement map (internal, before writing anything)

The user pastes the JD. Before writing any content, classify it internally:

**Primary requirements:** must-have skills, tools, and responsibilities the JD emphasizes most heavily.
**Secondary requirements:** nice-to-haves, useful differentiators, bonus qualifications.
**Unsupported requirements:** genuine gaps where the candidate has no matching experience. Name them plainly.
**Evidence map:** for each primary and secondary requirement, identify which specific master resume bullet(s) demonstrate it.

This map drives everything that follows. Do not write the summary or select bullets without completing it first.

---

## Step 2: Lock in content rules before writing a single word

Read this section in full before opening the build script.

### What is never allowed

**Em dashes:** zero, anywhere. Not in summaries, bullets, tech stack lines, or cover letters. Replace with:
- Comma: "the tool, which ran hourly"
- Colon: "the result: zero outages"
- Period or restructured sentence where needed

En dashes (–) for date ranges are correct and required.

**Subheadings within experience roles:** none. Flat bullet list only under each role.

**Invented content:** no new metrics, employers, dates, tools, or responsibilities.

**First-person openers in summaries:** no "I am a..." or "I bring..." to open a paragraph.

**Internal level codes:** never use IC4, IC5, or similar. Market-equivalent titles only.

**Client names:** never name clients if your master resume keeps them anonymized. Use "a major investment bank," "a leading FMCG retailer," "a global e-commerce platform," etc. - whatever genericization your own master resume already applies.

### Mirroring JD language

Semantic equivalence is allowed. Technology equivalence is not.

**Allowed:** JD says "data modelling"; master resume demonstrates warehouse data modelling. Use "data modelling."
**Not allowed:** JD says "dbt"; master resume has no dbt experience. Do not substitute adjacent tool work and imply dbt.

If the JD requires a tool the candidate lacks, note it in the gaps. Never imply competence that does not exist.

### Keyword stuffing

Do not repeat a JD keyword unnaturally across summary, skills, and multiple bullets solely for ATS optimization. Include terminology where it naturally describes verified experience.

### Section structure rules

**EDUCATION and CERTIFICATIONS are always two separate section headers.** Never merge them.

### Title rule for current role

Decide your own market-positioning title format up front and apply it consistently, e.g.:
**Header/contact line positioning title:** market-equivalent title
**Inside experience section:** market-equivalent title (official internal title in parentheses)

### Employment history order

Fix an explicit chronological order for your real employment history before the first build, and treat it as immutable across every tailored version - never silently drop or reorder an employer between runs.

### Trimming for space

Two-page max (adjust to your own target length if different). When content exceeds the limit:

**Trim lowest-JD-relevance content first, with age used as the tie-breaker.** Preserve recent experience whenever relevance is comparable. An older bullet can be more relevant than a recent one for certain roles. Do not blindly remove by age alone.

Never collapse or merge section headers to save space.

---

## Step 3: Tailor the content

### Summary (3–4 sentences)
- Open with role title and years of experience
- Name 2–3 core strengths that match the JD's primary requirements directly
- Reference specific value delivered: domain, scale, stakeholder level
- Close with a forward-looking sentence tied to what this role needs
- No em dashes. No first-person openers. No buzzwords.

### Experience bullets

**Selection:** use the evidence map from Step 1. Pull master resume bullets that demonstrate primary and secondary JD requirements. For Analytics roles, lead with impact, insights, and stakeholder value. For Engineering roles, lead with pipelines, data models, scale, and system design.

**Rewriting:** mirror JD language only where experience genuinely matches per the semantic equivalence rule. Use an XYZ structure (accomplished X, measured by Y, by doing Z) as a guide, not a template. Not every bullet needs a metric. Vary length deliberately.

**Action verbs:** verb-first on every bullet. No "Responsible for," no "Duties included." No two adjacent bullets opening with the same verb.

**Tense:** present for the current role only. Past tense for all prior roles.

**Quantification:** preserve every real number from the master resume. Never invent one. If a significant bullet has no metric, flag it in the change log.

### Skills section
Reorder to surface the JD's priority tools first. Only include skills the candidate actually has. Never add tools from the JD that are not in the master resume.

### EDUCATION and CERTIFICATIONS sections (separate)

Pull directly from the master resume. Never invent a degree, institution, or certification date.

---

## Step 4: Humanize pass (runs on every output before build)

AI-tailored text reliably reintroduces the markers it was trained to generate. Run this pass silently. Fix before building.

### Em dashes - already covered in Step 2. Zero.

### Buzzwords - replace with the plain thing that happened
- leverage, utilize → use
- spearheaded, championed → led, built, ran, started
- robust, seamless, holistic, cutting-edge → name the actual tool or drop the adjective
- passionate, driven, results-oriented, dynamic → delete; a fact replaces it
- delve, foster, empower, elevate, unlock, journey, landscape, realm → rewrite the sentence
- synergy, alignment, stakeholder buy-in → name the actual people and what they agreed to

### AI vocabulary - review triggers, not banned words
Additionally (sentence-opener), align with, boasts, bolstered, crucial, emphasizing, enduring, enhance, fostering, garner, highlight (verb), interplay, intricate/intricacies, key (adjective), landscape (abstract), meticulous/meticulously, pivotal, robust, showcase/showcasing, tapestry, testament, underscore (verb), valuable, vibrant.

Copula substitutes: "serves as a," "stands as," "marks the," "functions as," "represents a" → plain "is/are."

**These are review triggers, not prohibited words.** Replace them when they create generic or formulaic writing. Retain them when they are the clearest natural wording. The test: would this person say this word out loud in an interview?

### Corporate fluff
- Empty openers: cut to the first sentence that carries information
- Vague claims: "proven track record," "excellent communication skills," "thrive in fast-paced environments" → replace with a specific or delete
- Any sentence that could appear unchanged in anyone else's resume → cut or replace with a specific

### Bullet rhythm
- All bullets the same length = AI tell. Vary deliberately.
- No two adjacent bullets opening with the same verb.
- Not every bullet needs a metric. Keep real numbers, never force them.

### Wikipedia AI patterns - especially in summaries and cover letters
| Pattern | Fix |
|---|---|
| Rule of three everywhere | Vary list size |
| "Not just X, but Y" / "Not only X but Y" | Replace with a direct claim |
| "Pivotal moment," "indelible mark," "setting the stage for" | Cut |
| Tailing clauses: "...highlighting my commitment" | Delete the clause; let the fact stand |
| "From strategic planning to execution" | Name the actual things done |
| "Furthermore," "Moreover," "Additionally" chained | Cut most; restructure only if logic requires |
| "I hope this helps!" "Of course!" "Certainly!" | Delete on sight |

---

## Step 5: Truth check (runs after humanize, before build)

Compare every claim in the tailored content against the master resume:

- Every metric must exist in the master resume. If it does not, remove it.
- Every tool or technology listed in the skills section must exist in the master resume.
- No bullet may imply competence in a tool from the JD that is not in the master resume.
- Dates, titles, company names, and locations must match the master resume exactly.

This is a separate pass from the humanize step. It catches facts that were accidentally altered during rewriting.

---

## Step 6: Build the DOCX

### Use the template - never write formatting code from scratch

```bash
cp /path/to/templates/resume_build_template.js /home/claude/build_resume.js
```

The template has formatting locked in: fonts, margins, bullet indents, separate EDUCATION and CERTIFICATIONS sections, no subheading function. Only modify the content fields passed into it (profile data, summary text, skill categories, experience bullets, tech stack lines, and the output filename). Formatting functions, constants, and structural order are immutable. After QA, content fields may be shortened, reordered, or removed if required to meet the page limit.

If the template is missing, fall back to the brand standards file and flag it to the user.

### Pre-build checks - run before executing the build, both must return 0

```bash
grep -c "—" /home/claude/build_resume.js   # must be 0
grep -c "subHeader(" /home/claude/build_resume.js   # must be 0 if your template has no subheading concept
```

If either returns anything other than 0, fix the script. Do not run the build until both pass.

### Build workflow - one pass

```bash
node /home/claude/build_resume.js

# Convert to PDF and rasterize for visual QA using whatever tools your environment provides
```

For multiple resumes in one session, build all in a single script file and run once.

**One build, one QA pass.** If the first build has a problem, fix the script and run once more. Do not iterate multiple times.

### File naming

Follow the naming convention in your brand standards file, typically:
```
[LastName]_Resume_[CompanyName]_[RoleSlug]_v1.docx
```

---

## Step 7: Visual QA - every page, once, before delivery

View every rasterized page on the single final build. Confirm all of the following before copying to the output directory:

- [ ] Zero em dashes visible anywhere
- [ ] No bold subheadings inside experience role blocks - flat bullets only
- [ ] EDUCATION appears as its own section header
- [ ] CERTIFICATIONS appears as its own section header, separate from EDUCATION
- [ ] Within the target page limit - if over, trim by JD relevance then age, never collapse sections
- [ ] No content clipped at margins
- [ ] No blank or near-blank pages (less than 3 lines = problem)
- [ ] Employment history in correct, complete order
- [ ] No invented metrics, employers, dates, or tools
- [ ] Tense correct: present for current role, past for all prior roles
- [ ] No two adjacent bullets opening with the same verb
- [ ] Target 1–2 lines per bullet. A small number of high-value bullets may extend to 3 lines. No 4+ line bullets.

---

## Step 8: Deliver

Copy final files to the output directory and present them to the user.

Then provide:
1. Change log: what changed and why, grouped, capped at meaningful edits
2. Gaps note: JD requirements not covered, with honest framing suggestions
3. Cover letter: only if the user requested it (see the companion cover letter template and rules below)

### Cover letter rules (if requested)
- Under 350 words
- No em dashes
- No first-person paragraph openers
- Include 1–3 strong verified metrics where they naturally strengthen the case. Never invent or force numbers.
- No "I am writing to express my interest"
- No "Re:" subject lines - fold the role title into the opening sentence
- Gap acknowledgment where applicable
- Closing tied to the company's stated priorities
- Build with the companion `cover_letter_template.py`, not from scratch

---

## What this skill does not do

- Add experience, employers, tools, or metrics the candidate has not claimed
- Guarantee ATS pass rates
- Write the cover letter without user confirmation
- Build iteratively - one clean pass is the standard

---

## Workflow summary

```
JD (pasted by user)
  → Step 1: Requirement Map (primary, secondary, unsupported, evidence)
  → Step 2: Content Rules (locked in before writing)
  → Step 3: Tailored Content (summary, bullets, skills)
  → Step 4: Humanize Pass (slop removal)
  → Step 5: Truth Check (verify against master resume)
  → Step 6: DOCX Build (template, grep checks, run once)
  → Step 7: Visual QA (every page, once)
  → Step 8: Deliver (present files, change log, gaps)
```
