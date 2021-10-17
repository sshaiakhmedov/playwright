const { test, expect } = require('@playwright/test');
const { FADpage } = require('../pages/FADlanding.page');
const { helpers }=require('../helpers/globalHelpers')

test.describe('Get to FAD landing page from Sharp.com Nav Menu', ()=>{
  test('Go to FAD landing from sharpCom Home', async ({ page }) => {
    const FAD=new FADpage(page);
    await FAD.gotoSharpHome();
    //await FAD.isVisible();
    await helpers.isVisible(FAD.fadMenu)
    await FAD.goToFADmenu();
  });
})

