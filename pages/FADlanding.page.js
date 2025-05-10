// playwright-dev-page.js
const { expect } = require('@playwright/test');
const fadData=require('./fad.data.js');

exports.FADpage = class FADpage {

  /**
   * @param {import('@playwright/test').Page} page
   */

   constructor(page) {
    this.page = page;
    this.fadMenu=page.locator('#header-nav-fad');
    this.findPrimaryCare=page.locator('#primary-care-doctor-drawer-open');
    this.findAspecialist=page.locator('#specialist-doctor-drawer-open > span')
    this.findDoctorByName=page.locator('#doctor-drawer-open')
  }

  async gotoSharpHome() {
    await this.page.goto(fadData.sharpURL);
    await expect(this.page).toHaveTitle(fadData.sharpTitle);
  }

  async isVisible () {
    await expect(this.fadMenu).toBeVisible();
  }

  async goToFADmenu (){
    this.fadMenu.click()
    await expect(this.page).toHaveTitle(fadData.title);
    // await expect(this.findPrimaryCare).toBeVisible();
    // await expect(this.findAspecialist).toBeVisible();
    // await expect(this.findDoctorByName).toBeVisible();
  }

}