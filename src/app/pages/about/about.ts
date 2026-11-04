import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SITE_INFO } from '../../core/site-info';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/reveal/reveal';

interface BioSegment {
  text: string;
  /** When set, the segment renders as an external link. */
  href?: string;
  /** When set, the segment renders in bold. */
  strong?: boolean;
}

interface Instructor {
  name: string;
  image: string;
  bio: BioSegment[];
}

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, Icon, Reveal],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly site = SITE_INFO;

  protected readonly team: readonly Instructor[] = [
    {
      name: 'Gary',
      image: 'images/Gary.webp',
      bio: [
        {
          text:
            'Gary has been training in Lau Gar for over 50 years and has been teaching for ' +
            'over 40 years. He is a 6th Degree Black Sash and also holds the role of ',
        },
        { text: 'Lau Gar Guardian', href: 'https://britishkungfuassociation.com/guardians' },
        { text: '.' },
      ],
    },
    {
      name: 'Steve',
      image: 'images/steve.webp',
      bio: [
        {
          text:
            'Steve has been training in Lau Gar for over 40 years and has been teaching for ' +
            'over 30 years. He is a 4th Degree Black Sash, specialising in weapons.',
        },
      ],
    },
    {
      name: 'Ellam',
      image: 'images/Ellam.png',
      bio : [
        { text: 'Ellam passed his 1st Degree Black Sash in 2025 and is now an ' },
        { text: 'Assistant Instructor.', strong: true },
        { text: ' He is also the developer of this website and manages our social media.' },
      ]
    }
  ];
}
