class BuyButton {
  constructor(button, purchaseItem) {

    this.button = button;
    this.purchaseItem = purchaseItem;

    button.addEventListener('keyup', this.handleKeyup.bind(this));
    button.addEventListener('click', this.handleClick.bind(this));
  }

  openBuyForm() {
    const overlay = document.querySelector('.overlay');
    const form = overlay.querySelector('form');

    overlay.classList.remove('hidden');
    new BuyForm(form, this.button, this.purchaseItem);
  }

  /* event handlers */
  handleKeyup(event) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.openBuyForm();
        break;

      case 'Space':
        event.preventDefault();
        break;

      default:
        break;
    }
  }

  handleClick() {
    this.openBuyForm();
  }
}