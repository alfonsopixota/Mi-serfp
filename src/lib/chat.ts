/**
 * Chat utility functions for SerFP AI Orientador
 * Handles validation, normalization, and content building for Gemini API
 */

export interface ChatTurn {
  sender: "user" | "model";
  text: string;
}

export interface GeminiContent {
  role: "user" | "model";
  parts: Array<{ text: string }>;
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isChatTurn(value: unknown): value is ChatTurn {
  return (
    isRecord(value) &&
    (value.sender === "user" || value.sender === "model") &&
    typeof value.text === "string" &&
    value.text.trim().length > 0
  );
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validates a chat message from user input
 * @param message - The message to validate
 * @returns Error message if invalid, null if valid
 */
export function validateChatMessage(message: unknown): string | null {
  // Check if message exists and is a string
  if (typeof message !== "string") {
    return "El mensaje debe ser una cadena de texto.";
  }

  const trimmed = message.trim();

  // Check if message is not empty
  if (trimmed.length === 0) {
    return "El mensaje no puede estar vacío.";
  }

  // Check minimum length (prevent spam)
  if (trimmed.length < 3) {
    return "El mensaje debe tener al menos 3 caracteres.";
  }

  // Check maximum length (prevent abuse)
  if (trimmed.length > 2000) {
    return "El mensaje no puede exceder 2000 caracteres.";
  }

  // Check for valid characters (basic sanity check)
  if (!isValidMessageContent(trimmed)) {
    return "El mensaje contiene caracteres no válidos.";
  }

  return null;
}

/**
 * Validates that message content is reasonable
 * @param text - The message text to validate
 * @returns true if valid, false otherwise
 */
function isValidMessageContent(text: string): boolean {
  // Allow alphanumeric, spaces, and common punctuation
  // This is a basic filter; adjust regex as needed
  const validPattern = /^[a-zA-Z0-9\s\p{L}\p{P}\p{M}]+$/u;
  return validPattern.test(text);
}

// ============================================================================
// NORMALIZATION
// ============================================================================

/**
 * Normalizes chat history from user input
 * Filters invalid entries and limits to max turns
 * @param value - The history value (should be array)
 * @param maxTurns - Maximum number of turns to keep (default: 20)
 * @returns Array of validated ChatTurns
 */
export function normalizeChatHistory(
  value: unknown,
  maxTurns: number = 20
): ChatTurn[] {
  // Ensure value is array
  if (!Array.isArray(value)) {
    return [];
  }

  // Filter valid chat turns and limit to maxTurns
  return value.filter(isChatTurn).slice(-maxTurns);
}

// ============================================================================
// CONTENT BUILDING
// ============================================================================

/**
 * Builds content structure for Gemini API from chat history
 * @param history - Array of validated ChatTurns
 * @param message - Current user message
 * @returns Array of GeminiContent objects ready for API
 */
export function buildGeminiContents(
  history: ChatTurn[],
  message: string
): GeminiContent[] {
  const contents: GeminiContent[] = [];

  // Add history to contents
  for (const turn of history) {
    contents.push({
      role: turn.sender,
      parts: [{ text: turn.text }],
    });
  }

  // Add current message
  contents.push({
    role: "user",
    parts: [{ text: message }],
  });

  return contents;
}
