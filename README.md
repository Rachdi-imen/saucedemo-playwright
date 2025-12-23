#  SauceDemo – Playwright E2E Automation

##  Présentation
Ce projet est une suite de **tests automatisés End-to-End (E2E)** développée avec **Playwright** et **TypeScript** pour l’application **SauceDemo**.

Il a pour objectif de démontrer :
- une automatisation UI propre et maintenable
- l’utilisation du **Page Object Model**
- une intégration **CI avec GitHub Actions**
- de bonnes pratiques professionnelles (sécurité, structure, lisibilité)

---

## Stack technique
- **Playwright**
- **TypeScript**
- **Page Object Model (POM)**
- **ESLint**
- **GitHub Actions (CI)**
- **Playwright HTML Reporter**

---

## 📁 Structure du projet

.github/
└── workflows/
└── ci.yml # Pipeline CI (sans Sonar)

src/
├── base/
│ └── BaseTest.ts # Configuration Playwright
│
├── pages/
│ ├── BasePage.ts # Page de base
│ ├── LoginPage.ts
│ ├── ProductsPage.ts
│ ├── CartPage.ts
│ └── CheckoutPage.ts
│
├── tests/
│ ├── login.spec.ts
│ ├── products.spec.ts
│ ├── cart.spec.ts
│ ├── checkout.spec.ts
│ └── e2e.spec.ts # Parcours complet
│
├── utils/
│ └── assertions.ts # Assertions réutilisables
│
├── fixtures/
│ └── data/
│ ├── users.data.ts
│ └── products.data.ts
│
└── types/


---

##  Gestion des variables d’environnement

Les credentials ne sont **jamais codés en dur**.

### Local
Créer un fichier `.env` :
```env
STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
LOCKED_USER=locked_out_user
LOCKED_PASSWORD=secret_sauce


Le fichier .env doit être ignoré via .gitignore.

CI (GitHub Actions)

Définir les secrets dans :

Repository Settings → Secrets and variables → Actions


Secrets requis :

STANDARD_USER

STANDARD_PASSWORD

LOCKED_USER

LOCKED_PASSWORD

 Installation
1️ Cloner le projet
git clone https://github.com/<username>/saucedemo-playwright.git
cd saucedemo-playwright

2️ Installer les dépendances
npm install

3 Installer Playwright
npx playwright install

▶ Exécution des tests
Lancer tous les tests
npx playwright test

Lancer un test spécifique
npx playwright test src/tests/cart.spec.ts

Mode UI
npx playwright test --ui

 Rapports de tests

Après l’exécution :

npx playwright show-report


Un rapport HTML est généré automatiquement.

 CI – GitHub Actions

Le pipeline CI :

installe les dépendances

exécute ESLint

lance tous les tests Playwright

sauvegarde les rapports de tests

Fichier :

.github/workflows/ci.yml

 Stratégie de test

Tests E2E orientés parcours utilisateur

Assertions centralisées (utils/assertions.ts)

Tests indépendants

Pas de code duplication

Lisibilité et maintenabilité prioritaires

 Bonnes pratiques appliquées

Page Object Model

Séparation tests / logique métier

Secrets sécurisés

CI automatisée

Code linté

Tests stables et reproductibles

👩 Auteur

Imen Rashdi