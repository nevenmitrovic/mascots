export default {
  preset: "ts-jest/presets/js-with-ts-esm",
  testEnvironment: "node",
  roots: ["<rootDir>/src/tests/"],
  testMatch: ["**/src/tests/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    "^locations/(.*)$": "<rootDir>/src/locations/$1",
    "^interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
    "^middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
    "^errors/(.*)$": "<rootDir>/src/errors/$1",
    "^config/(.*)$": "<rootDir>/src/config/$1",
    "^services/(.*)$": "<rootDir>/src/services/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^animators/(.*)$": "<rootDir>/src/animators/$1",
    "^mascots/(.*)$": "<rootDir>/src/mascots/$1",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleFileExtensions: ["js", "ts", "json", "node"],
};
