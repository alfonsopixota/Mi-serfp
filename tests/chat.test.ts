import { test } from "node:test";
import assert from "node:assert";
import {
  validateChatMessage,
  normalizeChatHistory,
  buildGeminiContents,
  ChatTurn,
} from "../src/lib/chat";

// ============================================================================
// VALIDATE CHAT MESSAGE TESTS
// ============================================================================

test("validateChatMessage - válido", () => {
  const result = validateChatMessage("Hola, ¿qué es FP Dual?");
  assert.strictEqual(result, null);
});

test("validateChatMessage - no es string", () => {
  const result = validateChatMessage(123);
  assert.strictEqual(
    result,
    "El mensaje debe ser una cadena de texto."
  );
});

test("validateChatMessage - null", () => {
  const result = validateChatMessage(null);
  assert.strictEqual(
    result,
    "El mensaje debe ser una cadena de texto."
  );
});

test("validateChatMessage - undefined", () => {
  const result = validateChatMessage(undefined);
  assert.strictEqual(
    result,
    "El mensaje debe ser una cadena de texto."
  );
});

test("validateChatMessage - vacío", () => {
  const result = validateChatMessage("");
  assert.strictEqual(result, "El mensaje no puede estar vacío.");
});

test("validateChatMessage - solo espacios", () => {
  const result = validateChatMessage("   ");
  assert.strictEqual(result, "El mensaje no puede estar vacío.");
});

test("validateChatMessage - muy corto (2 caracteres)", () => {
  const result = validateChatMessage("Hi");
  assert.strictEqual(
    result,
    "El mensaje debe tener al menos 3 caracteres."
  );
});

test("validateChatMessage - mínimo válido (3 caracteres)", () => {
  const result = validateChatMessage("Hola");
  assert.strictEqual(result, null);
});

test("validateChatMessage - muy largo (>2000 caracteres)", () => {
  const longMessage = "a".repeat(2001);
  const result = validateChatMessage(longMessage);
  assert.strictEqual(
    result,
    "El mensaje no puede exceder 2000 caracteres."
  );
});

test("validateChatMessage - máximo válido (2000 caracteres)", () => {
  const maxMessage = "a".repeat(2000);
  const result = validateChatMessage(maxMessage);
  assert.strictEqual(result, null);
});

// ============================================================================
// NORMALIZE CHAT HISTORY TESTS
// ============================================================================

test("normalizeChatHistory - no es array", () => {
  const result = normalizeChatHistory("not an array");
  assert.deepStrictEqual(result, []);
});

test("normalizeChatHistory - null", () => {
  const result = normalizeChatHistory(null);
  assert.deepStrictEqual(result, []);
});

test("normalizeChatHistory - array vacío", () => {
  const result = normalizeChatHistory([]);
  assert.deepStrictEqual(result, []);
});

test("normalizeChatHistory - válido", () => {
  const history: ChatTurn[] = [
    { sender: "user", text: "Hola" },
    { sender: "model", text: "¡Hola! Soy SerFP" },
  ];
  const result = normalizeChatHistory(history);
  assert.deepStrictEqual(result, history);
});

test("normalizeChatHistory - filtra entradas inválidas", () => {
  const history = [
    { sender: "user", text: "Hola" },
    { sender: "invalid", text: "esto se ignora" }, // sender inválido
    { sender: "model", text: "" }, // texto vacío
    { sender: "model", text: "Válido" },
  ];
  const result = normalizeChatHistory(history);
  assert.strictEqual(result.length, 2);
  assert.deepStrictEqual(result[0], { sender: "user", text: "Hola" });
  assert.deepStrictEqual(result[1], { sender: "model", text: "Válido" });
});

test("normalizeChatHistory - limita a maxTurns", () => {
  const history: ChatTurn[] = Array.from({ length: 30 }, (_, i) => ({
    sender: i % 2 === 0 ? "user" : "model",
    text: `Mensaje ${i}`,
  }));
  const result = normalizeChatHistory(history, 20);
  assert.strictEqual(result.length, 20);
  // Debe mantener los últimos 20
  assert.deepStrictEqual(result[0], history[10]);
  assert.deepStrictEqual(result[19], history[29]);
});

test("normalizeChatHistory - maxTurns custom", () => {
  const history: ChatTurn[] = [
    { sender: "user", text: "1" },
    { sender: "model", text: "2" },
    { sender: "user", text: "3" },
    { sender: "model", text: "4" },
    { sender: "user", text: "5" },
  ];
  const result = normalizeChatHistory(history, 2);
  assert.strictEqual(result.length, 2);
  assert.deepStrictEqual(result[0], { sender: "model", text: "4" });
  assert.deepStrictEqual(result[1], { sender: "user", text: "5" });
});

// ============================================================================
// BUILD GEMINI CONTENTS TESTS
// ============================================================================

test("buildGeminiContents - vacío", () => {
  const result = buildGeminiContents([], "Hola");
  assert.strictEqual(result.length, 1);
  assert.deepStrictEqual(result[0], {
    role: "user",
    parts: [{ text: "Hola" }],
  });
});

test("buildGeminiContents - con historia", () => {
  const history: ChatTurn[] = [
    { sender: "user", text: "¿Qué es FP?" },
    { sender: "model", text: "La FP es..." },
  ];
  const result = buildGeminiContents(history, "¿Y FP Dual?");
  assert.strictEqual(result.length, 3);
  assert.deepStrictEqual(result[0], {
    role: "user",
    parts: [{ text: "¿Qué es FP?" }],
  });
  assert.deepStrictEqual(result[1], {
    role: "model",
    parts: [{ text: "La FP es..." }],
  });
  assert.deepStrictEqual(result[2], {
    role: "user",
    parts: [{ text: "¿Y FP Dual?" }],
  });
});

test("buildGeminiContents - respeta orden de historia", () => {
  const history: ChatTurn[] = [
    { sender: "user", text: "Primer mensaje" },
    { sender: "model", text: "Primera respuesta" },
    { sender: "user", text: "Segundo mensaje" },
    { sender: "model", text: "Segunda respuesta" },
  ];
  const result = buildGeminiContents(history, "Tercer mensaje");
  assert.strictEqual(result.length, 5);
  for (let i = 0; i < history.length; i++) {
    assert.strictEqual(result[i].role, history[i].sender);
    assert.strictEqual(result[i].parts[0].text, history[i].text);
  }
  assert.strictEqual(result[4].role, "user");
  assert.strictEqual(result[4].parts[0].text, "Tercer mensaje");
});
