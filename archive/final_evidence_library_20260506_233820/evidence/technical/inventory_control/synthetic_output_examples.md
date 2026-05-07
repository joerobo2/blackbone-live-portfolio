# Synthetic Output Examples: Inventory Control System

All rows are synthetic. Identifiers, values, dates, locations, and quantities are public-safe examples.

## Table 1 — FEFO Watchlist

| Inventory_ID | Item_Key | Lot_Key | Location_Group | Days_To_Expire_Band | Priority_Band | Review_Status |
|---|---|---|---|---|---|---|
| INV-001 | ITEM-A100 | LOT-001 | Zone Group A | immediate | critical | open |
| INV-002 | ITEM-A100 | LOT-002 | Zone Group B | near term | high | open |
| INV-003 | ITEM-B200 | LOT-003 | Zone Group A | medium term | medium | in review |
| INV-004 | ITEM-C300 | LOT-004 | Zone Group C | long term | low | monitor |
| INV-005 | ITEM-D400 | LOT-005 | Zone Group D | unknown | monitor | needs review |

## Table 2 — Exception Summary

| Exception_ID | Inventory_ID | Exception_Type | Priority_Level | Review_Status |
|---|---|---|---|---|
| EXC-001 | INV-001 | near expiration | critical | open |
| EXC-002 | INV-002 | older available lot not selected | high | in review |
| EXC-003 | INV-005 | missing or inconsistent date | medium | needs correction |
| EXC-004 | INV-003 | quantity requires review | medium | open |

## Table 3 — Snapshot Archive Example

| Snapshot_ID | Snapshot_Date_Label | Record_Count_Band | Exception_Count_Band | Archive_Status |
|---|---|---|---|---|
| SNAP-001 | Synthetic Date A | medium | low | captured |
| SNAP-002 | Synthetic Date B | medium | medium | captured |
| SNAP-003 | Synthetic Date C | high | medium | captured |

## Table 4 — Review Status Table

| Action_ID | Exception_ID | Reviewer_Role | Action_Status | Action_Time_Label |
|---|---|---|---|---|
| ACT-001 | EXC-001 | Inventory Reviewer | opened | Synthetic Timestamp |
| ACT-002 | EXC-002 | Process Owner | in review | Synthetic Timestamp |
| ACT-003 | EXC-003 | Data Reviewer | needs correction | Synthetic Timestamp |

## Interpretation

These examples demonstrate expiration-aware prioritization, exception surfacing, review workflow, and snapshot logic. They do not represent actual inventory records.
