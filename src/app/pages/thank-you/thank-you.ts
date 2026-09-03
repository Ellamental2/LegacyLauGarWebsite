import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dragon } from '../../shared/dragon/dragon';

@Component({
  selector: 'app-thank-you',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Dragon],
  template: `
    <section class="section thanks">
      <div class="container thanks__inner">
        <app-dragon [size]="140" [decorative]="true" />
        <h1>Thank you &mdash; your form has been submitted.</h1>
        <p>We will get back to you as soon as possible!</p>
        <a routerLink="/" class="btn">Back to home</a>
      </div>
    </section>
  `,
  styles: `
    .thanks__inner {
      max-width: 40rem;
      margin-inline: auto;
      text-align: center;
      display: grid;
      justify-items: center;
      gap: 1.25rem;
      padding-block: clamp(2rem, 8vw, 5rem);
    }
    .thanks__inner p {
      color: var(--text-muted);
      font-size: var(--step-1);
    }
  `,
})
export class ThankYou {}
