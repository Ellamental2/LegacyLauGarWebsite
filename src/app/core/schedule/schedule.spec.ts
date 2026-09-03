import { ScheduleService } from './schedule';

describe('ScheduleService', () => {
  const service = new ScheduleService();

  describe('calculateTrainingSessions', () => {
    it('returns the requested number of sessions', () => {
      expect(service.calculateTrainingSessions(5, new Date(2026, 0, 12))).toHaveLength(5);
      expect(service.calculateTrainingSessions(3, new Date(2026, 0, 12))).toHaveLength(3);
    });

    it('only returns Mondays, on or after "now", soonest first', () => {
      const sessions = service.calculateTrainingSessions(5, new Date(2026, 5, 10, 14, 0));
      for (const s of sessions) {
        expect(s.date.getDay()).toBe(1);
        expect(s.date.getTime()).toBeGreaterThanOrEqual(new Date(2026, 5, 10).getTime());
      }
      for (let i = 1; i < sessions.length; i++) {
        expect(sessions[i].date.getTime()).toBeGreaterThan(sessions[i - 1].date.getTime());
        expect(sessions[i].date.getTime() - sessions[i - 1].date.getTime()).toBe(
          7 * 24 * 60 * 60 * 1000,
        );
      }
    });

    it('stays aligned to the 10-week rotation from the seed', () => {
      // 05/01/2026 is seed week 0; the following Monday (12/01) is week 1.
      const [first] = service.calculateTrainingSessions(1, new Date(2026, 0, 12));
      expect(first.date).toEqual(new Date(2026, 0, 12));
      expect(first.session).toBe('Hand Blocks and Kick Blocks'); // TRAINING_PLAN[1]
    });

    it('applies SPECIAL_WEEKS overrides on the matching dates', () => {
      const sessions = service.calculateTrainingSessions(5, new Date(2026, 6, 6));
      const byDate = new Map(sessions.map((s) => [s.date.getTime(), s.session]));
      expect(byDate.get(new Date(2026, 6, 6).getTime())).toBe('Sets and Applications');
      expect(byDate.get(new Date(2026, 6, 13).getTime())).toBe('Kicks/Punches and Sparring');
      expect(byDate.get(new Date(2026, 6, 20).getTime())).toBe('Walks, Knife and Stick Defense');
      // Rotation keeps advancing through the overrides.
      expect(byDate.get(new Date(2026, 6, 27).getTime())).toBe('Open Lesson'); // week 9
    });

    it('handles dates before the seed without producing an undefined session', () => {
      const [first] = service.calculateTrainingSessions(1, new Date(2025, 10, 17));
      expect(first.date).toEqual(new Date(2025, 10, 17));
      expect(first.session).toBe('Kicks/Punches and Sets'); // negative-safe modulo -> index 3
    });
  });

  describe('upcomingEvents', () => {
    it('returns future events only, soonest first, capped at max', () => {
      const events = service.upcomingEvents(5, new Date(2026, 6, 1));
      expect(events).toHaveLength(5);
      expect(events[0].description).toBe('Brown Sash Course. 11am - 3pm');
      expect(events[0].date).toEqual(new Date(2026, 6, 19));
      for (let i = 1; i < events.length; i++) {
        expect(events[i].date.getTime()).toBeGreaterThanOrEqual(events[i - 1].date.getTime());
      }
    });

    it('keeps a multi-day event until its end date passes', () => {
      const events = service.upcomingEvents(10, new Date(2026, 6, 28));
      const summer = events.find((e) => e.description === 'BKFA Summer Course');
      expect(summer).toBeDefined();
      expect(summer!.endDate).toEqual(new Date(2026, 7, 1));
    });

    it('drops events once they are fully in the past', () => {
      const events = service.upcomingEvents(10, new Date(2026, 9, 1));
      expect(events.map((e) => e.description)).toEqual([
        'Coaching Level 2. 9am - 1pm',
        'Black Sash Grading. 10am - 1pm',
        'Instructors Course. 11am - 4pm',
      ]);
    });
  });
});
