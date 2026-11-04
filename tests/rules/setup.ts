import { beforeAll, afterAll, beforeEach } from "vitest";
import {
  destroyRulesTestEnvironment,
  initRulesTestEnvironment,
  resetRulesFirestore,
} from "./helpers";

beforeAll(async () => {
  await initRulesTestEnvironment();
}, 120_000);

afterAll(async () => {
  await destroyRulesTestEnvironment();
});

beforeEach(async () => {
  await resetRulesFirestore();
});
