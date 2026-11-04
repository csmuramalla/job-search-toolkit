# Claude Job Search Toolkit

A set of Claude skills and build templates I use to run my own job search: scoring postings for fit, tailoring a resume and cover letter per application, and building a real interview prep guide once an interview is on the calendar.

This isn't a product. It's the actual system behind a senior data analytics job search, published so other people can see how it's put together and adapt it for their own.

## Why I built this

After a layoff hit my team as part of a broader tech industry workforce reduction, I was suddenly applying to a lot of roles at once, each wanting a resume that spoke its own language, a cover letter that didn't read like a template, and prep that actually matched the job description in front of me. Doing that by hand for every application doesn't scale. Doing it badly with a generic AI prompt produces resumes that read like everyone else's AI-tailored resume.

So I built this as an actual pipeline, not a one-off prompt. Each stage has explicit rules, and two of the rules matter more than the rest: nothing gets invented, and nothing ships without a dedicated pass to strip out AI-sounding phrasing. Those two constraints, applied consistently, are most of what makes this different from pasting a job description into a chat window.

## What's in here

| Skill / template | What it does |
|---|---|
| `skills/job-portal-scraper/` | Browses a job board in Chrome, extracts listings, scores each one against your profile on a 100-point rubric, returns a prioritized shortlist |
| `skills/resume-tailor-and-build/` | Maps a JD's requirements against your master resume, tailors content, runs a humanize pass and a separate truth-check pass, builds a formatted DOCX |
| `skills/interview-prep-guide/` | Once an interview is booked, cross-references the JD and your *submitted* resume, researches the company live, and produces a print-ready prep guide: likely questions, a story bank, gap analysis, questions to ask back |
| `templates/brand_standards.md` | Single formatting authority - fonts, margins, bullet rules, naming conventions - read by every document-producing skill so output is consistent across dozens of applications |
| `templates/resume_build_template.js` | The actual DOCX build script, data-driven off a profile file instead of hardcoded content |
| `templates/cover_letter_template.py` | The cover letter build script (ReportLab/PDF), same discipline: word limit, no em dashes, no stock phrasing |
| `templates/profile.example.json` | A fictional example profile showing the data shape every template reads from |
| `templates/job_tracker_schema.csv` | The column structure I track every application against - no real rows, just the schema |
| `docs/workflow.md` | How all of the above chain together end to end, and why it's structured this way |
| `docs/master-resume-and-project-setup.md` | How the master resume is built and maintained, and how to run the whole search as a Claude Project instead of disconnected chats |
| `docs/profile-usage-example.md` | A verified, step-by-step walkthrough of filling in `profile.json` and running both build scripts against it |

See [`docs/workflow.md`](docs/workflow.md) for the full pipeline diagram and the reasoning behind each design choice, [`docs/master-resume-and-project-setup.md`](docs/master-resume-and-project-setup.md) for what sits upstream of all of it, and [`docs/profile-usage-example.md`](docs/profile-usage-example.md) for a worked usage example.

## What's deliberately not in here

- **No real personal data.** Every name, contact detail, employer reference, and metric in these files is either a placeholder token or a fictional example persona. `profile.example.json` is not a real person.
- **No submission automation.** Nothing in this toolkit applies to a job on your behalf. The scraper is read-only, the resume and cover letter builders produce a file you review, and that's where it stops.
- **No magic ATS score.** The fit-scoring rubric is a structured way to prioritize your own time across a lot of postings, not a guarantee of anything. The two "never invent" rules are the real safety net, not the score.

## How it compares to other open-source job search tooling

There's at least one other well-known open-source framework doing something adjacent - job parsing, fit scoring, resume tailoring, cover letters, and prep, built as Claude Code skills driven off a profile file. It's more configurable than this one, with a broader, more generic profile schema and adjustable scoring weights.

What this toolkit does differently is depth on the editorial discipline, not breadth of configuration: a dedicated humanize pass with a specific pattern catalogue for AI-sounding writing, a truth-check pass that runs *separately* from the humanize pass so a rewrite that drifts a fact doesn't slip through under cover of a style fix, and a brand-standards file that keeps every document - resume, cover letter, prep guide - visually consistent across however many applications you send. If you're comparing tools, that's the actual trade-off: broader out-of-the-box configurability on one side, tighter control over output quality on this side.

## Using this for your own search

1. Copy `templates/profile.example.json` to `profile.json` and replace every field with your own real, truthful data. Keep `profile.json` out of version control if you fork this - it's meant to stay private even though the templates are public.
2. Fill in the identity and target-search blocks in each `SKILL.md` with your own titles, compensation floor, geography, and stack.
3. Point the file paths in each skill at wherever you keep your own master resume and `brand_standards.md`.
4. Load each `SKILL.md` into Claude (via the Skill tool, or as a Claude Code skill, depending on where you're running this) and work through the pipeline in `docs/workflow.md`.

## License

MIT. Use it, fork it, strip out anything that doesn't fit your own search.
