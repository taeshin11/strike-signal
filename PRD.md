# Strike Signal — PRD

> Short Title: Military Strike & Airstrike Incident Tracker
> Last Updated: 2026-04-14

---

## Overview

Strike Signal is a multilingual, publicly accessible web application that logs and displays reported military strikes — including airstrikes, missile attacks, drone swarms, and artillery bombardments — across active conflict zones worldwide. Each incident is catalogued with location, date, strike type, severity, damage estimates, and source attribution. The site presents data on a chronological timeline and provides filtering tools so users can drill down by conflict, weapon type, severity level, or geographic area.

The application targets journalists, conflict monitors, policy researchers, and engaged citizens who need a fast, reliable reference for recent military action. All data is stored as flat JSON and served statically via Next.js 15 SSG on Vercel.

Live URL: https://strike-signal.vercel.app

---

## Target Users & Pain Points

| User Type | Pain Point | How This Solves It |
|---|---|---|
| War correspondents & journalists | Need rapid access to verified strike reports from multiple theaters | Unified timeline with source links, filterable by conflict and date |
| Conflict researchers & OSINT analysts | Strike data is scattered across Telegram channels, Twitter, and government briefings | Structured JSON-backed database with consistent incident schema |
| Policy staffers & think tanks | Hard to quantify strike intensity over time without aggregated data | Severity scoring and daily/weekly roll-up statistics |
| Students & educators | No single educational resource explaining military strike patterns | Plain-language descriptions, conflict context, and weapon type glossary |
| General public | Confused by news reports with no broader context | Timeline view puts individual strikes in historical and geographic context |
| SEO/organic traffic | Searching "airstrike tracker" or "military strikes today" expects live-feeling data | Recent incidents prominently displayed, last-updated timestamps visible |

---

## Tech Stack

- Framework: Next.js 15 (App Router, SSG)
- Styling: Tailwind CSS
- i18n: next-intl (8 languages: en / ko / ja / zh / es / fr / de / pt)
- Data: JSON files in /public/data/ (incidents.json)
- Ads: Adsterra + Google AdSense ca-pub-7098271335538021
- Deployment: Vercel free tier
- Repo: GitHub (public)
- Analytics: Vercel Analytics (free tier)

---

## Pages & Routes

### App Router Structure

```
app/
  [locale]/
    layout.tsx              — Root layout with locale provider, header, footer, ad scripts
    page.tsx                — Homepage: recent incidents feed, quick stats, conflict zones
    loading.tsx             — Skeleton loader for timeline
    not-found.tsx           — 404 page
    incidents/
      page.tsx              — Full incident list: timeline view, search, filters
      [incidentId]/
        page.tsx            — Individual incident detail page
    conflicts/
      page.tsx              — Active conflict zones overview
      [conflictSlug]/
        page.tsx            — Conflict-specific incident timeline (e.g., /conflicts/ukraine-russia)
    weapons/
      page.tsx              — Weapon type index (airstrike, missile, drone, artillery)
      [weaponType]/
        page.tsx            — All incidents involving this weapon type
    stats/
      page.tsx              — Aggregated statistics: strikes per day/week, by conflict, by type
    about/
      page.tsx              — About the project, sourcing methodology, limitations
  api/
    incidents/
      route.ts              — GET: returns incidents.json (supports ?conflict=, ?type=, ?limit=)
    revalidate/
      route.ts              — POST: ISR revalidation trigger
```

### Key Page Descriptions

**Homepage (`/[locale]/`)**
- Hero section: "X strikes logged across Y active conflicts" with last-updated timestamp
- Live feed: most recent 15 incidents displayed as timeline cards
- Each card shows: date/time, conflict zone, location name, strike type badge, severity indicator, casualty estimate, source link
- Active Conflicts sidebar: links to each conflict-specific page with incident count
- Quick stats: total incidents this month, most active conflict, most used weapon type
- Ad placements: leaderboard top, rectangle sidebar

**Incident Timeline (`/[locale]/incidents/`)**
- Full chronological timeline, most recent first
- Date grouping headers (Today, Yesterday, This Week, [Date])
- Filter panel: conflict zone, weapon type, severity (1-5), date range, country
- Search: full-text across location name, description, source
- Each incident card: expandable with full details
- Pagination: 30 incidents per page
- Total count and active filter indicators

**Incident Detail (`/[locale]/incidents/[incidentId]/`)**
- Full incident record: date, time (UTC), conflict zone, specific location, coordinates (if available)
- Strike type with icon and description
- Severity rating (1-5) with explanation of scale
- Damage/casualty estimates: military, civilian, infrastructure
- Responsible party (attributed or unconfirmed)
- Source attribution: up to 5 sources with links and reliability rating
- Related incidents (same location, ±7 days)
- Conflict context paragraph
- Share buttons

**Conflict Pages (`/[locale]/conflicts/[conflictSlug]/`)**
- Conflict header: name, start date, parties involved, brief description
- Incident count: total logged, this month, this week
- Incident intensity chart: bar chart of incidents per week (last 12 weeks)
- Strike type breakdown: pie/donut chart
- Timeline of all incidents for this conflict (paginated)
- Most affected locations within this conflict
- Link to sanctions-watch country pages for involved parties

**Stats Page (`/[locale]/stats/`)**
- Global summary: total incidents, date range covered, conflicts tracked
- Incidents per conflict (bar chart)
- Incidents by weapon type (horizontal bar)
- Weekly trend chart (last 8 weeks, all conflicts)
- Top 10 most affected locations
- Severity distribution histogram

---

## Data Model (JSON schema)

### /public/data/incidents.json

```json
{
  "meta": {
    "lastUpdated": "2026-04-14T00:00:00Z",
    "totalIncidents": 8400,
    "conflictsTracked": 6,
    "dateRangeStart": "2022-02-24",
    "version": "1.0.0"
  },
  "incidents": [
    {
      "id": "inc-ua-20260414-001",
      "conflictSlug": "ukraine-russia",
      "conflictName": "Russia-Ukraine War",
      "date": "2026-04-14",
      "timeUtc": "03:42",
      "timeConfidence": "exact | approximate | date-only",
      "location": {
        "name": "Kharkiv",
        "region": "Kharkiv Oblast",
        "countryCode": "UA",
        "coordinates": {
          "lat": 49.9935,
          "lng": 36.2304,
          "precision": "city | district | approximate"
        }
      },
      "strikeType": "missile | airstrike | drone | artillery | naval | ground",
      "weaponSystem": "Kh-101 cruise missile",
      "severity": 4,
      "severityBasis": "infrastructure damage, civilian casualties",
      "casualties": {
        "civilian": { "killed": 2, "wounded": 7, "confidence": "reported" },
        "military": { "killed": 0, "wounded": 0, "confidence": "unknown" }
      },
      "damage": {
        "infrastructure": "residential building, partial collapse",
        "description": "Two apartment blocks struck, gas line ruptured"
      },
      "responsibleParty": {
        "attributed": "Russian Armed Forces",
        "confidence": "confirmed | likely | disputed | unknown"
      },
      "sources": [
        {
          "name": "Ukrinform",
          "url": "https://ukrinform.ua/...",
          "reliability": "primary | secondary | unverified",
          "reportedAt": "2026-04-14T05:12:00Z"
        }
      ],
      "tags": ["kharkiv", "missile", "civilian"],
      "lastVerified": "2026-04-14"
    }
  ],
  "conflicts": [
    {
      "slug": "ukraine-russia",
      "name": "Russia-Ukraine War",
      "startDate": "2022-02-24",
      "parties": ["Ukraine", "Russia"],
      "status": "active",
      "context": "Full-scale Russian invasion of Ukraine that began February 2022.",
      "countryCodes": ["UA", "RU"],
      "totalIncidents": 6200
    },
    {
      "slug": "middle-east",
      "name": "Middle East Conflicts",
      "startDate": "2023-10-07",
      "parties": ["Israel", "Hamas", "Hezbollah", "Houthis"],
      "status": "active",
      "context": "Multi-front conflict following October 7, 2023 Hamas attack on Israel.",
      "countryCodes": ["IL", "PS", "LB", "YE"],
      "totalIncidents": 2200
    }
  ],
  "weaponTypes": [
    {
      "slug": "missile",
      "label": "Ballistic & Cruise Missiles",
      "description": "Long-range guided munitions including cruise missiles and ballistic missiles",
      "examples": ["Kh-101", "Iskander-M", "ATACMS", "Storm Shadow"]
    },
    {
      "slug": "drone",
      "label": "Drone / UAV Attacks",
      "description": "Unmanned aerial vehicle attacks including loitering munitions and Shahed-type drones",
      "examples": ["Shahed-136", "Lancet", "Bayraktar TB2"]
    }
  ]
}
```

---

## Milestones & Git Push Points

### M0 — Project Scaffold
- Next.js 15 project initialized with App Router
- Tailwind CSS and next-intl configured
- 8 locale folders created, base translation keys defined
- Folder structure: app/[locale]/, app/api/, public/data/
- Empty incidents.json placeholder with meta and empty arrays
- Vercel project linked, first successful deploy
- Git push: `feat: scaffold strike-signal with Next.js 15 and i18n`

### M1 — Data Layer
- incidents.json populated with ≥ 300 real incidents across ≥ 2 conflicts
- Conflicts array complete (at minimum: ukraine-russia, middle-east)
- Weapon types array complete
- /api/incidents/route.ts with GET + query param filtering (?conflict=, ?type=, ?limit=)
- Data validation script written and passing all checks
- Git push: `feat: incidents data model and API route`

### M2 — Layout & Homepage
- Root layout: header with nav (Home, Incidents, Conflicts, Stats, About), language switcher, footer
- AdSense script in layout head
- Homepage: hero stats, recent incidents feed (15 cards), active conflicts sidebar
- Incident card component with severity indicator, badge, and source link
- Mobile-responsive, verified at 375/768/1280px
- Git push: `feat: layout, homepage, and incident card component`

### M3 — Incidents Timeline Page
- Full timeline page with date grouping
- Filter panel (conflict, weapon, severity, date range)
- Full-text search
- Pagination (30 per page)
- Expandable incident cards
- Git push: `feat: incidents timeline with filters and pagination`

### M4 — Detail & Sub-pages
- Incident detail page (full data, sources, related incidents)
- Conflict sub-pages with incident chart (using recharts or similar lightweight lib)
- Weapon type sub-pages
- Stats page with aggregated charts
- generateStaticParams for all dynamic routes
- Git push: `feat: incident detail, conflict, weapon, and stats pages`

### M5 — i18n, SEO, Sitemap
- All 8 language translations completed
- Per-page metadata (title, description, og:image)
- sitemap.xml covering all routes × 8 locales
- robots.txt, canonical URLs, hreflang
- JSON-LD: Dataset schema on homepage, BreadcrumbList on sub-pages
- Git push: `feat: i18n, SEO metadata, sitemap, and structured data`

### M6 — QA & Launch
- Lighthouse: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90
- All locales tested for layout issues
- Filter edge cases tested (zero results, special chars)
- Ad units verified (no layout shift)
- Vercel production deploy confirmed
- Google Search Console verified, sitemap submitted
- Git push: `chore: QA pass, performance tuning, production launch`

---

## Agent Team

### Frontend Agent
**Responsibilities:**
- Build incident card, timeline, filter panel, stats charts
- Implement Tailwind styling and responsive breakpoints
- Integrate next-intl for all UI labels
- Build chart components for stats page (bar, pie, line — lightweight SVG or recharts)
- Optimize for Core Web Vitals (no CLS from ad units, fast LCP)

**Key Files:**
- app/[locale]/layout.tsx
- app/[locale]/page.tsx
- app/[locale]/incidents/page.tsx
- components/IncidentCard.tsx, IncidentTimeline.tsx
- components/FilterPanel.tsx, SeverityBadge.tsx, StrikeTypeBadge.tsx
- components/ConflictChart.tsx, WeaponBreakdown.tsx

### Backend / Data Agent
**Responsibilities:**
- Source and structure real incident data into incidents.json
- Write update scripts (manual or semi-automated from OSINT sources)
- Implement and maintain /api/incidents/route.ts
- JSON schema validation and data integrity checks
- Ensure consistent severity scoring methodology

**Key Files:**
- public/data/incidents.json
- app/api/incidents/route.ts
- scripts/validate-incidents.js
- scripts/add-incident.js (CLI helper for adding new incidents)

### SEO / Content Agent
**Responsibilities:**
- Title tags and meta descriptions for all pages and locales
- Translation files for all 8 languages
- JSON-LD structured data
- Sitemap.xml generation script
- Content for About page (methodology, sourcing, limitations)
- Internal linking strategy between conflicts and weapon type pages

**Key Files:**
- messages/ (all 8 locale JSON files)
- app/[locale]/about/page.tsx
- public/sitemap.xml, public/robots.txt

### QA Agent
**Responsibilities:**
- Route testing across all 8 locales
- Filter/search functionality edge cases
- Chart rendering on mobile
- Ad unit placement (no layout shift, no blocking)
- Lighthouse audits and remediation guidance
- Cross-browser testing (Chrome, Firefox, Safari, mobile Chrome)

---

## SEO Strategy

### Primary Keywords
- "airstrike tracker" — homepage, incidents page
- "military strikes today" — homepage H1 with "today" date injection
- "missile strike map" — stats page and conflict pages
- "drone attack tracker" — weapon type: drone page
- "ukraine airstrike tracker" — conflict: ukraine-russia page

### Secondary Keywords
- "military strike database"
- "conflict incident log"
- "war strike monitor 2026"
- "airstrikes in ukraine 2026"
- "Shahed drone attacks"
- "missile strikes middle east"

### Long-tail Keywords
- "how many airstrikes in ukraine today"
- "latest missile strikes russia ukraine"
- "drone attack reports 2026"
- "military strike severity scale"

### Technical SEO
- Static pages ensure fast TTFB and good Core Web Vitals
- "Last updated: [date]" shown in hero creates freshness signals
- Conflict-specific pages target high-volume location + conflict queries
- hreflang on all pages for 8-language coverage
- OG images include conflict zone name and strike count
- JSON-LD Dataset schema lists the incident data as a public resource
- Internal linking: incidents link to conflict page; conflict pages link to sanctions-watch

### Content Freshness Strategy
- Data updated minimum weekly; redeploy triggers sitemap re-crawl
- "Recent incidents" section ensures homepage reflects latest data
- Stats page provides aggregated weekly numbers (fresh content signal)

---

## Launch Checklist

- [ ] incidents.json contains ≥ 300 real incidents
- [ ] At least 2 conflict zones fully populated
- [ ] All 8 locale routes return 200
- [ ] Homepage recent feed shows latest 15 incidents
- [ ] Timeline filters working (conflict, weapon type, severity, date)
- [ ] Incident detail pages load for 10+ sample incident IDs
- [ ] Conflict pages load for all slugs in conflicts array
- [ ] Weapon type pages load for missile, drone, airstrike, artillery
- [ ] Stats page charts render on desktop and mobile
- [ ] Language switcher works on all routes
- [ ] AdSense ca-pub-7098271335538021 present in page source
- [ ] Adsterra ad units rendering without CLS
- [ ] sitemap.xml accessible and contains all routes
- [ ] robots.txt does not block crawlers from /
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse SEO ≥ 95
- [ ] Lighthouse Accessibility ≥ 90
- [ ] No console errors in production
- [ ] OG tags verified
- [ ] Google Search Console property verified
- [ ] Sitemap submitted to GSC
- [ ] Vercel deployment URL: https://strike-signal.vercel.app confirmed live
- [ ] 404 page working for unknown incident IDs
