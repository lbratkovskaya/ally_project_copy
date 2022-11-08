class Checkbox {
  constructor(checkboxNode) {
    this.checkboxNode = checkboxNode;
    this.checkboxNode.tabIndex = 0;

    if (!this.checkboxNode.getAttribute('aria-checked')) {
      this.checkboxNode.setAttribute('aria-checked', 'false');
    }

    this.checkboxNode.addEventListener('keydown', this.onKeydown.bind(this));
    this.checkboxNode.addEventListener('click', this.onClick.bind(this));
  }

  toggleCheckbox = () => {
    if (this.checkboxNode.getAttribute('aria-checked') === 'true') {
      this.checkboxNode.setAttribute('aria-checked', 'false');
      this.checkboxNode.removeAttribute('checked');
    } else {
      this.checkboxNode.setAttribute('aria-checked', 'true');
      this.checkboxNode.setAttribute('checked', true);
    }
  }

  onKeydown(event) {
    switch (event.key) {
      case ' ':
        event.stopPropagation();
        event.preventDefault();
        this.toggleCheckbox();
        break;

      default:
        break;
    }
  }

  onClick() {
    this.toggleCheckbox();
  }
}