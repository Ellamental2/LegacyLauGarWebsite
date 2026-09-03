import { ChangeDetectionStrategy, Component, afterNextRender, inject, signal } from '@angular/core';
import { ScheduleService } from '../../core/schedule/schedule';
import { SITE_INFO } from '../../core/site-info';
import { SessionRow, SessionsTable } from '../../shared/sessions-table/sessions-table';
import { Reveal } from '../../shared/reveal/reveal';

@Component({
  selector: 'app-sessions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SessionsTable, Reveal],
  templateUrl: './sessions.html',
  styleUrl: './sessions.scss',
})
export class Sessions {
  private readonly schedule = inject(ScheduleService);
  protected readonly site = SITE_INFO;

  // Rendered at build time for SEO; recomputed against the real date in the
  // browser so the list stays current between deploys.
  protected readonly sessions = signal<SessionRow[]>(this.toSessionRows());
  protected readonly events = signal<SessionRow[]>(this.toEventRows());

  constructor() {
    afterNextRender(() => {
      this.sessions.set(this.toSessionRows());
      this.events.set(this.toEventRows());
    });
  }

  private toSessionRows(): SessionRow[] {
    return this.schedule
      .calculateTrainingSessions(5)
      .map((s) => ({ date: s.date, label: s.session }));
  }

  private toEventRows(): SessionRow[] {
    return this.schedule
      .upcomingEvents(5)
      .map((e) => ({ date: e.date, endDate: e.endDate, label: e.description }));
  }
}
