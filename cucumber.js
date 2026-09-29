/**
 * Configuración de Cucumber.
 * Usa ts-node para ejecutar los step definitions escritos en TypeScript
 */
const common = [
  '--require-module ts-node/register',
  '--require src/steps/**/*.ts',
  '--require src/support/**/*.ts',
  '--format progress-bar',
  '--format json:reports/cucumber-report.json',
  '--format summary',
].join(' ');

module.exports = {
  default: `${common} src/features/**/*.feature`,
};
