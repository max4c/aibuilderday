#!/usr/bin/env python3
"""Send AI Builder Day sponsor follow-up via Resend.

Example:
  export RESEND_API_KEY=re_xxxxx
  python3 scripts/send_sponsor_followup.py \\
    --to john@leland.com \\
    --name John \\
    --company Leland \\
    --tier Base \\
    --amount "\\$2,500" \\
    --due-date "May 1, 2026" \\
    --sender "Max Forsey" \\
    --dry-run

Remove --dry-run to actually send.
"""
import argparse
import json
import os
import sys
import urllib.request
import urllib.error


RESEND_ENDPOINT = "https://api.resend.com/emails"
FROM_ADDRESS = "JustBuild <hello@justbuild.ing>"

SPONSOR_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfseqkpR5zccC1ypQOgrq5hI58qzSFnqi74WQb6Bgk0C0kWLQ/viewform"
SPEAKER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdnorsK9JBLiFQetXsLkPiZ7lT7RaJ-jK_4k0tF1eRyI1I9ag/viewform"
JUDGE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfuVZV3-8JRqevAwSL4Dajhu3bGL20-Gxh3UABUpYZqTDhoaQ/viewform"
SLACK_URL = "https://tinyurl.com/jb-slackinvite"

TEMPLATE_TEXT = """Hi {name},

Thanks for confirming your interest in sponsoring AI Builder Day as a {tier} sponsor. We're excited to have {company} involved.

A few next steps:

1. If you haven't already, please fill out our quick sponsor form so we have everything on record:
   {sponsor_url}

2. We'll send a formal invoice for {amount} shortly. Payment is due by {due_date}.

3. Please send your company logo (SVG or high-res PNG) to hello@justbuild.ing so we can add it to the website and event materials.

4. If your tier includes a speaking or judging slot, have the relevant person from your team fill out the appropriate form:
   - Speaker Application: {speaker_url}
   - Judge Application: {judge_url}

Let us know if you have any questions. Looking forward to May 8–9!

{sender}
AI Builder Day — May 8–9, Lehi UT
hello@justbuild.ing | aibuilderday.com
Join the JustBuild community: {slack_url}
"""

TEMPLATE_HTML = """<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#2C2418;line-height:1.55;max-width:600px">
<p>Hi {name},</p>

<p>Thanks for confirming your interest in sponsoring <strong>AI Builder Day</strong> as a <strong>{tier}</strong> sponsor. We're excited to have {company} involved.</p>

<p>A few next steps:</p>

<ol>
  <li>If you haven't already, please fill out our quick <a href="{sponsor_url}">sponsor form</a> so we have everything on record.</li>
  <li>We'll send a formal invoice for <strong>{amount}</strong> shortly. Payment is due by <strong>{due_date}</strong>.</li>
  <li>Please send your company logo (SVG or high-res PNG) to <a href="mailto:hello@justbuild.ing">hello@justbuild.ing</a> so we can add it to the website and event materials.</li>
  <li>If your tier includes a speaking or judging slot, have the relevant person from your team fill out the appropriate form:
    <ul>
      <li><a href="{speaker_url}">Speaker Application</a></li>
      <li><a href="{judge_url}">Judge Application</a></li>
    </ul>
  </li>
</ol>

<p>Let us know if you have any questions. Looking forward to May 8–9!</p>

<p>
  {sender}<br>
  AI Builder Day — May 8–9, Lehi UT<br>
  <a href="mailto:hello@justbuild.ing">hello@justbuild.ing</a> | <a href="https://aibuilderday.com">aibuilderday.com</a><br>
  <a href="{slack_url}">Join the JustBuild community</a>
</p>
</body></html>
"""


def render(args):
    ctx = {
        "name": args.name,
        "company": args.company,
        "tier": args.tier,
        "amount": args.amount,
        "due_date": args.due_date,
        "sender": args.sender,
        "sponsor_url": SPONSOR_FORM_URL,
        "speaker_url": SPEAKER_FORM_URL,
        "judge_url": JUDGE_FORM_URL,
        "slack_url": SLACK_URL,
    }
    subject = f"AI Builder Day — Next Steps for {args.company}"
    return subject, TEMPLATE_TEXT.format(**ctx), TEMPLATE_HTML.format(**ctx)


def send(api_key, to, subject, text, html, reply_to=None):
    payload = {
        "from": FROM_ADDRESS,
        "to": [to],
        "subject": subject,
        "text": text,
        "html": html,
    }
    if reply_to:
        payload["reply_to"] = reply_to

    req = urllib.request.Request(
        RESEND_ENDPOINT,
        data=json.dumps(payload).encode(),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "aibuilderday-cli/1.0",
            "Accept": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        print(f"Resend API error {e.code}: {e.read().decode()}", file=sys.stderr)
        sys.exit(1)


def main():
    p = argparse.ArgumentParser(description="Send sponsor follow-up email via Resend")
    p.add_argument("--to", required=True, help="Recipient email")
    p.add_argument("--name", required=True, help="Recipient first name")
    p.add_argument("--company", required=True, help="Sponsor company name")
    p.add_argument("--tier", default="Base", help="Base / Bounty / Headline / Custom")
    p.add_argument("--amount", default="$2,500", help="Dollar amount (include $)")
    p.add_argument("--due-date", default="May 1, 2026", help="Payment due date")
    p.add_argument("--sender", default="Max Forsey", help="Signing sender name")
    p.add_argument("--reply-to", default=None, help="Reply-to address (optional)")
    p.add_argument("--dry-run", action="store_true", help="Print without sending")
    args = p.parse_args()

    subject, text, html = render(args)

    print(f"From:    {FROM_ADDRESS}")
    print(f"To:      {args.to}")
    print(f"Subject: {subject}")
    print("─" * 60)
    print(text)
    print("─" * 60)

    if args.dry_run:
        print("\n[DRY RUN — not sent]")
        return

    api_key = os.environ.get("RESEND_API_KEY")
    if not api_key:
        print("\nERROR: RESEND_API_KEY not set.", file=sys.stderr)
        print("Run: export RESEND_API_KEY=re_xxxxx", file=sys.stderr)
        sys.exit(1)

    result = send(api_key, args.to, subject, text, html, args.reply_to)
    print(f"\n✓ Sent. Resend message ID: {result.get('id')}")


if __name__ == "__main__":
    main()
