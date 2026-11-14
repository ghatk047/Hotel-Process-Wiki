# Hotel Process Wiki

A static, searchable wiki of hotel-industry business processes with process flow diagrams. It documents full-service hotel operations (housekeeping, front office, food & beverage, revenue management, sales and marketing, HR, facilities, finance, IT and security) as a four-level hierarchy, and shows the systems used at each step. The reference scenario is a Marriott-style hotel running Oracle OPERA Cloud.

Intended readers: SAP and business-process consultants, solution architects, hospitality analysts and students who want a structured reference model of hotel processes and the system landscape behind them.

> **Disclaimer.** This content is an independently compiled reference model. It is illustrative, was generated with AI assistance (the site footer says "Built with Claude + Qwen2.5"), and is not an official or validated description of any hotel company's processes or systems. It is not affiliated with, endorsed by, or sponsored by Marriott International or any vendor named in the content. Company and product names are used only to describe a reference scenario.

## Live site

https://ghatk047.github.io/Hotel-Process-Wiki/ (GitHub Pages, built from the `main` branch root; confirmed from the repository's Pages settings).

## What is in the wiki

Hierarchy: **L1 domain > L2 process group > L3 process > L4 steps**. L4 steps are rows in a table on each process page.

| Item | Count |
|---|---|
| L1 domains | 10 |
| L2 process groups | 30 |
| Processes planned (entries in `search-index.json`) | 240 |
| Process pages that actually exist | 234 |
| Enterprise Architecture (EA) diagram pages | 10 |
| PNG diagrams in `assets/img/` | 244 (234 process + 10 EA) |
| Mermaid sources committed | 10 (`ea-diagrams/ea-NN.mmd`, EA only) |

A process page has a breadcrumb, a "Complete" status badge, systems used, a PNG process flow diagram, a swim-lane summary (role to step numbers) and an L4 step table (Step, Name, Role, System, Input, Output, KPI, Decision?, Exception?, Pain Point / Risk).

| Folder | L1 domain | Code | L2 groups (folder = ID prefix, existing / planned) |
|---|---|---|---|
| `housekeeping` | Housekeeping & Rooms Management | HK | `guest-room-cleaning` = HK-GC 8/8, `laundry-linen` = HK-LP 8/8, `public-area-cleaning` = HK-PC 8/8 |
| `front-office` | Front Office & Guest Services | FO | `checkin-checkout` = FO-CI, `concierge-services` = FO-CS, `night-audit` = FO-NS, `spa-wellness` = FO-SP, `upselling-revenue` = FO-UP (all 8/8) |
| `food-beverage` | Food & Beverage Operations | FB | `restaurant-bar` = FB-RO, `banqueting-events` = FB-BQ, `kitchen-culinary` = FB-KT (all 8/8) |
| `revenue-management` | Revenue Management & Distribution | RM | `yield-rate` = RM-YM, `channel-distribution` = RM-CH, `reservations` = RM-RV (all 8/8) |
| `sales-marketing` | Sales, Marketing & Loyalty | SM | `sales-accounts` = SM-SL, `marketing-digital` = SM-MK, `loyalty-guest` = SM-LY, `franchise-brand` = SM-FR (all 8/8) |
| `human-resources` | Human Resources & Training | HR | `talent-workforce` = HR-TL 8/8, `learning-development` = HR-LR **7/8**, `employee-wellbeing` = HR-EW **7/8** |
| `facilities` | Facilities & Engineering | FM | `preventive-maintenance` = FM-PM, `energy-environment` = FM-EM, `reactive-maintenance` = FM-RM (all 8/8) |
| `finance` | Finance & Procurement | FN | `accounting-finance` = FN-AC **5/8**, `procurement-supply` = FN-PR 8/8 |
| `technology` | Technology & Systems | IT | `it-operations` = IT-OP **7/8**, `digital-guest` = IT-DG 8/8 |
| `security-compliance` | Safety, Security & Compliance | SC | `security-operations` = SC-SE, `compliance-risk` = SC-CL (all 8/8) |

The 10 EA diagrams are: EA-01 Hotel System Landscape, EA-02 Guest Journey Data Flow, EA-03 Revenue & Distribution Architecture, EA-04 F&B Operations Integration, EA-05 Property Operations Ecosystem, EA-06 Loyalty & CRM Architecture, EA-07 HR & Workforce Technology Stack, EA-08 Finance & Procurement Technology Stack, EA-09 IT & Digital Guest Experience Architecture, EA-10 Sales, MICE & Franchise Ecosystem.

Reference systems named in `CLAUDE.md` (Marriott-style scenario): Oracle OPERA Cloud (PMS), SynXis / MARSHA (CRS), IDeaS G3 (RMS), Oracle MICROS Simphony (POS), Marriott Bonvoy / Salesforce (CRM), Knowcross HotSOS (housekeeping), Book4Time (spa), SAP S/4HANA (ERP), Workday (HCM), Birchstreet (procurement), IBM Maximo (maintenance), Schneider EcoStruxure (energy), Assa Abloy VingCard (access), Honeywell INNCOM (guest-room management).

### ID scheme and URL layout

Process ID: `{L1 code}-{L2 code}-{NN}`, e.g. `HK-GC-01` (Housekeeping > Guest Room Cleaning & Turndown > process 01). Folder slugs do **not** equal the codes; use the table above.

| Page type | Path | Asset prefix |
|---|---|---|
| Home | `index.html` | `assets/` |
| L1 index | `<l1>/index.html` | `../assets/` |
| L2 index | `<l1>/<l2>/index.html` | `../../assets/` |
| Process page | `<l1>/<l2>/<pid-lowercase>/index.html` | `../../../assets/` |
| EA index and pages | `ea-diagrams/index.html`, `ea-diagrams/ea-NN/index.html` | |
| Diagram | `assets/img/<pid-lowercase>.png`, `assets/img/ea-NN.png` | |

Example: `housekeeping/guest-room-cleaning/hk-gc-01/index.html` uses `assets/img/hk-gc-01.png`.

## Repository layout

```
.
├── index.html            Home page: domain cards with process counts, EA entry
├── search.html           Search results page (hard-codes base path /Hotel-Process-Wiki)
├── search-index.json     240 entries: id, title, l1, l2, url, systems, steps_preview, keywords
├── assets/
│   ├── css/wiki.css      Shared styles, including hotel system tag colours
│   ├── js/wiki.js        v4: path-aware sidebar (built in JS from domain/L2/EA lists), nav search box, lightbox
│   └── img/              244 PNG diagrams (<pid>.png and ea-NN.png)
├── <10 L1 folders>/      index.html + L2 folders; each process is <pid>/index.html
├── ea-diagrams/          index.html, ea-NN.mmd (Mermaid source) and ea-NN/index.html (10 diagrams)
├── .github/workflows/deploy.yml   Publishes to the gh-pages branch on push to main
├── .deploy               Marker file (currently contains "sidebar-fix-v4")
├── .nojekyll             Tells GitHub Pages not to run Jekyll
└── CLAUDE.md             Project overview and generation notes
```

No package manager and no build step is committed: the repo holds pre-generated static files.

## View locally

`wiki.js` and `search.html` expect the site to live under the path `/Hotel-Process-Wiki/`, so serve the **parent** folder of the clone (the clone directory must be named `Hotel-Process-Wiki`):

```bash
cd ..                       # the directory that contains the Hotel-Process-Wiki clone
python3 -m http.server 8000
# open http://localhost:8000/Hotel-Process-Wiki/
```

Serving from inside the clone at `/` will load pages but breaks the sidebar and search links that depend on the base path.

Optional check that every search entry has a page (from the repo root):

```bash
python3 -c "import json,os;d=json.load(open('search-index.json'));print(sum(not os.path.exists(e['url'].replace('/Hotel-Process-Wiki/','')+'index.html') for e in d),'entries without a page')"
```

At the time of writing this prints 6.

## Build, regenerate and deploy

- **Deploy:** `.github/workflows/deploy.yml` runs on every push to `main` and uses `peaceiris/actions-gh-pages@v3` to publish the whole repo root to the `gh-pages` branch (`force_orphan: true`). The repository's Pages setting reports its source as the `main` branch (root), so the published site is the `main` content; the `gh-pages` branch exists as a side effect of the workflow. Merging to `main` is what updates the site.
- **Generation:** according to `CLAUDE.md`, process pages were generated by scripts "in `scripts/`" run on a Mac Mini with Ollama (`qwen2.5-coder:14b`), with a per-process BPMN PNG, HTML page and an Excel catalogue entry. **No `scripts/` folder, `data/processes.json` or Excel catalogue is in this repo.** `CLAUDE.md` says never to push `data/processes.json` or `data/Hotel_Process_Catalog.xlsx`. Regenerating requires that local workspace.
- **Mermaid sources:** only the 10 EA diagrams have committed `.mmd` files. Process diagrams exist only as PNGs here.
- **Validate:** there is no validator, test suite or link checker in the repo. Check changes by serving locally and clicking through affected pages.

## Current status

Counted from the files in this repo:

- 234 of 240 planned process pages exist, each with a PNG diagram and an L4 step table; all 10 EA pages, `.mmd` sources and PNGs exist; search, sidebar and the diagram lightbox are implemented.
- **6 processes are listed but have no page and no PNG:** `HR-LR-05` (E-Learning & LMS Administration), `HR-EW-02`, `FN-AC-02`, `FN-AC-04`, `FN-AC-07` and `IT-OP-08`. They are present in `search-index.json` and the L2 index pages show them as "Complete", so those links and search results lead to missing pages.
- The home page and footer say "240 processes across 10 domains" and the per-domain counts add up to 240, which includes these 6.
- `CLAUDE.md` is out of date in two places: it says 22 L2 groups (the files show 30) and 5 EA diagrams (the files show 10).

Remaining work:

1. Generate the 6 missing process pages and their PNGs (or remove them from `search-index.json`, the L2 index pages and the counts).
2. Align `CLAUDE.md` and the home page counts with the files.
3. Locate or recreate the generation scripts (not in the repo) and consider committing them, without the data files that must stay local.
4. Consider a small checker for index entries, links and assets.

## Continuing and contributing

- Keep the ID scheme, folder layout and `../` depth for assets; a process page at the wrong depth loses its CSS and diagram.
- Adding or renaming a process, L2 group or domain involves: the page (`<l1>/<l2>/<pid>/index.html`), its PNG, `search-index.json`, the L2 and L1 index pages and counts, the home page counts, and, for a new domain, L2 group or EA diagram, the `HW_DOMAINS` / `HW_EA` lists at the top of `assets/js/wiki.js` (they drive the sidebar).
- The base path `Hotel-Process-Wiki` is hard-coded in `assets/js/wiki.js` (`HW_REPO_BASE`), in `search.html` and in the `url` values of `search-index.json`. If the repo is renamed or hosted elsewhere, update all three.
- From `CLAUDE.md`: never push `data/processes.json` or `data/Hotel_Process_Catalog.xlsx`; run the 5 (now 10) EA diagrams after the full process batch.
- The wiki is public; do not add credentials, tokens, customer data or confidential material.
- Commit history is long and repetitive (mostly one commit per page for the nav search box); recent subjects are `feat: ...`, `fix: ...` and `Update ...`.

## Related repositories

Other wikis by the same owner (for example AAAProcessWiki) follow the same static template (`assets/css/wiki.css`, `assets/js/wiki.js`, `search-index.json`, an EA section). Folder naming, ID formats and search-index fields differ per repo.
