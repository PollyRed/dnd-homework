import Card from './card';

export default class DOMInteraction {
  constructor() {
    this.boardLists = DOMInteraction.getBoardLists();
    this.restore();

    this.addButtons = DOMInteraction.getAddButtons();
    this.closeButtons = DOMInteraction.getCloseButtons();
    this.draggedItem = null;
    this.selectedItem = null;
    this.startX = 0;
    this.startY = 0;
  }

  restore() {
    for (let i = 0; i < this.boardLists.length; i += 1) {
      const boardListButton = this.boardLists[i].querySelector('.add-card');
      const cardTextsJSON = localStorage.getItem(`${i}`);
      if (cardTextsJSON !== '' && cardTextsJSON !== null) {
        const cardsTexts = JSON.parse(cardTextsJSON);
        for (const cardText of cardsTexts) {
          const card = Card.getCard();
          boardListButton.insertAdjacentHTML('beforebegin', card);
          boardListButton.previousElementSibling.querySelector('.divtext').innerText = cardText;
        }
      }
    }
  }

  static getAddButtons() {
    return Array.from(document.querySelectorAll('.add-card'));
  }

  static getCloseButtons() {
    return Array.from(document.querySelectorAll('.close'));
  }

  static getBoardLists() {
    return Array.from(document.querySelectorAll('.board-list'));
  }

  static closeButtonFunction(event) {
    event.preventDefault();
    event.currentTarget.parentNode.remove();
  }

  mouseDownFunction(e) {
    const target = e.target.closest('.card');
    if (!target) {
      return;
    }

    this.selectedItem = target;
    this.selectedItem.classList.add('list__item_selected');

    this.draggedItem = target.cloneNode(true);
    this.draggedItem.classList.add('list__item_dragged');

    const width = this.selectedItem.clientWidth;
    const height = this.selectedItem.clientHeight;
    const rect = this.selectedItem.getBoundingClientRect();

    const left = rect.left + 0;
    const top = rect.top + 0;
    this.startX = e.clientX;
    this.startY = e.clientY;

    this.draggedItem.style.width = `${width}px`;
    this.draggedItem.style.height = `${height}px`;
    this.draggedItem.style.top = `${top}px`;
    this.draggedItem.style.left = `${left}px`;

    if (!e.target.classList.contains('close')) {
      document.querySelector('.base').appendChild(this.draggedItem);
    }
  }

  mouseMoveFunction(e) {
    e.preventDefault();

    if (!this.selectedItem) {
      return;
    }

    document.body.style.cursor = 'grabbing';

    const rect = this.selectedItem.getBoundingClientRect();
    const left = rect.left + 0 + e.clientX - this.startX;
    const top = rect.top + 0 + e.clientY - this.startY;

    this.draggedItem.style.top = `${top}px`;
    this.draggedItem.style.left = `${left}px`;
  }

  mouseUpFunction(e) {
    e.preventDefault();
    if (!this.selectedItem) {
      return;
    }

    document.body.style.cursor = 'default';

    const x = e.clientX;
    const y = e.clientY;

    this.draggedItem.style.display = 'none';
    const changingItem = document.elementFromPoint(x, y);
    const parent = changingItem.closest('.board-list');

    try {
      if (changingItem && !changingItem.classList.contains('list-title') && parent) {
        parent.insertBefore(this.selectedItem, changingItem);
      }
    } catch (error) {
      // no action required
    }

    this.selectedItem.classList.remove('list__item_selected');
    this.selectedItem = null;
    this.draggedItem.remove();
    this.draggedItem = null;
  }

  mouseLeaveFunction() {
    if (!this.selectedItem) {
      return;
    }

    this.selectedItem.classList.remove('list__item_selected');
    this.selectedItem = null;

    this.draggedItem.remove();
    this.draggedItem = null;
  }

  setListeners() {
    window.addEventListener('unload', () => {
      for (let i = 0; i < this.boardLists.length; i += 1) {
        const cards = Array.from(this.boardLists[i].querySelectorAll('.divtext'));
        const texts = [];

        for (const card of cards) {
          texts.push(card.innerText);
        }

        localStorage.setItem(`${i}`, JSON.stringify(texts));
      }
    });
    document.addEventListener('mousedown', this.mouseDownFunction);
    document.addEventListener('mouseup', this.mouseUpFunction);
    document.addEventListener('mousemove', this.mouseMoveFunction);
    document.addEventListener('mouseleave', this.mouseLeaveFunction);

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
