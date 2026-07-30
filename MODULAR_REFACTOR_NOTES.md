# Issue #130 Modular ES6 Refactor Notes

This package implements a safe architecture step for issue #130.

## What changed

- Adds ES module entrypoint: `src/core/bootstrap.js`
- Adds DOM helper: `src/core/dom-ready.js`
- Adds Promise script loader: `src/core/script-loader.js`
- Adds route manifest: `src/core/page-manifest.js`
- Adds legacy bridge: `src/core/legacy-bridge.js`
- Adds data module registry: `src/data/module-registry.js`
- Adds placeholder granular data modules for progressive extraction
- Adds patch helper: `tools/apply_modular_es6_refactor.py`

## Why not delete the original app.js/data.js immediately?

The issue calls out huge monolithic files. A full same-PR rewrite risks breaking many pages at once. This implementation moves the architecture to ES module bootstrapping first while preserving existing behaviour. The new registry then provides clear migration slots for gradually extracting data from `data.js`.

## Follow-up extraction order

1. `quizQuestions` → `src/data/quiz-data.js`
2. `cuisinesData` → `src/data/cuisines-data.js`
3. `festivalsData` → `src/data/festivals-data.js`
4. `cultureData` → `src/data/culture-data.js`
5. `mapData` → `src/data/map-data.js`
