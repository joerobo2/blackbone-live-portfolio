# Production Pseudocode: Financial Control System

This pseudocode reflects the public-safe structure of the reconciliation engine. It does not include production code, actual table names, exact business rules, proprietary formulas, or internal field names.

## Step 1 — Define Review Population

PSEUDOCODE:

function build_review_population(price_events, operational_records, financial_records):
    review_population = []

    for each event in price_events:
        candidate = {
            review_id: create_public_safe_id(event),
            item_key: event.item_key,
            effective_date_label: event.effective_date_label,
            scope_status: determine_scope_status(event),
            evidence_status: pending
        }

        add candidate to review_population

    return review_population

## Step 2 — Preserve Separation of Concerns

PSEUDOCODE:

function attach_operational_and_financial_evidence(review_population, operational_records, financial_records):
    for each record in review_population:
        record.operational_evidence = find_operational_activity(record.item_key, operational_records)
        record.financial_evidence = find_financial_activity(record.item_key, financial_records)

    return review_population

## Step 3 — Build Reviewable Truth Table

PSEUDOCODE:

function build_truth_table(review_population):
    truth_table = []

    for each record in review_population:
        operational_status = summarize_operational_evidence(record.operational_evidence)
        financial_status = summarize_financial_evidence(record.financial_evidence)

        variance_category = classify_variance(
            operational_status,
            financial_status,
            record.scope_status
        )

        add {
            review_id: record.review_id,
            item_key: record.item_key,
            operational_status: operational_status,
            financial_status: financial_status,
            variance_category: variance_category,
            evidence_status: determine_evidence_status(record),
            review_status: open
        } to truth_table

    return truth_table

## Step 4 — Classify Variance

PSEUDOCODE:

function classify_variance(operational_status, financial_status, scope_status):
    if scope_status equals out_of_scope:
        return out of scope

    if operational_status equals not enough evidence or financial_status equals not enough evidence:
        return source limitation

    if operational_status equals financial_status:
        return matched

    if operational_status equals expected change supported and financial_status equals change not reflected:
        return negative exposure

    if operational_status equals expected change not yet supported and financial_status equals change reflected:
        return positive exposure

    return requires review

## Step 5 — Generate Stakeholder Review Output

PSEUDOCODE:

function generate_review_output(truth_table):
    return grouped view by:
        variance_category
        evidence_status
        review_status

## Public-Safe Notes

- Table names are generalized.
- Field names are synthetic.
- Variance categories are generalized.
- Exact thresholds and formulas are omitted.
- The pseudocode shows architecture and methodology, not proprietary implementation.
