SauceDemo – Playwright E2E Automation
📌 Overview

End-to-End (E2E) automation framework built with Playwright + TypeScript for the SauceDemo application.

🛠 Tech Stack

Playwright

TypeScript

Page Object Model (POM)

ESLint

GitHub Actions (CI)

SonarQube / SonarCloud

📂 Project Structure
GitHub Actions
.github/workflows/
- ci.yml        → CI pipeline (lint + tests)
- build.yml     → SonarQube analysis

Test Base
src/base/
- BaseTest.ts   → Playwright base configuration

Test Data (Fixtures)
src/fixtures/data/
- users.data.ts
- products.data.ts
- checkout.data.ts

Page Objects (POM)
src/pages/
- BasePage.ts
- LoginPage.ts
- ProductsPage.ts
- CartPage.ts
- CheckoutPage.ts

Test Suites
src/tests/
- login.spec.ts
- products.spec.ts
- cart.spec.ts
- e2e.spec.ts

Utilities
src/utils/
- assertions.ts

🔐 Environment Variables

Sensitive data is stored securely.

Local (.env)
STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
LOCKED_USER=locked_out_user
LOCKED_PASSWORD=secret_sauce

GitHub Actions Secrets

STANDARD_USER

STANDARD_PASSWORD

LOCKED_USER

LOCKED_PASSWORD

SONAR_TOKEN

▶️ Run Tests
npx playwright test


HTML report:

npx playwright show-report

🤖 CI & Quality

CI workflow: lint + Playwright tests

SonarQube workflow: code quality, duplication, Quality Gate

👉 SonarQube is intentionally isolated from CI execution.

✅ Best Practices

Page Object Model

Centralized assertions

Secure secrets management

CI automation

Clean & maintainable code

