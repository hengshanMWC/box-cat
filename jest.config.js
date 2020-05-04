module.exports = {
  coverageDirectory: "coverage",
  testEnvironment: "node",
  roots: [
    "<rootDir>/test"
  ],
  testRegex: 'test/(.+)\\.test\\.(jsx?|tsx?)$',
  transform: {
      "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ['ts', 'js'],
}