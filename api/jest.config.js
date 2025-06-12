export default {
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.(ts|tsx|js)$': 'babel-jest',
    },
    testEnvironment: 'node',
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.ts$': '$1',
    },
    projects: [
        {
            displayName: 'endpoints',
            setupFilesAfterEnv: ['./src/utils/test/testSetup.ts'],
            testMatch: ['**/test/handlers/**/*.test.ts']
        },
        {
            displayName: 'utils',
            testMatch: ['**/test/utils/**/*.test.ts']
        }
    ]
};