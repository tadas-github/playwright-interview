import { expect } from "@playwright/test";
import { test } from "../app.fixture"

// Shared storage example
test.use({storageState: "auth.json"});

//Parallel Example
test.describe.parallel("Flight book E2E Suite", () => {
    test("should be able to book a return flight from London to Barcelona", async ({ app, request, page }) => {
        await app.flightPage.open();
        await test.step("fill in flight details", async () => {
            const flightDetails = {
                from: "London Heathrow (LHR), United Kingdom",
                to: "Barcelona El Prat (BCN), Spain",
                class: "Business",
                passengers: "2 adults",
            }
            await app.flightPage.fillInFlightDetailsAndSubmit(flightDetails);
        });

        await test.step("verify booking is completed succesfully", async () => {
            await expect(app.flightPage.elements.successView.label).toBeVisible();
        });

        await test.step("verify backend has 3 objects", async () => {
            type Mobile = {
                id: string,
                name: string,
                data: {} 
            }
            const res = await request.get("https://api.restful-api.dev/objects");
            
            const items: Mobile[] = await res.json();
            const airItems = items.filter((item) => item.name.includes("Air"));
            expect(airItems.length).toEqual(3);
        });

        await test.step("intercept and mock response", async () => {
            const res = await (await (request.get("https://jsonplaceholder.typicode.com/todos/1"))).json();
            console.log(res);
            await page.route("https://jsonplaceholder.typicode.com/todos/1", async route => {
                await route.fulfill({
                    body: JSON.stringify({
                        title: "Mocked title"
                    }),
                });
            });
        });
    });

    //E2E UI Exampel
    test("should be able to book a return flight from Barcelona to London", async ({ app, request, page }) => {
        await app.flightPage.open();
        await test.step("fill in flight details", async () => {
            const flightDetails = {
                from: "Barcelona El Prat (BCN), Spain",
                to: "London Heathrow (LHR), United Kingdom",
                class: "Business",
                passengers: "2 adults",
            }
            await app.flightPage.fillInFlightDetailsAndSubmit(flightDetails);
        });

        await test.step("verify booking is completed succesfully", async () => {
            await expect(app.flightPage.elements.successView.label).toBeVisible();
        });

        // Get Example
        await test.step("verify backend has 3 objects", async () => {
            type Mobile = {
                id: string,
                name: string,
                data: {} 
            }
            const res = await request.get("https://api.restful-api.dev/objects");
            
            const items: Mobile[] = await res.json();
            const airItems = items.filter((item) => item.name.includes("Air"));
            expect(airItems.length).toEqual(3);
        });

        //Intercept & Mocking
        await test.step("intercept and mock response", async () => {
            const res = await (await (request.get("https://jsonplaceholder.typicode.com/todos/1"))).json();
            console.log(res);
            await page.route("https://jsonplaceholder.typicode.com/todos/1", async route => {
                await route.fulfill({
                    body: JSON.stringify({
                        title: "Mocked title"
                    }),
                });
            });
        });
    });
});