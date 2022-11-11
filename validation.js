class FieldValidation {
  constructor(field, validationTerms) {
    this.field = field;
    this.validationTerms = validationTerms;
    this.fieldErrorMessages = [];

    this.field.addEventListener('input', this.handleInput.bind(this));
    this.field.addEventListener('change', this.handleChange.bind(this));
    this.field.addEventListener('blur', this.handleBlur.bind(this));
  }

  getFieldNode = () => {
    return this.field;
  }

  hasError = () => {
    return this.fieldErrorMessages.length > 0;
  }

  validate = (validationTerm) => {
    switch (validationTerm.name) {
      case 'notNull':
        return ! String.prototype.trim.call(this.field.value) && validationTerm.message;

      case 'emailFormat':
        const match = /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/.test(this.field.value);
        return !!this.field.value && !match && validationTerm.message;

    }
  }

  validateField = (event) => {
    if (event && event.target !== this.field) {
      return;
    }
    // reset errors
    this.fieldErrorMessages = [];
    this.validationTerms.forEach((valTerm) => {
      const message = this.validate(valTerm);
      !!message && this.fieldErrorMessages.push(message);
    });

    this.field.closest('div').querySelector('.field-error').textContent = this.fieldErrorMessages.join('\n');
  }

  handleChange(event) {
    this.validateField(event);
  }

  handleBlur(event) {
    this.validateField(event);
  }

  handleInput() {
    this.field.closest('div').querySelector('.field-error').textContent = null;
  }
}