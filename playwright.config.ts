import { defineConfig } from "@playwright/test";

const appPort = Number(process.env.PLAYWRIGHT_APP_PORT || 4173);
const appHost = process.env.PLAYWRIGHT_APP_HOST || "127.0.0.1";

export default defineConfig({
  testDir: "tests/e2e",
  reporter: "line",
  use: {
    baseURL: `http://${appHost}:${appPort}`,
  },
  webServer: {
    command: `npm run build && npm run preview -- --host ${appHost} --port ${appPort}`,
    port: appPort,
    reuseExistingServer: true,
  },
});
