import { Level } from '../core/templates/level';
import levelList from './level-list';

class FifthLevel extends Level {
  protected levelId = 'level-5';

  static template = 'A.className';

  public textObject = {
    mainTitle: 'Select all the small balls of berry ice cream',
    asideTitle: `Level 5 of ${this.lastLevel}`,
    selectorType: '',
    shortDesc: 'Combine the Class Selector',
    template: FifthLevel.template,
    longDesc:
      'You can combine the class selector with other selectors, like the type selector.',
    examples: [
      '<span class="code-fragment">ul.important</span> selects all <x-tag>ul</x-tag> elements that have <span class="code-fragment">class="important"</span>',
      '<span class="code-fragment">big.wide</span> selects all elements with <span class="code-fragment">id="big"</span> that also have <span class="code-fragment">class="wide"</span>',
    ],
  };

  protected elemsForHTMLCodeBlock = [
    {
      divId: 'creamer',
      tag: 'creamer',
      nested: [
        {
          divId: 'berry-1',
          tag: 'berry',
          class: 'small',
        },
        {
          divId: 'berry-2',
          tag: 'berry',
        },
      ],
    },
    {
      divId: 'cone-1',
      tag: 'cone',
      nested: [
        {
          divId: 'vanilla',
          tag: 'vanilla',
        },
      ],
    },
    {
      divId: 'cone-2',
      tag: 'cone',
      nested: [
        {
          divId: 'choco',
          tag: 'choco',
          class: 'small',
        },
      ],
    },
    {
      divId: 'berry-3',
      tag: 'berry',
      class: 'small',
    },
    {
      divId: 'cone-3',
      tag: 'cone',
      nested: [
        {
          divId: 'berry-4',
          tag: 'berry',
        },
      ],
    },
  ];

  public correctSelector = 'berry.small';

  protected addIcecream() {
    const creamer = Level.createSpanWithImg(
      'creamer',
      './assets/images/creamer.png',
      'creamer'
    );

    const cones: HTMLSpanElement[] = [];

    for (let i = 0; i < 3; i += 1) {
      const cone = Level.createSpanWithImg(
        `cone-${i + 1}`,
        `./assets/images/${i === 1 ? 'fancy-' : ''}cone.png`,
        'level-5__cone'
      );
      cones.push(cone);
    }

    const berry1 = Level.createSpanWithImg(
      'berry-1',
      './assets/images/strawberry.png',
      'level-5__ball',
      'ball-s',
      'mb--13',
      ...Level.pulseAnimClasses
    );
    const berry2 = Level.createSpanWithImg(
      'berry-2',
      './assets/images/strawberry.png',
      'level-5__ball',
      'mb--13',
      'zi-minus-1',
    );
    const berry3 = Level.createSpanWithImg(
      'berry-3',
      './assets/images/strawberry.png',
      'level-5__ball',
      'ball-s',
      'ball-wo-cone',
      ...Level.pulseAnimClasses
    );
    const berry4 = Level.createSpanWithImg(
      'berry-5',
      './assets/images/strawberry.png',
      'level-5__ball'
    );

    const vanilla = Level.createSpanWithImg(
      'vanilla',
      './assets/images/vanilla.png',
      'level-5__ball'
    );
    const choco = Level.createSpanWithImg(
      'choco',
      './assets/images/choco.png',
      'level-5__ball',
      'ball-s',
      'mb--13'
    );

    const divs = Level.createElems('div', 4);
    const [div1, div2, div3, div4] = divs;

    div1.append(berry1, berry2, creamer);
    div2.append(vanilla, cones[0]);
    div3.append(choco, cones[1]);
    div4.append(berry4, cones[2]);
    super.addIcecream(div1, div2, div3, berry3, div4);
  }
}

levelList.push({ name: FifthLevel.template, hash: '#level-5' });

export default FifthLevel;
