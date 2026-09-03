import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_INFO } from '../../core/site-info';

@Component({
  selector: 'app-privacy-policy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './privacy-policy.html',
  styleUrl: '../legal.scss',
})
export class PrivacyPolicy {
  protected readonly site = SITE_INFO;
  protected readonly lastUpdated = 'October 20, 2025';
}
