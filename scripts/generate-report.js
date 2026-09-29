/**
 * Genera un reporte HTML legible a partir del JSON producido por Cucumber.
 * Uso: npm run report
 */
const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const jsonFile = path.join(__dirname, '..', 'reports', 'cucumber-report.json');

if (!fs.existsSync(jsonFile)) {
  console.error('No se encontró reports/cucumber-report.json. Ejecuta primero "npm test".');
  process.exit(1);
}

reporter.generate({
  theme: 'bootstrap',
  jsonFile,
  output: path.join(__dirname, '..', 'reports', 'cucumber-report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    'App Under Test': 'Sauce Demo',
    'Test Environment': 'https://www.saucedemo.com',
    Framework: 'Playwright + Cucumber (TypeScript)',
    Pattern: 'Page Object Model',
  },
});
