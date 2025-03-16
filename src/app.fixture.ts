import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { FlightPage } from "./pages/flight.page";

type FlightBookApp = {
    loginPage: LoginPage,
    flightPage: FlightPage,
}

export const test = base.extend<{
    app: FlightBookApp,
}>({
    app: async ({ page }, use) => {
        await use( {
            loginPage: new LoginPage(page),
            flightPage: new FlightPage(page),
        });
    },
})