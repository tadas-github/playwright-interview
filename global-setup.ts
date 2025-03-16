import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from './src/pages/login.page';

export default async function globalSetup(config: FullConfig) {
    const filePath = path.resolve("auth.json");
    const AUTH_TOKEN = "UD0GMC5hwpi22qw77jwuGxUZMD2Kpa"; //Public

    if (fs.existsSync(filePath)) {
        console.log("✅ Auth state already exists, skipping login.");
        return;
    }

    console.log("🔹 Launching browser...");
    const browser = await chromium.launch({ headless: false }); // headless off
    const context = await browser.newContext();
    const page = await context.newPage();

    const baseURL = config.projects[0].use.baseURL || "https://cypress-interview-private.vercel.app/";

    console.log(`🔹 Navigating to: ${baseURL}`);
    await page.goto(baseURL, { waitUntil: "domcontentloaded" });

    // Reuse page objects
    const loginPage = new LoginPage(page);

    console.log("🔹 Verifying login page is active...");
    await loginPage.verifyCorrectPageActive();

    console.log("🔹 Performing login...");
    await loginPage.login(AUTH_TOKEN);

    console.log("🔹 Waiting for login confirmation...");
    await page.waitForURL("**/flight", { timeout: 15000 });

    console.log("🔹 Saving authentication state...");
    await context.storageState({ path: filePath });

    await browser.close();
    console.log("✅ Authentication state saved to auth.json.");
}
