import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class FlightPage extends BasePage {
    constructor(page: Page) {
        super (page, "/flight");
    }

    get elements() {
        return {
            form: {
                fromField: this.page.getByTestId('from-id'),
                toField: this.page.getByTestId('to-id'),
                classDropDown: this.page.getByTestId('travel-id'),
                passengerDropDown: this.page.getByTestId('passengers-id'),
                submitBtn: this.page.getByTestId('submit-form-id'),
            },
            successView: {
                label: this.page.getByTestId('flight-success-id'),
            }
        }
    }

    async fillInFlightDetailsAndSubmit(flightDetails) {
        await this.fillAndSelectAutoComplete(this.elements.form.fromField, flightDetails.from);
        await this.fillAndSelectAutoComplete(this.elements.form.toField, flightDetails.to);
        await this.elements.form.classDropDown.selectOption(flightDetails.class);
        await this.elements.form.passengerDropDown.selectOption(flightDetails.passengers);
        await this.elements.form.submitBtn.click();
    }

    async fillAndSelectAutoComplete(element: Locator, item: string) {
        await element.fill(item.substring(0,3));
        await this.page.getByText(item).click();
    } 
}