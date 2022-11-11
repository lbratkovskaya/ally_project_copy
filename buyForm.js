class BuyForm {
  constructor(formNode, parentButton, purchaseItem) {
    this.form = formNode;
    this.overlay = formNode.closest('.overlay');
    this.header = formNode.querySelector('h2');
    this.header.textContent = purchaseItem?.itemTitle;
    this.submit = formNode.querySelector('[type="submit"]');
    this.close = formNode.querySelector('#form-close');

    this.parentButton = parentButton;
    this.purchaseItem = purchaseItem;

    this.focusableElements = [];
    formNode.querySelectorAll('.focusable').forEach((el) => {
      el.tabIndex = -1;

      el.addEventListener('click', () => {
        this.focusElement(el)
      })
      this.focusableElements.push(el);
    })
    this.focusableElements[0].tabIndex = 0;
    this.focusableElements[0].focus();
    this.focusedElement = this.focusableElements[0];

    this.form.addEventListener('click', this.handleFormClick.bind(this));
    this.form.addEventListener('keydown', this.handleFormKeydown.bind(this));

    this.submit.addEventListener('click', this.handleClick.bind(this));
    this.submit.addEventListener('keydown', this.handleKeydown.bind(this));

    this.close.addEventListener('click', this.handleCloseClick.bind(this));
    this.close.addEventListener('keydown', this.handleCloseKeydown.bind(this));

    this.overlay.addEventListener('click', this.handleOverlayClick.bind(this));

    const radioGroup = formNode.querySelector('[role="radiogroup"]');
    new RadioGroup(radioGroup);

    this.nameField = new FieldValidation(this.form.querySelector('#buyer-name'), [{
      name: 'notNull',
      message: 'Представьтесь, пожалуйста'
    }]);

    this.emailField = new FieldValidation(this.form.querySelector('#buyer-email'), [
      {
        name: 'notNull',
        message: 'Заполните адрес электронной почты',
      },
      {
        name: 'emailFormat',
        message: 'Не смогли распознать формат электронной почты',
      }]);

    this.addressField = new FieldValidation(this.form.querySelector('#buyer-address'), [{
      name: 'notNull',
      message: 'По какому адресу нам привезти Ваш заказ?',
    }]);

    this.fields = [this.nameField, this.emailField, this.addressField];
  }

  closeForm = () => {
    /* reset errors & current focused item */
    this.form.querySelectorAll('.field-error').forEach((el) => el.textContent = null);
    this.fields.forEach((field) => {
      field.getFieldNode().value = null;
    });
    this.focusedElement = this.focusableElements[0];
    /* hide form */
    this.overlay.classList.add('hidden');
    this.parentButton.focus();
  }

  hasFieldsErrors = () => {
    return this.nameField.hasError() || this.emailField.hasError() || this.addressField.hasError()
  }

  focusPrev = () => {
    if (this.focusedElement === this.close) {
      this.focusElement(this.submit);
    } else {
      const currentIndex = this.focusableElements.indexOf(this.focusedElement);
      this.focusElement(this.focusableElements[currentIndex - 1]);
    }
  }

  focusNext = () => {
    if (this.focusedElement === this.submit) {
      this.focusElement(this.close);
    } else {
      const currentIndex = this.focusableElements.indexOf(this.focusedElement);
      this.focusElement(this.focusableElements[currentIndex + 1]);
    }
  }

  focusElement = (element) => {
    this.focusableElements.forEach((el) => {
      el.tabIndex = -1;
    })
    element.tabIndex = 0;
    element.focus();
    this.focusedElement = element;
  }

  submitForm = () => {
    this.fields.forEach((field) => field.validateField());

    if (this.hasFieldsErrors()) {
      const field = this.fields.find((field) => field.hasError())?.getFieldNode();
      this.focusElement(field);
      return;
    }
    this.closeForm();
    document.querySelector('#action-alert').textContent = `Вы заказали ${this.purchaseItem.itemTitle}`;
    setTimeout(() => {
      document.querySelector('#action-alert').textContent = null;
    }, 3000);
  }

  /* event handlers */
  handleClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.submitForm();
  }

  handleCloseClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.closeForm();
  }

  handleCloseKeydown(event) {
    switch (event.key) {
      case ' ':
      case 'Enter':
      case 'Escape':
        event.stopPropagation();
        event.preventDefault();
        this.closeForm();
        break;

      default:
        break;
    }
  }

  handleFormClick(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  handleFormKeydown(event) {
    switch (event.key) {
      case 'Escape':
        event.stopPropagation();
        event.preventDefault();
        this.closeForm();
        break;
      case 'Tab':
        event.shiftKey ? this.focusPrev() : this.focusNext();
        event.stopPropagation();
        event.preventDefault();
        break;

      default:
        break;
    }
  }

  handleKeydown(event) {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.stopPropagation();
        event.preventDefault();
        this.submitForm();
        break;
      case 'Escape':
        event.stopPropagation();
        event.preventDefault();
        this.closeForm();
        break;
      default:
        break;
    }
  }

  handleOverlayClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.closeForm();
  }
}