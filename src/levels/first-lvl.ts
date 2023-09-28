import { Level } from '../core/templates/level';
import levelList from './level-list';

class FirstLevel extends Level {
  protected levelId = 'level-1';

  static template = 'A';

  public textObject = {
    mainTitle: 'Select the cones',
    asideTitle: `Level 1 of ${this.lastLevel}`,
    selectorType: 'Type Selector',
    shortDesc: 'Select elements by their type',
    template: FirstLevel.template,
    longDesc:
      'Selects all elements of type <span class="code-fragment">A</span>. Type refers to the type of tag, so <x-tag>div</x-tag>, <x-tag>p</x-tag> and <x-tag>ul</x-tag> are all different element types.',
    examples: [
      '<span class="code-fragment">div</span> selects all <x-tag>div</x-tag> elements.',
      '<span class="code-fragment">p</span> selects all <x-tag>p</x-tag> elements.',
    ],
  };

  protected elemsForHTMLCodeBlock = [
    {
      divId: 'cone-1',
      tag: 'cone',
    },
    {
      divId: 'cone-2',
      tag: 'cone',
    },
    {
      divId: 'cone-3',
      tag: 'cone',
    },
  ];

  public correctSelector = 'cone';

  protected addIcecream() {
    const cones: HTMLSpanElement[] = [];
  
    for (let i = 0; i < 3; i += 1) {
      const cone = Level.createSpanWithImg(
        `cone-${i + 1}`,
        './assets/images/cone.png',
        'level-1__cone',
        'animate__animated',
        'animate__pulse',
        'animate__infinite',
      );
      cones.push(cone);
    }
    super.addIcecream(...cones);
  }
}

levelList.push({ name: FirstLevel.template, hash: '#level-1' });

export default FirstLevel;
