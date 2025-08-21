## Getting Started with Playwright E2E Tests

To run the Playwright end-to-end tests, follow these steps:

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Playwright**: Playwright and its browsers are managed as `devDependencies` in `package.json`. They will be installed automatically when you install project dependencies.

### Installation

1.  **Install Dependencies**:

    Navigate to the project root directory and install the required Node.js packages:

    ```bash
    npm install
    ```

2.  **Install Playwright Browsers**:

    After installing the dependencies, install the Playwright browsers:

    ```bash
    npx playwright install
    ```

### Environment Variables

Create a `.env` file in the project root directory (if it doesn't already exist) with the following variables:

- `E2E_BASE_URL`: The base URL for your application under test (e.g., `http://localhost:3000`).
- `GENERATE_ALLURE`: Set to `true` to generate Allure reports (e.g., `GENERATE_ALLURE=true`). If not set or set to `false`, an HTML report will be generated.

  Example `.env` file:

  ```
  E2E_BASE_URL=http://localhost:3000
  GENERATE_ALLURE=true
  ```

- You can also specify your username & password if the app contains a login step.
  ```
  E2E_USERNAME=your_username
  E2E_PASSWORD=your_password
  ```

### Running Tests

Use the following commands to run the E2E tests:

- **Run all tests in headless mode (default)**:

  ```bash
  npm run test:e2e
  ```

- **Run tests with Playwright UI (interactive mode)**:

  ```bash
  npm run test:e2e:ui
  ```

### Reporting

- **HTML Report**: By default, an HTML report will be generated in the `e2e/test-output` directory. You can open it by running:

  ```bash
  npx playwright show-report e2e/test-output
  ```

- **Allure Report**: If `GENERATE_ALLURE` is set to `true` in your `.env` file, Allure reports will be generated in `e2e/allure-results`. To view the Allure report, you need to have Allure Commandline installed. Then run:

  ```bash
  allure serve e2e/allure-results
  ```

  If you don't have Allure Commandline, you can install it via npm:

  ```bash
  npm install -g allure-commandline --save-dev
  ```
