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

/**
 * One-off overrides for specific dates. Key format: "dd/MM/yyyy".
 * A Monday replaces that week's session; any other day is shown as an extra row.
 */
export const SPECIAL_WEEKS: Readonly<Record<string, string>> = {
  // 'dd/MM/yyyy': 'Open Session - Swords and Sticks',
  '09/11/2026':'Conditioning and Sparring',
  '16/11/2026':'Hand Blocks and Kick Blocks',
  '23/11/2026':'Sets and Applications',
  '30/11/2026': 'Walks, Knife and Stick Defense',
  '07/12/2026': 'Open Session',
  '14/12/2026': 'Closed for the Holidays',
  '15/12/2026': 'Club Social - Meal',
  '21/12/2026': 'Closed for the Holidays',
  '28/12/2026': 'Closed for the Holidays',
  '04/01/2027': 'Closed for the Holidays',
};

export interface ClubEvent {
  /** ISO date (yyyy-MM-dd). */
  date: string;
  description: string;
  /** ISO end date for multi-day events, otherwise null. */
  endDate: string | null;
}

export const OTHER_EVENTS: readonly ClubEvent[] = [
  { date: '2026-11-22', description: 'Instructors Course. 11am - 4pm', endDate: null },
  { date: '2027-01-24', description: 'Anatomy and Physiology. 9am - 1pm', endDate: null },
  { date: '2027-02-21', description: 'Brown Sash Course. 10am - 4pm', endDate: null },
  { date: '2027-03-14', description: 'First Aid. 10am - 7pm', endDate: null },
  { date: '2027-03-21', description: 'Coaching 1. 9am - 1pm', endDate: null },
  { date: '2027-04-23', description: 'Lau Family Training (LFT)', endDate: '2027-04-25' },
  { date: '2027-05-16', description: 'BKFA Black Sash Grading. 10am - 1pm', endDate: null },
  { date: '2027-06-05', description: 'Lau Gar Ireland Training Camp 50th Anniversary', endDate: '2027-06-07' },
  { date: '2027-07-18', description: 'Brown Sash Course. 10am - 4pm', endDate: null },
  { date: '2027-07-25', description: 'BKFA Summer Course', endDate: '2027-07-31' },
  { date: '2027-09-19', description: 'Weapons Course. 10am - 4pm', endDate: null },
  { date: '2027-10-03', description: 'Coaching 2. 9am - 1pm', endDate: null },
  { date: '2027-10-17', description: 'BKFA Black Sash Grading. 10am - 1pm', endDate: null },
  { date: '2027-11-07', description: 'Instructors Course. 11am - 4pm', endDate: null },
  { date: '2027-11-20', description: 'Guardian Training', endDate: '2027-11-21' },
];

/** Anchor: on this date the rotation is at week `SEED_WEEK`. Format: "dd/MM/yyyy". */
export const SEED_DATE = '11/01/2027';
export const SEED_WEEK = 0;

/** The curriculum runs on Mondays (Date.getDay() === 1). */
export const TRAINING_WEEKDAY = 1;
