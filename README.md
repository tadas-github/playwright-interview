# Playwright-Interview

## Overview
**Playwright-Interview** is an end-to-end (E2E) testing framework built using Playwright. It includes test automation for flight booking scenarios, authentication handling, API validation, and response mocking. The project is structured with fixtures, a global setup, and a base page model to enable modular and reusable test cases.

## Features
- **Parallel Execution**: Tests are executed in parallel for efficiency.
- **Shared Authentication Storage**: Uses `auth.json` to maintain authentication state.
- **E2E Flight Booking Tests**: Automates booking flights between London and Barcelona.
- **API Validation**: Validates backend responses.
- **Request Interception & Mocking**: Intercepts and mocks API responses dynamically.
- **Page Object Model (POM)**: Uses reusable page objects for better test maintainability.
- **Global Setup**: Handles authentication state setup before running tests.

## Project Structure
```
Playwright-interview/
├── src/
│   ├── pages/
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   ├── flight.page.ts
│   ├── e2e/
│   │   ├── flight-booking.e2e.ts
├── app.fixture.ts
├── config.ts
├── global-setup.ts
├── README.md
```

## Installation
```sh
npm install
```

## Running Tests
### Execute all tests
```sh
npx playwright test
```

### Run tests in parallel
```sh
npx playwright test --workers=4
```

### View test report
```sh
npx playwright show-report
```

## Configuration
Configuration is handled in `config.ts`, specifying settings such as parallel execution, retries, and browsers.

## Authentication Setup
Before running tests, authentication is handled using `global-setup.ts`, which:
1. Launches a browser.
2. Logs in using an authentication token.
3. Stores the authentication state in `auth.json`.

## Test Details
### Flight Booking E2E Tests
Tests verify:
- Flight details are correctly filled and submitted.
- Booking completion is validated via UI.
- API contains expected data.
- Mocked responses are applied correctly.

### API Validation
- Retrieves objects from `https://api.restful-api.dev/objects`.
- Ensures the backend contains exactly three objects with "Air" in the name.

### Request Interception & Mocking
- Intercepts `https://jsonplaceholder.typicode.com/todos/1`.
- Mocks the response with a custom title.

## Playwright Fixtures
The `app.fixture.ts` file extends Playwright’s test framework to include:
- `LoginPage`
- `FlightPage`

## Base Page Model
The `BasePage` class provides:
- Page navigation and verification.
- Abstract `elements` property for extending page objects.

## Future Enhancements
- Additional test cases for other booking scenarios.
- Support for mobile browsers.
- Extended API validation tests.


