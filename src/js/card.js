export default class Card {
  static getCard() {
    return `<div class="card">
      <div class="close"></div>
      <div placeholder="Type something..." class="divtext" contenteditable></div>
    </div>`;
  }
}
