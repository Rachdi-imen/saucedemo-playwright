import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  // Configuration de base
  eslint.configs.recommended,
  
  // Configuration TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      // AJOUTER LES GLOBALS
      globals: {
        ...globals.node,  // Pour console, process, etc.
        ...globals.browser // Pour window, document, etc.
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      // Règles de base
      'no-console': 'off',  // DÉSACTIVER l'erreur console
      'curly': 'error',
      
      // Règles TypeScript
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error'
    }
  },
  
  // Ignorer certains fichiers
  {
    ignores: [
      'node_modules/',
      'dist/',
      'reports/',
      'screenshots/',
      'test-results/'
    ]
  }
];