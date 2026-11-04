"""
COVER LETTER BUILD TEMPLATE (generic / data-driven version)
=============================================================================
Formatting is locked in to match brand_standards.md. Do not change the
layout constants or the build function - only the CONTENT SECTION at the
bottom, per job application.

To build a cover letter:
  1. Fill in your own profile.json (copy profile.example.json and replace
     every field with your real, truthful data).
  2. Fill in the CONTENT SECTION below: company, role, and the body
     paragraphs for this specific application.
  3. Run the em dash check: `grep -c $'—' cover_letter_template.py`
     must return 0 in your filled-in BODY_PARAGRAPHS before building.
  4. Run: python cover_letter_template.py
  5. Visually inspect the PDF, then deliver.

RULES BAKED INTO THIS TEMPLATE:
  - Under 350 words in the body.
  - No em dashes anywhere.
  - No first-person paragraph openers ("I am writing to...", "I bring...").
  - No "I am writing to express my interest".
  - No "Re:" subject line - the role title is folded into the opening
    sentence instead.
  - 1 to 3 real, verified metrics where they strengthen the case. Never
    invent or force a number that isn't in your master resume.
  - Honest gap acknowledgment where the JD calls for something you lack.
  - Closing ties back to the company's stated priorities, not a generic
    "thank you for your consideration."
=============================================================================
"""

import json
import os
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

# ── LOAD PROFILE DATA ────────────────────────────────────────────────────
# Point this at your own filled-in profile file. profile.example.json is a
# fictional placeholder - do not ship a cover letter built from it.
PROFILE_PATH = os.environ.get("PROFILE_PATH", "./profile.json")
with open(PROFILE_PATH, "r", encoding="utf-8") as f:
    profile = json.load(f)

identity = profile["identity"]

# ── FORMATTING CONSTANTS (match brand_standards.md - do not change) ────────
FONT_NAME = "Helvetica"
BODY_SIZE = 10.5
MARGIN = 1 * inch
LEADING = BODY_SIZE * 1.4

styles = {
    "body": ParagraphStyle(
        "body",
        fontName=FONT_NAME,
        fontSize=BODY_SIZE,
        leading=LEADING,
        spaceAfter=10,
        alignment=TA_LEFT,
        textColor=colors.black,
    ),
    "header": ParagraphStyle(
        "header",
        fontName=FONT_NAME,
        fontSize=BODY_SIZE,
        leading=LEADING,
        spaceAfter=2,
        alignment=TA_LEFT,
        textColor=colors.black,
    ),
    "date": ParagraphStyle(
        "date",
        fontName=FONT_NAME,
        fontSize=BODY_SIZE,
        leading=LEADING,
        spaceBefore=12,
        spaceAfter=12,
        alignment=TA_LEFT,
        textColor=colors.black,
    ),
}


def build_cover_letter(company, role_title, hiring_manager_name, date_str,
                        opening, body_paragraphs, closing, output_path):
    """
    company: str - exact company name
    role_title: str - exact role title as posted
    hiring_manager_name: str or None - "Hiring Manager" if unknown
    date_str: str - e.g. "November 3, 2026"
    opening: str - first sentence folds the role title in; no "Re:" line,
             no "I am writing to express my interest"
    body_paragraphs: list[str] - 1 to 3 paragraphs, under 350 words total
                     across the whole letter, no em dashes, 1-3 real metrics
    closing: str - ties back to the company's stated priorities, ends with
             a simple sign-off
    output_path: str - where to write the PDF
    """
    doc = SimpleDocTemplate(
        output_path,
        pagesize=LETTER,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN,
    )

    story = []

    # Header block - name and contact info
    story.append(Paragraph(identity["fullName"], styles["header"]))
    story.append(Paragraph(
        f'{identity["email"]} | {identity["phone"]} | {identity["linkedinUrl"]}',
        styles["header"],
    ))
    story.append(Paragraph(identity["location"], styles["header"]))

    # Date
    story.append(Paragraph(date_str, styles["date"]))

    # Recipient line
    greeting = f"Dear {hiring_manager_name}," if hiring_manager_name else "Dear Hiring Manager,"
    story.append(Paragraph(greeting, styles["body"]))
    story.append(Spacer(1, 6))

    # Opening - must fold in the role title, no "Re:" line, no stock phrasing
    story.append(Paragraph(opening, styles["body"]))

    # Body paragraphs
    for para in body_paragraphs:
        story.append(Paragraph(para, styles["body"]))

    # Closing
    story.append(Paragraph(closing, styles["body"]))
    story.append(Spacer(1, 12))
    story.append(Paragraph("Sincerely,", styles["body"]))
    story.append(Paragraph(identity["fullName"], styles["body"]))

    doc.build(story)
    print(f"Built: {output_path}")


def word_count(opening, body_paragraphs, closing):
    text = " ".join([opening] + body_paragraphs + [closing])
    return len(text.split())


def em_dash_check(opening, body_paragraphs, closing):
    text = " ".join([opening] + body_paragraphs + [closing])
    count = text.count("—")
    if count > 0:
        raise ValueError(
            f"Found {count} em dash(es) in the cover letter content. "
            "Replace with a comma, colon, period, or restructured sentence "
            "before building."
        )


# ============================================================================
# CONTENT SECTION - fill in per job application
# ============================================================================

COMPANY = "REPLACE: Company Name"
ROLE_TITLE = "REPLACE: Exact Role Title"
HIRING_MANAGER = None  # e.g. "Taylor Okafor" or None for "Hiring Manager"
DATE_STR = "REPLACE: Month Day, Year"

OPENING = (
    "REPLACE: Opening sentence that folds the role title and company name "
    "in naturally. No Re: line. No I am writing to express my interest."
)

BODY_PARAGRAPHS = [
    "REPLACE: paragraph 1. Connect your strongest, most relevant real "
    "experience to the JD's top requirement. Include a real metric if one "
    "naturally fits.",
    "REPLACE: paragraph 2. A second point of fit, or an honest, brief "
    "acknowledgment of a gap paired with how you would approach it.",
]

CLOSING = (
    "REPLACE: Closing paragraph. Tie back to something specific the "
    "company has stated as a priority, not a generic thank you line."
)

OUTPUT_FILE = os.environ.get(
    "OUTPUT_FILE", "./CoverLetter_COMPANY_ROLESLUG_v1.pdf"
)

if __name__ == "__main__":
    em_dash_check(OPENING, BODY_PARAGRAPHS, CLOSING)

    wc = word_count(OPENING, BODY_PARAGRAPHS, CLOSING)
    if wc > 350:
        print(f"WARNING: cover letter body is {wc} words, over the 350 word target.")

    build_cover_letter(
        company=COMPANY,
        role_title=ROLE_TITLE,
        hiring_manager_name=HIRING_MANAGER,
        date_str=DATE_STR,
        opening=OPENING,
        body_paragraphs=BODY_PARAGRAPHS,
        closing=CLOSING,
        output_path=OUTPUT_FILE,
    )
