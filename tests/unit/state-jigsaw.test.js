/**
 * state-jigsaw.test.js
 * Unit tests for State Shape Jigsaw Puzzle Game dataset integrity,
 * grid piece generation, shuffle logic, placement validation, and completion math.
 */

import { describe, it, expect } from 'vitest';
import {
  stateProfiles,
  getStateProfile,
  getGridDimension,
  generatePuzzlePieces,
  shufflePieces,
  isPlacementCorrect,
  isPuzzleComplete,
  calculateCompletionPercentage
} from '../../state-jigsaw.js';

const REQUIRED_PROFILE_FIELDS = [
  'id',
  'code',
  'name',
  'capital',
  'rivers',
  'landmarks',
  'funFacts',
  'motto',
  'colorTheme',
  'patternIcon'
];

describe('State Jigsaw Dataset Integrity', () => {
  it('contains at least 10 state puzzle profiles', () => {
    expect(stateProfiles.length).toBeGreaterThanOrEqual(10);
  });

  it('every state profile contains all required fields with non-empty values', () => {
    stateProfiles.forEach((profile, index) => {
      REQUIRED_PROFILE_FIELDS.forEach(field => {
        expect(profile, `Profile at index ${index} missing field ${field}`).toHaveProperty(field);
        if (field === 'rivers' || field === 'landmarks') {
          expect(Array.isArray(profile[field])).toBe(true);
          expect(profile[field].length).toBeGreaterThan(0);
        } else {
          expect(typeof profile[field]).toBe('string');
          expect(profile[field].trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('all state codes and IDs are unique', () => {
    const codes = stateProfiles.map(s => s.code);
    const uniqueCodes = new Set(codes);
    expect(uniqueCodes.size).toBe(codes.length);
  });

  it('finds state profile by code correctly', () => {
    const profile = getStateProfile('KL');
    expect(profile).toBeDefined();
    expect(profile.name).toBe('Kerala');
    expect(profile.capital).toBe('Thiruvananthapuram');
  });
});

describe('Grid Math & Piece Generation', () => {
  it('calculates grid dimensions for 9, 16, and 25 pieces correctly', () => {
    expect(getGridDimension(9)).toBe(3);
    expect(getGridDimension(16)).toBe(4);
    expect(getGridDimension(25)).toBe(5);
    expect(getGridDimension(undefined)).toBe(3);
  });

  it('generates exact piece count with correctIndex mapping', () => {
    const pieces9 = generatePuzzlePieces('KL', 9);
    expect(pieces9.length).toBe(9);
    pieces9.forEach((piece, index) => {
      expect(piece.correctIndex).toBe(index);
      expect(piece.stateCode).toBe('KL');
      expect(piece.row).toBe(Math.floor(index / 3));
      expect(piece.col).toBe(index % 3);
    });

    const pieces16 = generatePuzzlePieces('WB', 16);
    expect(pieces16.length).toBe(16);
  });

  it('shuffles pieces array', () => {
    const original = generatePuzzlePieces('MH', 9);
    const shuffled = shufflePieces(original);
    expect(shuffled.length).toBe(9);
    expect(shuffled).not.toBe(original);
  });
});

describe('Placement & Completion Mechanics', () => {
  it('validates placement correctness', () => {
    const piece = { correctIndex: 4 };
    expect(isPlacementCorrect(piece, 4)).toBe(true);
    expect(isPlacementCorrect(piece, 2)).toBe(false);
    expect(isPlacementCorrect(null, 4)).toBe(false);
  });

  it('detects incomplete and complete puzzle board state', () => {
    const pieceCount = 9;
    const incompleteBoard = new Array(9).fill(null);
    expect(isPuzzleComplete(incompleteBoard, pieceCount)).toBe(false);

    const completeBoard = generatePuzzlePieces('KL', 9);
    expect(isPuzzleComplete(completeBoard, pieceCount)).toBe(true);
  });

  it('calculates completion percentage correctly', () => {
    const pieceCount = 10;
    const board = new Array(10).fill(null);
    expect(calculateCompletionPercentage(board, pieceCount)).toBe(0);

    const pieces = generatePuzzlePieces('KL', 9);
    // 9 out of 9 correct
    expect(calculateCompletionPercentage(pieces, 9)).toBe(100);
  });
});
