import { Level } from '../core/templates/level';
import levelList from './level-list';

class SixthLevel extends Level {
  protected levelId = 'level-6';

  static template = '*';

  public textObject = {
    mainTitle: 'Select all the balls inside the small cones',
    asideTitle: `Level 6 of ${this.lastLevel}`,
    selectorType: 'The Universal Selector',
    shortDesc: 'You can select everything!',
    template: SixthLevel.template,
    longDesc:
      'You can select all elements with the universal selector!',
    examples: [
      '<span class="code-fragment">p *</span> selects any element inside all <x-tag>p</x-tag> elements.',
    ],
  };

  protected elemsForHTMLCodeBlock = [
    {
      divId: 'cone-1',
      tag: 'cone',
      nested: [
        {
          divId: 'vanilla-1',
          tag: 'vanilla',
          class: 'small',
        },
        {
          divId: 'choco-1',
          tag: 'choco',
        },
      ]
    },
    {
      divId: 'cone-2',
      tag: 'cone',
      class: 'small',
      nested: [
        {
          divId: 'vanilla-2',
          tag: 'vanilla',
          class: 'small',
        },
        {
          divId: 'berry-1',
          tag: 'berry',
        },
        {
          divId: 'choco-2',
          tag: 'choco',
        },
      ]
    },
    {
      divId: 'creamer',
      tag: 'creamer',
      nested: [
        {
          divId: 'choco-3',
          tag: 'choco',
        },
      ]
    },
    {
      divId: 'cone-3',
      tag: 'cone',
      class: 'small',
      nested: [
        {
          divId: 'vanilla-3',
          tag: 'vanilla',
          class: 'small',
        },
        {
          divId: 'berry-2',
          tag: 'berry',
        },
        {
          divId: 'choco-4',
          tag: 'choco',
        },
      ]
    },
    {
      divId: 'cone-4',
      tag: 'cone',
      nested: [
        {
          divId: 'vanilla-4',
          tag: 'vanilla',
          class: 'small',
        },
        {
          divId: 'choco-5',
          tag: 'choco',
        },
      ],
    },
  ];

  public correctSelector = 'cone.small *';

  protected addIcecream() {
    const cones: HTMLSpanElement[] = [];

    for (let i = 0; i < 4; i += 1) {
      const classes = ['level-6__cone'];
      if (i === 1 || i === 2) classes.push('cone-s');

      const cone = Level.createSpanWithImg(
        `cone-${i + 1}`,
        `./assets/images/cone.png`,
        ...classes,
      );
      cones.push(cone);
    }
    const creamer = Level.createSpanWithImg(
      'creamer',
      './assets/images/creamer.png',
      'creamer'
    );
    const choco: HTMLSpanElement[] = [];

    for (let i = 0; i < 5; i += 1) {
      const classes = ['level-6__ball'];
      if (i === 1 || i === 3) classes.push(...Level.pulseAnimClasses);
      if (i === 2) classes.push('mb--13', 'zi-minus-1');

      const ball = Level.createSpanWithImg(
        `choco-${i + 1}`,
        './assets/images/choco.png',
        ...classes,
      );
      choco.push(ball);
    }
    const berry: HTMLSpanElement[] = [];

    for (let i = 0; i < 2; i += 1) {
      const ball = Level.createSpanWithImg(
        `berry-${i + 1}`,
        './assets/images/strawberry.png',
        'level-6__ball',
        'mb--13',
        'zi-2',
        ...Level.pulseAnimClasses,
      );
      berry.push(ball);
    }
    const vanilla: HTMLSpanElement[] = [];

    for (let i = 0; i < 4; i += 1) {
      const classes = ['level-6__ball', 'ball-s', 'mb--13', 'zi-3'];
      if (i === 1 || i === 2) classes.push(...Level.pulseAnimClasses);

      const ball = Level.createSpanWithImg(
        `vanilla-${i + 1}`,
        './assets/images/vanilla.png',
        ...classes,
      );
      vanilla.push(ball);
    }

    const divs = Level.createElems('div', 5);
    const [div1, div2, div3, div4, div5] = divs;
    div1.append(vanilla[0], choco[0], cones[0]);
    div2.append(vanilla[1], berry[0], choco[1], cones[1]);
    div3.append(choco[2], creamer);
    div4.append(vanilla[2], berry[1], choco[3], cones[2]);
    div5.append(vanilla[3], choco[4], cones[3]);
    super.addIcecream(...divs);
  }
}

levelList.push({ name: SixthLevel.template, hash: '#level-6' });

export default SixthLevel;
