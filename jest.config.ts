import type {Config} from "@jest/types"

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: [
        "<rootDir>/jest.setupTests.ts"
    ],
}
export default config;