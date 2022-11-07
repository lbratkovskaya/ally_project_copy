class BuyButton {
  constructor(button, purchaseItem) {

    this.purchaseItem = purchaseItem;

    button.addEventListener('keydown', this.handleKeydown.bind(this));
    button.addEventListener('click', this.handleClick.bind(this));
  }

  openBuyForm() {
    const overlay = document.querySelector('.overlay');
    const form = overlay.querySelector('form');

    overlay.classList.remove('hidden');
    new BuyForm(form, this.purchaseItem);
  }

  /* event handlers */
  handleKeydown(event) {
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