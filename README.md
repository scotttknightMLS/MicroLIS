# Micro LIS | Clinical Microbiology Simulation (v3)

A self-contained, browser-based microbiology LIS workstation for **associate-degree Medical Laboratory Technician (MLT) simulation labs**. All patients and orders are fictitious. **Not for clinical use.** Do not enter protected health information (PHI).

## Install or update with GitHub Pages

1. Place `index.html` in your GitHub repository's root, replacing an earlier version if needed.
2. Commit it to your publishing branch (typically `main`).
3. In **Settings → Pages**, select **Deploy from a branch**, then your branch and **/(root)**.
4. Open the resulting GitHub Pages address.

No backend, build step, credentials, or external JavaScript/CDN is required. The application is one HTML file containing CSS and JavaScript.

**Before replacing an earlier version:** open the older site's **Storage test / Save & transfer** page and download a JSON save file as a precaution. Version 3 continues to use the `mltlis.micro.v1` storage key and accepts valid older save files.

## What's new in v3

- **One station at a time:** an accession opens to a focused case workspace with seven stations: Case overview, Specimen & receipt, Culture setup, Gram stain, Plate readings, Identification & AST, and Report & release. Navigation becomes a horizontally scrollable station bar on smaller screens.
- **Contextual starting station:** preloaded cases open at the next relevant task. A positive blood-culture example is ready for microscopy; the urine-culture example is ready for specimen receipt.
- **More structured culture observations:** enter medium, culture day, growth amount, hemolysis when appropriate, and descriptive bench notes rather than writing all findings in one line.
- **Biochemical identification:** record conventional test reactions against each isolate (catalase, coagulase, oxidase, PYR, indole, citrate, TSI, and other common tests). Keep a provisional “Unknown A” identification and update it later without losing reactions or AST results.
- **Improved report readiness:** clearly labeled final-report prerequisites and a hold on finalization while an isolate remains unidentified. Existing critical-result and read-back safeguards remain.
- **Student evidence:** print or download a **per-accession bench summary** as a text file. The export lists specimen disposition, media, Gram-stain findings, each plate observation, ID tests, AST, critical calls, interpretation, and report versions.
- **Layout and accessibility:** responsive desktop/mobile design, larger controls, less scrolling, an overview dashboard, live worklist search, light/dark theme, and an unsaved-station warning.

## Student workflow

1. Enter your student initials or name in the **Tech** box.
2. Open an assigned accession from **Worklist**, or create a new order using **Order entry**.
3. Complete the relevant case stations; save each station before moving to the next. Enter only observations given to you by your instructor or observed in the simulation lab.
4. Review **Report & release** and issue a preliminary or final report when appropriate.
5. Use **Download summary** at the top of the accession page to obtain a plain-text bench sheet for instructor review. Use **Save & transfer** to export a JSON backup of the complete simulator state if you need to continue later.

## Instructor use

See [`INSTRUCTOR_GUIDE.md`](INSTRUCTOR_GUIDE.md) for exercise scenarios, teaching checkpoints, and a suggested assessment rubric. This simulator is intentionally **open-ended**: there is no automatic organism identification or grading engine. Provide students with the organism-specific breakpoint table and the expected specimen/plate observations separately.

## Clinical and technical limitations

- Susceptibility **interpretations are entered by the student**. The app does not apply CLSI/EUCAST breakpoints, validate antimicrobial panels, or determine organism ID.
- No clinical system is connected. LocalStorage is **not secure clinical record storage**. It may be cleared by lab computer policies, private browsing, or site-data cleanup. Export backups before leaving the computer.
- The **Tech** field is not authentication. The instructional audit trail is not tamper-resistant.
- Bench summaries are **evidence of data entry**, not proof of competency. No work is submitted automatically to Blackboard or an instructor.
- Teaching decisions, specimen rejection, critical call policies, and final reporting should be reviewed against the course's SOPs and objectives.
