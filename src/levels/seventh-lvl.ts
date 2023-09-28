import { Level } from '../core/templates/level';
import levelList from './level-list';

class SeventhLevel extends Level {
  protected levelId = 'level-7';

  static template = 'A, B';

  public textObject = {
    // mainTitle: 'Select the small balls inside the fancy cone and inside the creamer',
    mainTitle: 'Select all the nested small balls',
    asideTitle: `Level 7 of ${this.lastLevel}`,
    selectorType: 'Comma Combinator',
    shortDesc: 'Combine, selectors, with... commas!',
    template: SeventhLevel.template,
    longDesc:
      'Thanks to Shatner technology, this selects all <span class="code-fragment">A</span> and <span class="code-fragment">B</span> elements. You can combine any selectors this way, and you can specify more than two.',
    examples: [
      '<span class="code-fragment">p, .fun</span> selects all <x-tag>p</x-tag> elements as well as all elements with <span class="code-fragment">class="fun"</span>',
      '<span class="code-fragment">a, p, div</span> selects all <x-tag>a</x-tag>, <x-tag>p</x-tag> and <x-tag>div</x-tag> elements',
    ],
  };

  protected elemsForHTMLCodeBlock = [
    {
      divId: 'choco-1',
      tag: 'choco',
      class: 'small',
    },
    {
      divId: 'cone-1',
      tag: 'cone',
      id: 'fancy',
      nested: [
        {
          divId: 'vanilla-1',
          tag: 'vanilla',
          class: 'small',
        },
        {
          divId: 'berry-1',
          tag: 'berry',
          class: 'small',
        },
        {
          divId: 'choco-2',
          tag: 'choco',
          class: 'small',
        },
        {
          divId: 'vanilla-2',
          tag: 'vanilla',
        },
      ]
    },
    {
      divId: 'creamer',
      tag: 'creamer',
      nested: [
        {
          divId: 'berry-2',
          tag: 'berry',
          class: 'small',
        },
        {
          divId: 'berry-3',
          tag: 'berry',
        },
      ]
    },
    {
      divId: 'vanilla-3',
      tag: 'vanilla',
    },
    {
      divId: 'cone-2',
      tag: 'cone',
    },
  ];

  public correctSelector = '#fancy .small, creamer .small';

  protected addIcecream() {
    const cone1 = Level.createSpanWithImg(
      'cone-1',
      './assets/images/fancy-cone.png',
      'level-7__cone',
    );
    const cone2 = Level.createSpanWithImg(
      'cone-2',
      './assets/images/cone.png',
      'level-7__cone',
    );
    const creamer = Level.createSpanWithImg(
      'creamer',
      './assets/images/creamer.png',
      'creamer',
    );
    const choco: HTMLSpanElement[] = [];

    for (let i = 0; i < 2; i += 1) {
      const classes = ['level-7__ball', 'ball-s'];
      if (!i) classes.push('ball-wo-cone');
      else classes.push('level-7__choco2', 'zi-2', ...Level.pulseAnimClasses);
      const ball = Level.createSpanWithImg(
        `choco-${i + 1}`,
        './assets/images/choco.png',
        ...classes,
      );
      choco.push(ball);
    }
    const vanilla: HTMLSpanElement[] = [];
    for (let i = 0; i < 3; i += 1) {
      const classes = ['level-7__ball'];
      if (!i) classes.push('ball-s', 'mb--13', 'zi-4', ...Level.pulseAnimClasses);
      else if (i === 1) classes.push('mb--13');
      else if (i === 2) classes.push('ball-wo-cone');

      const ball = Level.createSpanWithImg(
        `vanilla-${i + 1}`,
        './assets/images/vanilla.png',
        ...classes
      );
      vanilla.push(ball);
    }
    const berry: HTMLSpanElement[] = [];
    for (let i = 0; i < 3; i += 1) {
      const classes = ['level-7__ball'];
      if (i < 2) classes.push('ball-s', 'mb--13', 'zi-3', ...Level.pulseAnimClasses);
      else classes.push('mb--13', 'zi-minus-1');
      const ball = Level.createSpanWithImg(
        `berry-${i + 1}`,
        './assets/images/strawberry.png',
        ...classes
      );
      berry.push(ball);
    }
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    div1.append(vanilla[0], berry[0], choco[1], vanilla[1], cone1);
    div2.append(...berry.slice(1), creamer);

    super.addIcecream(choco[0], div1, div2, vanilla[2], cone2);
  }
}

levelList.push({ name: SeventhLevel.template, hash: '#level-7' });

export default SeventhLevel;
