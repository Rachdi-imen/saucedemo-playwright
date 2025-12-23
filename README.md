 SauceDemo – Playwright E2E Automation
📌 Overview

This project is an End-to-End (E2E) test automation framework built with Playwright and TypeScript for the SauceDemo application.

It demonstrates:

clean and maintainable UI automation

Page Object Model (POM)

CI automation with GitHub Actions

code quality analysis with SonarQube

🛠 Tech Stack

Playwright

TypeScript

Page Object Model (POM)

ESLint

GitHub Actions (CI)

Playwright HTML Reporter

SonarQube / SonarCloud

📁 Project Structure
.github/workflows/
├── ci.yml            # CI pipeline (lint + tests)
└── build.yml         # SonarQube quality analysis

src/
├── base/             # Test base configuration
│   └── BaseTest.ts
│
├── fixtures/         # Test data
│   └── data/
│       ├── users.data.ts
│       ├── products.data.ts
│       └── checkout.data.ts
│
├── pages/            # Page Object Model
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/            # Test suites
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   └── e2e.spec.ts
│
└── utils/            # Reusable assertions & helpers
    └── assertions.ts

🔐 Environment Variables

Sensitive data is never hardcoded.

Local setup

Create a .env file at the project root:

STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
LOCKED_USER=locked_out_user
LOCKED_PASSWORD=secret_sauce

GitHub Actions

Add the following Repository Secrets:

STANDARD_USER

STANDARD_PASSWORD

LOCKED_USER

LOCKED_PASSWORD

SONAR_TOKEN

🚀 Installation
npm install
npx playwright install

▶️ Run Tests

Run all tests:

npx playwright test


Open HTML report:

npx playwright show-report

🤖 CI & Quality
CI Pipeline

The CI workflow:

installs dependencies

runs ESLint

executes Playwright tests

uploads test reports

SonarQube

A separate workflow runs:

static code analysis

code quality & duplication checks

Quality Gate validation

This separation keeps the CI fast and the quality process independent.

🧪 Testing Strategy

End-to-End user scenarios

Centralized assertions (utils/assertions.ts)

No code duplication

Clear and readable test cases

✅ Best Practices Applied

<<<<<<< HEAD
Page Object Model
=======
🔹Stratégie de test:
>>>>>>> 1551c916979eae0ce1b6c8f7f1c4b223cc41148c

Secure secrets management

Clean architecture

CI automation

Quality Gate enforcement

👩‍💻 Author

Imen Rashdi