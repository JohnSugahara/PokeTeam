module.exports = {
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  reporters: [
    "default",
    ["jest-html-reporter", {
      pageTitle: "Relatório de Testes",
      outputPath: "./reports/test-report.html"
    }]
  ]
};
