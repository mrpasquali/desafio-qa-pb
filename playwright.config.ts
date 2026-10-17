import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// Converte os arquivos .feature (Gherkin) em testes do Playwright.
const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['steps/**/*.ts'],
  language: 'pt',
});

export default defineConfig({
  testDir,

  // O site de produção limita o número de requisições por IP (HTTP 429).
  // Por isso os testes rodam um de cada vez, e uma falha pontual ganha novas tentativas.
  workers: 1,
  fullyParallel: false,
  retries: 2,

  timeout: 60_000,
  expect: { timeout: 10_000 },

  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'https://www.pagbrasil.com',
    locale: 'pt-BR',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      // Viewport de desktop: o menu "Nossas soluções" testado é o da versão desktop.
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
  ],
});