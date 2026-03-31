# Hotel Process Wiki

## Overview
Hierarchical hotel business process documentation for SAP consulting use cases.
Reference implementation based on Marriott International (Oracle OPERA Cloud PMS).

## Structure
- **240 processes** across 10 L1 domains, 22 L2 groups
- **4 levels**: L1 Domain > L2 Process Group > L3 Process > L4 Steps
- **Per-process**: BPMN diagram (PNG), HTML wiki page, Excel catalog entry

## L1 Domains
| Code | Domain | L2 Groups | Processes |
|------|--------|-----------|-----------|
| HK | Housekeeping & Rooms Management | 3 | 24 |
| FO | Front Office & Guest Services | 5 | 40 |
| FB | Food & Beverage Operations | 3 | 24 |
| RM | Revenue Management & Distribution | 3 | 24 |
| SM | Sales, Marketing & Loyalty | 4 | 32 |
| HR | Human Resources & Training | 3 | 24 |
| FM | Facilities & Engineering | 3 | 24 |
| FN | Finance & Procurement | 2 | 16 |
| IT | Technology & Systems | 2 | 16 |
| SC | Safety, Security & Compliance | 2 | 16 |

## Key Systems (Marriott Reference)
- PMS: Oracle OPERA Cloud | CRS: SynXis / MARSHA | RMS: IDeaS G3
- POS: Oracle MICROS Simphony | CRM: Marriott Bonvoy / Salesforce
- HKP: Knowcross HotSOS | SPA: Book4Time | ERP: SAP S/4HANA
- HCM: Workday | Procurement: Birchstreet | Maintenance: IBM Maximo
- Energy: Schneider EcoStruxure | Access: Assa Abloy VingCard | GRMS: Honeywell INNCOM

## Generation
Scripts in scripts/. Run on Mac Mini with Ollama (qwen2.5-coder:14b).
NEVER push data/processes.json or data/Hotel_Process_Catalog.xlsx to GitHub.

## EA Diagrams
5 Enterprise Architecture diagrams generated after full process batch.
