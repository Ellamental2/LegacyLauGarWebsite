import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_INFO } from '../../core/site-info';
import { Icon, IconName } from '../../shared/icon/icon';
import { Reveal } from '../../shared/reveal/reveal';

interface SocialCard {
  platform: string;
  icon: IconName;
  handle: string;
  blurb: string;
  bullets: readonly string[];
  cta: string;
  url: string;
  modifier: string;
}

@Component({
  selector: 'app-socials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, Reveal],
  templateUrl: './socials.html',
  styleUrl: './socials.scss',
})
export class Socials {
  protected readonly site = SITE_INFO;

  protected readonly cards: readonly SocialCard[] = [
    {
      platform: 'Instagram',
      icon: 'instagram',
      handle: SITE_INFO.social.instagramHandle,
      blurb:
        'Follow us for training highlights, technique demonstrations, class photos, tournament ' +
        'updates, and behind-the-scenes glimpses of our martial arts community.',
      bullets: [
        '📸 Training session photos',
        '👥 Student achievements',
        '📅 Event announcements',
      ],
      cta: 'Follow on Instagram',
      url: SITE_INFO.social.instagram,
      modifier: 'card--instagram',
    },
    {
      platform: 'Facebook',
      icon: 'facebook',
      handle: SITE_INFO.social.facebookName,
      blurb:
        'Join our Facebook community for detailed updates, class schedules, event information, ' +
        'and connect with fellow martial artists.',
      bullets: [
        '📢 Important announcements',
        '💬 Community discussions',
        '📰 News & updates',
        '🎉 Special celebrations',
      ],
      cta: 'Like on Facebook',
      url: SITE_INFO.social.facebook,
      modifier: 'card--facebook',
    },
  ];
}
