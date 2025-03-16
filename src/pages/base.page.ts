import { Page } from "@playwright/test";

export abstract class BasePage {
    readonly page: Page;
    path: string

    protected constructor(page: Page, path: string) {
        this.page = page;

        if (!path) { throw new Error("Must provide url path"); }

        this.path = path;
    }

    //I usually leave this to any
    abstract get elements();

    async open(overide = "") {
        await this.page.goto(!overide? this.path: overide);
        await this.page.waitForLoadState('domcontentloaded');
        await this.verifyCorrectPageActive();
    }

    async verifyCorrectPageActive() {
        await this.page.waitForURL(new RegExp(this.path), {
            waitUntil: 'networkidle',
        });
    }
}