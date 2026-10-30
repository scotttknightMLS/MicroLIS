# Instructor guide | Clinical Microbiology LIS simulation

**Intended audience:** Associate-degree Medical Laboratory Technician (MLT) students practicing microbiology accessioning, bench documentation, organism identification, and reporting.

This version emphasizes **laboratory workflow and documentation**, not a hidden organism answer key. Students enter results from actual simulated bench materials or an instructor-supplied case packet.

## Before class

- Open the page on the classroom browser and confirm that the **Save & transfer** page reports working browser storage. If browser storage is disabled or resets between logins, have students download a JSON backup before ending each session.
- Provide students with a designated fictitious patient, accession, or specimen order, and with the appropriate specimen information, media findings, and organism data. Do not use real patient data.
- Provide the relevant organism-specific breakpoint interpretation table, facility/course specimen rejection policy, and critical communication procedure. The app intentionally does **not** interpret AST values or identify organisms.
- Show students how to download the **bench summary** from the accession screen. This `.txt` file is their simplest submission artifact, whereas the JSON export is for restoring their full working state.

## Exercise 1: Specimen identification and receipt

**Starting material:** Example urine-culture accession in the worklist, or a new student-generated order.

**Student tasks:** Match name plus second identifier, confirm collection data, evaluate container/source and transport criteria, accept or reject, and record the culture setup if accepted.

**Instructor checks:** Proper identification, no acceptance of a mismatched/unlabeled specimen, correct rejection reason and notification, and a defensible setup for the specimen source.

**Important:** The on-screen example label matches its order. To assess a discrepancy, supply a separate **simulated** physical label or specimen sheet with the discrepancy; students should reject based on the comparison.

## Exercise 2: Blood-culture Gram stain and critical call

**Starting material:** Example positive blood-culture accession. Its aerobic bottle is flagged and the Gram stain is pending.

**Student tasks:** Record observed Gram morphology, identify that an immediate critical-result call is needed under the simulated policy, document recipient's full name and credentials, confirm read-back, and release a preliminary report.

**Instructor checks:** Gram morphology and quantity, correct notification content, recipient and call time, successful read-back, and proper report status. The software prevents release while the critical call documentation is incomplete.

## Exercise 3: Culture workup and isolate identification

**Starting material:** An instructor-assigned urine, wound, throat, sputum, stool, or other supported culture.

**Student tasks:** Record the selected media; enter day/medium/growth/hemolysis and detailed colony observations; create an isolate with a provisional label such as **Unknown A**; record the relevant biochemical reactions; update the isolate's final identification and ID method; add MIC/zone values and student-selected susceptibility interpretations; select reported vs suppressed AST entries.

**Instructor checks:** Logical selection of tests, correct interpretation of observed reactions, identification supported by the evidence, clinically appropriate AST entries, and appropriate reporting. The simulator records choices but **does not score their analytical correctness**.

## Exercise 4: Final report and correction

**Starting material:** A completed culture from Exercise 3.

**Student tasks:** Review final-report prerequisites, write a concise culture result statement, release the final result, and then follow instructor instructions to document a correction and notification. Compare report versions and review the audit trail.

**Instructor checks:** Appropriate preliminary/final status, consistency of report with bench observations, corrected-report reason, recipient notification, and preservation of earlier versions.

## Suggested 20-point competency rubric (adapt as needed)

| Domain | Points | Evidence |
|---|---:|---|
| Patient/specimen verification | 4 | Correct accession and appropriate accept/reject disposition |
| Culture setup and observations | 4 | Appropriate media, incubation note, and accurate plate reads |
| Microscopy and identification | 4 | Gram interpretation, biochemical evidence, defensible organism ID |
| Susceptibility and culture reporting | 4 | Correct test results, interpretation, selective reporting, final statement |
| Communication and documentation | 4 | Required critical calls/read-back, signed events, report versions, adequate audit trail |
| **Total** | **20** | Instructor-scored from the submitted summary and case evidence |

Adjust point distribution when a case lacks AST or a critical result; an automatically complete workflow is **not** necessarily a scientifically correct workflow.

## Student deliverables

1. **Per-case `.txt` bench summary** from **Download summary**, suitable for Blackboard upload and faculty review.
2. **Optional `.json` save file** from **Save & transfer** to preserve the full simulated record, including audit entries and report versions, for subsequent sessions.

The software does not support centralized instructor assignment, multiuser synchronization, real authentication, or direct gradebook integration. Each student works within their own browser state.
