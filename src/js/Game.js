export default class Game {
  constructor() {
    this.score = 0;
    this.currentIndex = -1;
    this.missCounter = 0;
    this.fields = null;
    this.goblin = null;
    this.dead = null;
    this.lost = null;
    this.reset = null;
    this.init();
  }

  init() {
    this.fields = Array.from(document.querySelectorAll('.field'));
    this.goblin = document.createElement('div');
    this.goblin.classList.add('goblin');
    this.dead = document.getElementById('dead');
    this.lost = document.getElementById('lost');
    this.reset = document.querySelector('.reset');
    this.addListeners();
  }

  start() {
    const interval = setInterval(() => {
      if (document.querySelector('.goblin')) {
        document.querySelector('.goblin').remove();
        this.lost.textContent = this.missCounter;
      }

      let randomIndex = Math.floor(Math.random() * this.fields.length);
      while (randomIndex === this.currentIndex) {
        randomIndex = Math.floor(Math.random() * this.fields.length);
      }
      this.currentIndex = randomIndex;

      this.fields[randomIndex].appendChild(this.goblin);
      this.missCounter += 1;

      if (this.missCounter > 5) {
        alert('Game Over!');
        document.querySelector('.goblin').remove();
        clearInterval(interval);
      }
    }, 1000);
  }

  restart() {
    this.score = 0;
    this.currentIndex = -1;
    this.missCounter = 0;
    this.lost.textContent = this.missCounter;
    this.dead.textContent = this.score;
    this.start();
  }

  addListeners() {
    this.reset.addEventListener('click', (event) => {
      event.preventDefault();
      this.restart();
    });

    for (const field of this.fields) {
      field.addEventListener('click', (event) => {
        event.preventDefault();
        const goblinDiv = event.currentTarget.querySelector('.goblin');
        if (goblinDiv != null) {
          goblinDiv.remove();

          this.missCounter -= 1;
          if (this.missCounter < 0) {
            this.missCounter = 0;
          }

          this.score += 1;
          this.dead.textContent = this.score;
        }
      });
    }
  }
}
