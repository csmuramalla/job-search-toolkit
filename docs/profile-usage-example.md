# Worked Example: Setting Up and Using `profile.json`

A concrete walkthrough of actually running these templates, start to finish. This exact sequence has been verified end to end: the resume build was run on macOS with the real `docx` npm package, producing a correctly formatted `.docx` that opens cleanly with all sections, fonts, and bullet formatting intact.

## 1. Set up your own profile

Copy the example and start filling in your real data:

```bash
cd job-search-toolkit/templates
cp profile.example.json profile.json
```

Open `profile.json` and replace every field under `identity`, `targetSearch`, `education`, `certifications`, and `employmentHistory` with your own real, truthful information. Keep the structure (the field names and nesting) exactly as it is in the example - only the values change.

`profile.json` is already in `.gitignore`, so it won't accidentally get committed if you're working inside a clone of this repo.

## 2. Understand what's stable vs. what changes per application

Most of `profile.json` is stable across your whole search: your identity, education, certifications, and the skeleton of each role (company, dates, title, tech stack). That part you fill in once.

The `bullets` array on each role, and the summary/skills content in the build script, are what you tailor per job description. Two ways to work:

**Option A - edit in place, one application at a time.** Update the `bullets` for the relevant role(s) in `profile.json` directly before each build, matching the JD's language per the resume-tailor-and-build skill's rules. Simple, but you lose your previous tailored version unless you save the output `.docx` somewhere.

**Option B - one profile copy per application (recommended once you're applying to more than a couple of roles).**

```bash
cp profile.json profile_CompanyX_RoleSlug.json
# edit profile_CompanyX_RoleSlug.json's bullets, summary, and skills for this JD
```

This keeps a clean record of exactly what was submitted to each company, which the interview-prep-guide skill then reads back in as the "submitted resume" source of truth.

## 3. Run the resume build

```bash
npm install docx   # one-time setup
PROFILE_PATH=./profile_CompanyX_RoleSlug.json OUTPUT_FILE=./Resume_CompanyX_RoleSlug_v1.docx node resume_build_template.js
```

You'll get `Built: ./Resume_CompanyX_RoleSlug_v1.docx` on success. Open it and run through the visual QA checklist in `resume-tailor-and-build/SKILL.md` (Step 7) before sending anything out.

## 4. Run the cover letter build

The cover letter template reads the same profile file for your identity block, plus its own per-application content (company, role, opening, body paragraphs, closing) that you fill in directly in `cover_letter_template.py`'s CONTENT SECTION before running it.

```bash
PROFILE_PATH=./profile_CompanyX_RoleSlug.json OUTPUT_FILE=./CoverLetter_CompanyX_RoleSlug_v1.pdf python3 cover_letter_template.py
```

The script checks itself for em dashes and flags a word-count warning if you're over 350 words, before it writes the file.

## 5. What a correct build actually looks like

Running this against the unmodified `profile.example.json` produces a one-page resume for the fictional "Jordan Reyes" persona, with:

- Bold name header, contact line, and a bold section header with a bottom border rule above PROFESSIONAL SUMMARY, CORE SKILLS, PROFESSIONAL EXPERIENCE, EDUCATION, and CERTIFICATIONS
- All employers in the order set in `employmentHistory`, each with bold company name, italic role title, bulleted content, and an italic tech stack line
- EDUCATION and CERTIFICATIONS as two clearly separate sections
- En dashes in every date range, zero em dashes anywhere

If your own build doesn't match that, something in your `profile.json` structure has drifted from the example's shape - compare field by field against `profile.example.json` rather than guessing.
