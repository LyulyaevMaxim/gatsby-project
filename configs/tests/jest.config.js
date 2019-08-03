const path = require('path'),
  root = path.resolve(__dirname, '../../')

module.exports = {
  testURL: `http://0.0.0.0y`,
  browser: true,
  roots: [`${root}/src`, `./__mocks__`],
  testPathIgnorePatterns: [`node_modules`, `.cache`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': `./jest-preprocess.js`,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: [`${root}/node_modules`, `${root}/src`],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    '^lodash-es$': 'lodash',
  },

  globals: {
    __PATH_PREFIX__: ``,
    'ts-jest': {
      tsConfig: `${root}/tsconfig.json`,
    },
  },
  setupFiles: [`./loadershim.js`],
  setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each'],
  bail: 1,
  notify: true,
  errorOnDeprecated: true,
  // resetModules: false,
  snapshotSerializers: ['jest-emotion'],
  // setupFilesAfterEnv: [`./setupEnzyme.js`],
  // resolver: `${root}/__tests__/resolver.js`
  prettierPath: `${root}/node_modules/prettier`,
  // automock: false,
  // clearMocks: false,
  // resetMocks: false,
  // restoreMocks: false,
  // unmockedModulePathPatterns: [],
  // collectCoverage: true,
  coverageDirectory: `./coverage/`,
  coverageReporters: ['json', 'lcov', 'text'],
  collectCoverageFrom: [`**/*.(ts|js)x?`],
  coveragePathIgnorePatterns: ['**/node_modules/**'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
    // "./src/reducers/**/*.js": {
    // "branches": 40,
    //   "statements": 40,
    // },
  },
}
