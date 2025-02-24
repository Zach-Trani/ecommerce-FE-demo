# View Live Ecommerce App
### https://lively-moss-09bc30c10.4.azurestaticapps.net/
---

### To Deploy: 
* verify requests are made to backend url and not locally
* npm run build
* push to github
* wait for Azure Static Web Apps CI/CD to complete
* refresh static web app

---

* app/ - Global state, providers, and config

  * App.js - Main app entry, handles routes

  * routes.js - (Optional) Centralized route definitions

  * store.js - (If using Redux/Zustand) Global state management

  * AppProviders.js - Wrapping app with global providers

  * config.js - Global configuration settings

  * constants.js - Static values (e.g., route names, currency symbols)

  * ThemeProvider.js - Handles global theming (dark/light mode)

  * apiClient.js - Axios or Fetch wrapper for API calls

  * utils.js - Helper functions used across the app

* components/ - Reusable global components

  * Navbar.js - Navigation bar

  * Footer.js - Footer section

  * Button.js - Generic button component

  * Modal.js - Generic modal component

  * Spinner.js - Loading spinner

* features/ - Feature-based modules

  * products/ - Product-related logic

    * components/

      * HomePage.js - Displays all products

      * ProductPage.js - Displays a single product

      * ProductList.js - List of products

    * api/

      * productApi.js - API calls related to products

    * utils/ - (Optional) Helper functions for products

  * cart/ - Shopping cart-related logic

    * components/

      * CartPage.js - Displays items in the cart

      * CartItem.js - Individual cart item component

    * utils/ - (Optional) Cart-related utilities

  * checkout/ - Checkout and payment process

    * components/

      * CheckoutPage.js - Handles checkout process

    * utils/ - (Optional) Checkout-related utilities

* index.js - Entry point of the app, renders App.js

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
# ecommerce-FE-demo
