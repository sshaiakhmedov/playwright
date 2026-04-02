import { test, expect } from '../../../../util/fixtures.js';
import { SAME_DAY_CARE_DATA } from '../../../../data/sameDayCare.data.js';

test.describe('New Patient Insurance Form', () => {
  // Run these tests sequentially to prevent sharp.com form rate limiting in CI environments
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ homePage }) => {
    // Go to home page and navigate to same-day care
    await homePage.goto(SAME_DAY_CARE_DATA.HOME_URL);
    await homePage.topMainNavLinks.sameDayCare.click();
  });

  test('I\'m a new patient button opens insurance form and verifies all fields', {
    annotation: {
      type: 'issue',
      description: 'https://jira.example.com/browse/SHARP-1234',
    },
  }, async ({ sameDayCarePage, virtualCarePage, insuranceVerificationPage }) => {
    // Navigate to Virtual Care page
    await Promise.all([
      sameDayCarePage.page.waitForURL(SAME_DAY_CARE_DATA.VIRTUAL_CARE_URL_REGEX),
      sameDayCarePage.virtualCare.getStartedBtn.click(),
    ]);

    // Click 'I'm a new patient'
    await Promise.all([
      insuranceVerificationPage.page.waitForURL(SAME_DAY_CARE_DATA.INSURANCE_FORM.URL_REGEX),
      virtualCarePage.newPatientBtn.click(),
    ]);

    const form = insuranceVerificationPage;
    const data = SAME_DAY_CARE_DATA.INSURANCE_FORM;

    // Verify all fields are empty and active
    const inputs = [
      form.firstNameInput,
      form.lastNameInput,
      form.birthdateInput,
      form.insurancePolicyNumberInput,
    ];

    for (const input of inputs) {
      await expect(input).toBeVisible();
      await expect(input).toBeEnabled();
      await expect(input).toHaveValue('');
    }

    // Verify placeholders
    await expect(form.firstNameInput).toHaveAttribute('placeholder', data.PLACEHOLDERS.FIRST_NAME);
    await expect(form.lastNameInput).toHaveAttribute('placeholder', data.PLACEHOLDERS.LAST_NAME);
    await expect(form.birthdateInput).toHaveAttribute('placeholder', data.PLACEHOLDERS.BIRTHDATE);
    await expect(form.insurancePolicyNumberInput).toHaveAttribute('placeholder', data.PLACEHOLDERS.INSURANCE_POLICY_NUMBER);

    // Verify labels
    await expect(form.labels.firstName).toHaveText(data.LABELS.FIRST_NAME);
    await expect(form.labels.lastName).toHaveText(data.LABELS.LAST_NAME);
    await expect(form.labels.birthdate).toHaveText(data.LABELS.BIRTHDATE);
    await expect(form.labels.gender).toHaveText(data.LABELS.GENDER);
    await expect(form.labels.insuranceCompany).toHaveText(data.LABELS.INSURANCE_COMPANY);
    await expect(form.labels.insurancePolicyNumber).toHaveText(data.LABELS.INSURANCE_POLICY_NUMBER);
    await expect(form.labels.policyholder).toHaveText(data.LABELS.POLICYHOLDER);

    // Verify radio buttons are not preselected
    await expect(form.policyholderYesRadio).not.toBeChecked();
    await expect(form.policyholderNoRadio).not.toBeChecked();

    // Verify dropdowns
    const genderOptions = await form.getOptionsForDropdown(form.genderDropdown);
    expect(genderOptions).toEqual(data.GENDER_OPTIONS);

    const insuranceOptions = await form.getOptionsForDropdown(form.insuranceCompanyDropdown);
    expect(insuranceOptions).toEqual(data.INSURANCE_OPTIONS);
  });

  // Data-Driven Testing: Test the exact same Dummy Aetna flow for every available gender!
  const gendersToTest = SAME_DAY_CARE_DATA.INSURANCE_FORM.GENDER_OPTIONS.filter(g => g !== 'Select gender');

  for (const gender of gendersToTest) {
    test(`Negative: Dummy Aetna redirects to "We need more information" page [Gender: ${gender}]`, async ({ insuranceVerificationPage }) => {
      // DEEP LINK: Bypass the UI navigation steps to save execution time
      await insuranceVerificationPage.goto('https://portal.sharp.com/virtual-urgent-care/insurance');

      const form = insuranceVerificationPage;
      const invData = SAME_DAY_CARE_DATA.INSURANCE_FORM.INVALID_SUBMISSION_DATA;

      // Fill the standard inputs
      await form.firstNameInput.fill(invData.FIRST_NAME);
      await form.lastNameInput.fill(invData.LAST_NAME);
      await form.birthdateInput.fill(invData.BIRTHDATE);

      // Select Gender dynamically using the loop variable
      await form.genderDropdown.click();
      await form.getOptionByName(gender).click();

      // Select Insurance option
      await form.insuranceCompanyDropdown.click();
      await form.getOptionByName(invData.INSURANCE_COMPANY_SELECTION).click();

      await form.insurancePolicyNumberInput.fill(invData.INSURANCE_POLICY_NUMBER);
      await form.policyholderYesRadio.click();

      // Submit and verify that we hit the expected "We need more information" state page
      await form.continueButton.click();

      await expect(form.moreInformationHeading).toBeVisible({ timeout: 30000 }); // The form has a "Verifying..." spinner which is very slow in CI Docker
      await expect(form.moreInformationHeading).toHaveText(invData.EXPECTED_ERROR_HEADING);
      await expect(form.verificationErrorText).toBeVisible();
      await expect(form.verificationErrorText).toContainText(invData.EXPECTED_ERROR_TEXT);
    });
  }
});
