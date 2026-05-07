# Financial Control System

## Goal

To demonstrate how a fragmented, multi-source reconciliation problem was engineered into a deterministic financial control workflow that bridged operational activity and financial review.

## Confidentiality Notice

The system described in this folder was built for a live production environment. To comply with corporate data protection and confidentiality requirements, raw source code, proprietary business logic, internal field names, production screenshots, internal URLs, actual database records, customer details, exact financial values, and internal system names have been omitted.

Instead, this folder contains sanitized architecture notes, schema definitions, pseudocode, and synthetic examples that accurately reflect the system's structural design and data science methodology without disclosing proprietary assets.

## System Context

The Financial Control System addressed a reconciliation problem where operational activity and financial records did not naturally align. Different data sources described different parts of the same process: expected change conditions, operational movement, financial outcomes, and review assumptions.

The risk was repeated reconstruction. Each time a stakeholder asked a question, the logic had to be rebuilt, re-explained, or revalidated. The system was designed to make variance review more repeatable, explainable, and defensible.

## Methodology Alignment

1. Context: Identify the disconnect between operational events and financial outcomes.
2. Structure: Normalize source records into a reviewable timeline.
3. Modularity: Separate operational evidence from financial evidence before recombining them.
4. Evidence: Preserve the logic behind each variance classification.
5. Iteration: Refine classifications and review outputs through stakeholder feedback.

## Portfolio Role

This evidence supports the Financial Control System case study by showing the public-safe architecture behind the reconciliation workflow.
