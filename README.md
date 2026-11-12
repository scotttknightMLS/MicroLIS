# MLT SIM-LIS — Modular department simulators

This is a **proposed refactor** of the uploaded combined React/TSX simulator. It has two independently addressable student workstations, backed by shared React/visual components and a common build pipeline.

## GitHub Pages routes
- `/MicroLIS/` — course landing page and department selection
- `/MicroLIS/blood-bank/` — Blood Bank simulator, historical records, ABO/Rh, EXM, inventory and reference-lab work
- `/MicroLIS/microbiology/` — Microbiology simulator, smear, media, isolates, biochemical identification and AST

Each department has its own QC view, report and JSON save format. The import action accepts saved legacy combined records when they contain the current department's data. Both remain **training simulations**, not verified clinical LIS logic.

## Code ownership
- `app/src/modules/blood-bank/` — Blood Bank workup and reference laboratory modal
- `app/src/modules/microbiology/` — Microbiology bench workup
- `app/src/modules/shared/` — header, patient demographics, quality control and report composition
- `app/src/core/simulationData.ts` — existing source-derived case seeds and shared data factories
- `app/src/App.tsx` — shared app controller, state and handlers; further separation of domain-specific state is future work

**Do not import live patient data or use this for clinical testing.**

## Develop and test

```bash
npm install
npm run dev
npm run build
```

The current automated build will compile all three HTML entrypoints. Deploy the `dist/` output to the repo root as `index.html`, `blood-bank/index.html`, `microbiology/index.html`, and `site-assets/`. Set GitHub Pages to deploy `main` branch root.

## Known limitations and review gates
- This first-stage refactor separates source view modules and web routes; the shared controller and original case factory remain coupled and should later be split into independent department services.
- The user-provided EXM eligibility logic is an educational approximation and requires a specialist review before students rely on it as clinical rules.
- Reference-lab unit ordering in the simulator creates fictitious inventory entries; there is no external order transmission.
- Existing work is not persisted between refreshes; students must export their department JSON.
- Complex source-derived seed cases use one fictitious patient with both disciplines. Review demo content for department-specific instructional consistency.
