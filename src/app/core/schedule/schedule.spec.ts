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
      // 11/01/2027 is seed week 0; the following Monday (18/01) is week 1.
      const [first] = service.calculateTrainingSessions(1, new Date(2027, 0, 18));
      expect(first.date).toEqual(new Date(2027, 0, 18));
      expect(first.session).toBe('Hand Blocks and Kick Blocks'); // TRAINING_PLAN[1]
    });

    it('applies SPECIAL_WEEKS overrides on the matching dates', () => {
      const sessions = service.calculateTrainingSessions(6, new Date(2026, 11, 7));
      const byDate = new Map(sessions.map((s) => [s.date.getTime(), s.session]));
      expect(byDate.get(new Date(2026, 11, 7).getTime())).toBe('Open Session'); // not week 8
      expect(byDate.get(new Date(2026, 11, 14).getTime())).toBe('Closed for the Holidays');
      expect(byDate.get(new Date(2027, 0, 4).getTime())).toBe('Closed for the Holidays');
      // Rotation picks back up at the seed once the overrides end.
      expect(byDate.get(new Date(2027, 0, 11).getTime())).toBe('Walks and Sets'); // week 0
    });

    it('adds non-Monday SPECIAL_WEEKS entries as extra rows in date order', () => {
      const sessions = service.calculateTrainingSessions(3, new Date(2026, 11, 7));
      expect(sessions.map((s) => [s.date, s.session])).toEqual([
        [new Date(2026, 11, 7), expect.any(String)],
        [new Date(2026, 11, 14), 'Closed for the Holidays'],
        [new Date(2026, 11, 15), 'Club Social - Meal'],
        [new Date(2026, 11, 21), 'Closed for the Holidays'],
      ]);
    });

    it('handles dates before the seed without producing an undefined session', () => {
      // 12 weeks before the seed, and not a SPECIAL_WEEKS date.
      const [first] = service.calculateTrainingSessions(1, new Date(2026, 9, 19));
      expect(first.date).toEqual(new Date(2026, 9, 19));
      expect(first.session).toBe('Kicks/Punches and Sparring'); // negative-safe modulo -> index 8
    });
  });

  describe('upcomingEvents', () => {
    it('returns future events only, soonest first, capped at max', () => {
      const events = service.upcomingEvents(5, new Date(2026, 10, 1));
      expect(events).toHaveLength(5);
      expect(events[0].description).toBe('Instructors Course. 11am - 4pm');
      expect(events[0].date).toEqual(new Date(2026, 10, 22));
      for (let i = 1; i < events.length; i++) {
        expect(events[i].date.getTime()).toBeGreaterThanOrEqual(events[i - 1].date.getTime());
      }
    });

    it('keeps a multi-day event until its end date passes', () => {
      const events = service.upcomingEvents(10, new Date(2027, 6, 28));
      const summer = events.find((e) => e.description === 'BKFA Summer Course');
      expect(summer).toBeDefined();
      expect(summer!.endDate).toEqual(new Date(2027, 6, 31));
    });

    it('drops events once they are fully in the past', () => {
      const events = service.upcomingEvents(10, new Date(2027, 9, 1));
      expect(events.map((e) => e.description)).toEqual([
        'Coaching 2. 9am - 1pm',
        'BKFA Black Sash Grading. 10am - 1pm',
        'Instructors Course. 11am - 4pm',
        'Guardian Training',
      ]);
    });
  });
});
