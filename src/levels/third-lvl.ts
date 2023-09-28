import { Level } from '../core/templates/level';
import levelList from './level-list';

class ThirdLevel extends Level {
  static template = 'A B';

  protected levelId = 'level-3';

  public textObject = {
    mainTitle: 'Select the ball of chocolate ice cream inside the creamer',
    asideTitle: `Level 3 of ${this.lastLevel}`,
    selectorType: 'Descendant Selector',
    shortDesc: 'Select an element inside another element',
    template: ThirdLevel.template,
    longDesc:
      'Selects all <span class="code-fragment">B</span> inside of <span class="code-fragment">A</span>. <span class="code-fragment">B</span> is called a descendant because it is inside of another element.',
    examples: [
      '<span class="code-fragment">p  strong</span> selects all <x-tag>strong</x-tag> elements that are inside of any <x-tag>p</x-tag>',
      '<span class="code-fragment">#fancy  span</span> selects any <x-tag>span</x-tag> elements that are inside of the element with <span class="code-fragment">id="fancy"</span>',
    ],
  };

  protected elemsForHTMLCodeBlock = [
    {
      divId: 'creamer',
      tag: 'creamer',
      nested: [
        {
          divId: 'choco-1',
          tag: 'choco',
        },
      ],
    },
    {
      divId: 'cone-1',
      tag: 'cone',
      nested: [
        {
          divId: 'choco-2',
          tag: 'choco',
        },
      ],
    },
    {
      divId: 'cone-2',
      tag: 'cone',
    },
  ];

  public correctSelector = 'creamer choco';

  protected addIcecream() {

    const creamer = Level.createSpanWithImg(
      'creamer',
      './assets/images/creamer.png',
      'creamer'
    );

    const div1 = Level.createElemWithClasses('div');
    const div2 = Level.createElemWithClasses('div');

    const cone1 = Level.createSpanWithImg(
      'cone-1',
      './assets/images/cone.png',
      'level-3__cone'
    );

    const cone2 = Level.createSpanWithImg(
      'cone-2',
      './assets/images/cone.png',
      'level-3__cone'
    );

    const ball1 = Level.createSpanWithImg(
      'choco-1',
      './assets/images/choco.png',
      'level-3__ball',
      'mb--13',
      'zi-minus-1',
      'animate__animated',
      'animate__pulse',
      'animate__infinite',
    );

    const ball2 = Level.createSpanWithImg(
      'choco-2',
      './assets/images/choco.png',
      'level-3__ball',
    );
    div1.append(ball1, creamer);
    div2.append(ball2, cone1);
    super.addIcecream(div1, div2, cone2);
  }
}

levelList.push({ name: ThirdLevel.template, hash: '#level-3' });

export default ThirdLevel;
