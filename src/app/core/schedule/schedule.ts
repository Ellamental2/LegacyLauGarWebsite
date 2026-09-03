import { Injectable } from '@angular/core';
import {
  ClubEvent,
  OTHER_EVENTS,
  SEED_DATE,
  SEED_WEEK,
  SPECIAL_WEEKS,
  TRAINING_PLAN,
  TRAINING_WEEKDAY,
} from './schedule.data';

export interface TrainingSession {
  date: Date;
  session: string;
}

export interface UpcomingEvent {
  date: Date;
  endDate: Date | null;
  description: string;
}

const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;
const ROTATION_LENGTH = 10;

/** "dd/MM/yyyy" as produced by the original `toLocaleDateString('en-GB')`. */
function formatUk(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${d}/${m}/${date.getFullYear()}`;
}

function parseUk(value: string): Date {
  const [d, m, y] = value.split('/').map(Number);
  return new Date(y, m - 1, d);
}

/** Local-midnight Date from an ISO `yyyy-MM-dd` string. */
function parseIso(value: string): Date {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
}

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  /**
   * The next `count` Monday training sessions from `now`, applying the 10-week
   * rotation plus any one-off overrides in `SPECIAL_WEEKS`.
   *
   * Faithful port of the original `calculateTrainingSessions()`.
   */
  calculateTrainingSessions(count = 5, now: Date = new Date()): TrainingSession[] {
    const sessions: TrainingSession[] = [];

    const currentDate = new Date(now);
    currentDate.setHours(0, 0, 0, 0);

    const sessionDate = parseUk(SEED_DATE);

    // Whole weeks between the seed and today, minus one for safety.
    const weekDifference =
      Math.floor((currentDate.getTime() - sessionDate.getTime()) / MS_PER_WEEK) - 1;

    // JS-safe modulo so pre-seed dates still land on a valid rotation index.
    let sessionWeek =
      (((SEED_WEEK + weekDifference) % ROTATION_LENGTH) + ROTATION_LENGTH) % ROTATION_LENGTH;
    sessionDate.setDate(sessionDate.getDate() + weekDifference * 7);

    while (sessions.length < count) {
      if (sessionDate.getDay() !== TRAINING_WEEKDAY) {
        sessionDate.setDate(sessionDate.getDate() + 1);
        continue;
      }

      if (sessionDate < currentDate) {
        sessionDate.setDate(sessionDate.getDate() + 7);
        sessionWeek = (sessionWeek + 1) % ROTATION_LENGTH;
        continue;
      }

      const override = SPECIAL_WEEKS[formatUk(sessionDate)];
      sessions.push({
        date: new Date(sessionDate),
        session: override ?? TRAINING_PLAN[sessionWeek],
      });

      sessionDate.setDate(sessionDate.getDate() + 7);
      sessionWeek = (sessionWeek + 1) % ROTATION_LENGTH;
    }

    return sessions;
  }

  /** Upcoming club events (future-only, soonest first), capped at `max`. */
  upcomingEvents(max = 5, now: Date = new Date()): UpcomingEvent[] {
    return [...OTHER_EVENTS]
      .map((e: ClubEvent) => ({
        date: parseIso(e.date),
        endDate: e.endDate ? parseIso(e.endDate) : null,
        description: e.description,
      }))
      .filter((e) => (e.endDate ?? e.date) >= startOfDay(now))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, max);
  }
}

function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}
