import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="section nf">
      <div class="container nf__inner">
        <p class="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you were looking for doesn't exist or has moved.</p>
        <div class="nf__actions">
          <a routerLink="/" class="btn">Back to home</a>
          <a routerLink="/sessions" class="btn btn--ghost">Training sessions</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .nf__inner {
      max-width: 40rem;
      margin-inline: auto;
      text-align: center;
      padding-block: clamp(2.5rem, 9vw, 6rem);
    }
    .nf__inner > p {
      color: var(--text-muted);
      margin-top: 0.75rem;
    }
    .nf__actions {
      display: flex;
      gap: 0.85rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 1.75rem;
    }
  `,
})
export class NotFound {}
