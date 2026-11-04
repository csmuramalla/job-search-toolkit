# The Master Resume and the Claude Project Behind It

The skills and templates in this repo only work because of two things that sit upstream of all of them: a master resume built the right way, and a Claude Project set up to hold the whole search as persistent context instead of starting from zero every conversation. Neither is a "skill" exactly, but both matter more than any individual template here.

## The master resume

### The core rule: it's a source document, not a deliverable

Every tailored resume this toolkit produces is a *subset* of the master resume, rewritten for one JD. That only works if the master resume itself is comprehensive, not polished.

**The master resume should:**
- Contain every role, every bullet, every metric you can defend, even ones that will never make it onto a two-page tailored version
- Stay in its rawest, most complete form - don't trim it for length, don't humanize its language, don't optimize it for any single audience
- Be the one place where more detail is always better

**The humanize pass and the two-page limit apply downstream, never here.** If you run the resume-tailor-and-build skill's humanize pass or length-trimming logic against your master resume directly, you've destroyed the one document that's supposed to hold everything. Those passes exist for the output, not the source.

The reasoning: a tailored resume has to be short and has to speak one JD's language. A master resume has the opposite job - it has to be complete enough that no matter what JD shows up next, the raw material to answer it already exists somewhere in the document. Trim the master resume and you've quietly started limiting what every future tailored resume can draw from.

### How to build one

1. **Brain-dump every role first, unfiltered.** For each employer: every project, every number you can stand behind, every tool you touched, every stakeholder level you worked with. Don't self-edit for relevance yet - relevance is the tailoring skill's job, not the master resume's.
2. **Quantify everything you can, honestly.** A number you can defend in an interview is worth including even if it feels small. A number you can't defend doesn't belong anywhere, master resume included.
3. **Note what's anonymized and keep it consistent.** If you genericize a client name ("a major retail client," "a global e-commerce platform"), decide that wording once and reuse it everywhere downstream - the resume-tailor-and-build skill's content rules depend on this consistency.
4. **Version it, don't overwrite it.** Keep old versions around (`_v1`, `_v2`, `_v3`...) and always resolve to the newest one dynamically in your build scripts rather than hardcoding a filename. You'll add bullets as you gain more experience or remember something worth including, and you don't want a stale reference silently winning.
5. **Separate EDUCATION and CERTIFICATIONS from day one**, even in the master document. It's a small thing, but fixing section structure once at the source means every tailored build inherits it correctly instead of re-deciding it per application.

### A practical storage note

If you're keeping your master resume as a file a Claude session reads directly, a plain-text file (even one saved with a `.docx` extension so it's recognizable at a glance) is far more reliable to read back than a binary Word file - no parser needed, `cat` just works, and nothing is lost in a round-trip through document-conversion tooling. Keep your actual polished, binary `.docx` output as a separate deliverable; the master resume's job is to be read accurately, not to look finished.

---

## Running the search as a Claude Project

The second piece that makes this pipeline work day to day: don't run a job search as a series of disconnected chats. Set it up as a Project with persistent instructions and a knowledge base, so every conversation starts already knowing who you are, what you're targeting, and where your source documents live.

### Why a Project instead of one-off chats

Without it, you re-explain your target roles, your compensation floor, your tech stack, and your formatting rules every single session - and you risk a tailored resume that quietly drifts from your actual rules because the thread never saw them. With a Project:

- Your master resume, job tracker, build templates, and brand standards live in the Project's knowledge base, not re-uploaded per conversation
- Custom instructions establish your role, target tracks, and working style once, and every new chat in the Project inherits them
- A long search (which can run months) accumulates context - interview outcomes, recruiter names, rejection patterns - without you having to re-paste a summary each time

### What to put in the Project's custom instructions

A working structure, adapted to your own situation:

```markdown
# Role
You are my personal career coach and job search strategist. I am a
[your function] professional with [N]+ years of experience, actively
searching for my next role. Treat every conversation as part of one
ongoing job search campaign.

# My Target Roles
[List your target tracks - e.g. two parallel tracks if you're
positioning for adjacent roles, like Analytics vs. Data Engineering.
Say which signals indicate which track so JDs get routed correctly.]

# Core Tasks & How to Handle Them

## 1. Resume Building & Refinement
[Point at your master resume policy - see above. Reference your
resume-tailor-and-build skill here if you're using one.]

## 2. Resume Customization for a Job Posting
[Point at the same skill. Note what you want surfaced automatically
when a JD is pasted: track identification, keyword analysis, a fit
assessment, before any content gets written.]

## 3. Job Posting Evaluation
[How you want roles rated when you're deciding whether to apply at
all - fit level, red flags, which of your strengths to lead with.]

## 4. Interview Preparation
[Point at your interview-prep-guide skill. Note what else you want
covered here: negotiation talking points, how to frame a layoff or
gap, follow-up email help.]

# Working Style
[Be explicit. Do you want drafts or just advice? Direct feedback or
softened? Should Claude ask clarifying questions before assuming
details, or make a reasonable call and flag it? This section is what
keeps every response in the Project consistent in tone, not just in
content.]
```

### What to put in the Project's knowledge base

- Your master resume (versioned, see above)
- `brand_standards.md` from this repo, adapted to your own formatting choices
- `resume_build_template.js` and `cover_letter_template.py` from this repo
- Your job tracker (start from `job_tracker_schema.csv` in this repo)
- Anything else a session would otherwise need re-explained: a list of companies you're specifically targeting, a note on roles you've already ruled out and why

### The payoff

Once this is set up, the skills in this repo stop being stateless templates and start being a system with memory. A session three weeks from now can say "pull the newest master resume version" and get it right automatically. A tailored resume built today uses the same brand standards as one built a month ago. An interview prep guide can reference that you already have a rejection on file at a specific company and shouldn't reapply there. None of that comes from any single skill, it comes from the Project holding the state that the skills all read from.
