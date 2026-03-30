import { test as setup, expect } from '../../util/fixtures.js';
import fs from 'fs';

const authFile = '.auth/user.json';

setup('authenticate and save state', async ({ demoblazeHomePage, page }) => {
  // Use environment variables for credentials
  const USERNAME = process.env.DEMOBLAZE_USERNAME;
  const PASSWORD = process.env.DEMOBLAZE_PASSWORD;

  // Check if valid auth state already exists not to trigger on each test run locally every time
  if (fs.existsSync(authFile)) {
    const stats = fs.statSync(authFile);
    const mtimeMs = stats.mtimeMs;
    const now = Date.now();
    const ageHours = (now - mtimeMs) / (1000 * 60 * 60);

    // If the auth file is less than 24 hours old, skip the setup
    if (ageHours < 24) {
      console.log(`Auth file found (${ageHours.toFixed(2)} hours old). Skipping login setup.`);
      return;
    }
  }

  // 1. Navigate to the page
  await demoblazeHomePage.goto();

  // 2. Open login modal
  await demoblazeHomePage.loginModal.openLoginModal();
  await expect(demoblazeHomePage.loginModal.usernameInput).toBeVisible();

  // 3. Perform login
  await demoblazeHomePage.loginModal.login(USERNAME, PASSWORD);

  // 4. Verify login was successful (Welcome message is visible)
  await expect(demoblazeHomePage.welcomeMessage).toBeVisible();
  await expect(demoblazeHomePage.welcomeMessage).toHaveText(`Welcome ${USERNAME}`);

  // 5. Save the authentication state (cookies and localStorage)
  await page.context().storageState({ path: authFile });
});
