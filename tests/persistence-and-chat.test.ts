import assert from "node:assert/strict";
import test from "node:test";

import { PRELOADED_CYCLES } from "../src/data";
import { buildGeminiContents, normalizeChatHistory } from "../src/lib/chat";
import { parseStoredJson } from "../src/lib/storage";
import { isValidCycleArray } from "../src/lib/validation";

test("parseStoredJson falls back when stored content is corrupt", () => {
  const parsed = parseStoredJson("not-json", isValidCycleArray, PRELOADED_CYCLES);
  assert.equal(parsed, PRELOADED_CYCLES);
});

test("parseStoredJson rejects wrong shapes", () => {
  const parsed = parseStoredJson(JSON.stringify([{ unexpected: true }]), isValidCycleArray, PRELOADED_CYCLES);
  assert.equal(parsed, PRELOADED_CYCLES);
});

test("normalizeChatHistory keeps valid turns and trims noisy input", () => {
  const history = normalizeChatHistory(
    [
      { sender: "user", text: "hola" },
      { sender: "model", text: "respuesta" },
      { sender: "user", text: "" },
      { sender: "system", text: "ignore" },
    ],
    10,
  );

  assert.equal(history.length, 2);
  assert.deepEqual(history[0], { sender: "user", text: "hola" });
  assert.deepEqual(history[1], { sender: "model", text: "respuesta" });
});

test("buildGeminiContents appends the current prompt at the end", () => {
  const contents = buildGeminiContents([{ sender: "user", text: "quiero FP" }], "¿y DAM?");

  assert.equal(contents.at(-1)?.role, "user");
  assert.equal(contents.at(-1)?.parts[0].text, "¿y DAM?");
});
