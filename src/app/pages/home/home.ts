import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { SITE_INFO } from '../../core/site-info';
import { Logo } from '../../shared/logo/logo';
import { Icon } from '../../shared/icon/icon';
import { MapEmbed } from '../../shared/map-embed/map-embed';
import { Reveal } from '../../shared/reveal/reveal';

interface Benefit {
  title: string;
  copy: string;
  image: string;
}

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage, Logo, Icon, MapEmbed, Reveal],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly site = SITE_INFO;

  protected readonly benefits: readonly Benefit[] = [
    {
      title: 'Strength',
      copy: 'Kung Fu is a great way to increase your strength and general fitness.',
      image: 'images/strongStance.jpg',
    },
    {
      title: 'Flexibility',
      copy: 'As you train we will help you work to increase your flexibility.',
      image: 'images/flexibleKick.jpg',
    },
    {
      title: 'Balance',
      copy: 'As you practise you will naturally develop your balance.',
      image: 'images/balance.jpg',
    },
    {
      title: 'Confidence',
      copy: 'As you learn you will gain confidence in your ability to defend yourself.',
      image: 'images/confidence.jpg',
    },
  ];
}
