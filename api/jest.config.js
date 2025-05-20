export default {
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.(ts|tsx|js)$': 'babel-jest',
    },
    testEnvironment: 'node',
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.ts$': '$1',
    },
    setupFilesAfterEnv: ['./src/utils/test/testSetup.ts'],
};