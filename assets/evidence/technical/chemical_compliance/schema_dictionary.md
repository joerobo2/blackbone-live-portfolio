# Schema Dictionary: Chemical Compliance System

This schema dictionary uses conceptual entities and synthetic field names. It does not include actual chemical inventories, exact thresholds, internal field names, site identifiers, user names, or regulatory system details.

## Conceptual Entities

| Entity | Purpose | Example Public-Safe Fields |
|---|---|---|
| Compliance Record | Establishes the review population | record_id, site_group_label, material_group_label, current_status |
| Component Detail | Supports grouped material or component review | component_id, record_id, component_identifier, quantity_band, review_flag |
| Reviewer | Captures review ownership or reviewer role | reviewer_id, reviewer_role, review_group |
| Sign-Off Event | Preserves accountability and timestamped review status | signoff_id, record_id, reviewer_id, signed_at_label, signoff_status |
| Threshold Review | Flags records requiring additional attention | threshold_id, record_id, threshold_type, review_required |
| Audit Log | Preserves review lineage and event history | audit_event_id, record_id, event_type, event_time_label, event_source |

## Review States

pending review
reviewed
flagged
needs correction
complete
archived

## Event Types

record loaded
record grouped
review opened
status changed
sign-off captured
exception flagged
comment added
record archived

## Public-Safe Design Principle

The schema separates the compliance record, component details, reviewer identity, sign-off event, threshold review, and audit history. This creates a process that can be reviewed and reconstructed later without relying on individual memory.
