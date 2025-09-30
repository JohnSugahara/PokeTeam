const path = require("path");

module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx"],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // ← ADICIONE ESTA LINHA
  reporters: [
    "default",
    ["jest-html-reporter", {
      pageTitle: "Relatório de Testes",
      outputPath: path.resolve(__dirname, "reports", "test-report.html")
    }]
  ]
};