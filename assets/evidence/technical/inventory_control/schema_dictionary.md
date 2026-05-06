# Schema Dictionary: Inventory Control System

This schema dictionary uses conceptual entities and synthetic field names. It does not include actual item IDs, warehouse labels, internal locations, exact quantities, exact thresholds, production screenshots, or proprietary inventory records.

## Conceptual Entities

| Entity | Purpose | Example Public-Safe Fields |
|---|---|---|
| Inventory Record | Establishes inventory population and quantity band | inventory_id, item_key, lot_key, location_group, quantity_band |
| Expiration Profile | Supports expiration-aware prioritization | expiration_id, item_key, lot_key, days_to_expire_band, priority_band |
| Material Movement | Provides movement history and exception context | movement_id, item_key, lot_key, movement_date_label, movement_type |
| FEFO Exception | Identifies records requiring review | exception_id, inventory_id, exception_type, priority_level, review_status |
| Review Action | Tracks operational follow-up | action_id, exception_id, reviewer_role, action_status, action_time_label |
| Snapshot Archive | Preserves point-in-time inventory state | snapshot_id, snapshot_date_label, record_count_band, archive_status |

## Priority Bands

critical
high
medium
low
monitor

## Public-Safe Exception Classes

near expiration
older available lot not selected
quantity requires review
location requires attention
missing or inconsistent date
unexpected movement pattern

## Public-Safe Design Principle

The schema separates current inventory visibility from expiration priority, movement history, exception detection, review actions, and historical snapshots. This allows users to understand both current risk and prior inventory state.
