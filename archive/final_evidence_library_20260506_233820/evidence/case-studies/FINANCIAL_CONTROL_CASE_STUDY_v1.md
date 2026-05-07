# Financial Control System Case Study v1

Price-Change Reconciliation and Variance Review
Portfolio Role

The Financial Control System is the first major case study in my IST 782 portfolio. It represents the longest development arc across my graduate program and professional work. Internally, this project is connected to the PCN process, but the public-facing portfolio frames it as a financial control and reconciliation system.

This case study demonstrates how coursework in databases, systems analysis, business analytics, information management, quantitative reasoning, and IT governance shaped a production workflow for reconciling price-change variance and making financial risk easier to explain.

Public-Safe Summary

This project transformed a fragmented price-change review process into a structured reconciliation and review workflow. The system connected operational records, pricing records, transaction activity, and validation logic into a repeatable process that made timing variance, source mismatches, and exception categories easier to identify and explain.

All examples in this portfolio are generalized and use sanitized language or synthetic data to protect confidential business information.

Domain

Financial / operational reconciliation

Process Supported
price-change validation
variance review
exception classification
reconciliation support
stakeholder reporting
review-readiness
Primary Users
business leadership
finance stakeholders
operations teams
process owners
Business Problem

Price-change workflows can create operational and financial risk when approval timing, inventory depletion, invoice activity, and source-system assumptions do not align.

The original process depended on fragmented extracts and manual reconciliation. Different sources could describe the same population differently. Without a structured reconciliation system, teams lacked a repeatable way to explain variance, validate timing, and distinguish true process issues from data-scope or methodology differences.

The problem was not only technical. It was also organizational. Different users needed different levels of detail: leadership needed summary visibility, process owners needed exception categories, and analysts needed record-level traceability.

Key Insight

The core issue was not simply “wrong price” or “late update.” The deeper issue was whether timing assumptions matched operational reality.

The system introduced the concept of a generalized exposure window:

Exposure Window = Actual Operational Depletion Date - Expected Implementation Date

This made it possible to compare expected timing against observed operational behavior.

The most important design shift was separating physical inventory behavior from financial billing behavior. Physical movement explains when inventory was actually depleted. Billing activity explains where the financial outcome appeared. Treating those as separate dimensions made the reconciliation logic more defensible.

System Design

The system was designed as a structured reconciliation workflow rather than a one-time report.

Core components included:

price-change ledger logic
invoice / sales extract review
material transaction review
comparison baseline alignment
internal reconciliation table
exception classification
stakeholder summary output
detailed review table
evidence appendix
Data Model Summary

The sanitized data model uses the following conceptual entities:

Entity	Purpose
Price Change Ledger	Defines approved change records and expected timing
Material Transaction Extract	Provides operational movement and depletion timing
Invoice Extract	Provides billed transaction outcomes
Comparison Baseline	Provides a comparison population or prior review model
Internal Reconciliation Table	Aligns operational and financial evidence
Exception Classification	Explains why records match, differ, or require review

The public technical packet contains the full sanitized Mermaid ERD here:

03_sanitized_control_packets/PCN_SANITIZED_CONTROL_PACKET_v1.md
Transformation Logic

The workflow can be summarized in four stages.

1. Population Alignment

The system identifies which records are shared between the comparison baseline and the internal review population.

Possible match statuses include:

matched
internal-only
baseline-only
partial match
requires review
2. Operational / Financial Separation

The system separates physical inventory behavior from financial billing behavior.

Physical Origin = where the inventory movement occurred operationally
Billing Destination = where the financial outcome appeared

This prevents operational timing and financial assignment from being collapsed into one ambiguous field.

3. Chronology Validation

The system checks whether events occurred in a valid order.

Example questions include:

Was the price change approved before it was applied?
Did the invoice occur inside the eligible review window?
Did operational depletion occur before or after the expected implementation date?
Did the comparison model apply timing assumptions unsupported by operational evidence?
4. Exception Classification

The system classifies differences into reviewable categories.

Exception Class	Meaning
Methodology	Variance caused by model assumptions
Scope	Record appears outside the valid review population
Support	Record lacks sufficient supporting evidence
Data Integrity	Record exists in one source but not another
Chronology	Timing logic violates event order
Validated	Internal and comparison records align materially
Output Modules
Output	Purpose
Stakeholder Summary	High-level reconciliation status and unresolved categories
Detailed Review Table	Record-level review surface
Exception Rollup	Summarizes exception classes
Operational Allocation	Physical-origin view
Financial Allocation	Billing-destination view
Evidence Appendix	Sanitized support notes and reproducibility logic
Course Connections
Course	Connection
IST 659 Data Administration and Database Management	Schema thinking, traceability, source consolidation
IST 654 Information Systems Analysis	Requirements, system boundaries, process decomposition
IST 621 Information Management and Technology	Digital transformation and organizational adoption
SCM 651 Business Analytics	Operational analytics and decision support
IST 614 Information Technology Management and Policy	Governance and technology alignment
IST 686 Quantitative Reasoning for Data Science	Variance logic and structured reasoning
Program Learning Connection

This project demonstrates applied data science as a bridge between data management, analytical reasoning, and business decision support.

It required me to:

collect and organize operational data
structure data into usable analytical tables
identify variance patterns
classify exceptions
communicate results to stakeholders
preserve reviewability and traceability
design a repeatable workflow rather than a one-time analysis
Professional Impact

The Financial Control System improved the ability to explain price-change variance and reduced dependence on manual reconstruction. It helped move the process toward earlier detection, clearer review categories, and more defensible stakeholder communication.

The project also became executive-facing. It developed from a process improvement effort into a business review topic, which makes it one of the strongest examples of coursework becoming production capability.

Reflection

This project changed how I understand applied data science.

At first, the work looked like a reporting problem. The deeper challenge was system design: multiple data sources, different assumptions, timing gaps, operational behavior, financial outcomes, and review expectations all needed to be aligned.

The most important lesson was the difference between analysis and control.

Analysis explains what happened.
A control system changes what happens next.

This project helped me move from building outputs to designing workflows that make risk visible earlier and easier to act on.

Portfolio Evidence

Supporting files:

03_sanitized_control_packets/PCN_SANITIZED_CONTROL_PACKET_v1.md
04_visuals/PCN.png
06_internal_drafts/PCN_CASE_STUDY_v1.md
05_internal_evidence/ist782_curated_evidence_candidates.tsv
Public Safety Note

This case study is intentionally generalized. It does not include proprietary data, company identifiers, customer/vendor names, settlement values, invoice counts, internal URLs, site IDs, part numbers, or production code.
