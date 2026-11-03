# Primary MLT SIM-LIS website

This is the **combined Blood Bank, Clinical Microbiology and QC** application supplied by the instructor. The original React/TSX source is preserved in `app/src/App.tsx`.

## How GitHub Pages receives a working website

GitHub Pages cannot run a `.tsx` source file. The accompanying GitHub Actions build compiles React and Tailwind on the feature branch and commits the generated `index.html` and `site-assets/` back to the feature branch. Review **both commits** in the pull request before merging into `main`. After merging the compiled version, branch-based GitHub Pages can publish it from `main` and `/ (root)` without changing publishing source settings.

The public project URL is expected to be `https://scotttknightMLS.github.io/MicroLIS/` assuming GitHub Pages remains configured for the `main` branch's root.

## Local development

With a normal internet connection and Node.js 22:

```sh
npm install
npm run dev
npm run build
```

The Vite `base` is deliberately set to `/MicroLIS/` for this GitHub Pages project repository. If the repository is renamed, update the base.

## Student data and safety

The simulator must only be used with **fictitious patients** and is not connected to any clinical LIS. The uploaded app stores its in-progress case in React memory and supports **Save Work (.json)** and **Load Work**; it does not auto-save to the browser or any server. Students should download a JSON file before leaving or refreshing the page. Do not enter real patient information.

The app accepts students' interpretations as entered. It is a learning and documentation tool, not a validated clinical decision support system or an automatic grading system. Review AST interpretation, QC, and critical-result documentation against course SOPs.

## Relationship to the older microbiology simulator

This change is intended to replace only the **main** website. The previous microbiology-only edition and open PRs remain available in GitHub branches. The `preview/` directory, if later merged, is not changed by this build workflow.