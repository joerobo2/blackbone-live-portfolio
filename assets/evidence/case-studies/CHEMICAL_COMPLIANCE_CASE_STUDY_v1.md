# Chemical Compliance System Case Study v1
## Compliance-Support Workflow and Audit Defensibility

## Portfolio Role

The Chemical Compliance System is the second major case study in my IST 782 portfolio. Internally, this project is connected to the Tier II reporting process, but the public-facing portfolio frames it as a chemical compliance and audit-defensibility system.

This case study demonstrates how coursework in cloud management, systems analysis, information management, IT governance, and database thinking shaped a production workflow for compliance review, sign-off tracking, and repeatable reporting.

## Public-Safe Summary

This project improved a recurring compliance-support process by making the workflow more structured, traceable, and reviewable. It reframed annual reporting as a system-design challenge involving lineage, ownership, continuity, sign-off workflow, and audit defensibility.

All examples in this portfolio are generalized and use sanitized language or synthetic data to protect confidential business information.

## Domain

Compliance / governance / audit defensibility

## Process Supported

- recurring compliance-support review
- inventory validation
- sign-off workflow
- threshold review
- audit logging
- review status tracking
- operational continuity

## Primary Users

- compliance coordinators
- area managers
- operational reviewers
- process owners

## Business Problem

Recurring compliance reporting can become fragile when source data, review responsibility, and sign-off evidence are distributed across spreadsheets, emails, shared folders, and individual memory.

The problem was not only whether the data existed. The deeper issue was whether the reporting process was repeatable, reviewable, and defensible across time.

Without a structured system, compliance work can become dependent on tribal knowledge, manual reconstruction, and fragile handoffs. That creates risk when the process needs to be reviewed, repeated, or transferred to another owner.

## Key Insight

Compliance reporting is a data architecture problem, not just a reporting task.

The system needed to answer:

    Who reviewed what?
    When did they review it?
    What changed?
    What still requires attention?
    Can the process be reconstructed later?

This changed the project from “complete the report” to “stabilize the system that produces and supports the report.”

## System Design

The system was designed as a compliance-support workflow with traceable review states and structured sign-off logic.

Core components included:

- compliance inventory records
- grouped component / material details
- reviewer identity capture
- review status tracking
- threshold review logic
- audit event logging
- compliance review dashboard
- exception view
- summary report

## Data Model Summary

The sanitized data model uses the following conceptual entities:

| Entity | Purpose |
|---|---|
| Compliance Record | Establishes the review population |
| Component Detail | Supports grouped material or component review |
| Reviewer | Captures review ownership or reviewer role |
| Sign-Off Event | Preserves accountability and timestamped review status |
| Threshold Review | Flags records requiring additional attention |
| Audit Log | Preserves review lineage and event history |

The public technical packet contains the full sanitized Mermaid ERD here:

    03_sanitized_control_packets/TIERII_SANITIZED_CONTROL_PACKET_v1.md

## Control Logic

The workflow can be summarized in five stages.

### 1. Identity Capture

The system captures reviewer identity or reviewer role so sign-off activity can be tied to accountable review.

This matters because compliance review is not only about the data. It is also about who reviewed the data, when they reviewed it, and what status they assigned.

### 2. Review State Tracking

Records can move through generalized states:

    pending review
    reviewed
    flagged
    needs correction
    complete
    archived

These states make the process visible and reduce ambiguity about what still needs attention.

### 3. Grouped Review

Related component records are grouped into a reviewable unit so reviewers do not have to inspect disconnected rows one at a time.

This reduces review fatigue and makes the process easier to follow.

### 4. Concurrency / Overwrite Protection

The system reduces the risk of accidental overwrite by controlling how review events are captured and logged.

This is important because shared spreadsheet-based workflows can create versioning, ownership, and overwrite risks.

### 5. Audit Logging

Every meaningful review action should preserve:

    record identifier
    review state
    reviewer role
    timestamp
    event type
    comment status

This creates a review history that can be reconstructed later.

## Output Modules

| Output | Purpose |
|---|---|
| Compliance Review Dashboard | Shows review status and open items |
| Sign-Off Table | Captures reviewer accountability |
| Threshold Review View | Flags records requiring additional attention |
| Audit Log | Preserves review history |
| Exception View | Shows incomplete, flagged, or inconsistent records |
| Summary Report | Supports leadership or compliance review |

## Course Connections

| Course | Connection |
|---|---|
| IST 615 Cloud Management | Platform architecture, access, cloud-enabled workflow |
| IST 654 Information Systems Analysis | Use cases, requirements, process boundaries |
| IST 621 Information Management and Technology | Information governance and digital transformation |
| IST 614 Information Technology Management and Policy | Compliance, policy, governance |
| IST 659 Data Administration and Database Management | Structured data and traceability |

## Program Learning Connection

This project demonstrates applied data science as compliance-support system design.

It required me to:

- organize compliance-related data into reviewable structures
- design a workflow around sign-off and accountability
- preserve traceability through audit logging
- support review status visibility
- reduce manual reconstruction
- communicate compliance process risk to stakeholders
- create a more repeatable operational workflow

## Professional Impact

The Chemical Compliance System improved operational efficiency by making a recurring compliance process easier to review, track, and repeat. It supported stronger continuity and reduced dependency on manual reconstruction.

This project received internal operational efficiency recognition, making it one of the strongest examples of professional impact in my portfolio.

## Reflection

This project helped me understand that compliance work is not only about meeting a reporting deadline. It is also about designing systems that preserve lineage, ownership, reviewability, and accountability over time.

The most important lesson was that a compliance-support system must outlast the person who built it.

That requires clear structure, accessible workflows, traceable review events, and a design that turns recurring reporting into a repeatable operational process.

## Portfolio Evidence

Supporting files:

- 03_sanitized_control_packets/TIERII_SANITIZED_CONTROL_PACKET_v1.md
- 04_visuals/TIER II.png
- 06_internal_drafts/TIERII_CASE_STUDY_v1.md
- 05_internal_evidence/ist782_tierii_evidence_candidates.tsv

## Public Safety Note

This case study is intentionally generalized. It does not include protected compliance records, production screenshots, internal URLs, actual chemical inventories, user names, site IDs, or proprietary workflows.
