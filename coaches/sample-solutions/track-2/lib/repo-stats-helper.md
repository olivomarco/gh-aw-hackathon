# Repository Stats Helper — Shared Import

When generating repository health summaries, always follow these conventions:

- **Issue counts:** Report as "X open issues" — include breakdown by top 3 labels if labels exist
- **PR age:** Calculate age from creation date to today. Flag PRs older than 7 days as "needs attention"
- **Staleness threshold:** Issues with no comment or label change in 30+ days are "stale"
- **Tone:** Professional but approachable. Write for a maintainer who checks in weekly.
- **Format:** Use Markdown headers and bullet points. Keep it scannable.
- **Date format:** Always use ISO 8601 (YYYY-MM-DD) for dates in the digest.
