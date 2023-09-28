import { App } from '../app';
import { setStatus } from '../templates/level';
import levelList from '../../levels/level-list';

function toggleActiveLink(currentLink: HTMLAnchorElement | null) {
  let activeLink = document.querySelector('.levels__link.active');

  if (currentLink) {
    activeLink?.classList.remove('active');
    currentLink.classList.add('active');
    activeLink = currentLink;
    localStorage.setItem('currentLevel', currentLink.href.replace(/.*#/, ''));
  }
}

// function enableNavigation(): void {
//   const asideContent = document.querySelector('.aside__content');
//   const levels = document.querySelector('.levels');
//   const dropdownArrow = document.querySelector('.aside__triangle');
//   const burger: HTMLDivElement | null =
//     document.querySelector('.aside-nav__burger');

//   const mql = window.matchMedia('(max-width: 910px)');
//   mql.addEventListener('change', () => {
//     burger?.classList.remove('active');
//     levels?.classList.remove('active');
//   });

//   levels?.addEventListener('click', (e) => {
//     const { target } = e;
//     const link: HTMLAnchorElement | null =
//       target instanceof HTMLElement ? target.closest('a') : null;

//     const itsLevelLink = link && link.classList.contains('levels__link');

//     if (itsLevelLink && levels) {
//       e.stopPropagation();
//       levels.classList.toggle('active');
//       burger?.classList.remove('active');
//       dropdownArrow?.classList.remove('active');
//       if (mql.matches) asideContent?.classList.remove('active');
//       toggleActiveLink(link);
//     }
//   });
//   burger?.addEventListener('click', (e) => {
//     e.stopPropagation();
//     burger.classList.toggle('active');
//     if (mql.matches) {
//       asideContent?.classList.toggle('active');
//     } else {
//       levels?.classList.toggle('active');
//     }
//   });
//   dropdownArrow?.addEventListener('click', () => {
//     if (dropdownArrow instanceof HTMLElement) {
//       dropdownArrow.classList.toggle('active');
//     }
//     levels?.classList.toggle('active');
//   })
// }
function createLevelNav(): void {
  const levelNav = document.querySelector('.levels__list');
  const resetBtn = document.querySelector('.levels__reset-btn');
  const asideContent = document.querySelector('.aside__content');
  const levelsBody = document.querySelector('.levels');
  const dropdownArrow = document.querySelector('.aside__triangle');
  const burger: HTMLDivElement | null =
    document.querySelector('.aside-nav__burger');
  const levels: HTMLAnchorElement[] = [];
  let firstLvlLink: HTMLAnchorElement;

  levelList.forEach((lvl, i) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    const levelId = `level-${i + 1}`;

    link.classList.add('levels__link');
    if (lvl.hash.slice(1) === localStorage.currentLevel) {
      link.classList.add('active');
    }

    link.textContent = lvl.name;
    link.href = lvl.hash;
    setStatus(link, levelId);

    link.append(li);
    levelNav?.append(link);

    if (!i) firstLvlLink = link;
    levels.push(link);
  });

  const mql = window.matchMedia('(max-width: 910px)');
  mql.addEventListener('change', () => {
    burger?.classList.remove('active');
    levelsBody?.classList.remove('active');
  });

  function addListenersOnNavItems() {
    levelsBody?.addEventListener('click', (e) => {
      const { target } = e;
      const link: HTMLAnchorElement | null =
        target instanceof HTMLElement ? target.closest('a') : null;
  
      const itsLevelLink = link && link.classList.contains('levels__link');
  
      if (itsLevelLink && levelsBody) {
        e.stopPropagation();
        levelsBody.classList.toggle('active');
        burger?.classList.remove('active');
        dropdownArrow?.classList.remove('active');
        if (mql.matches) asideContent?.classList.remove('active');
        toggleActiveLink(link);
      }
    });
    burger?.addEventListener('click', (e) => {
      e.stopPropagation();
      burger.classList.toggle('active');
      if (mql.matches) {
        asideContent?.classList.toggle('active');
      } else {
        levelsBody?.classList.toggle('active');
      }
    });
    dropdownArrow?.addEventListener('click', () => {
      if (dropdownArrow instanceof HTMLElement) {
        dropdownArrow.classList.toggle('active');
      }
      levelsBody?.classList.toggle('active');
    });
    resetBtn?.addEventListener('click', () => {
      localStorage.clear();
      App.renderNewLevel('level-1');
      burger?.classList.remove('active');
      levelsBody?.classList.remove('active');
      dropdownArrow?.classList.remove('active');
      asideContent?.classList.remove('active');
      toggleActiveLink(firstLvlLink);
      levels.forEach((lvl) => {
        setStatus(lvl, '');
      });
    });
  }
  addListenersOnNavItems();
}

export { createLevelNav, toggleActiveLink };
