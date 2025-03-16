import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page, "/");
    }

    get elements() {
        return {
            tokenInputField: this.page.getByTestId('auth-code-id'),
            submitBtn: this.page.getByTestId('submit-form-id'),
        }
    }

    async login(token: string) {
        await this.elements.tokenInputField.fill(token);
        await this.elements.submitBtn.click();
    }
}