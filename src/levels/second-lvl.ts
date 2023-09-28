import { Level } from '../core/templates/level';
import levelList from './level-list';

class SecondLevel extends Level {
  static template = '#id';

  protected levelId = 'level-2';

  public textObject = {
    mainTitle: 'Select the fancy cone',
    asideTitle: `Level 2 of ${this.lastLevel}`,
    selectorType: 'ID Selector',
    shortDesc: 'Select elements with an ID',
    template: SecondLevel.template,
    longDesc: 'Selects the element with a specific <span class="code-fragment">id</span>. You can also combine the ID selector with the type selector.',
    examples: ['<span class="code-fragment">#cool</span> selects any element with <span class="code-fragment">id="cool"</span>', '<span class="code-fragment">ul#long</span> selects <x-tag>ul id="long"</x-tag>'],
  };

  protected elemsForHTMLCodeBlock = [
    {
      divId: 'cone-1',
      tag: 'cone',
    },
    {
      divId: 'cone-2',
      tag: 'cone',
      id: 'fancy',
    },
    {
      divId: 'cone-3',
      tag: 'cone',
    },
    {
      divId: 'cone-4',
      tag: 'cone',
    },
  ];

  public correctSelector = '#fancy';

  protected addIcecream() {
    const cones: HTMLSpanElement[] = [];
    for (let i = 0; i < 4; i += 1) {
      let cone: HTMLElement;
      if (i === 1) {
        cone = Level.createSpanWithImg(
          'cone-2',
          './assets/images/fancy-cone.png',
          'level-2__cone',
          'animate__animated',
          'animate__pulse',
          'animate__infinite',
        );
      } else {
        cone = Level.createSpanWithImg('img', './assets/images/cone.png', 'level-2__cone');
      }
      cones.push(cone);
    }
    super.addIcecream(...cones);
  }
}

levelList.push({ name: SecondLevel.template, hash: '#level-2' });

export default SecondLevel;
