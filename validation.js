class FieldValidation {
  constructor(field, validationTerms) {
    this.field = field;
    this.validationTerms = validationTerms;
    this.fieldErrorMessages = [];

    this.field.addEventListener('change', this.handleChange.bind(this));
    this.field.addEventListener('blur', this.handleBlur.bind(this));
  }

  hasError = () => {
    return this.fieldErrorMessages.length > 0;
  }

  validate = (validationTerm) => {
    switch (validationTerm.name) {
      case 'notNull':
        return !this.field.value && validationTerm.message;

      case 'emailFormat':
        const match = /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/.test(this.field.value);
        return !!this.field.value && !match && validationTerm.message;

    }
  }

  validateField = () => {
    // reset errors
    this.fieldErrorMessages = [];
    this.validationTerms.forEach((valTerm) => {
      const message = this.validate(valTerm);
      !!message && this.fieldErrorMessages.push(message);
    });

    this.field.closest('div').querySelector('.field-error').textContent = this.fieldErrorMessages.join('\n');
  }

  handleChange() {
    this.validateField();
  }

  handleBlur() {
    this.validateField();
  }
}