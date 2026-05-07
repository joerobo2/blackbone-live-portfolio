# Schema Dictionary: Financial Control System

This schema dictionary uses conceptual entities and synthetic field names. It does not include actual database fields, internal labels, customer data, financial values, or proprietary formulas.

## Conceptual Entities

| Entity | Purpose | Example Public-Safe Fields |
|---|---|---|
| Review Population | Defines which records belong in scope | review_id, item_key, review_group, scope_status |
| Price Event | Represents an expected change condition | price_event_id, item_key, prior_value_label, new_value_label, effective_date_label |
| Operational Movement | Represents physical or process activity | movement_id, item_key, source_group, movement_date, quantity_label |
| Financial Outcome | Represents billing or ledger-side activity | financial_id, item_key, destination_group, financial_date, amount_label |
| Variance Record | Stores calculated or classified differences | variance_id, review_id, variance_direction, variance_magnitude_band |
| Exception Classification | Explains why a record needs review | exception_id, exception_type, exception_reason, priority_band |
| Evidence Link | Preserves source logic behind a classification | evidence_id, review_id, source_type, evidence_status |
| Review Status | Tracks review progress | review_id, reviewer_role, status, timestamp_label |

## Review Status Values

open
in review
explained
needs follow-up
reconciled
archived

## Variance Direction Values

positive exposure
negative exposure
neutral / matched
methodology difference
timing difference
source limitation
out of scope

## Public-Safe Design Principle

The schema separates operational evidence from financial evidence. The system then recombines both dimensions into a review model so that each variance can be explained without collapsing different facts into one ambiguous category.
