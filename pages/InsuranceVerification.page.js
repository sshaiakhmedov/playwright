import { Base } from './Base.page.js';

export class InsuranceVerification extends Base {
  constructor(page) {
    super(page);
  }

  get firstNameInput() { return this.page.getByPlaceholder('First name'); }
  get lastNameInput() { return this.page.getByPlaceholder('Last name'); }
  get birthdateInput() { return this.page.getByPlaceholder('MM/DD/YYYY'); }
  get genderDropdown() { return this.page.getByRole('combobox', { name: 'Gender' }); }
  get insuranceCompanyDropdown() { return this.page.getByRole('combobox', { name: 'Insurance company' }); }
  get insurancePolicyNumberInput() { return this.page.getByPlaceholder('Insurance policy number'); }
  get policyholderYesRadio() { return this.page.getByRole('radio', { name: 'Yes' }); }
  get policyholderNoRadio() { return this.page.getByRole('radio', { name: 'No' }); }
  get continueButton() { return this.page.getByRole('button', { name: 'Continue' }); }

  get moreInformationHeading() { return this.page.getByText('We need more information'); }
  get verificationErrorText() { return this.page.getByText('We weren\'t able to verify your insurance.'); }

  get labels() {
    return {
      firstName: this.page.locator('label', { hasText: 'First name' }),
      lastName: this.page.locator('label', { hasText: 'Last name' }),
      birthdate: this.page.locator('label', { hasText: 'Birthdate' }),
      gender: this.page.locator('label', { hasText: 'Gender' }),
      insuranceCompany: this.page.locator('label', { hasText: 'Insurance company' }),
      insurancePolicyNumber: this.page.locator('label', { hasText: 'Insurance policy number' }),
      policyholder: this.page.locator('legend', { hasText: 'Are you the policyholder?' }),
    };
  }

  get dropdownOptions() {
    return this.page.getByRole('option');
  }

  getOptionByName(optionName) {
    return this.page.getByRole('option', { name: optionName, exact: true });
  }
}
