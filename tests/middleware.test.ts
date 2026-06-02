import { test } from "node:test";
import assert from "node:assert";
import { validateEnv } from "../src/middleware";

// ============================================================================
// VALIDATE ENV TESTS
// ============================================================================

test("validateEnv - puerto válido", () => {
  process.env.PORT = "3000";
  const config = validateEnv();
  assert.strictEqual(config.PORT, 3000);
});

test("validateEnv - puerto por defecto", () => {
  delete process.env.PORT;
  const config = validateEnv();
  assert.strictEqual(config.PORT, 3000);
});

test("validateEnv - puerto inválido (no número)", () => {
  process.env.PORT = "abc";
  assert.throws(() => validateEnv(), /Invalid PORT environment variable/);
});

test("validateEnv - puerto negativo", () => {
  process.env.PORT = "-1";
  assert.throws(() => validateEnv(), /Invalid PORT environment variable/);
});

test("validateEnv - puerto muy alto", () => {
  process.env.PORT = "99999";
  assert.throws(() => validateEnv(), /Invalid PORT environment variable/);
});

test("validateEnv - puerto 1 (válido)", () => {
  process.env.PORT = "1";
  const config = validateEnv();
  assert.strictEqual(config.PORT, 1);
});

test("validateEnv - puerto 65535 (válido)", () => {
  process.env.PORT = "65535";
  const config = validateEnv();
  assert.strictEqual(config.PORT, 65535);
});

test("validateEnv - GEMINI_API_KEY definida", () => {
  process.env.GEMINI_API_KEY = "test-key-123";
  const config = validateEnv();
  assert.strictEqual(config.GEMINI_API_KEY, "test-key-123");
});

test("validateEnv - GEMINI_API_KEY no definida", () => {
  delete process.env.GEMINI_API_KEY;
  const config = validateEnv();
  assert.strictEqual(config.GEMINI_API_KEY, undefined);
});

test("validateEnv - NODE_ENV", () => {
  process.env.NODE_ENV = "production";
  const config = validateEnv();
  assert.strictEqual(config.NODE_ENV, "production");
});
