import { Level, setStatus } from './templates/level';
import FirstLevel from '../levels/first-lvl';
import SecondLevel from '../levels/second-lvl';
import ThirdLevel from '../levels/third-lvl';
import FourthLevel from '../levels/fourth-lvl';
import FifthLevel from '../levels/fifth-lvl';
import SixthLevel from '../levels/sixth-lvl';
import SeventhLevel from '../levels/seventh-lvl';
import { toggleActiveLink, createLevelNav } from './components/nav';
import * as check from './utils/check';

const enum LevelIds {
  FIRST_LEVEL = 'level-1',
  SECOND_LEVEL = 'level-2',
  THIRD_LEVEL = 'level-3',
  FOURTH_LEVEL = 'level-4',
  FIFTH_LEVEL = 'level-5',
  SIXTH_LEVEL = 'level-6',
  SEVENTH_LEVEL = 'level-7',
}

const lastLevel = 7;
let isHelpPressed = false;
const input = document.querySelector('.code-file__input');
const prev: HTMLAnchorElement | null = document.querySelector(
  '.aside-nav__arrow_prev'
);
const next: HTMLAnchorElement | null = document.querySelector(
  '.aside-nav__arrow_next'
);

function getHash() {
  const currentLevel = localStorage.getItem('currentLevel');
  let { hash } = window.location;
  if (hash === '' && !currentLevel) hash = '#level-1';
  else if (hash === '' && currentLevel) hash = `#${currentLevel}`;
  return hash;
}

class App {
  static levelInstance: Level;

  static renderNewLevel(idLevel: string) {
    let level: Level | null = null;

    switch (idLevel) {
      case LevelIds.FIRST_LEVEL:
        level = new FirstLevel();
        break;
      case LevelIds.SECOND_LEVEL:
        level = new SecondLevel();
        break;
      case LevelIds.THIRD_LEVEL:
        level = new ThirdLevel();
        break;
      case LevelIds.FOURTH_LEVEL:
        level = new FourthLevel();
        break;
      case LevelIds.FIFTH_LEVEL:
        level = new FifthLevel();
        break;
      case LevelIds.SIXTH_LEVEL:
        level = new SixthLevel();
        break;
      case LevelIds.SEVENTH_LEVEL:
        level = new SeventhLevel();
        break;
      default:
        level = new FirstLevel();
        break;
    }
    if (level) level.render();

    if (!prev || !next) return level;
    if (idLevel === 'level-1') {
      next.classList.remove('inactive');
      prev.classList.add('inactive');
    } else if (idLevel === `level-${lastLevel}`) {
      next.classList.add('inactive');
      prev.classList.remove('inactive');
    } else {
      next.classList.remove('inactive');
      prev.classList.remove('inactive');
    }

    if (input instanceof HTMLInputElement) {
      input.value = '';
      input.classList.add('glowing');
      input.focus();
      input?.addEventListener('input', () => {
        if (input.value === '') {
          input.classList.add('glowing');
        } else input.classList.remove('glowing');
      });
    }
    isHelpPressed = false;
    App.levelInstance = level;
    return level;
  }

  static enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.levelInstance = App.renderNewLevel(hash);
      localStorage.setItem('currentLevel', hash);
    });
  }

  static enableNavArrows() {
    if (!prev || !next) return;

    prev.addEventListener('click', () => {
      const hash = getHash();
      const levelNum = Number(hash.slice(-1));

      if (levelNum > 1) {
        prev.href = `${hash.slice(0, -1)}${levelNum - 1}`;

        const activeLink = document.querySelector('.levels__link.active');
        const currentLink = activeLink?.previousElementSibling;

        if (currentLink instanceof HTMLAnchorElement) {
          toggleActiveLink(currentLink);
        }
      }
    });

    next.addEventListener('click', () => {
      const hash = getHash();
      const levelNum = Number(hash.slice(-1));

      if (levelNum < lastLevel) {
        next.href = `${hash.slice(0, -1)}${levelNum + 1}`;

        const activeLink = document.querySelector('.levels__link.active');
        const currentLink = activeLink?.nextElementSibling;

        if (currentLink instanceof HTMLAnchorElement) {
          toggleActiveLink(currentLink);
        }
      }
    });
  }

  static addInputListeners() {
    const codeEditor = document.querySelector('.code-editor');
    const asideTitle = document.querySelector('.header-aside__level');
    const closePopupBtn = document.querySelector('.win__close');
    const enter: HTMLAnchorElement | null =
      document.querySelector('.code-file__btn');
    const getlevelNumber = () =>
      Number(localStorage.getItem('currentLevel')?.slice(-1));

    if (
      !(input instanceof HTMLInputElement) ||
      !(codeEditor instanceof HTMLElement) ||
      !(asideTitle instanceof HTMLElement)
    )
      return;

    const handleEnter = () => {
      const { correctElems } = App.levelInstance;
      if (!correctElems) return;
      if (!input.value) {
        check.shake(codeEditor);
        return;
      }
      const isCorrect = check.checkUserInput(input.value, correctElems);
      if (isCorrect) {
        // check.takeOffIcecream(correctElems);
        check.takeOffIcecream();

        const activeLink = document.querySelector('.levels__link.active');
        const currentLevel = localStorage.getItem('currentLevel');
        const levelStatus = isHelpPressed ? 'with-help' : 'done';

        if (currentLevel && activeLink instanceof HTMLElement) {
          localStorage.setItem(currentLevel, levelStatus);
          setStatus(activeLink, currentLevel);
          setStatus(asideTitle, currentLevel);
        }

        const isWin = check.checkIsWin();
        if (isWin) check.showWinScreen();

        if (getlevelNumber() < lastLevel && !isWin) {
          setTimeout(() => {
            const hash = getHash();
            const levelNum = getlevelNumber();
            window.location.href = `${hash.slice(0, -1)}${levelNum + 1}`;

            const currentLink = activeLink?.nextElementSibling;
            if (currentLink instanceof HTMLAnchorElement) {
              toggleActiveLink(currentLink);
            }
          }, 1000);
        }
      } else {
        check.shake(codeEditor);
      }
    };
    enter?.addEventListener('click', handleEnter);
    input?.addEventListener('keyup', (e) => {
      if (e instanceof KeyboardEvent && e.code === 'Enter') {
        handleEnter();
      }
    });
    codeEditor?.addEventListener('click', () => input.focus());
    closePopupBtn?.addEventListener('click', () => check.hideWinScreen());
  }

  static enableHelp() {
    if (!(input instanceof HTMLInputElement)) return;

    function enterCorrectSelector(selector: string) {
      if (!(input instanceof HTMLInputElement)) return;
      input.value = '';
      for (let i = 0; i < selector.length; i += 1) {
        setTimeout(() => {
          input.value += selector[i];
        }, 300 * i);
      }
    }
    const helpBtn = document.querySelector('.code-file__help');
    helpBtn?.addEventListener('click', () => {
      const { correctSelector } = App.levelInstance;
      enterCorrectSelector(correctSelector);
      input.classList.remove('glowing');
      isHelpPressed = true;
    });
  }

  static run() {
    const currentLevel = localStorage.getItem('currentLevel');
    if (currentLevel) {
      App.levelInstance = App.renderNewLevel(currentLevel);
    } else {
      localStorage.setItem('currentLevel', 'level-1');
      App.levelInstance = App.renderNewLevel('level-1');
    }

    App.enableRouteChange();
    App.enableNavArrows();
    createLevelNav();
    App.addInputListeners();
    App.enableHelp();
  }
}

export { App, lastLevel, getHash };
