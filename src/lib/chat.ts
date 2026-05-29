export interface ChatTurn {
  sender: "user" | "model";
  text: string;
}

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

export function normalizeChatHistory(value: unknown, maxTurns = 20): ChatTurn[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isChatTurn).slice(-maxTurns);
}

export function buildGeminiContents(history: ChatTurn[], message: string) {
  const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

  for (const turn of history) {
    contents.push({
      role: turn.sender,
      parts: [{ text: turn.text }],
    });
  }

  contents.push({
    role: "user",
    parts: [{ text: message }],
  });

  return contents;
}
