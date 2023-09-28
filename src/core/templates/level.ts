import { lastLevel } from '../app';

type TextObject = {
  mainTitle: string;
  asideTitle: string;
  selectorType: string;
  shortDesc: string;
  template: string;
  longDesc: string;
  examples: string[];
};

type ElementHtml = {
  divId?: string;
  tag: string;
  class?: string;
  id?: string;
  nested?: ElementHtml[];
};

const HTMLCodeBlock = document.querySelector('.html-code');

const setStatus = (element: HTMLElement, levelId: string) => {
  const status = localStorage.getItem(levelId);
  let imgName;
  switch (status) {
    case null:
      imgName = 'check';
      break;
    case 'done':
      imgName = 'check-done';
      break;
    case 'with-help':
      imgName = 'check-with-help';
      break;
    default:
      break;
  }
  element.style.setProperty('--check-img', `url(./assets/icons/${imgName}.svg)`);
}

abstract class Level {
  protected lastLevel = lastLevel;

  protected table = document.querySelector('.demo-block__table');

  static pulseAnimClasses = ['animate__animated', 'animate__pulse', 'animate__infinite'];

  public textObject: TextObject = {
    mainTitle: 'mainTitle',
    asideTitle: 'asideTitle',
    selectorType: 'selectorType',
    shortDesc: 'shortDesc',
    template: 'template',
    longDesc: 'longDesc',
    examples: ['example1', 'example2'],
  };

  protected abstract levelId: string;

  public abstract correctSelector: string;

  public correctElems: NodeListOf<Element> | undefined;

  protected getCorrectElems() {
    this.correctElems = document.querySelectorAll(
      `.html-code__layout ${this.correctSelector}`
    );
  }

  protected abstract elemsForHTMLCodeBlock: ElementHtml[];

  // protected elemsForHTMLCodeBlock: ElementHtml[] = [
  //   {
  //     tag: 'apple',
  //     nested: [
  //       {
  //         tag: 'plate',
  //         class: 'big',
  //         nested: [
  //           { tag: 'ball', id: 'jumping' },
  //           { tag: 'shop', id: 'grocery' },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  protected addIcecream(...elements: HTMLElement[]) {
    const { table } = this;
    if (table) {
      table.innerHTML = '<img class="table__table-img" src="./assets/images/table.png" alt="table-image" />';
    }
    const container = Level.createElemWithClasses('div', this.levelId);
    container.append(...elements);
    table?.append(container);
  }

  static createElems(tag: string, count: number) {
    const elems:HTMLElement[] = [];
    for (let i = 0; i < count; i += 1) {
      const elem = document.createElement(tag);
      elems.push(elem);
    }
    return elems;
  }

  static createElemWithClasses(tag: string, ...classes: string[]) {
    const element = document.createElement(tag);
    classes.forEach((str) => {
      element.classList.add(str);
    });
    return element;
  }

  static createTag(id: string) {
    const tag = document.querySelector<HTMLElement>(
      `.html-code [data-id=${id}]`
    );
    let openTag = '';
    if (tag) {
      openTag = tag.innerText.split('\n')[0].replace(/ \//g, '');
    }
    const closeTag = openTag?.replace(/</, '</').replace(/ .+/, '>');
    return openTag + closeTag;
  }

  static createSpanWithImg(id: string, src: string, ...classes: string[]) {
    const span = document.createElement('span');
    const img = Level.createElemWithClasses('img', ...classes);
    if (img instanceof HTMLImageElement) img.src = src;
    span.append(img);
    span.dataset.id = id;
    span.dataset.title = Level.createTag(span.dataset.id);
    Level.addHoverEffects(span);
    return span;
  }

  private addLevelDescrition() {
    const asideTitle = document.querySelector('.header-aside__level');
    const selectorType = document.querySelector('.info-aside__title');
    const shortDesc = document.querySelector('.info-aside__short-desc');
    const template = document.querySelector('.info-aside__template');
    const longDesc = document.querySelector('.info-aside__long-desc');
    const examples = document.querySelectorAll('.examples__example');

    if (asideTitle) asideTitle.textContent = this.textObject.asideTitle;
    if (selectorType) selectorType.textContent = this.textObject.selectorType;
    if (shortDesc) shortDesc.textContent = this.textObject.shortDesc;
    if (template) template.textContent = this.textObject.template;
    if (longDesc) longDesc.innerHTML = this.textObject.longDesc;
    if (examples) {
      examples.forEach((example, i) => {
        examples[i].innerHTML = this.textObject.examples[i];
      });
    }
    if (asideTitle instanceof HTMLElement) setStatus(asideTitle, this.levelId);
  }

  private addTodo() {
    const mainTitle = document.querySelector('.demo-block__task-desc');
    if (mainTitle) mainTitle.textContent = this.textObject.mainTitle;
  }

  private addHTMLCode(selfClosing = true, elems = this.elemsForHTMLCodeBlock) {
    if (HTMLCodeBlock && selfClosing) HTMLCodeBlock.innerHTML = '';

    function createTag(elements: ElementHtml[]) {
      const elemsToAppend: HTMLElement[] = [];
      for (let i = 0; i < elements.length; i += 1) {
        const elem = document.createElement('div');
        const obj = elements[i];
        if (obj.class !== 'table') Level.addHoverEffects(elem);
        if (obj.divId) elem.dataset.id = obj.divId;
        const elemClass = obj.class ? ` class="${obj.class}"` : '';
        const id = obj.id ? ` id="${obj.id}"` : '';
        const hasNastedTags = !!obj.nested;

        let openTag;
        if (hasNastedTags) openTag = `<${obj.tag}${elemClass}${id}>`;
        else if (selfClosing) openTag = `<${obj.tag}${elemClass}${id} />`;
        else openTag = `<${obj.tag}${elemClass}${id}></${obj.tag}>`;

        const closeTag = hasNastedTags ? `</${obj.tag}>` : '';

        elem.append(openTag);
        if (hasNastedTags && obj.nested) {
          elem.append(...createTag(obj.nested));
          elem.append(closeTag);
        }
        elemsToAppend.push(elem);
      }
      return elemsToAppend;
    }
    const elemsWithTable = [
      {
        tag: 'div',
        class: 'table',
        nested: elems,
      },
    ];
    if (selfClosing) {
      HTMLCodeBlock?.append(...createTag(elemsWithTable));
    } else return createTag(elemsWithTable);

    return undefined;
  }

  private addLayoutFromCode() {
    const layout = Level.createElemWithClasses('section', 'html-code__layout');
    const elems = this.addHTMLCode(false);
    if (elems) layout.append(...elems);
    layout.innerHTML = layout.innerText;
    HTMLCodeBlock?.append(layout);
  }

  static addHoverEffects(element: HTMLDivElement | HTMLSpanElement) {
    let relatedElem: Element | null;
    let area: string;

    if (element instanceof HTMLSpanElement) {
      area = '.html-code';
    } else {
      area = '.table';
    }
    element.addEventListener('mouseover', (e) => {
      e.stopPropagation();

      element?.classList.add('hover');
      relatedElem = document.querySelector(
        `${area} [data-id="${element?.dataset.id}"]`
      );
      relatedElem?.classList.add('hover');
    });
    element.addEventListener('mouseout', () => {
      element?.classList.remove('hover');
      relatedElem?.classList.remove('hover');
    });
  }

  public render() {
    this.addHTMLCode();
    this.addIcecream();
    this.addLevelDescrition();
    this.addTodo();
    this.addLayoutFromCode();
    this.getCorrectElems();
  }
}

export { Level, setStatus };
