# Hotel Process Wiki

## Overview
Hierarchical hotel business process documentation for SAP consulting use cases.
Reference implementation based on Marriott International (Oracle OPERA Cloud PMS).

## Structure
- **~200 processes** across 10 L1 domains
- **4 levels**: L1 Domain → L2 Process Group → L3 Process → L4 Steps
- **Per-process**: BPMN diagram (PNG), HTML wiki page, Excel catalog entry

## L1 Domains
| Code | Domain | Processes |
|------|--------|-----------|
| HK | Housekeeping & Rooms Management | 24 |
| FO | Front Office & Guest Services | 24 |
| FB | Food & Beverage Operations | 24 |
| RM | Revenue Management & Distribution | 24 |
| SM | Sales, Marketing & Loyalty | 24 |
| HR | Human Resources & Training | 16 |
| FM | Facilities & Engineering | 16 |
| FN | Finance & Procurement | 16 |
| IT | Technology & Systems | 16 |
| SC | Safety, Security & Compliance | 16 |

## Key Systems (Marriott Reference)
- PMS: Oracle OPERA Cloud
- CRS: SynXis (Sabre) / MARSHA
- RMS: IDeaS G3
- POS: Oracle MICROS Simphony
- CRM: Marriott Bonvoy Platform / Salesforce
- HKP: Knowcross HotSOS
- ERP: SAP S/4HANA
- HCM: Workday
- Procurement: Birchstreet

## Generation
Scripts live in `scripts/`. Run on Mac Mini with Ollama (qwen2.5-coder:14b).
Do NOT push `data/processes.json` or `data/Hotel_Process_Catalog.xlsx`.

## EA Diagrams
5 Enterprise Architecture diagrams generated after full process batch.
