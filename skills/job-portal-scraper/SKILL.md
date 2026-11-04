---
name: job-portal-scraper
description: "Use this skill whenever the user asks to scan, browse, or fetch jobs from a job portal (LinkedIn, Indeed, Greenhouse, Workday, Lever, Ashby, Glassdoor, company career pages, or any ATS). Triggers include: 'scan this portal for matching roles', 'find jobs that match my resume', 'go through this job board', 'check this careers page', 'pull jobs from this site', or any request to browse an open browser tab for job listings. The skill uses Claude in Chrome to navigate the page, extract job cards, score each role against the master resume, and output a prioritized shortlist with fit scores and JD links. Always use this skill when the user wants to find new job listings using the browser - do not attempt to fetch job boards with web_search alone."
compatibility: "Requires Claude in Chrome extension (mcp__claude-in-chrome__*). Also uses a master resume file for scoring - point it at your own."
---

# Job Portal Scraper

Browses an open job portal page (or a URL the user provides) using Claude in Chrome, extracts job listings, scores each one against the candidate's profile, and returns a prioritized shortlist.

> **Adapting this skill:** The identity block below (target titles, compensation floor, geography, core stack, known gaps) is the part that's actually personal. Rewrite it for your own targets before using this. The scraping and scoring mechanics are the reusable part.

---

## Identity: who this runs for

Fill this in with your own search parameters. Example shape:

- **Target titles:** [your target title ladder, e.g. Senior/Lead/Staff/Principal + your function]
- **Compensation floor:** [your minimum - skip roles that explicitly post below this]
- **Geography:** [your location constraints - on-site, hybrid, remote eligibility]
- **Core stack:** [the tools and technologies you actually use]
- **Key differentiator:** [the 1-2 things that make your application stand out]
- **Known gaps:** [tools or domains you lack - flag in scoring, don't auto-skip]

Load the master resume for full context before scoring:
```bash
cat $(ls /path/to/your/*Master_Resume*.docx | sort -V | tail -1)
```

---

## Step 1: Load Chrome tools

Call ToolSearch once, loading the full core set plus javascript and form tools:

```
ToolSearch query: "select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__read_page,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__tabs_close_mcp,mcp__claude-in-chrome__javascript_tool"
```

If only `enable__mcp__claude-in-chrome` is present, call it first to enable the extension, then do the ToolSearch above.

---

## Step 2: Determine starting point

**Case A - User provided a URL:** Navigate to it in a new tab.
**Case B - User said "the page I have open" or similar:** Call `tabs_context_mcp` to identify the active tab. Confirm with the user before operating on their existing tab. Open a duplicate in a new tab if the portal allows it.
**Case C - User named a portal (e.g. "LinkedIn"):** Ask for the specific search URL or search criteria (title, location, date range) before navigating. Do not guess a URL.

Always work in a new tab unless the user explicitly says to use the current one. Close created tabs before finishing.

---

## Step 3: Read the page and detect portal type

Call `read_page` on the loaded URL. Identify the portal type from the DOM or URL pattern:

| Portal | URL pattern | Notes |
|---|---|---|
| LinkedIn Jobs | linkedin.com/jobs | Auth-gated; works only with user already signed in |
| Indeed | indeed.com | Scroll-to-load; paginate via URL param `&start=10` |
| Greenhouse | job-boards.greenhouse.io | Most reliable; JSON-structured cards |
| Workday | *.wd*.myworkdayjobs.com | JS-rendered; may need scroll + wait |
| Lever | jobs.lever.co | Clean HTML; paginate with offset |
| Ashby | jobs.ashbyhq.com | Markdown-friendly; use html_extraction_method: markdown |
| Glassdoor | glassdoor.ca / glassdoor.com | Auth-gated; jobs often show without login |
| Company careers page | varies | Extract any `<a>` tags containing role titles |

If the portal is auth-gated and the user is not signed in, stop and say so: do not attempt to log in or enter credentials.

---

## Step 4: Extract job listings

Extract every visible job card or listing on the page. For each, capture:

- **Job title** (exact text)
- **Company name**
- **Location** (city / remote / hybrid)
- **Date posted** (if visible)
- **Direct URL** to the full job description (the `href` of the job title link or "Apply" button)
- **Brief snippet** (first 1–2 lines of description if visible in the card; skip if not)

**Pagination:** If the portal paginates (Next button, load more, URL offset), navigate through up to **5 pages** unless the user specifies more. Stop early if roles become clearly irrelevant (e.g. junior titles only).

**Scroll-to-load portals (Workday, LinkedIn):** Use `javascript_tool` to scroll incrementally and re-read the page after each scroll until no new cards appear or 5 scroll cycles complete.

```javascript
// Example scroll for load-more portals
window.scrollTo(0, document.body.scrollHeight);
```

Do not click "Apply" links. Only collect data.

---

## Step 5: Score each listing against the profile

For each extracted listing, apply a quick fit score before fetching the full JD. Use the title, location snippet, and any visible description text.

### Title filter (pass/flag/skip)

| Signal | Action |
|---|---|
| Title matches your target ladder exactly | **Pass** |
| Title matches an adjacent/secondary track | **Pass (secondary track - flag)** |
| Title is Manager/Director/VP with no IC track, and you're targeting IC | **Flag** - show but mark "management track" |
| Title is Junior/Associate/Entry-level (below your level) | **Skip silently** |
| Title is in an unrelated function entirely | **Skip silently** |

### Location filter

Build your own rule table from your geography constraints, e.g.:

| Signal | Action |
|---|---|
| Matches your target metro/region | **Pass** |
| Remote (no geo restriction stated) | **Pass - note "verify residency eligibility"** |
| Requires work authorization you don't have | **Skip silently** |
| Explicitly restricted to a location you can't work from | **Skip silently** |

### Quick stack signal (from title/snippet only)

Look for the tools in your core stack. Note any known-gap tools - flag but do not auto-skip.

---

## Step 6: Fetch full JD for top candidates (optional but recommended)

For any listing that passes the title and location filters, navigate to its direct URL and call `read_page` to get the full job description. Do this for up to **10 listings per session** to stay within session limits. Prioritize by closest title match.

With the full JD, apply the detailed scoring rubric:

### Scoring rubric (out of 100)

| Category | Max points | How to score |
|---|---|---|
| **Title match** | 20 | Exact target title = 20; one level off = 12; adjacent track = 8 |
| **Stack overlap** | 25 | Count hard-match tools from your core stack; 5 pts each, cap at 25 |
| **Seniority signal** | 15 | JD expects your target years OR explicitly matches your title band = 15; one band below = 10; unclear = 5 |
| **Domain fit** | 15 | Domain you have direct experience in = 15; neutral/adjacent domain = 10; hard domain gap = 0 |
| **Differentiator signal** | 10 | JD explicitly values your key differentiator = 10; adjacent signal = 5 |
| **Location/remote fit** | 10 | Matches your primary geography = 10; broader acceptable region = 8; vague remote = 5 |
| **Compensation signal** | 5 | States range at or above your floor = 5; unstated = 3; below floor = 0 |

Adjust weights to reflect what actually predicts fit for your own search - these are a starting point, not a fixed formula.

### Verdict bands

| Score | Verdict |
|---|---|
| 75–100 | **STRONG FIT** - prioritize; build resume |
| 55–74 | **POSSIBLE FIT** - worth reviewing; gap analysis needed |
| 35–54 | **WEAK FIT** - apply only if pipeline is thin |
| Below 35 | **SKIP** - do not surface unless user asks |

---

## Step 7: Output the shortlist

Present results in this format. Sort by score descending. Only surface STRONG and POSSIBLE fits by default; include WEAK fits in a separate collapsed section.

---

### Job Shortlist - [Portal Name] - [Date]

**Session scope:** [N pages scanned] | [M listings extracted] | [K passed filters]

---

#### STRONG FIT (75+)

**1. [Job Title] - [Company]**
Score: 87/100 | Track: [your track label]
Location: [city/region] ([on-site/hybrid/remote]) | Posted: [date]
URL: [direct link]
Stack signals: [matched tools]
Key gap: [gap, if any - noted as asset or blocker]
Next action: Build tailored resume

---

#### POSSIBLE FIT (55–74)

**4. [Job Title] - [Company]**
Score: 61/100 | Track: [your track label]
Location: [location, with eligibility note if remote]
URL: [direct link]
Stack signals: [matched tools]
Key gap: [gap]
Next action: Evaluate gap before applying

---

#### WEAK FIT (35–54) - expand only if pipeline needs volume

*(collapsed list)*

---

### Session Summary

| Metric | Count |
|---|---|
| Pages scanned | N |
| Listings extracted | M |
| Passed title/location filter | K |
| Full JDs fetched | J |
| Strong fits | - |
| Possible fits | - |
| Weak fits (surfaced) | - |
| Skipped silently | - |

---

## Step 8: Offer next actions

After delivering the shortlist, offer:

1. **"Build resume for [role]"** - triggers the resume-tailor-and-build skill for any listed role
2. **"Add to tracker"** - appends strong/possible fits to your job tracker (see `job_tracker_schema.csv`)
3. **"Fetch more pages"** - continues pagination beyond the default 5-page limit
4. **"Scan a different portal"** - repeats the skill for another site in the same session

---

## Guardrails

- **Never click Apply, Submit, or any action button.** This skill is read-only.
- **Never enter credentials.** If the portal requires login and the user is not already signed in, stop and say so.
- **Never fabricate a URL.** Only surface links actually found on the page.
- **Cap full JD fetches at 10 per session** to avoid context overflow.
- **Stop and ask** if the page fails to load, returns an error, or the structure is unrecognizable after 2 attempts.
- **Do not score from title alone** when fetching the full JD is feasible - partial data produces unreliable scores.
- **Respect portal rate limits:** add a short pause between rapid navigations on paginated portals.

---

## Portal-specific notes

### LinkedIn
- Works only if you're already signed into LinkedIn in Chrome.
- Easy Apply listings often lack a direct ATS URL - note this in the shortlist.
- Job search URL format: `https://www.linkedin.com/jobs/search/?keywords=[title]&location=[location]&f_TPR=r604800` (last 7 days filter).

### Workday
- JS-rendered; after navigate, use `javascript_tool` to scroll and wait before reading.
- Job detail URLs follow: `[company].wd*.myworkdayjobs.com/External_Career_Site/job/[slug]_[JR-id]`
- Use the Req ID from the URL as the primary identifier.

### Greenhouse
- Most reliable. Job cards are clean HTML with direct links.
- Paginate via `?page=2` appended to the board URL.

### Indeed
- Paginate via `&start=10`, `&start=20`, etc.
- Company name is sometimes missing from card - note as "Company: not shown."
- Salary range is shown in some listings - extract and score the compensation field.

### Glassdoor
- Frequently requires login for full descriptions. Read what is visible; flag restricted listings.

### Ashby
- `html_extraction_method: markdown` produces clean output for Ashby job boards.
- Role list is usually all on one page - no pagination needed.
