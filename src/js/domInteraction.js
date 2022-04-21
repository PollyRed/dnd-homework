import Card from './card';

export default class DOMInteraction {
  constructor() {
    this.addButtons = DOMInteraction.getAddButtons();
    this.closeButtons = DOMInteraction.getCloseButtons();
  }

  static getAddButtons() {
    return Array.from(document.querySelectorAll('.add-card'));
  }

  static getCloseButtons() {
    return Array.from(document.querySelectorAll('.close'));
  }

  static closeButtonFunction(event) {
    event.preventDefault();
    event.currentTarget.parentNode.remove();
  }

  setListeners() {
    for (const addButton of this.addButtons) {
      addButton.addEventListener('click', (event) => {
        event.preventDefault();

        const card = Card.getCard();
        event.currentTarget.insertAdjacentHTML('beforebegin', card);

        const close = event.currentTarget.previousElementSibling.querySelector('.close');
        close.addEventListener('click', DOMInteraction.closeButtonFunction);
      });
    }

    for (const closeButton of this.closeButtons) {
      closeButton.addEventListener('click', DOMInteraction.closeButtonFunction);
    }
  }
}
