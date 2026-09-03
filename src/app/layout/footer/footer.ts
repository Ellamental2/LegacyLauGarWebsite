import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_INFO } from '../../core/site-info';
import { Logo } from '../../shared/logo/logo';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Logo, Icon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly site = SITE_INFO;
  protected readonly year = new Date().getFullYear();
}
