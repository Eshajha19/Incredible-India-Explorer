/**
 * tests/setup.js
 * Vitest setup file — loads data.js globals (mapData, quizQuestions)
 * into global scope so tests can access them without modifying the source.
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load data.js and extract its global declarations
const dataCode = readFileSync(resolve(__dirname, '../data.js'), 'utf-8');

// Execute data.js in a scope that returns its global constants
const getGlobals = new Function(
  dataCode + '\nreturn { mapData, quizQuestions };',
);
const globals = getGlobals();

// Make globals available in test environment
globalThis.mapData = globals.mapData;
globalThis.quizQuestions = globals.quizQuestions;
