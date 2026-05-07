# Synthetic Output Examples: Financial Control System

All rows are synthetic. Identifiers, values, dates, categories, and labels are public-safe examples.

## Table 1 — Reviewable Truth Table

| Review_ID | Item_Key | Operational_Status | Financial_Status | Variance_Category | Evidence_Status | Review_Status |
|---|---|---|---|---|---|---|
| REV-001 | ITEM-A100 | expected change supported | change reflected | matched | complete | reconciled |
| REV-002 | ITEM-A200 | expected change not yet supported | change reflected | positive exposure | complete | needs follow-up |
| REV-003 | ITEM-B300 | expected change supported | change not reflected | negative exposure | complete | in review |
| REV-004 | ITEM-C400 | not enough evidence | change reflected | source limitation | incomplete | open |
| REV-005 | ITEM-D500 | out of scope | out of scope | out of scope | complete | archived |

## Table 2 — Variance Review Summary

| Variance_Category | Count_Band | Exposure_Band | Review_Action |
|---|---|---|---|
| matched | high | none | archive |
| positive exposure | medium | moderate | review with stakeholder |
| negative exposure | medium | moderate | financial follow-up |
| source limitation | low | unknown | collect supporting evidence |
| out of scope | low | none | archive |

## Table 3 — Evidence Link Example

| Evidence_ID | Review_ID | Source_Type | Evidence_Status | Public_Safe_Note |
|---|---|---|---|---|
| EVD-001 | REV-001 | operational movement | complete | Movement evidence supports expected timing |
| EVD-002 | REV-001 | financial outcome | complete | Financial record aligns with expected status |
| EVD-003 | REV-003 | operational movement | complete | Operational evidence supports change condition |
| EVD-004 | REV-003 | financial outcome | complete | Financial record requires review |
| EVD-005 | REV-004 | operational movement | incomplete | Additional evidence required |

## Interpretation

These tables demonstrate the review structure, not real financial results. The purpose is to show how the system organizes evidence, preserves classifications, and supports stakeholder review.
