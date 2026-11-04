# How This Toolkit Works End to End

This isn't four unrelated skills. It's one pipeline, each stage handing its output to the next. Here's how the pieces actually chain together in a real job search session.

```
┌─────────────────────┐
│ job-portal-scraper   │  Browse a job board, extract listings, score each
│                       │  against your profile, output a ranked shortlist
└──────────┬────────────┘
           │ "Build resume for [role]"
           ▼
┌─────────────────────┐
│ resume-tailor-and-   │  Map JD requirements → tailor master resume →
│ build                │  humanize pass → truth check → build DOCX → QA
└──────────┬────────────┘
           │ optional, same skill
           ▼
┌─────────────────────┐
│ cover_letter_         │  Built from the same tailored content and the
│ template.py           │  same profile data, under 350 words
└──────────┬────────────┘
           │ "Add to tracker"
           ▼
┌─────────────────────┐
│ job_tracker_schema    │  One row per application: company, role, fit
│ .csv                  │  score, resume version used, status, outcome
└──────────┬────────────┘
           │ interview invite received
           ▼
┌─────────────────────┐
│ interview-prep-guide  │  Cross-references the JD and the *submitted*
│                       │  resume (not the master resume), researches the
│                       │  company live, outputs a print-ready prep PDF
└───────────────────────┘
```

## Why it's structured this way

**One source of truth for facts.** Every stage traces back to your master resume. The scraper scores against it. The resume builder pulls bullets from it and never invents a metric. The interview prep guide treats it as background only - the resume you actually *submitted* is the primary source there, because that's what the interviewer is holding. Nothing downstream is allowed to introduce a fact that isn't upstream.

**One formatting authority.** `brand_standards.md` is read by both the resume builder and the cover letter builder, not duplicated into each. Change your fonts or margins once, and every document type picks it up.

**One shared profile.** `profile.example.json` (replace with your own `profile.json`) holds your identity, employment history, education, and search parameters. The resume template, cover letter template, and job-portal-scraper's identity block all read from the same file, so your real facts live in exactly one place.

**Humanize and truth-check as separate passes, not one step.** AI-written tailored content reliably drifts in two independent ways: it picks up generic-sounding phrasing (the humanize problem), and it occasionally shifts a fact while rewriting (the truth problem). Catching both in one pass means one gets missed. Running them as two explicit, sequential checks in `resume-tailor-and-build` is the single highest-leverage structural choice in this whole toolkit - it's the difference between a resume that reads like you wrote it and one that reads like everyone else's AI-tailored resume.

**Rules locked in before content is written, not after.** The most expensive mistake in this kind of workflow is writing a full tailored resume, then discovering midway through formatting that a rule was broken (an em dash slipped in, a section got merged) and having to redo it. Every skill here front-loads its rules - read the constraints, then write once, check once, ship.

## Adapting this for your own search

1. Copy `profile.example.json` to `profile.json` and fill in your real data. Never commit `profile.json` to a public repo - it's meant to stay private, even though these templates are public.
2. Edit the identity block in `job-portal-scraper`'s SKILL.md with your own target titles, compensation floor, geography, and stack.
3. Edit the technology subsections in `interview-prep-guide`'s SKILL.md to match what you actually work in.
4. Point every `/path/to/your/...` placeholder across the skill files at wherever you actually keep your master resume and `brand_standards.md`.
5. Start with the scraper or skip straight to the resume builder if you already have a JD in hand - the pipeline doesn't require every stage on every application.

## What this toolkit deliberately does not do

- **It doesn't submit anything.** Every stage stops at a reviewable artifact: a shortlist, a DOCX, a PDF. You read it, you send it.
- **It doesn't invent experience.** Every skill in this repo has an explicit "never invent" rule, enforced by a dedicated truth-check or QA step, not just a passing instruction buried in a prompt.
- **It doesn't guarantee outcomes.** Fit scores, ATS predictions, and interview prep are all best-effort. None of it replaces judgment about which roles are actually worth your time.
