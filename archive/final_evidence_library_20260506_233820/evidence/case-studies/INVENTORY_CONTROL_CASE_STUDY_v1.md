# Inventory Control System Case Study v1
## FEFO Operational Intelligence and Inventory-Risk Prioritization

## Portfolio Role

The Inventory Control System is the third major case study in my IST 782 portfolio. Internally, this project is connected to the FEFO application, but the public-facing portfolio frames it as an inventory control and operational intelligence system.

This case study demonstrates how coursework in business analytics, information management, systems analysis, quantitative reasoning, and cloud/platform thinking shaped a production workflow for expiration-aware prioritization, inventory-risk visibility, and exception review.

## Public-Safe Summary

This project converted time-sensitive inventory information into an operational intelligence surface. It helped users identify which inventory required attention first and supported earlier, more structured review of expiration-driven risk.

All examples in this portfolio are generalized and use sanitized language or synthetic data to protect confidential business information.

## Domain

Operational intelligence / supply chain / inventory risk

## Process Supported

- expiration-aware prioritization
- inventory-risk visibility
- exception detection
- review workflow
- operational decision support
- historical snapshot review

## Primary Users

- operational leaders
- material handlers
- planners
- inventory process owners

## Business Problem

Inventory review becomes reactive when expiration-sensitive materials are spread across fragmented reports and source systems. Users may know inventory exists, but not which inventory needs attention first or why.

The problem was not only visibility. The deeper issue was prioritization. A list of inventory records does not automatically tell users what requires action, what should be monitored, or what risk is emerging over time.

## Key Insight

Visibility alone is not enough.

The system needed to move from:

    Here is inventory data.

to:

    Here is the inventory that needs attention first, and why.

That shift turned the project from a reporting surface into an operational intelligence system.

## System Design

The system was designed as an inventory-risk review workflow with expiration-aware logic and exception surfacing.

Core components included:

- inventory on-hand records
- expiration / shelf-life data
- material movement history
- location or process-stage context
- review status tracking
- historical snapshots
- FEFO priority bands
- exception categories
- leadership summary outputs

## Data Model Summary

The sanitized data model uses the following conceptual entities:

| Entity | Purpose |
|---|---|
| Inventory Record | Establishes inventory population and quantity on hand |
| Expiration Profile | Supports expiration-aware prioritization |
| Material Movement | Provides movement history and exception context |
| FEFO Exception | Identifies records requiring review |
| Review Action | Tracks operational follow-up |
| Snapshot Archive | Preserves point-in-time inventory state |

The public technical packet contains the full sanitized Mermaid ERD here:

    03_sanitized_control_packets/FEFO_SANITIZED_CONTROL_PACKET_v1.md

## Control Logic

The workflow can be summarized in five stages.

### 1. Expiration-Aware Prioritization

The system assigns inventory into priority bands based on expiration timing and operational relevance.

Example priority bands:

    critical
    high
    medium
    low
    monitor

These bands help users focus attention on the inventory that requires the earliest review.

### 2. Exception Detection

The system identifies records that require review.

Example exception classes:

    near expiration
    older lot bypassed
    quantity requires review
    location requires attention
    missing or inconsistent date
    unexpected movement pattern

Exception surfacing turns raw inventory data into an action-oriented review queue.

### 3. FEFO Review Surface

The application presents inventory in an order that supports first-expired-first-out decision-making.

The goal is not only to display data but to reduce the cognitive burden required to decide what should be reviewed first.

### 4. Filtering and Segmentation

Users can review inventory by generalized categories such as:

    location group
    material category
    priority band
    review status
    expiration window
    movement type

This supports different user needs across leadership, planning, and operational review.

### 5. Snapshot / Replay Logic

Historical snapshots support point-in-time review and trend analysis.

The goal is to preserve what the system knew at the time, not only the current state. That matters for review, learning, and operational continuity.

## Output Modules

| Output | Purpose |
|---|---|
| FEFO Watchlist | Prioritized inventory review surface |
| Exception Summary | Shows risk categories and open issues |
| Detail Table | Supports record-level inspection |
| Snapshot Archive | Preserves point-in-time state |
| Review Status View | Tracks operational follow-up |
| Leadership Summary | Communicates risk and action needs |

## Course Connections

| Course | Connection |
|---|---|
| SCM 651 Business Analytics | Operational analytics and decision support |
| IST 621 Information Management and Technology | Digital transformation and workflow adoption |
| IST 654 Information Systems Analysis | Requirements, process modeling, user workflows |
| IST 686 Quantitative Reasoning for Data Science | Time-based prioritization and exception reasoning |
| IST 615 Cloud Management | Lightweight web delivery and platform thinking |

## Program Learning Connection

This project demonstrates applied data science as operational intelligence.

It required me to:

- collect and organize inventory-related data
- design priority logic around time-sensitive records
- identify exception categories
- create a user-facing review surface
- preserve historical snapshots
- communicate risk through summary and detail views
- support operational decision-making

## Professional Impact

The Inventory Control System improved operational visibility by helping users prioritize time-sensitive inventory review. It supported proactive exception detection and transformed inventory data into a more actionable decision-support surface.

The system launched into production and was submitted for internal innovation recognition in the AI category.

## Reflection

This project helped me understand how applied data science can support operational judgment.

The goal was not simply to show more data. The goal was to structure the data so that action became clearer.

The project also extended a pattern from my earlier work: build a shared truth layer, then create user-facing tools that help teams make faster, better decisions from that truth.

## Portfolio Evidence

Supporting files:

- 03_sanitized_control_packets/FEFO_SANITIZED_CONTROL_PACKET_v1.md
- 04_visuals/FEFO.png
- 06_internal_drafts/FEFO_CASE_STUDY_v1.md
- 05_internal_evidence/ist782_curated_evidence_candidates.tsv

## Public Safety Note

This case study is intentionally generalized. It does not include production screenshots, internal URLs, exact organization IDs, user names, internal field names, warehouse-specific labels, or proprietary inventory records.
