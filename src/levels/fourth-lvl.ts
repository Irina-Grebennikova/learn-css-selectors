import { Level } from '../core/templates/level';
import levelList from './level-list';

class FourthLevel extends Level {
  protected levelId = 'level-4';

  static template = '.classname';

  public textObject = {
    mainTitle: 'Select the small ice cream balls inside the cones',
    asideTitle: `Level 4 of ${this.lastLevel}`,
    selectorType: 'Class Selector',
    shortDesc: 'Select elements by their class',
    template: FourthLevel.template,
    longDesc:
      'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
    examples: [
      '<span class="code-fragment">.neato</span> selects all elements with',
      '<span class="code-fragment">class="neato"</span>',
    ],
  };

  protected elemsForHTMLCodeBlock = [
    {
      divId: 'cone-1',
      tag: 'cone',
      nested: [
        {
          divId: 'choco-1',
          tag: 'choco',
          class: 'small',
        },
        {
          divId: 'vanilla-1',
          tag: 'vanilla',
        },
      ],
    },
    {
      divId: 'choco-2',
      tag: 'choco',
      class: 'small',
    },
    {
      divId: 'cone-2',
      tag: 'cone',
      nested: [
        {
          divId: 'vanilla-2',
          tag: 'vanilla',
          class: 'small',
        },
      ]
    },
  ];

  public correctSelector = 'cone .small';

  protected addIcecream() {
    // container.innerHTML = `
    // <div class="level-4">
    //   <div>
    //     <img class="level-4__ball ball-s mb--13 animate__animated animate__pulse animate__infinite" src="./assets/images/choco.png" alt="">
    //     <img class="level-4__ball" src="./assets/images/vanilla.png" alt="">
    //     <img class="level-4__cone" src="./assets/images/cone.png" alt="">
    //   </div>
    //   <img class="level-4__ball ball-central ball-s" src="./assets/images/choco.png" alt="">
    //   <div>
    //     <img class="level-4__ball ball-s animate__animated animate__pulse animate__infinite" src="./assets/images/vanilla.png" alt="">
    //     <img class="level-4__cone" src="./assets/images/cone.png" alt="">
    //   </div>
    // </div>`

    const cone1 = Level.createSpanWithImg(
      'cone-1',
      './assets/images/cone.png',
      'level-4__cone'
    );

    const cone2 = Level.createSpanWithImg(
      'cone-2',
      './assets/images/cone.png',
      'level-4__cone'
    );

    const div1 = document.createElement('div');
    const div2 = document.createElement('div');

    const choco1 = Level.createSpanWithImg(
      'choco-1',
      './assets/images/choco.png',
      'level-4__ball',
      'ball-s',
      'mb--13',
      'zi-2',
      'animate__animated',
      'animate__pulse',
      'animate__infinite',
    );
    const choco2 = Level.createSpanWithImg(
      'choco-2',
      './assets/images/choco.png',
      'ball-wo-cone',
      'ball-s',
      'level-4__ball',
    );
    const vanillaBig = Level.createSpanWithImg(
      'vanilla-1',
      './assets/images/vanilla.png',
      'level-4__ball',
    );
    const vanillaSmall = Level.createSpanWithImg(
      'vanilla-2',
      './assets/images/vanilla.png',
      'level-4__ball',
      'ball-s',
      'animate__animated',
      'animate__pulse',
      'animate__infinite',
    );
    div1.append(choco1, vanillaBig, cone1);
    div2.append(vanillaSmall, cone2);
    super.addIcecream(div1, choco2, div2);
  }
}

levelList.push({ name: FourthLevel.template, hash: '#level-4' });

export default FourthLevel;
