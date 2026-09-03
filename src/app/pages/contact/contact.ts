import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SITE_INFO } from '../../core/site-info';
import { Icon } from '../../shared/icon/icon';
import { MapEmbed } from '../../shared/map-embed/map-embed';
import { Reveal } from '../../shared/reveal/reveal';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, Icon, MapEmbed, Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly site = SITE_INFO;
  protected readonly nextUrl = `${SITE_INFO.domain}/thankyou`;

  private readonly formEl = viewChild.required<ElementRef<HTMLFormElement>>('formEl');

  /**
   * Angular's NgForm calls preventDefault on submit, so once valid we hand off
   * to the browser's native POST to FormSubmit.co (which then redirects to
   * `/thankyou`). Without JS the plain form + native `required` attrs still work.
   */
  protected onSubmit(form: NgForm): void {
    if (form.invalid) return;
    this.formEl().nativeElement.submit();
  }
}
