module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(puppeteer|bootstrap)/)',
  ],
  collectCoverage: true,  // Asegúrate de que la recopilación de cobertura esté habilitada
  coverageDirectory: 'coverage',  // El directorio donde se almacenarán los informes de cobertura
  coverageReporters: ['lcov', 'text'],  // Asegúrate de que `lcov` esté en los reporteros
  coveragePathIgnorePatterns: ['/node_modules/'],  // Ignora los directorios que no te interesen
  
};