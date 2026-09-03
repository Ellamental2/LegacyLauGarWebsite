import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_INFO } from '../../core/site-info';

@Component({
  selector: 'app-terms-of-service',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './terms-of-service.html',
  styleUrl: '../legal.scss',
})
export class TermsOfService {
  protected readonly site = SITE_INFO;
  protected readonly lastUpdated = 'October 20, 2025';
}
