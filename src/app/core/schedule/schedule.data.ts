/**
 * Training schedule data. Edit this file to update sessions and events.
 * Ported from the original `training-sessions.js`.
 */

/** 10-week rotating curriculum, keyed 0-9. */
export const TRAINING_PLAN: Readonly<Record<number, string>> = {
  0: 'Walks and Sets',
  1: 'Hand Blocks and Kick Blocks',
  2: 'Stick and Knife Defense',
  3: 'Kicks/Punches and Sets',
  4: 'Conditioning and Sparring',
  5: 'Hand Blocks and Kick Blocks',
  6: 'Sets and Applications',
  7: 'Walks, Knife and Stick Defense',
  8: 'Kicks/Punches and Sparring',
  9: 'Open Lesson',
};

/** One-off overrides for specific dates. Key format: "dd/MM/yyyy". */
export const SPECIAL_WEEKS: Readonly<Record<string, string>> = {
  // 'dd/MM/yyyy': 'Open Session - Swords and Sticks',
  '13/07/2026': 'Kicks/Punches and Sparring',
  '20/07/2026': 'Walks, Knife and Stick Defense',
};

export interface ClubEvent {
  /** ISO date (yyyy-MM-dd). */
  date: string;
  description: string;
  /** ISO end date for multi-day events, otherwise null. */
  endDate: string | null;
}

export const OTHER_EVENTS: readonly ClubEvent[] = [
  { date: '2026-07-19', description: 'Brown Sash Course. 11am - 3pm', endDate: null },
  { date: '2026-07-26', description: 'BKFA Summer Course', endDate: '2026-08-01' },
  { date: '2026-09-06', description: 'Brown Sash Course. 11am - 3pm', endDate: null },
  { date: '2026-09-20', description: 'Weapons Workshop. 10am - 4pm', endDate: null },
  { date: '2026-10-04', description: 'Coaching Level 2. 9am - 1pm', endDate: null },
  { date: '2026-10-18', description: 'Black Sash Grading. 10am - 1pm', endDate: null },
  { date: '2026-11-22', description: 'Instructors Course. 11am - 4pm', endDate: null },
];

/** Anchor: on this date the rotation is at week `SEED_WEEK`. Format: "dd/MM/yyyy". */
export const SEED_DATE = '05/01/2026';
export const SEED_WEEK = 0;

/** The curriculum runs on Mondays (Date.getDay() === 1). */
export const TRAINING_WEEKDAY = 1;
