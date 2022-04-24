import DOMInteraction from './domInteraction';

window.addEventListener('load', () => {
  const domInteraction = new DOMInteraction();
  domInteraction.setListeners();
});
