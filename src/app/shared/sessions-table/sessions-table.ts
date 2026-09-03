import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface SessionRow {
  date: Date;
  label: string;
  /** Optional end date for multi-day events. */
  endDate?: Date | null;
}

@Component({
  selector: 'app-sessions-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
  template: `
    @if (rows().length) {
      <ol class="sessions-list">
        @for (row of rows(); track row.date.getTime() + row.label) {
          <li class="sessions-list__row">
            <span class="sessions-list__date">
              <time [attr.datetime]="row.date | date: 'yyyy-MM-dd'">
                {{ row.date | date: 'd MMMM yyyy' }}
              </time>
              @if (row.endDate) {
                <span class="sessions-list__range"
                  >&ndash; {{ row.endDate | date: 'd MMMM yyyy' }}</span
                >
              }
            </span>
            <span class="sessions-list__label">{{ row.label }}</span>
          </li>
        }
      </ol>
    } @else {
      <p class="sessions-list__empty">{{ emptyText() }}</p>
    }
  `,
  styleUrl: './sessions-table.scss',
})
export class SessionsTable {
  readonly rows = input.required<readonly SessionRow[]>();
  readonly emptyText = input('Nothing scheduled right now — check back soon.');
}
