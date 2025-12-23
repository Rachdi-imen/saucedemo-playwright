SauceDemo – Playwright E2E Automation
Présentation

Ce projet est une suite de tests automatisés End-to-End (E2E) développée avec Playwright et TypeScript pour l’application SauceDemo.

Il a pour objectif de démontrer :

une automatisation UI propre, maintenable et scalable

l’utilisation du Page Object Model (POM)

une intégration CI avec GitHub Actions

l’application de bonnes pratiques professionnelles
(sécurité, structure, lisibilité, qualité du code)

 Stack technique

Playwright

TypeScript

Page Object Model (POM)

ESLint

GitHub Actions (CI)

Playwright HTML Reporter

SonarQube / SonarCloud (analyse qualité)

 Structure du projet
       
📦.github
 ┗ 📂workflows
 ┃ ┣ 📜build.yml  # Analyse qualité SonarQube
 ┃ ┗ 📜ci.yml     # CI : lint + tests Playwright
 📦src
 ┣ 📂base
 ┃ ┗ 📜BaseTest.ts
 ┣ 📂fixtures
 ┃ ┗ 📂data
 ┃ ┃ ┣ 📜checkout.data.ts
 ┃ ┃ ┣ 📜products.data.ts
 ┃ ┃ ┗ 📜users.data.ts
 ┣ 📂pages
 ┃ ┣ 📜BasePage.ts
 ┃ ┣ 📜CartPage.ts
 ┃ ┣ 📜CheckoutPage.ts
 ┃ ┣ 📜LoginPage.ts
 ┃ ┗ 📜ProductsPage.ts
 ┣ 📂tests
 ┃ ┣ 📜cart.spec.ts
 ┃ ┣ 📜e2e.spec.ts
 ┃ ┣ 📜login.spec.ts
 ┃ ┗ 📜products.spec.ts
 ┗ 📂utils
 ┃ ┗ 📜assertions.ts


 Installation
npm install
npx playwright install

▶ Exécution des tests
Lancer tous les tests
npx playwright test

Afficher le rapport HTML
npx playwright show-report

 Intégration Continue (CI)
🔹 Workflow CI – Tests

Fichier : .github/workflows/ci.yml

Ce workflow :

installe les dépendances

exécute ESLint

lance tous les tests Playwright

génère et archive les rapports de tests

🔹 Workflow Qualité – SonarQube

Fichier : .github/workflows/build.yml

Ce workflow :

analyse la qualité du code

détecte bugs, duplications et code smells

applique un Quality Gate

peut faire échouer le pipeline si la qualité n’est pas conforme

=> Le workflow SonarQube est séparé du CI principal afin de :

garder un CI rapide

isoler la responsabilité qualité

faciliter la maintenance

🔹Stratégie de test

Tests E2E orientés parcours utilisateur

Assertions centralisées dans utils/assertions.ts

Page Object Model sans duplication

Tests lisibles, stables et maintenables

 Bonnes pratiques appliquées

Séparation claire des responsabilités

Pas de secrets en dur dans le code

CI automatisée

Analyse qualité indépendante

Code propre et évolutif

