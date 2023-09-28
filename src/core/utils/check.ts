import { lastLevel } from '../app';

function checkUserInput(value: string, correctElems: NodeListOf<Element>) {
  try {
    const userElems = document.querySelectorAll(`.html-code__layout ${value}`);
    if (userElems.length !== correctElems.length) return false;
    return [...userElems].every((el, i) => el === correctElems[i]);
  } catch (err) {
    return false;
  }
}

function shake(element: HTMLElement) {
  const input = document.querySelector('.code-file__input');
  element.classList.add('animate__animated', 'animate__shakeX');
  setTimeout(
    () => element.classList.remove('animate__animated', 'animate__shakeX'),
    500
  );
  if (input instanceof HTMLInputElement) input?.focus();
}

// function takeOffIcecream(correctElems: NodeListOf<Element>) {
//   correctElems.forEach((el) => {
//     const icecreamItem = Array.from(
//       document.querySelectorAll(
//         `.demo-block__table [data-title='${el.outerHTML}']`
//       )
//     ).filter((elem) => !elem.classList.contains('animate__bounceOutUp'))[0];

//     if (icecreamItem instanceof HTMLElement) {
//       icecreamItem.classList.add('animate__animated', 'animate__bounceOutUp');
//     }
//   });
// }
function takeOffIcecream() {
  const icecreamItems = document.querySelectorAll('.demo-block__table .animate__pulse');
  icecreamItems.forEach((item) => {
    item.classList.remove('animate__infinite');
    item.classList.add('animate__bounceOutUp');
  });
}

function checkIsWin() {
  let isWin = localStorage.length === lastLevel + 1;
  if (isWin) {
    const LevelStatuses: string[] = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && key !== 'currentLevel' && key !== 'length') {
        const status = localStorage.getItem(key);
        if (status) LevelStatuses.push(status);
      }
    }
    isWin = LevelStatuses.every((status) => status === 'done');
  }
  return isWin;
}

const winScreen = document.querySelector('.win');
const Popup = document.querySelector('.win__popup');

function showWinScreen() {
  if (!(winScreen instanceof HTMLElement) || !(Popup instanceof HTMLElement)) return;
  setTimeout(() => {
    Popup.style.top = '0';
    winScreen.style.zIndex = '2';
    winScreen.style.opacity = '1';
  }, 500)
}

function hideWinScreen() {
  const closePopupBtn = document.querySelector('.win__close');
  if (!(winScreen instanceof HTMLElement) || !(Popup instanceof HTMLElement) || !(closePopupBtn instanceof HTMLElement)) return;
  closePopupBtn.classList.add('animate__animated', 'animate__hinge');
  setTimeout(() => {
    Popup.style.top = '-50vw';
    winScreen.style.zIndex = '-1';
    winScreen.style.opacity = '0';
  }, 2000);
  setTimeout(() => closePopupBtn.classList.remove('animate__animated', 'animate__hinge'), 2500);
}

export { checkUserInput, shake, takeOffIcecream, checkIsWin, showWinScreen, hideWinScreen };
