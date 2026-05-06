# Synthetic Output Examples: Chemical Compliance System

All rows are synthetic. Identifiers, values, dates, component labels, and user roles are public-safe examples.

## Table 1 — Compliance Review Dashboard

| Record_ID | Material_Group | Component_Count | Review_Status | Threshold_Review | Last_Action |
|---|---|---:|---|---|---|
| CR-001 | Material Group A | 3 | reviewed | no additional review | sign-off captured |
| CR-002 | Material Group B | 5 | flagged | review required | exception flagged |
| CR-003 | Material Group C | 2 | pending review | no additional review | record loaded |
| CR-004 | Material Group D | 4 | needs correction | review required | comment added |
| CR-005 | Material Group E | 1 | complete | no additional review | archived |

## Table 2 — Sign-Off Event Table

| Signoff_ID | Record_ID | Reviewer_Role | Signoff_Status | Event_Time_Label | Comment_Status |
|---|---|---|---|---|---|
| SO-001 | CR-001 | Area Reviewer | reviewed | Synthetic Timestamp | none |
| SO-002 | CR-002 | Compliance Coordinator | flagged | Synthetic Timestamp | comment added |
| SO-003 | CR-004 | Process Owner | needs correction | Synthetic Timestamp | comment added |

## Table 3 — Audit Log Example

| Audit_Event_ID | Record_ID | Event_Type | Reviewer_Role | Event_Time_Label | Event_Source |
|---|---|---|---|---|---|
| AUD-001 | CR-001 | record loaded | system | Synthetic Timestamp | review workflow |
| AUD-002 | CR-001 | sign-off captured | Area Reviewer | Synthetic Timestamp | review workflow |
| AUD-003 | CR-002 | exception flagged | Compliance Coordinator | Synthetic Timestamp | review workflow |
| AUD-004 | CR-004 | comment added | Process Owner | Synthetic Timestamp | review workflow |

## Interpretation

These examples demonstrate review state, sign-off accountability, and audit trail preservation. They do not represent actual compliance records or actual chemical inventories.
